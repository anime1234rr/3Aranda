import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../lib/database.types";
import { obtenerIdioma } from "../lib/i18n";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const CATEGORIAS_VALIDAS = ["navidad", "cumpleanos", "vacaciones", "familia", "logro", "otro"] as const;

function detectarMediaType(mime: string): "image" | "gif" | "video" {
  if (mime === "image/gif") return "gif";
  if (mime.startsWith("video/")) return "video";
  return "image";
}

const MENSAJES = {
  es: {
    sinSesion: "Debes iniciar sesión",
    sinArchivos: "Selecciona al menos un archivo",
  },
  en: {
    sinSesion: "You must be logged in",
    sinArchivos: "Select at least one file",
  },
};

export const server = {
  subirRecuerdo: defineAction({
    accept: "form",
    input: z.object({
      locale: z.string().optional(),
      title: z.string().trim().min(1),
      description: z.string().trim().optional(),
      date: z.string().optional(),
      tag: z.enum(CATEGORIAS_VALIDAS).optional(),
      files: z.array(z.instanceof(File)).optional().default([]),
    }),
    handler: async (input, context) => {
      const locale = obtenerIdioma(input.locale);
      const m = MENSAJES[locale];

      const accessToken = context.cookies.get("sb-access-token")?.value;
      if (!accessToken || !context.locals.user) {
        throw new ActionError({ code: "UNAUTHORIZED", message: m.sinSesion });
      }

      const archivos = input.files.filter((f) => f.size > 0);
      if (archivos.length === 0) {
        throw new ActionError({ code: "BAD_REQUEST", message: m.sinArchivos });
      }

      // Cliente propio de esta petición: reenvía el token del usuario para que
      // las políticas RLS (auth.uid() = usuario_id) se apliquen correctamente.
      const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
      });

      const usuarioId = context.locals.user.id;
      const creados = [];

      for (const file of archivos) {
        const rutaArchivo = `${usuarioId}/${randomUUID()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("recuerdos")
          .upload(rutaArchivo, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error al subir ${file.name}: ${uploadError.message}`,
          });
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("recuerdos").getPublicUrl(rutaArchivo);

        const { data: fila, error: insertError } = await supabase
          .from("recuerdos")
          .insert({
            usuario_id: usuarioId,
            titulo: input.title,
            descripcion: input.description || null,
            media_url: publicUrl,
            media_type: detectarMediaType(file.type),
            categoria: input.tag ?? null,
            fecha: input.date || null,
          })
          .select()
          .single();

        if (insertError) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error al guardar ${file.name}: ${insertError.message}`,
          });
        }

        creados.push(fila);
      }

      return { recuerdos: creados };
    },
  }),
};

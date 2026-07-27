export const prerender = false;

import type { APIRoute } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { supabase } from "../../../lib/supabase";
import { obtenerIdioma } from "../../../lib/i18n";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("form-data") && !contentType.includes("x-www-form-urlencoded")) {
    return new Response("Formato de solicitud no válido", { status: 400 });
  }

  const formData = await request.formData();
  const locale = obtenerIdioma(formData.get("locale")?.toString());
  const nombreUsuario = formData.get("nombre_usuario")?.toString().trim();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const urlRegistrar = getRelativeLocaleUrl(locale, "/registrar");
  const urlIniciarSesion = getRelativeLocaleUrl(locale, "/iniciar_sesion");
  const urlPerfil = getRelativeLocaleUrl(locale, "/perfil");

  if (!nombreUsuario || !email || !password) {
    return redirect(`${urlRegistrar}?error=${encodeURIComponent("Nombre de usuario, correo y contraseña obligatorios")}`);
  }

  if (password.length < 6) {
    return redirect(
      `${urlRegistrar}?error=${encodeURIComponent("La contraseña debe tener al menos 6 caracteres")}`
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nombre_usuario: nombreUsuario } },
  });

  if (error) {
    return redirect(`${urlRegistrar}?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.user) {
    return redirect(`${urlRegistrar}?error=${encodeURIComponent("No se pudo crear la cuenta")}`);
  }

  // La fila en perfiles la crea el trigger on_auth_user_created (security definer),
  // a partir de raw_user_meta_data.nombre_usuario, sin pasar por RLS.

  // Si el proyecto exige confirmación por correo, signUp no devuelve sesión todavía.
  if (!data.session) {
    return redirect(urlIniciarSesion);
  }

  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, { path: "/", httpOnly: true, secure: true });
  cookies.set("sb-refresh-token", refresh_token, { path: "/", httpOnly: true, secure: true });

  return redirect(urlPerfil);
};

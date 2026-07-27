export const prerender = false; // 

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("form-data") && !contentType.includes("x-www-form-urlencoded")) {
    return new Response("Formato de solicitud no válido", { status: 400 });
  }

  const formData = await request.formData();
  const identificador = formData.get("identificador")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!identificador || !password) {
    return redirect(`/iniciar_sesion?error=${encodeURIComponent("Usuario/correo y contraseña obligatorios")}`);
  }

  let email = identificador;

  if (!identificador.includes("@")) {
    const { data: emailEncontrado, error: rpcError } = await supabase.rpc(
      "obtener_email_por_usuario",
      { p_nombre_usuario: identificador }
    );

    if (rpcError || !emailEncontrado) {
      return redirect(`/iniciar_sesion?error=${encodeURIComponent("Usuario o contraseña incorrectos")}`);
    }

    email = emailEncontrado;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/iniciar_sesion?error=${encodeURIComponent(error.message)}`);
  }

  const { access_token, refresh_token } = data.session;
  
  cookies.set("sb-access-token", access_token, { path: "/", httpOnly: true, secure: true });
  cookies.set("sb-refresh-token", refresh_token, { path: "/", httpOnly: true, secure: true });
  
  return redirect("/perfil");
};
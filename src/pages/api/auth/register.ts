export const prerender = false;

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("form-data") && !contentType.includes("x-www-form-urlencoded")) {
    return new Response("Formato de solicitud no válido", { status: 400 });
  }

  const formData = await request.formData();
  const nombreUsuario = formData.get("nombre_usuario")?.toString().trim();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!nombreUsuario || !email || !password) {
    return redirect(`/registrar?error=${encodeURIComponent("Nombre de usuario, correo y contraseña obligatorios")}`);
  }

  if (password.length < 6) {
    return redirect(
      `/registrar?error=${encodeURIComponent("La contraseña debe tener al menos 6 caracteres")}`
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nombre_usuario: nombreUsuario } },
  });

  if (error) {
    return redirect(`/registrar?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.user) {
    return redirect(`/registrar?error=${encodeURIComponent("No se pudo crear la cuenta")}`);
  }

  // La fila en perfiles la crea el trigger on_auth_user_created (security definer),
  // a partir de raw_user_meta_data.nombre_usuario, sin pasar por RLS.

  // Si el proyecto exige confirmación por correo, signUp no devuelve sesión todavía.
  if (!data.session) {
    return redirect("/iniciar_sesion");
  }

  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, { path: "/", httpOnly: true, secure: true });
  cookies.set("sb-refresh-token", refresh_token, { path: "/", httpOnly: true, secure: true });

  return redirect("/perfil");
};

// src/pages/api/auth/signout.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // 1. Eliminamos las cookies de sesión
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });

  // devuelve una respuesta 302 automáticamente.
  return redirect("/iniciar_sesion");
};
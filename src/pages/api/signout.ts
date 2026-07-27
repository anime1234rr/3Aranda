import type { APIRoute } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { obtenerIdioma } from "../../lib/i18n";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });

  // El enlace "Salir" no envía el locale por formulario: lo tomamos de la página
  // desde la que se hizo clic (Referer) para volver al login en el mismo idioma.
  const referer = request.headers.get("referer");
  const segmentoLocale = referer ? new URL(referer).pathname.split("/")[1] : undefined;
  const locale = obtenerIdioma(segmentoLocale);

  return redirect(getRelativeLocaleUrl(locale, "/iniciar_sesion"));
};

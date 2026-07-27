import { defineMiddleware } from "astro:middleware";
import { getRelativeLocaleUrl } from "astro:i18n";
import { supabase } from "./lib/supabase";
import { obtenerIdioma } from "./lib/i18n";

const RUTAS_PROTEGIDAS = ["/perfil"];

export const onRequest = defineMiddleware(async (context, next) => {
  const accessToken = context.cookies.get("sb-access-token")?.value;

  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    context.locals.user = error ? null : data.user;
  } else {
    context.locals.user = null;
  }

  const locale = obtenerIdioma(context.currentLocale);
  const pathname = context.url.pathname.replace(/\/$/, "");
  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) => {
    const objetivo = getRelativeLocaleUrl(locale, ruta).replace(/\/$/, "");
    return pathname === objetivo || pathname.startsWith(`${objetivo}/`);
  });

  if (esRutaProtegida && !context.locals.user) {
    return context.redirect(getRelativeLocaleUrl(locale, "/iniciar_sesion"));
  }

  return next();
});

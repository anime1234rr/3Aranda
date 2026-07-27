import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { idiomas, nombresIdioma, type Idioma } from "../lib/i18n";

export interface Props {
  idiomaActual: Idioma;
  idiomaLabel: string;
  /** URL de la página actual para cada idioma, ya resuelta con getRelativeLocaleUrl. */
  hrefsPorIdioma: Record<Idioma, string>;
}

export default function MenuDesplegable({ idiomaActual, idiomaLabel, hrefsPorIdioma }: Props) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function alHacerClickFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    function alPresionarEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", alHacerClickFuera);
    document.addEventListener("keydown", alPresionarEscape);
    return () => {
      document.removeEventListener("mousedown", alHacerClickFuera);
      document.removeEventListener("keydown", alPresionarEscape);
    };
  }, []);

  return (
    <div ref={contenedorRef} className="relative">
      <button
        type="button"
        aria-label={idiomaLabel}
        aria-haspopup="menu"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-sm outline-none transition-transform duration-200 hover:scale-105"
      >
        <Languages className="w-5 h-5" />
      </button>

      {abierto && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-stone-800 bg-stone-900 p-1.5 shadow-xl"
        >
          <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-widest text-stone-500">
            {idiomaLabel}
          </p>
          <div className="my-1 h-px bg-stone-800" />
          {idiomas.map((locale) => (
            <a
              key={locale}
              href={hrefsPorIdioma[locale]}
              role="menuitem"
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-800 hover:text-amber-400"
            >
              {nombresIdioma[locale]}
              {locale === idiomaActual && <Check className="w-4 h-4 text-amber-400" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

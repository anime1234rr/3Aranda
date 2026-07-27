export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];
export const idiomaPorDefecto: Idioma = "es";

// El nombre de cada idioma se muestra siempre en su propio idioma (convención estándar de selectores de idioma).
export const nombresIdioma: Record<Idioma, string> = {
  es: "Español",
  en: "English",
};

interface Diccionario {
  subtitulo: string;
  idiomaMenu: string;
  navInicio: string;
  navAlbum: string;
  navRecuerdos: string;
  navSubir: string;
  navEntrar: string;
  navSalir: string;
  notificaciones: string;
  buscarPlaceholder: string;
  buscarBoton: string;
  buscarSugerencias: string[];
  footerDescripcion: string;
  footerRecursos: string;
  footerGaleria: string;
  footerApi: string;
  footerSoporte: string;
  footerLegal: string;
  footerPrivacidad: string;
  footerTerminos: string;
  footerDerechos: string;
  modalTitulo: string;
  modalArchivos: string;
  modalArrastra: string;
  modalOClic: string;
  modalFormatos: string;
  modalTituloCampo: string;
  modalTituloPlaceholder: string;
  modalDescripcion: string;
  modalDescripcionPlaceholder: string;
  modalFecha: string;
  modalCategoria: string;
  modalCategoriaOpciones: { value: string; label: string }[];
  modalError: string;
  modalGuardar: string;
  modalCancelar: string;
  subirTriggerDefault: string;
}

export const textos: Record<Idioma, Diccionario> = {
  es: {
    subtitulo: "Recuerdos en familia",
    idiomaMenu: "Idioma",
    navInicio: "Inicio",
    navAlbum: "Álbum",
    navRecuerdos: "Recuerdos",
    navSubir: "Subir",
    navEntrar: "Entrar",
    navSalir: "Salir",
    notificaciones: "Notificaciones",
    buscarPlaceholder: "Buscar recuerdos, fechas, personas…",
    buscarBoton: "Buscar",
    buscarSugerencias: ["Navidad", "Cumpleaños", "Verano 2024", "Abuelos"],
    footerDescripcion: "La plataforma familiar para guardar y compartir los recuerdos de todos.",
    footerRecursos: "Recursos",
    footerGaleria: "Galería",
    footerApi: "API",
    footerSoporte: "Soporte",
    footerLegal: "Legal",
    footerPrivacidad: "Privacidad",
    footerTerminos: "Términos",
    footerDerechos: "Todos los derechos reservados.",
    modalTitulo: "Subir un recuerdo",
    modalArchivos: "Archivos",
    modalArrastra: "Arrastra tus fotos o vídeos aquí",
    modalOClic: "o haz clic para seleccionar archivos",
    modalFormatos: "JPG, PNG, GIF, MP4 · Máx. 50 MB por archivo",
    modalTituloCampo: "Título del recuerdo",
    modalTituloPlaceholder: "Ej: Navidad en familia 2024",
    modalDescripcion: "Descripción",
    modalDescripcionPlaceholder: "Cuéntanos algo sobre este momento…",
    modalFecha: "Fecha del recuerdo",
    modalCategoria: "Categoría",
    modalCategoriaOpciones: [
      { value: "", label: "Selecciona categoría" },
      { value: "navidad", label: "🎄 Navidad" },
      { value: "cumpleanos", label: "🎂 Cumpleaños" },
      { value: "vacaciones", label: "✈️ Vacaciones" },
      { value: "familia", label: "👨‍👩‍👧‍👦 Reunión familiar" },
      { value: "logro", label: "🏆 Logro" },
      { value: "otro", label: "💛 Otro" },
    ],
    modalError: "No se pudo guardar el recuerdo",
    modalGuardar: "Guardar recuerdo",
    modalCancelar: "Cancelar",
    subirTriggerDefault: "Subir",
  },
  en: {
    subtitulo: "Family memories",
    idiomaMenu: "Language",
    navInicio: "Home",
    navAlbum: "Album",
    navRecuerdos: "Memories",
    navSubir: "Upload",
    navEntrar: "Log in",
    navSalir: "Log out",
    notificaciones: "Notifications",
    buscarPlaceholder: "Search memories, dates, people…",
    buscarBoton: "Search",
    buscarSugerencias: ["Christmas", "Birthday", "Summer 2024", "Grandparents"],
    footerDescripcion: "The family platform to save and share everyone's memories.",
    footerRecursos: "Resources",
    footerGaleria: "Gallery",
    footerApi: "API",
    footerSoporte: "Support",
    footerLegal: "Legal",
    footerPrivacidad: "Privacy",
    footerTerminos: "Terms",
    footerDerechos: "All rights reserved.",
    modalTitulo: "Upload a memory",
    modalArchivos: "Files",
    modalArrastra: "Drag your photos or videos here",
    modalOClic: "or click to select files",
    modalFormatos: "JPG, PNG, GIF, MP4 · Max. 50 MB per file",
    modalTituloCampo: "Memory title",
    modalTituloPlaceholder: "E.g: Christmas with family 2024",
    modalDescripcion: "Description",
    modalDescripcionPlaceholder: "Tell us something about this moment…",
    modalFecha: "Memory date",
    modalCategoria: "Category",
    modalCategoriaOpciones: [
      { value: "", label: "Select a category" },
      { value: "navidad", label: "🎄 Christmas" },
      { value: "cumpleanos", label: "🎂 Birthday" },
      { value: "vacaciones", label: "✈️ Vacation" },
      { value: "familia", label: "👨‍👩‍👧‍👦 Family gathering" },
      { value: "logro", label: "🏆 Achievement" },
      { value: "otro", label: "💛 Other" },
    ],
    modalError: "Couldn't save the memory",
    modalGuardar: "Save memory",
    modalCancelar: "Cancel",
    subirTriggerDefault: "Upload",
  },
};

export function obtenerIdioma(localeActual: string | undefined): Idioma {
  return localeActual === "en" ? "en" : idiomaPorDefecto;
}

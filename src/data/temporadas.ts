// Temporadas de oferta. Cada una da a sus productos un look propio (colores + decoración).
//
// Para usar una temporada en un producto (en src/data/products.ts) pon estas 3 cosas:
//     price: 899,               <- el precio de oferta
//     originalPrice: 1199,      <- el precio normal (sale tachado)
//     temporada: "navidad",     <- el id de la temporada (de la lista de abajo)
// Cuando termine la temporada, quita `temporada` y `originalPrice` y regresa `price` al normal.
//
// Para inventar una temporada nueva, agrega un renglón aquí con un id nuevo (sin espacios ni acentos).
// No hace falta tocar nada más.

export interface Temporada {
  nombre: string; // lo que se lee en la etiqueta
  cinta: string; // texto de la cinta que va arriba del producto
  decoracion: string[]; // emojis que decoran la cinta (se repiten a los lados)
  color: string; // color principal (cinta, borde, botón y precio)
  color2: string; // color secundario (degradado de la cinta)
  texto?: string; // color del texto de la cinta (por defecto blanco)
}

export const TEMPORADAS: Record<string, Temporada> = {
  "buen-fin": {
    nombre: "Buen Fin",
    cinta: "BUEN FIN",
    decoracion: ["🔥", "💥"],
    color: "#d62828",
    color2: "#f4a300",
  },
  navidad: {
    nombre: "Navidad",
    cinta: "FELIZ NAVIDAD",
    decoracion: ["⛄", "❄️", "🎄"],
    color: "#b3202a",
    color2: "#1f6f43",
  },
  "san-valentin": {
    nombre: "San Valentín",
    cinta: "SAN VALENTÍN",
    decoracion: ["❤️", "💘"],
    color: "#d6336c",
    color2: "#8e1b4a",
  },
  "dia-de-la-madre": {
    nombre: "Día de la Madre",
    cinta: "FELIZ DÍA, MAMÁ",
    decoracion: ["🌷", "💐"],
    color: "#c2579b",
    color2: "#7a3fa0",
  },
  "dia-del-padre": {
    nombre: "Día del Padre",
    cinta: "FELIZ DÍA, PAPÁ",
    decoracion: ["🤠", "🥾"],
    color: "#1d4e89",
    color2: "#2f2a6b",
  },
};

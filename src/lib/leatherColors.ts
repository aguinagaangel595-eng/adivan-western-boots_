// Paleta de referencia para el grabado en piel. El cliente desliza libremente
// entre estos tonos; el color final se confirma con muestras reales por WhatsApp.
export interface LeatherColorStop {
  name: string;
  hex: string;
}

export const LEATHER_COLOR_STOPS: LeatherColorStop[] = [
  { name: "Negro", hex: "#1a1512" },
  { name: "Vino", hex: "#5c1f2b" },
  { name: "Shedrón", hex: "#6b3a2e" },
  { name: "Café", hex: "#4a2f1f" },
  { name: "Cognac", hex: "#9a5a2b" },
  { name: "Miel", hex: "#c9963f" },
  { name: "Hueso", hex: "#e8dcc4" },
];

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** t va de 0 a 1 a lo largo de toda la paleta. Devuelve el color interpolado y el nombre más cercano. */
export function sampleLeatherColor(t: number): { hex: string; nearestName: string } {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = LEATHER_COLOR_STOPS.length - 1;
  const pos = clamped * segments;
  const idx = Math.min(segments - 1, Math.floor(pos));
  const localT = pos - idx;

  const a = hexToRgb(LEATHER_COLOR_STOPS[idx].hex);
  const b = hexToRgb(LEATHER_COLOR_STOPS[idx + 1].hex);
  const hex = rgbToHex(
    a.r + (b.r - a.r) * localT,
    a.g + (b.g - a.g) * localT,
    a.b + (b.b - a.b) * localT
  );

  const nearestName = localT < 0.5 ? LEATHER_COLOR_STOPS[idx].name : LEATHER_COLOR_STOPS[idx + 1].name;
  return { hex, nearestName };
}

export const LEATHER_GRADIENT_CSS = `linear-gradient(to right, ${LEATHER_COLOR_STOPS.map((s) => s.hex).join(", ")})`;

// Rueda de color circular para grabados: ángulo = matiz (cualquier color, no solo
// tonos de piel), distancia al centro = claridad (centro = claro/Hueso, borde = oscuro/Negro).

export interface WheelColor {
  hue: number; // 0-360
  radius: number; // 0-1 (0 = centro/claro, 1 = borde/oscuro)
  hex: string;
  label: string;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// Nombres de referencia repartidos en el círculo (matiz) para el mensaje de WhatsApp.
const HUE_NAMES: { hue: number; name: string }[] = [
  { hue: 0, name: "Vino" },
  { hue: 20, name: "Shedrón" },
  { hue: 32, name: "Café" },
  { hue: 42, name: "Cognac" },
  { hue: 52, name: "Miel" },
  { hue: 100, name: "Verde" },
  { hue: 200, name: "Azul" },
  { hue: 280, name: "Morado" },
  { hue: 330, name: "Rosa" },
  { hue: 360, name: "Vino" },
];

function nearestHueName(hue: number): string {
  let best = HUE_NAMES[0];
  let bestDist = Infinity;
  for (const anchor of HUE_NAMES) {
    const d = Math.abs(anchor.hue - hue);
    if (d < bestDist) {
      bestDist = d;
      best = anchor;
    }
  }
  return best.name;
}

/**
 * hue: 0-360, radius: 0 (centro) a 1 (borde).
 * La claridad baja de forma constante del centro (claro) al borde (oscuro), pero la
 * saturación sube y luego BAJA otra vez (pico a media distancia) — así el centro da
 * casi blanco/Hueso, el borde da casi negro/Negro (ambos con poca saturación), y el
 * anillo de en medio da los tonos vivos (Vino, Azul, Verde, etc). Antes la saturación
 * solo subía con el radio, así que el borde nunca bajaba de un color "sucio" y Negro
 * era imposible de alcanzar.
 */
export function sampleWheelColor(hue: number, radius: number): WheelColor {
  const r = Math.max(0, Math.min(1, radius));
  const lightness = 85 - r * 70; // 85% en el centro, 15% en el borde
  const saturation = 15 + 60 * Math.sin(r * Math.PI); // bajo en el centro Y en el borde, alto a la mitad
  const hex = hslToHex(hue, saturation, lightness);

  let label: string;
  if (lightness >= 75) label = "Hueso";
  else if (lightness <= 25 && saturation <= 40) label = "Negro";
  else label = nearestHueName(hue);

  return { hue, radius: r, hex, label };
}

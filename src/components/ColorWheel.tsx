import { useCallback, useRef, useState } from "react";
import { sampleWheelColor } from "@/lib/colorWheel";

interface ColorWheelProps {
  hue: number;
  radius: number;
  onChange: (hue: number, radius: number) => void;
  size?: number;
}

const ColorWheel = ({ hue, radius, onChange, size = 96 }: ColorWheelProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = wheelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const maxR = rect.width / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const r = Math.max(0, Math.min(1, dist / maxR));

      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      angleDeg = (angleDeg + 360) % 360;

      onChange(angleDeg, r);
    },
    [onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // captura de puntero no soportada en este entorno; el arrastre sigue
      // funcionando vía pointermove normal.
    }
    updateFromPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = () => setDragging(false);

  const { hex } = sampleWheelColor(hue, radius);
  const rad = (hue * Math.PI) / 180;
  const handlePct = 50 + radius * 46 * Math.cos(rad);
  const handlePctY = 50 + radius * 46 * Math.sin(rad);

  return (
    <div
      ref={wheelRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative rounded-full cursor-pointer shadow-inner shrink-0 touch-none"
      style={{
        width: size,
        height: size,
        background:
          // Centro claro (hacia Hueso)
          "radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 18%, transparent 42%), " +
          // Borde oscuro (hacia Negro)
          "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.88) 100%), " +
          // Anillo de tonos vivos a media distancia
          "conic-gradient(from 0deg, hsl(0 75% 50%), hsl(60 75% 50%), hsl(120 75% 50%), hsl(180 75% 50%), hsl(240 75% 50%), hsl(300 75% 50%), hsl(360 75% 50%))",
      }}
    >
      <div
        className="absolute w-6 h-6 rounded-full border-[3px] border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${handlePct}%`, top: `${handlePctY}%`, backgroundColor: hex }}
      />
    </div>
  );
};

export default ColorWheel;

import { useCallback, useRef, useState } from "react";
import { LEATHER_GRADIENT_CSS, sampleLeatherColor } from "@/lib/leatherColors";

interface ColorSliderProps {
  value: number; // 0 a 1
  onChange: (t: number, hex: string, nearestName: string) => void;
}

const ColorSlider = ({ value, onChange }: ColorSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const t = (clientX - rect.left) / rect.width;
      const clamped = Math.max(0, Math.min(1, t));
      const { hex, nearestName } = sampleLeatherColor(clamped);
      onChange(clamped, hex, nearestName);
    },
    [onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Algunos navegadores/entornos no soportan captura de puntero; el arrastre sigue
      // funcionando vía los eventos normales de pointermove en el track.
    }
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => setDragging(false);

  const { hex } = sampleLeatherColor(value);

  return (
    <div className="w-full select-none">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-4 rounded-full cursor-pointer shadow-inner"
        style={{ background: LEATHER_GRADIENT_CSS }}
      >
        <div
          className="absolute top-1/2 w-8 h-8 rounded-full border-4 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
          style={{ left: `${value * 100}%`, backgroundColor: hex, transform: `translate(-50%, -50%) scale(${dragging ? 1.15 : 1})` }}
        />
      </div>
    </div>
  );
};

export default ColorSlider;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

const TALLAS: Record<string, (number | string)[]> = {
  "Botas": [22, 23, 24, 25, 26, 27, 28, 29],
  "Cinturones": [28, 30, 32, 34, 36, 38, 40, 42],
  "Botín": [25, 26, 27, 28, 29],
  "Botina": [22, 23, 24, 25, 26],
};

const CATEGORIAS_CON_TALLA = Object.keys(TALLAS);

const ProductCard = ({ id, name, price, image, category, description }: ProductCardProps) => {
  const { addItem } = useCart();
  const [tallaSeleccionada, setTallaSeleccionada] = useState<number | string | null>(null);
  const [error, setError] = useState(false);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  const necesitaTalla = CATEGORIAS_CON_TALLA.includes(category);
  const tallas = TALLAS[category] ?? [];

  const handleAgregar = () => {
    if (necesitaTalla && !tallaSeleccionada) {
      setError(true);
      return;
    }
    addItem({ id, name, price, image, talla: tallaSeleccionada ?? undefined });
    setTallaSeleccionada(null);
    setError(false);
  };

  return (
    <div className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-4 left-4 bg-[hsl(0,0%,5%)] text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-serif text-lg font-semibold text-foreground">{name}</h3>
        {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}

        {necesitaTalla && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Talla</p>
            <div className="flex flex-wrap gap-2">
              {tallas.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTallaSeleccionada(t); setError(false); }}
                  className={`w-10 h-10 rounded-full text-sm font-medium border transition-all
                    ${tallaSeleccionada === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-destructive">Selecciona una talla</p>}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-bold text-foreground">{formatPrice(price)}</p>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5"
            onClick={handleAgregar}
          >
            Comprar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

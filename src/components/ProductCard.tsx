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

const ProductCard = ({ id, name, price, image, category, description }: ProductCardProps) => {
  const { addItem } = useCart();

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

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
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-bold text-foreground">{formatPrice(price)}</p>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5"
            onClick={() => addItem({ id, name, price, image })}
          >
            Comprar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

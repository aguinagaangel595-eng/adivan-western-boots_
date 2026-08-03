import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartModal = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  const handleWhatsApp = () => {
    const numero = "524775547669"; // 👈 Tu número aquí

    const lineas = items.map((item) => {
      const talla = item.talla ? ` | Talla: ${item.talla}` : "";
      return `• ${item.name}${talla} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`;
    });

    const mensaje = [
      "Hola, me gustaría hacer el siguiente pedido:",
      "",
      ...lineas,
      "",
      `*Total: ${formatPrice(totalPrice)}*`,
    ].join("\n");

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Tu Carrito</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.talla}`} className="flex gap-4 p-3 rounded-xl bg-muted/50">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                    {item.talla && (
                      <p className="text-xs text-muted-foreground">Talla: {item.talla}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1, item.talla)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1, item.talla)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeItem(item.id, item.talla)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total estimado:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Button
                onClick={handleWhatsApp}
                className="w-full rounded-full bg-primary text-primary-foreground text-base py-6"
              >
                Pedir por WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Sin pago en línea: te escribimos por WhatsApp para confirmar talla, disponibilidad y forma de pago.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartModal;

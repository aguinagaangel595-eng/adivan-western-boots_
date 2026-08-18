import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { ZoomIn, ExternalLink } from "lucide-react";

// 1. Agregamos la interfaz para las variantes de color/modelo
export interface ProductVariant {
  color: string;
  images: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hex2?: string; // si existe, se pinta mitad y mitad (para "Combinado")
}

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Si existe, se muestra tachado como oferta
  category: string;
  description?: string;
  image?: string; // Mantenemos image por si algún producto viejo no tiene variantes
  variants?: ProductVariant[]; // Nueva propiedad para colores y carrusel
  colorSwatches?: ColorSwatch[]; // Colores fijos de marca sin foto por color (ej. carteras lisas)
  grabadoPatrones?: string[]; // Nombres de patrones de grabado seleccionables (+ opción "Otro")
  grabadoImages?: string[]; // Fotos de ejemplo del grabado, no ligadas a un patrón en particular
  grabadoCatalogUrl?: string; // Link al catálogo completo de grabados
}

// Tallas por categoría. Carteras/bolsas/sombreros no llevan talla (queda fuera de este mapa).
const TALLAS_POR_CATEGORIA: Record<string, (number | string)[]> = {
  Rodeo: [22, 23, 24, 25, 26, 27, 28, 29],
  Exótica: [22, 23, 24, 25, 26, 27, 28, 29],
  Originales: [22, 23, 24, 25, 26, 27, 28, 29],
  Tejida: [22, 23, 24, 25, 26, 27, 28, 29],
  Botín: [22, 23, 24, 25, 26, 27, 28, 29],
  Cintos: [28, 30, 32, 34, 36, 38, 40, 42],
};

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  variants,
  category,
  description,
  colorSwatches,
  grabadoPatrones,
  grabadoImages,
  grabadoCatalogUrl,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const [tallaSeleccionada, setTallaSeleccionada] = useState<number | string | null>(null);
  const [error, setError] = useState(false);

  // 2. Estados para el Color y el Carrusel
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);

  // Estado para grabado: el cliente ve el catálogo y escribe qué patrón quiere
  const hasGrabados = !!grabadoPatrones && grabadoPatrones.length > 0;
  const [patronTexto, setPatronTexto] = useState("");

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  const tallas = TALLAS_POR_CATEGORIA[category] ?? [];
  const necesitaTalla = tallas.length > 0;

  const hasColorSwatches = !!colorSwatches && colorSwatches.length > 0;
  const swatchSeleccionado = hasColorSwatches ? colorSwatches![selectedSwatchIdx] : null;

  // Lógica para determinar qué imágenes mostrar
  const hasVariants = variants && variants.length > 0;
  const currentVariant = hasVariants ? variants[selectedColorIdx] : null;
  const displayImages = hasGrabados && grabadoImages && grabadoImages.length > 0
    ? grabadoImages
    : currentVariant
    ? currentVariant.images
    : image
    ? [image]
    : ["/placeholder.png"];
  const displayColorName = currentVariant && currentVariant.color !== "Único" ? currentVariant.color : undefined;

  // 3. Controles del Carrusel
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    setCurrentImgIdx(0); // Regresa a la primera foto al cambiar de color
  };

  const handleAgregar = () => {
    if (necesitaTalla && !tallaSeleccionada) {
      setError(true);
      return;
    }
    // Modificamos el payload para enviar la imagen y el color seleccionado al carrito
    addItem({
      id,
      name,
      price,
      image: displayImages[0],
      talla: tallaSeleccionada ?? undefined,
      color: hasColorSwatches ? swatchSeleccionado!.name : hasGrabados ? undefined : displayColorName,
      grabado: hasGrabados ? patronTexto.trim() || "Sin especificar" : undefined,
    });
    setTallaSeleccionada(null);
    setError(false);
  };

  return (
    <div className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* SECCIÓN DEL CARRUSEL */}
      <div className="aspect-square overflow-hidden bg-muted relative">
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="absolute inset-0 z-0 cursor-zoom-in"
          aria-label={`Ver imagen ampliada de ${name}`}
        >
          <img
            src={displayImages[currentImgIdx]}
            alt={`${name} - ${displayColorName || "Foto"}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <ZoomIn className="h-4 w-4" />
        </div>

        <span className="absolute top-4 left-4 bg-[hsl(0,0%,5%)] text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full z-10">
          {category}
        </span>

        {originalPrice && (
          <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-full z-10">
            Oferta
          </span>
        )}

        {/* Flechas del Carrusel (Solo se muestran si hay más de 1 imagen) */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            {/* Puntos Indicadores */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {displayImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentImgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-5 space-y-4 flex flex-col flex-grow">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">{name}</h3>
          {description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>}
        </div>

        {/* SWATCHES DE COLOR FIJOS DE MARCA (sin foto por color) */}
        {hasColorSwatches && (
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Color</p>
            <div className="flex flex-wrap gap-2.5">
              {colorSwatches!.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedSwatchIdx(idx)}
                  aria-pressed={selectedSwatchIdx === idx}
                  title={c.name}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedSwatchIdx === idx ? "border-primary scale-110" : "border-border"
                  }`}
                  style={{
                    background: c.hex2 ? `linear-gradient(135deg, ${c.hex} 50%, ${c.hex2} 50%)` : c.hex,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-foreground font-medium">{swatchSeleccionado?.name}</p>
            <p className="text-[10px] text-muted-foreground">Foto de referencia — confirmamos con muestra real</p>
          </div>
        )}

        {/* SELECTOR DE COLORES (para productos sin grabado ni swatches fijos) */}
        {hasVariants && !hasGrabados && !hasColorSwatches && (
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Color</p>
            {variants!.length > 1 ? (
              <div className="flex flex-wrap gap-2">
                {variants!.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorChange(idx)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all
                      ${selectedColorIdx === idx
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground/50"
                      }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground">{variants![0].color}</p>
            )}
          </div>
        )}

        {/* GRABADO: patrón por nombre + rueda de color */}
        {hasGrabados && (
          <div className="space-y-3">
            {grabadoCatalogUrl && (
              <a
                href={grabadoCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-2.5 text-sm transition-colors"
              >
                Ver catálogo de grabados <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">¿Qué grabado quieres?</p>
              <Input
                value={patronTexto}
                onChange={(e) => setPatronTexto(e.target.value)}
                placeholder={grabadoPatrones ? `Ej. ${grabadoPatrones.join(", ")}...` : "Escribe el grabado que buscas"}
                className="h-9 text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* SELECTOR DE TALLAS */}
        {necesitaTalla && (
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Talla</p>
            <div className="flex flex-wrap gap-2">
              {tallas.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTallaSeleccionada(t); setError(false); }}
                  className={`w-9 h-9 rounded-full text-xs font-medium border transition-all
                    ${tallaSeleccionada === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-destructive mt-1">Selecciona una talla</p>}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 mt-auto">
          <div>
            {originalPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</p>
            )}
            <p className={`text-xl font-bold ${originalPrice ? "text-destructive" : "text-foreground"}`}>
              {formatPrice(price)}
            </p>
          </div>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5"
            onClick={handleAgregar}
          >
            Agregar <span className="sr-only">al carrito</span>
          </Button>
        </div>
      </div>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-xl border-none bg-background p-3 sm:p-4">
          <DialogTitle className="sr-only">
            {name}
            {displayColorName ? ` — ${displayColorName}` : ""}
          </DialogTitle>
          <img
            src={displayImages[currentImgIdx]}
            alt={`${name} - ${displayColorName || "Foto"}`}
            className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
          />
          <p className="text-center text-sm text-muted-foreground pt-1">
            {name}
            {displayColorName ? ` · ${displayColorName}` : ""}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;

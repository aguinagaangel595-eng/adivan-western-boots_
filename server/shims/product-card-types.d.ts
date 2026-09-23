// Shim solo para type-checking del código de servidor (tsconfig.server.json).
// products.ts importa estos dos tipos con `import type` desde
// "@/components/ProductCard" (se borran en runtime); redirigimos aquí para no
// arrastrar todo ProductCard.tsx (JSX de la tienda) al chequeo de tipos del server.
export interface ProductVariant {
  color: string;
  images: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hex2?: string;
}

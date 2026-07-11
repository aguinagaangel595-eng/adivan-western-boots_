import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

// ¡Adiós a los imports de imágenes! Tu código ahora es más limpio gracias a la carpeta public.

const products = [
  { 
    id: 1, 
    name: "Botas Rosas", 
    price: 1299, 
    category: "Botas", 
    description: "Cinturón de piel café con hebilla metálica y acabado rústico moderno.", // (Ojo: dejé tu descripción original)
    variants: [
      // Como ya usas 'public', solo pones "/nombre-de-la-foto.jpg"
      { color: "Rosa", images: ["/Botasrosas.jpg", "/Botasrosas-lado.jpg"] }, 
      { color: "Café", images: ["/Botascafe.jpg", "/Botascafe-suela.jpg"] }
    ]
  },
  { 
    id: 2, 
    name: "Papada de Cocodrilo", 
    price: 1199, 
    category: "Botas", 
    description: "Diseño limpio en piel negra para combinar con todo tu guardarropa.", 
    variants: [
      { color: "Negro", images: ["/cocologo.jpeg", "/coco-detalle.jpg"] },
      { color: "Miel",  images: ["/coco-miel.jpg", "/coco-miel-lado.jpg"] }
    ]
  },
  { 
    id: 3, 
    name: "Pescado Negro ORIGINAL", 
    price: 2699, 
    category: "Botas", 
    description: "Botas de piel original de pescado Pirarucú.",
    variants: [
      { color: "Negro", images: ["/pescado-negro.jpg", "/pescado-negro-2.jpg"] }
    ]
  },
  { 
    id: 4, 
    name: "Rodeo Clásicas", 
    price: 1099, 
    category: "Botas", 
    description: "Botas estilo rodeo con suela doble vida",
    variants: [
      { color: "Mango", images: ["/Rodeo-mango-1.jpeg", "/Rodeo-mango-2.jpeg", "Rodeo-mango-3.jpeg"] }
      { color: "Café enmielado", images: ["/Rodeo-cafe-enmielado-1.jpeg", "/Rodeo-cafe-enmielad-2.jpeg", "Rodeo-cafe-enmielad-3.jpeg"] }// Ejemplo de ruta en public
    ]
  },
  { 
    id: 5, 
    name: "Bolsa Crossbody Negra", 
    price: 2199, 
    category: "Bolsas", // Corregí la categoría a Bolsas
    description: "Bolsa bandolera de piel negra para llevar contigo lo indispensable.",
    variants: [
      { color: "Negra", images: ["/product-bag-crossbody.png"] }
    ]
  },
  { 
    id: 6, 
    name: "Bolsa Shopper Camel", 
    price: 1999, 
    category: "Bolsas", 
    description: "Bolsa amplia en tono camel, ideal para el día a día y viajes cortos.",
    variants: [
      { color: "Camel", images: ["/product-bag-shopper.jpg"] }
    ] 
  },
  { 
    id: 7, 
    name: "Llaveros de Piel", 
    price: 399, 
    category: "Otros", 
    description: "Set de llaveros en piel con grabado sutil y anillo metálico resistente.",
    variants: [
      { color: "Único", images: ["/product-belt.jpg"] }
    ] 
  },
  { 
    id: 8, 
    name: "Porta Tarjetas", 
    price: 449, 
    category: "Otros", 
    description: "Pequeño porta tarjetas de piel ideal para uso diario o viajes.",
    variants: [
      { color: "Único", images: ["/product-wallet.jpg"] }
    ] 
  },
  { 
    id: 9, 
    name: "Bolso Mensajero", 
    price: 2499, 
    category: "Bolsas", 
    description: "Bolso mensajero clásico de piel genuina con correa ajustable.",
    variants: [
      { color: "Único", images: ["/product-bag.jpg"] }
    ] 
  },
];

const categories = ["Todo", "Botas", "Cinturones", "Carteras", "Bolsas", "Sombreros", "Otros"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filtered = activeCategory === "Todo" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[hsl(0,0%,5%)] py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Tienda
            </h1>
            <p className="text-base text-white/60 max-w-2xl mx-auto">
              Catálogo de productos de piel ADIVAN. Cinturones, carteras, bolsas y accesorios creados para durar y contar tu historia.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="mx-auto max-w-7xl flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-semibold border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-foreground border-border hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

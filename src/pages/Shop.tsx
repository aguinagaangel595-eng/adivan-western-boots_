import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useState } from "react";

// Catálogo real: solo botas con fotografía auténtica de producto ADIVAN.
// (Cinturones, carteras y bolsas llegan próximamente.)
// Precios de boceto/referencia — ajústalos cuando tengas tu lista final.

const products = [
  {
    id: 1,
    name: "Botas Rosas",
    price: 999,
    originalPrice: 1499,
    category: "Rodeo",
    description: "Botas coquetas en piel rosa, para dama, con pespunte en tono contrastante.",
    variants: [{ color: "Rosa", images: ["/Botasrosas.jpg"] }],
  },
  {
    id: 2,
    name: "Rodeo Café Enmielado",
    price: 1299,
    category: "Rodeo",
    description: "Bota rodeo clásica en piel café enmielado, tubo bordado y suela de doble vida.",
    variants: [
      { color: "Café enmielado", images: ["/Rodeo-cafe-enmielado-1.jpeg", "/Rodeo-cafe-enmielado-2.jpeg", "/Rodeo-cafe-enmielado-3.jpeg"] },
    ],
  },
  {
    id: 3,
    name: "Rodeo Mango",
    price: 1299,
    category: "Rodeo",
    description: "Bota rodeo en piel color mango con bordado floral en hilo tono hueso.",
    variants: [
      { color: "Mango", images: ["/Rodeo-mango-1.jpeg", "/Rodeo-mango-2.jpeg", "/Rodeo-mango-3.jpeg"] },
    ],
  },
  {
    id: 4,
    name: "Cocodrilo Clásica",
    price: 1299,
    originalPrice: 1599,
    category: "Exótica",
    description: "Piel de res con grabado tipo cocodrilo y tubo bordado en tono café oscuro.",
    variants: [{ color: "Café", images: ["/cocologo.jpeg"] }],
  },
  {
    id: 5,
    name: "Papada de Cocodrilo",
    price: 1199,
    category: "Exótica",
    description: "Piel de res con grabado tipo papada de cocodrilo, acabado envejecido, tubo liso color olivo.",
    variants: [{ color: "Olivo", images: ["/coco-papada.jpg"] }],
  },
  {
    id: 6,
    name: "Pescado Chocolate",
    price: 3199,
    category: "Exótica",
    description: "Piel original de pescado (pirarucú) en tono chocolate, tubo bordado café.",
    variants: [{ color: "Chocolate", images: ["/pescado-choco.jpg"] }],
  },
  {
    id: 7,
    name: "Pescado Negro",
    price: 3499,
    category: "Exótica",
    description: "Piel original de pescado (pirarucú) en negro, tubo bordado a tono.",
    variants: [{ color: "Negro", images: ["/pescado-negro.jpg"] }],
  },
  {
    id: 8,
    name: "Tejida Miel",
    price: 1399,
    category: "Tejida",
    description: "Bota de piel tejida a mano en tono miel, con tubo liso color café.",
    variants: [{ color: "Miel", images: ["/tejida-miel.jpg"] }],
  },
];

const categories = ["Todo", "Ofertas", "Rodeo", "Exótica", "Tejida"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filtered =
    activeCategory === "Todo"
      ? products
      : activeCategory === "Ofertas"
      ? products.filter((p) => p.originalPrice)
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[hsl(0,0%,5%)] py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Tienda</h1>
            <p className="text-base text-white/60 max-w-2xl mx-auto">
              Botas de piel genuina ADIVAN, hechas a mano una por una. Cinturones, carteras y bolsas — próximamente.
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
                    ? cat === "Ofertas"
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "bg-primary text-primary-foreground border-primary"
                    : cat === "Ofertas"
                    ? "bg-transparent text-destructive border-destructive/50 hover:border-destructive"
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
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
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

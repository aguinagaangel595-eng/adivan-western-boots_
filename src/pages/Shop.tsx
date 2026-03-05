import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

import beltWestern from "@/assets/product-belt-western.png";
import beltBlack from "@/assets/product-belt-black.jpg";
import walletClassic from "@/assets/product-wallet-classic.png";
import walletSlim from "@/assets/product-wallet-slim.jpg";
import bagCrossbody from "@/assets/product-bag-crossbody.png";
import bagShopper from "@/assets/product-bag-shopper.jpg";
import beltImage from "@/assets/product-belt.jpg";
import walletImage from "@/assets/product-wallet.jpg";
import bagImage from "@/assets/product-bag.jpg";

const products = [
  { id: 1, name: "Botas Rosas", price: 1299, category: "Botas", image: "/Botasrosas.jpg", description: "Cinturón de piel café con hebilla metálica y acabado rústico moderno." },
  { id: 2, name: "Papada de Cocodrilo", price: 1199, category: "Botas", image: "/coco-papada.jpg", description: "Diseño limpio en piel negra para combinar con todo tu guardarropa." },
  { id: 3, name: "Pescado Choco", price: 899, category: "Botas", image: "/pescado-choco.jpg", description: "Cartera de piel marrón con compartimentos para el uso diario." },
  { id: 4, name: "Cartera Slim Negra", price: 799, category: "Carteras", image: walletSlim, description: "Cartera delgada de piel para llevar lo esencial." },
  { id: 5, name: "Bolsa Crossbody Negra", price: 2199, category: "Cinturones", image: bagCrossbody, description: "Bolsa bandolera de piel negra para llevar contigo lo indispensable." },
  { id: 6, name: "Bolsa Shopper Camel", price: 1999, category: "Bolsas", image: bagShopper, description: "Bolsa amplia en tono camel, ideal para el día a día y viajes cortos." },
  { id: 7, name: "Llaveros de Piel", price: 399, category: "Otros", image: beltImage, description: "Set de llaveros en piel con grabado sutil y anillo metálico resistente." },
  { id: 8, name: "Porta Tarjetas", price: 449, category: "Otros", image: walletImage, description: "Pequeño porta tarjetas de piel ideal para uso diario o viajes." },
  { id: 9, name: "Bolso Mensajero", price: 2499, category: "Bolsas", image: bagImage, description: "Bolso mensajero clásico de piel genuina con correa ajustable." },
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

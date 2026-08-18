import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

// Catálogo real: solo productos con fotografía auténtica editada de ADIVAN.
// Precios de boceto/referencia — ajústalos cuando tengas tu lista final.
// "Exótica" = piel de res con grabado (imitación). "Originales" = piel exótica genuina.

const products = [
  {
    id: 1,
    name: "Botas Rosas",
    price: 999,
    originalPrice: 1399,
    group: "Botas",
    category: "Rodeo",
    description: "Botas coquetas en piel rosa, para dama, con pespunte en tono contrastante.",
    variants: [{ color: "Rosa", images: ["/Botasrosas.jpg"] }],
  },
  {
    id: 2,
    name: "Rodeo Café Enmielado",
    price: 1199,
    group: "Botas",
    category: "Rodeo",
    description: "Bota rodeo clásica en piel café enmielado, tubo bordado y suela de doble vida.",
    variants: [
      { color: "Café enmielado", images: ["/Rodeo-cafe-enmielado-1.jpeg", "/Rodeo-cafe-enmielado-2.jpeg", "/Rodeo-cafe-enmielado-3.jpeg"] },
    ],
  },
  {
    id: 3,
    name: "Rodeo Mango",
    price: 1199,
    group: "Botas",
    category: "Rodeo",
    description: "Bota rodeo en piel color mango con bordado floral en hilo tono hueso.",
    variants: [
      { color: "Mango", images: ["/Rodeo-mango-1.jpeg", "/Rodeo-mango-2.jpeg", "/Rodeo-mango-3.jpeg"] },
    ],
  },
  {
    id: 4,
    name: "Bota Grabada",
    price: 999,
    originalPrice: 1299,
    group: "Botas",
    category: "Exótica",
    description: "Piel de res con grabado tipo exótico. Ve el catálogo y dinos qué patrón quieres.",
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoImages: ["/cocologo.jpeg", "/coco-papada.jpg"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 6,
    name: "Pescado Chocolate",
    price: 3499,
    group: "Botas",
    category: "Originales",
    description: "Piel exótica original de pescado (pirarucú) en tono chocolate, tubo bordado café.",
    variants: [{ color: "Chocolate", images: ["/pescado-choco.jpg"] }],
  },
  {
    id: 7,
    name: "Pescado Negro",
    price: 3499,
    group: "Botas",
    category: "Originales",
    description: "Piel exótica original de pescado (pirarucú) en negro, tubo bordado a tono.",
    variants: [{ color: "Negro", images: ["/pescado-negro.jpg"] }],
  },
  {
    id: 8,
    name: "Tejida Miel",
    price: 1199,
    group: "Botas",
    category: "Tejida",
    description: "Bota de piel tejida a mano en tono miel, con tubo liso color café.",
    variants: [{ color: "Miel", images: ["/tejida-miel.jpg"] }],
  },
  {
    id: 9,
    name: "Cartera Bifold Negra",
    price: 200,
    group: "Carteras",
    category: "Carteras",
    description: "Cartera de piel 100% genuina, hecha en México, con portatarjetas y compartimentos.",
    variants: [{ color: "Negro", images: ["/cartera-negra-1.jpg", "/cartera-negra-2.jpg"] }],
    colorSwatches: [
      { name: "Negro", hex: "#1a1512" },
      { name: "Café", hex: "#4a2f1f" },
      { name: "Miel", hex: "#c9963f" },
      { name: "Vino", hex: "#5c1f2b" },
      { name: "Azul marino", hex: "#1b2a4a" },
      { name: "Combinado", hex: "#4a2f1f", hex2: "#1a1512" },
    ],
  },
  {
    id: 10,
    name: "Bota Mantarraya Negra",
    price: 1199,
    group: "Botas",
    category: "Exótica",
    description: "Bota alta en piel negra con textura tipo mantarraya en el empeine, tubo bordado a tono.",
    variants: [{ color: "Negro", images: ["/bota-mantarraya-negra.jpg"] }],
  },
  {
    id: 11,
    name: "Bota Pitón Negra",
    price: 1199,
    group: "Botas",
    category: "Exótica",
    description: "Bota alta en piel negra con textura tipo pitón tono sobre tono, tubo bordado.",
    variants: [{ color: "Negro", images: ["/bota-piton-negra.jpg"] }],
  },
  {
    id: 12,
    name: "Botín Nubuck",
    price: 1299,
    group: "Botas",
    category: "Botín",
    description: "Botín corto en piel nubuck con bordado blanco, jaladeras y elástico lateral.",
    variants: [
      { color: "Negro", images: ["/botin-negro.jpg"] },
      { color: "Café", images: ["/botin-cafe.jpg"] },
    ],
  },
  {
    id: 13,
    name: "Bota Harness Café",
    price: 1599,
    group: "Botas",
    category: "Rodeo",
    description: "Bota alta estilo motociclista en piel café rústica, con argolla y hebillas.",
    variants: [{ color: "Café", images: ["/bota-harness-cafe.jpg"] }],
  },
  {
    id: 14,
    name: "Botín Negro Charol",
    price: 1399,
    group: "Botas",
    category: "Botín",
    description: "Botín corto en piel negra brillante, bordado a tono y jaladeras rojas.",
    variants: [{ color: "Negro", images: ["/botin-negro-charol.jpg"] }],
  },
  {
    id: 15,
    name: "Gorra Gallo",
    price: 189,
    group: "Gorras",
    category: "Gorras",
    description: "Gorra trucker con malla y ala en piel grabada, emblema metálico de gallo.",
    variants: [{ color: "Único", images: ["/gorra-gallo.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 16,
    name: "Sombrero de Piel Negro",
    price: 899,
    group: "Sombreros",
    category: "Sombreros",
    description: "Sombrero de piel genuina en negro, banda trenzada y cordón ajustable.",
    variants: [{ color: "Negro", images: ["/sombrero-piel-negro.jpg"] }],
  },
  {
    id: 17,
    name: "Bolso Colgante",
    price: 699,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolso pequeño tipo riñonera/colgante, disponible en piel escamada o tallada.",
    variants: [{ color: "Único", images: ["/bolso-colgante.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 18,
    name: "Mariconera chica",
    price: 799,
    group: "Bolsos",
    category: "Bolsos",
    description: "Mariconera chica cruzada con panel en piel grabada tipo avestruz.",
    variants: [{ color: "Único", images: ["/bolso-avestruz.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 19,
    name: "Bolsa Yareli",
    price: 1199,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolsa tipo caja con doble asa y cadena, en piel grabada exótica.",
    variants: [{ color: "Único", images: ["/bolsa-de-mano.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 20,
    name: "Bolsa Pitón",
    price: 999,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolso cruzado tipo cámara en piel grabada tipo pitón, correa ajustable.",
    variants: [{ color: "Único", images: ["/bolso-piton.jpg"] }],
  },
  {
    id: 21,
    name: "Cartera Dama",
    price: 1299,
    group: "Carteras",
    category: "Carteras",
    description: "Clutch grande para dama en piel grabada tipo cocodrilo, cierre y cadena dorados.",
    variants: [{ color: "Cognac", images: ["/clutch-cocodrilo.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 22,
    name: "Cartera San Judas Tadeo",
    price: 130,
    originalPrice: 189,
    group: "Carteras",
    category: "Carteras",
    description: "Cartera de piel con diseño tallado de San Judas Tadeo.",
    variants: [{ color: "Café", images: ["/cartera-san-judas.jpg"] }],
  },
  {
    id: 23,
    name: "Cinto Conchos",
    price: 249,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel color mostaza con conchos metálicos y hebilla grabada.",
    variants: [{ color: "Mostaza", images: ["/cinto-mostaza.jpg"] }],
  },
  {
    id: 24,
    name: "Cinto Clásico Negro",
    price: 159,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel lisa negra, hebilla rectangular sencilla.",
    variants: [{ color: "Negro", images: ["/cinto-clasico-negro.jpg"] }],
  },
  {
    id: 25,
    name: "Cinto Piteado Negro",
    price: 399,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto ancho tallado estilo piteado, en negro con detalles plateados.",
    variants: [{ color: "Negro", images: ["/cinto-piteado-negro.jpg"] }],
  },
  {
    id: 26,
    name: "Cinto Tejido",
    price: 599,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel trenzada en negro, hebilla con pedrería.",
    variants: [{ color: "Negro", images: ["/cinto-trenzado.jpg"] }],
  },
  {
    id: 27,
    name: "Sacabotas",
    price: 299,
    group: "Otros",
    category: "Otros",
    description: "Jalador de botas en piel grabada tipo pitón, con tachuelas doradas.",
    variants: [{ color: "Café", images: ["/sacabotas-piton.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 28,
    name: "Set de Tequileros",
    price: 449,
    group: "Otros",
    category: "Otros",
    description: "Set de 10 caballitos tequileros forrados en piel tallada, diseños surtidos.",
    variants: [{ color: "Surtido", images: ["/tequileros.jpg"] }],
  },
];

const GRUPOS = ["Todo", "Ofertas", "Botas", "Carteras", "Bolsos", "Cintos", "Sombreros", "Gorras", "Otros"];
const SUBCATEGORIAS_BOTA = ["Todas", "Rodeo", "Exótica", "Originales", "Tejida", "Botín"];

type SortOrder = "default" | "price-asc" | "price-desc";

const Shop = () => {
  const [activeGroup, setActiveGroup] = useState("Todo");
  const [activeSub, setActiveSub] = useState("Todas");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const handleGroupClick = (grupo: string) => {
    setActiveGroup(grupo);
    setActiveSub("Todas");
  };

  const filtered = useMemo(() => {
    let base = products;
    if (activeGroup === "Ofertas") {
      base = products.filter((p) => p.originalPrice);
    } else if (activeGroup !== "Todo") {
      base = products.filter((p) => p.group === activeGroup);
      if (activeGroup === "Botas" && activeSub !== "Todas") {
        base = base.filter((p) => p.category === activeSub);
      }
    }

    if (sortOrder === "default") return base;
    const sorted = [...base];
    sorted.sort((a, b) => (sortOrder === "price-asc" ? a.price - b.price : b.price - a.price));
    return sorted;
  }, [activeGroup, activeSub, sortOrder]);

  const showEmptyState = filtered.length === 0 && activeGroup !== "Ofertas";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[hsl(0,0%,5%)] py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Tienda</h1>
            <p className="text-base text-white/60 max-w-2xl mx-auto">
              Botas y artículos de piel genuina ADIVAN, hechos a mano uno por uno.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-3">
            {GRUPOS.map((grupo) => (
              <button
                key={grupo}
                onClick={() => handleGroupClick(grupo)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-semibold border transition-colors ${
                  activeGroup === grupo
                    ? grupo === "Ofertas"
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "bg-primary text-primary-foreground border-primary"
                    : grupo === "Ofertas"
                    ? "bg-transparent text-destructive border-destructive/50 hover:border-destructive"
                    : "bg-transparent text-foreground border-border hover:border-primary"
                }`}
              >
                {grupo}
              </button>
            ))}

            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
              <SelectTrigger className="w-[190px] rounded-full text-xs uppercase tracking-[0.1em] font-semibold ml-auto sm:ml-4">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Ordenar por</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subcategorías de Botas */}
          {activeGroup === "Botas" && (
            <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-2 mt-4">
              {SUBCATEGORIAS_BOTA.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.12em] font-medium border transition-colors ${
                    activeSub === sub
                      ? "bg-[hsl(35,45%,65%)] text-[hsl(0,0%,5%)] border-[hsl(35,45%,65%)]"
                      : "bg-transparent text-muted-foreground border-border hover:border-[hsl(35,45%,65%)]"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {showEmptyState ? (
              <div className="text-center py-16">
                <p className="text-lg text-foreground font-medium mb-2">Próximamente en {activeGroup}</p>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Todavía no tenemos fotos listas de esta categoría. Escríbenos y te avisamos en cuanto esté disponible.
                </p>
                <a
                  href="https://wa.me/524775547669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-6 py-3 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Avísenme por WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

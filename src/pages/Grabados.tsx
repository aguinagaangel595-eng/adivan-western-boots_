import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ColorSlider from "@/components/ColorSlider";
import { sampleLeatherColor } from "@/lib/leatherColors";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "524775547669";

interface Pattern {
  id: string;
  name: string;
  image: string;
  description: string;
}

const patterns: Pattern[] = [
  {
    id: "cocodrilo",
    name: "Cocodrilo",
    image: "/cocologo.jpeg",
    description: "Grabado tipo cocodrilo sobre piel de res, tubo bordado.",
  },
  {
    id: "papada-cocodrilo",
    name: "Papada de Cocodrilo",
    image: "/coco-papada.jpg",
    description: "Grabado tipo papada de cocodrilo, acabado envejecido.",
  },
];

const PatternCard = ({ pattern, index }: { pattern: Pattern; index: number }) => {
  const [t, setT] = useState(0.5); // arranca en el tono de en medio de la paleta
  const selected = sampleLeatherColor(t);

  const handleCotizar = () => {
    const mensaje = [
      `Hola, me interesa cotizar el grabado *${pattern.name}*.`,
      `Color de referencia: ${selected.nearestName} (${selected.hex}).`,
      "¿Me pueden mostrar muestras reales de este tono?",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <motion.div
      className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img src={pattern.image} alt={`Piel grabada ${pattern.name}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 space-y-5">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">{pattern.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Elige tu tono</p>
            <span className="text-sm font-semibold text-foreground">{selected.nearestName}</span>
          </div>
          <ColorSlider value={t} onChange={(newT) => setT(newT)} />
        </div>

        <button
          onClick={handleCotizar}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold py-3 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Cotizar este grabado
        </button>
      </div>
    </motion.div>
  );
};

const Grabados = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="bg-[hsl(0,0%,5%)] py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Catálogo de Grabados</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Elige el patrón y desliza para encontrar tu tono ideal. El color es de referencia — te mostramos
            muestras reales de piel por WhatsApp antes de confirmar tu pedido.
          </p>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8">
            {patterns.map((p, i) => (
              <PatternCard key={p.id} pattern={p} index={i} />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
            ¿Buscas otro grabado (avestruz, pitón, elefante...)? Escríbenos directamente por WhatsApp y te
            contamos qué pieles tenemos disponibles.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Grabados;

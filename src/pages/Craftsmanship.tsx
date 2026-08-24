import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import craftsmanshipHands from "@/assets/craftsmanship-hands.jpg";

const gallery = [
  { src: "/coco-papada.jpg", alt: "Detalle de piel grabada tipo cocodrilo" },
  { src: "/Rodeo-mango-2.jpeg", alt: "Detalle de bordado en bota Rodeo Mango" },
  { src: "/tejida-miel.jpg", alt: "Detalle de piel tejida a mano" },
];

const steps = [
  { num: "01", title: "Selección de piel", desc: "Elegimos pieles con el grosor, textura y carácter adecuados para cada tipo de producto, priorizando resistencia y belleza natural." },
  { num: "02", title: "Corte y perfilado", desc: "Trazamos las piezas con precisión, cuidando que cada corte aproveche las mejores vetas y mantenga la estructura del cuero." },
  { num: "03", title: "Personalización de diseño", desc: "Aplicamos grabados, pigmentos y texturizado, priorizando el gusto del cliente y la calidad con un valor artesanal." },
  { num: "04", title: "Costura & armado", desc: "Unimos, cosimos y reforzamos cada punto para garantizar durabilidad, comodidad y un acabado limpio y seguro." },
  { num: "05", title: "Acabados finales", desc: "El pulido de cantos, los detalles metálicos y el tratamiento final de la piel sellan el carácter de cada pieza ADIVAN." },
];

const Craftsmanship = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Oficio
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Nuestro proceso artesanal
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Image + description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl mb-8">
                  <img src={craftsmanshipHands} alt="Artesano cortando piel a mano" className="w-full h-full object-cover" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Detrás de cada pieza ADIVAN hay manos expertas, herramientas de taller y un respeto profundo
                  por el material. Aquí la piel no es solo materia prima: es protagonista.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Buscamos transmitir la fuerza del Oeste con la limpieza de un diseño moderno, creando productos
                  que se sienten tan bien como se ven.
                </p>
              </motion.div>

              {/* Steps */}
              <div className="space-y-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="border-l-2 border-[hsl(35,45%,65%)] pl-8 pb-10 relative"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[hsl(35,45%,65%)]" />
                    <span className="text-xs uppercase tracking-[0.2em] text-[hsl(35,45%,65%)] font-bold">
                      Paso {step.num}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Galería de detalle */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">El detalle importa</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Bordados, suelas grabadas y texturas que solo se logran a mano.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {gallery.map((img, i) => (
                <motion.div
                  key={img.src}
                  className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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

export default Craftsmanship;

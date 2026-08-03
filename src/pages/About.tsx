import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Hammer, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import craftsmanshipImage from "@/assets/craftsmanship-hands.jpg";

const values = [
  {
    icon: Hammer,
    title: "Hecho a mano",
    desc: "Cada par pasa por manos artesanas, sin líneas de producción en masa.",
  },
  {
    icon: Leaf,
    title: "Piel genuina",
    desc: "Trabajamos piel de res y exóticas (cocodrilo, pescado) seleccionadas por su calidad.",
  },
  {
    icon: Award,
    title: "Hecho para durar",
    desc: "Suela de doble vida y costura reforzada, pensadas para años de uso real.",
  },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">Nuestra Historia</h1>
            <p className="text-lg text-white/60">ADIVAN: donde la tradición se encuentra con lo moderno</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                  <img src="/nosotros.jpeg" alt="Botas ADIVAN en exhibición" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  ADIVAN nace de la pasión por la piel y la fuerza del estilo Western. Somos una marca mexicana
                  dedicada a transformar piel genuina en botas que acompañan tu día a día, desde la ciudad hasta
                  el rodeo.
                </p>
                <p className="text-lg text-foreground leading-relaxed mb-8">
                  Cada par es trabajado con detalle, respetando los procesos artesanales y combinándolos con un
                  diseño contemporáneo. No creemos en productos desechables: creemos en piezas que se vuelven
                  parte de tu historia.
                </p>

                <ul className="space-y-3">
                  {[
                    "Piel seleccionada de alta calidad",
                    "Hecho a mano en talleres especializados",
                    "Diseño Western con sensibilidad moderna",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(35,45%,65%)] flex items-center justify-center">
                        <Check className="h-4 w-4 text-[hsl(0,0%,5%)]" />
                      </span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Lo que nos define</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                >
                  <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-[hsl(35,30%,92%)] flex items-center justify-center">
                    <v.icon className="h-7 w-7 text-[hsl(35,45%,45%)]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Taller */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(0,0%,5%)]">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Detrás de cada puntada</h2>
              <p className="text-white/70 leading-relaxed">
                Nuestros talleres cortan, cosen y terminan cada bota a mano. El resultado no es perfecto en el
                sentido industrial — es mejor: auténtico, con carácter, y hecho para envejecer bien contigo.
              </p>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <img src={craftsmanshipImage} alt="Artesano trabajando la piel" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

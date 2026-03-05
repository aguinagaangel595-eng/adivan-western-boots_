import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Nuestra Historia
            </h1>
            <p className="text-lg text-white/60">
              ADIVAN: donde la tradición se encuentra con lo moderno
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                  <img src="/nosotros" alt="Artesanía ADIVAN" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  ADIVAN nace de la pasión por la piel y la fuerza del estilo Western. Somos una marca mexicana 
                  dedicada a transformar piel genuina en piezas que acompañan tu día a día, desde la ciudad hasta el campo.
                </p>
                <p className="text-lg text-foreground leading-relaxed mb-8">
                  Cada cinturón, cartera, bolsa y accesorio es trabajado con detalle, respetando los procesos 
                  artesanales y combinándolos con un diseño contemporáneo. No creemos en productos desechables: 
                  creemos en piezas que se vuelven parte de tu historia.
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

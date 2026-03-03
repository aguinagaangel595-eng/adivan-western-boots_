import Header from "@/components/Header";
import Footer from "@/components/Footer";
import craftsmanshipImage from "@/assets/craftsmanship-process.png";

const steps = [
  { num: "01", title: "Selección de piel", desc: "Elegimos pieles con el grosor, textura y carácter adecuados para cada tipo de producto, priorizando resistencia y belleza natural." },
  { num: "02", title: "Corte y perfilado", desc: "Trazamos las piezas con precisión, cuidando que cada corte aproveche las mejores vetas y mantenga la estructura del cuero." },
  { num: "03", title: "Costura & armado", desc: "Unimos, cosimos y reforzamos cada punto para garantizar durabilidad, comodidad y un acabado limpio y seguro." },
  { num: "04", title: "Acabados finales", desc: "El pulido de cantos, los detalles metálicos y el tratamiento final de la piel sellan el carácter de cada pieza ADIVAN." },
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
              <div>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl mb-8">
                  <img src={craftsmanshipImage} alt="Proceso artesanal" className="w-full h-full object-cover" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Detrás de cada pieza ADIVAN hay manos expertas, herramientas de taller y un respeto profundo 
                  por el material. Aquí la piel no es solo materia prima: es protagonista.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Buscamos transmitir la fuerza del Oeste con la limpieza de un diseño moderno, creando productos 
                  que se sienten tan bien como se ven.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-0">
                {steps.map((step) => (
                  <div key={step.num} className="border-l-2 border-[hsl(35,45%,65%)] pl-8 pb-10 relative">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[hsl(35,45%,65%)]" />
                    <span className="text-xs uppercase tracking-[0.2em] text-[hsl(35,45%,65%)] font-bold">
                      Paso {step.num}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Craftsmanship;

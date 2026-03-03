import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-new.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(20,15%,12%) 0%, hsl(0,0%,4%) 70%)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-block border border-[hsl(35,45%,65%)] text-[hsl(35,45%,65%)] text-xs uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8">
              Autenticidad en cada puntada
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              La piel cobra vida con{" "}
              <span className="text-[hsl(35,45%,65%)]">ADIVAN.</span>
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
              Cinturones, carteras, bolsas y accesorios de piel genuina inspirados en el estilo Western moderno. 
              Piezas pensadas para quienes viven con carácter y aprecian la artesanía real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full bg-[hsl(35,45%,65%)] hover:bg-[hsl(35,45%,55%)] text-[hsl(0,0%,5%)] font-semibold px-8 py-6 text-base">
                <Link to="/shop">
                  Ver tienda <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base bg-transparent">
                <Link to="/craftsmanship">Ver proceso artesanal</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img src={heroImage} alt="Productos ADIVAN" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(35,45%,65%)] mb-1">Hecho a mano</p>
              <p className="text-white text-sm">Piel genuina · Estilo Western</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-[hsl(35,45%,65%)] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-[hsl(0,0%,5%)] text-xs font-bold uppercase tracking-[0.3em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Hecho a mano · Piel genuina · Estilo Western ·</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

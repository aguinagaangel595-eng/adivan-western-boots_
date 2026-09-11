import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const heroBoots = "/fondo.jpg";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-[hsl(30,9%,5%)]"
    >
      {/* Fotografía editorial a pantalla completa */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={heroBoots}
          alt="Atardecer en el desierto — ADIVAN"
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30,9%,5%)] via-[hsl(30,9%,5%)]/70 to-[hsl(30,9%,5%)]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,9%,5%)] via-[hsl(30,9%,5%)]/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-44 pb-24">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block border border-[hsl(30,43%,58%)] text-[hsl(30,43%,58%)] text-xs uppercase tracking-[0.25em] px-5 py-2 rounded-full mb-8">
            Legado en cada paso
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 leading-[0.98]">
            La piel cobra vida con <span className="text-[hsl(30,43%,58%)]">ADIVAN.</span>
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-md leading-relaxed">
            Botas, cinturones, carteras y bolsas de piel genuina, hechas a mano con esencia Western moderna.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <motion.div
              animate={{ scale: [1, 1.045, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-fit"
            >
              <Button
                size="lg"
                asChild
                className="rounded-full bg-[hsl(30,43%,58%)] hover:bg-[hsl(30,43%,48%)] text-[hsl(30,9%,6%)] font-bold px-12 py-8 text-xl shadow-[0_0_45px_rgba(200,155,107,0.55)] hover:shadow-[0_0_60px_rgba(200,155,107,0.75)] transition-shadow"
              >
                <Link to="/shop">
                  Ver Tienda <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
            <Link
              to="/craftsmanship"
              className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
            >
              Ver proceso artesanal
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Cinta con mensaje de marca */}
      <div className="relative bg-[hsl(30,43%,58%)] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-[hsl(30,9%,6%)] text-xs font-bold uppercase tracking-[0.3em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Hecho a mano · Piel genuina · Estilo Western ·</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

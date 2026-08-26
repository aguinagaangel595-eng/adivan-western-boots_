import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import craftsmanshipImage from "@/assets/se-grande.jpeg";
import { products } from "@/data/products";

// Rodeo Café Enmielado, Gorra, Cartera Bifold Negra
const featuredProducts = [2, 15, 9].map((id) => products.find((p) => p.id === id)!);

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/ADIVAN+WESTERN+BOOTS/@21.1238068,-101.6751618,17z/data=!3m1!4b1!4m6!3m5!1s0x842bbf00053b6b3f:0xd3a269cc6c24a141!8m2!3d21.1238068!4d-101.6751618!16s%2Fg%2F11nqlktkvz";

const reviews = [
  {
    name: "Manuel Ignacio Mejía Castro",
    rating: 5,
    text: "Excelente atención al cliente, pieles exóticas de buena calidad y muy buenas promociones. Recomiendo las botas de piel de pitón 🔝",
  },
  {
    name: "Ivan González",
    rating: 5,
    text: "Las botas de súper buena calidad y el precio súper bien.",
  },
  {
    name: "Jrtorres",
    rating: 4,
    text: "Productos económicos y buen precio. Las botas si es de lo mejor que hay, súper cómodas y el precio no se diga 👌👌👌👌",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <main>
        {/* Featured Products */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Colección Destacada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Piezas seleccionadas que demuestran nuestro compromiso con la calidad y artesanía
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild className="rounded-full bg-primary hover:bg-primary/90 px-8">
                <Link to="/shop">
                  Ver Todos los Productos <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Hecho a Mano, Construido para Durar
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Cada producto ADIVAN está meticulosamente hecho a mano usando técnicas tradicionales
                  transmitidas de generación en generación. Creemos en la belleza de la imperfección y
                  la fortaleza de los materiales auténticos.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nuestros artículos de cuero desarrollan una rica pátina con el tiempo, haciendo cada pieza
                  únicamente tuya.
                </p>
                <Button size="lg" variant="outline" asChild className="rounded-full">
                  <Link to="/craftsmanship">
                    Descubre Nuestro Proceso <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <img src={craftsmanshipImage} alt="Artesanía del cuero" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reseñas de Google */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span className="flex items-center gap-1 text-[hsl(35,45%,45%)] font-bold text-lg">
                  4.8
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  en Google
                </a>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.name}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                >
                  <div className="flex gap-0.5 text-[hsl(35,45%,45%)] mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-4 w-4 ${s < review.rating ? "fill-current" : "fill-none"}`} />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">"{review.text}"</p>
                  <p className="text-sm font-semibold text-muted-foreground">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(0,0%,5%)] text-white">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Encontrar Tu Pieza Perfecta?
            </h2>
            <p className="text-lg mb-8 text-white/70">
              Explora nuestra colección de artículos de piel hechos a mano o contáctanos para pedidos personalizados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="rounded-full bg-[hsl(35,45%,65%)] hover:bg-[hsl(35,45%,55%)] text-[hsl(0,0%,5%)] px-8">
                <Link to="/shop">Comprar Ahora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent px-8">
                <Link to="/contact">Contáctanos</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

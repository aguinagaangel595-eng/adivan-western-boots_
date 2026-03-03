import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import beltWestern from "@/assets/product-belt-western.png";
import walletClassic from "@/assets/product-wallet-classic.png";
import bagCrossbody from "@/assets/product-bag-crossbody.png";
import craftsmanshipImage from "@/assets/craftsmanship-hands.jpg";

const featuredProducts = [
  { id: 1, name: "Cinturón Western", price: 1299, category: "Cinturones", image: beltWestern, description: "Cinturón de piel café con hebilla metálica y acabado rústico." },
  { id: 3, name: "Cartera Doble Clásica", price: 899, category: "Carteras", image: walletClassic, description: "Cartera de piel marrón con compartimentos." },
  { id: 5, name: "Bolsa Crossbody Negra", price: 2199, category: "Bolsas", image: bagCrossbody, description: "Bolsa bandolera de piel negra." },
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
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Colección Destacada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Piezas seleccionadas que demuestran nuestro compromiso con la calidad y artesanía
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
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
              <div className="order-2 lg:order-1">
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
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <img src={craftsmanshipImage} alt="Artesanía del cuero" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(0,0%,5%)] text-white">
          <div className="mx-auto max-w-4xl text-center">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

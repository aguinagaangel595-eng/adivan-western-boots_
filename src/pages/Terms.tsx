import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-lg text-white/60">
              Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-foreground leading-relaxed space-y-8">
            <p className="text-sm text-muted-foreground bg-muted border border-border rounded-xl p-4">
              Esta es una plantilla general de términos y condiciones de compra. No sustituye la asesoría
              de un abogado; revísala y ajústala antes de publicarla, especialmente en lo relativo a
              políticas de devolución, garantías y datos fiscales de ADIVAN.
            </p>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">1. Aceptación de los términos</h2>
              <p>
                Al navegar y realizar una compra en este sitio, aceptas estos Términos y Condiciones en su
                totalidad. Si no estás de acuerdo con alguna parte, te pedimos no utilizar el sitio ni
                realizar compras.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">2. Productos</h2>
              <p>
                ADIVAN ofrece artículos de piel genuina hechos de forma artesanal (botas, cinturones,
                carteras y bolsas). Debido al proceso artesanal y a la naturaleza del cuero, cada pieza
                puede presentar ligeras variaciones de color, textura o veta respecto a las fotografías del
                sitio; esto forma parte de la autenticidad del material y no se considera un defecto.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">3. Precios y pago</h2>
              <p>
                Los precios se muestran en pesos mexicanos (MXN) e incluyen los impuestos aplicables salvo
                que se indique lo contrario. Nos reservamos el derecho de modificar precios sin previo
                aviso, sin afectar pedidos ya confirmados. El pago se procesa a través de los métodos
                habilitados en el sitio o acordados directamente por WhatsApp/correo para pedidos
                personalizados.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">4. Envíos</h2>
              <p>
                Realizamos envíos a todo México. Los tiempos de entrega son estimados y pueden variar según
                la paquetería y la ubicación del destino. ADIVAN no se hace responsable por retrasos
                imputables a la paquetería, aunque dará seguimiento a cualquier incidencia reportada.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">5. Cambios y devoluciones</h2>
              <p>
                Aceptamos cambios o devoluciones dentro de un plazo de <strong>[definir número]</strong> días
                naturales a partir de la recepción del producto, siempre que se encuentre sin uso, con sus
                etiquetas y empaque original. Los costos de envío de la devolución corren por cuenta del
                cliente, salvo que se trate de un defecto de fabricación. Para iniciar un cambio o
                devolución, contáctanos a{" "}
                <a href="mailto:Adivanwesternbooots@gmail.com" className="text-[hsl(35,45%,45%)] underline">
                  Adivanwesternbooots@gmail.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">6. Garantía</h2>
              <p>
                Nuestros productos están garantizados contra defectos de fabricación por un periodo de{" "}
                <strong>[definir plazo]</strong> a partir de la fecha de compra. La garantía no cubre el
                desgaste normal del cuero, daños por mal uso, exposición a la humedad excesiva o
                modificaciones realizadas por terceros.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">7. Pedidos personalizados</h2>
              <p>
                Los pedidos con medidas, colores o diseños especiales se confirman previo acuerdo por
                correo o WhatsApp y pueden requerir un anticipo. Al tratarse de piezas hechas a la medida,
                no aplican cambios o devoluciones salvo defecto de fabricación.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">8. Propiedad intelectual</h2>
              <p>
                El contenido de este sitio (textos, imágenes, logotipo y diseño) es propiedad de ADIVAN y
                no puede reproducirse ni utilizarse con fines comerciales sin autorización previa por
                escrito.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">9. Limitación de responsabilidad</h2>
              <p>
                ADIVAN no será responsable por daños indirectos derivados del uso del sitio o de los
                productos, más allá de lo previsto por la legislación aplicable en México en materia de
                protección al consumidor.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">10. Legislación aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos, incluyendo la Ley
                Federal de Protección al Consumidor. Cualquier controversia se someterá a los tribunales
                competentes de México, salvo que la ley disponga otra vía (como la PROFECO).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">11. Contacto</h2>
              <p>
                Dudas sobre estos términos:{" "}
                <a href="mailto:Adivanwesternbooots@gmail.com" className="text-[hsl(35,45%,45%)] underline">
                  Adivanwesternbooots@gmail.com
                </a>{" "}
                · +52 (477) 554 7669.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

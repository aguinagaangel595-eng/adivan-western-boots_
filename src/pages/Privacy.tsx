import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Aviso de Privacidad
            </h1>
            <p className="text-lg text-white/60">
              Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl prose-legal text-foreground leading-relaxed space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">1. Responsable de tus datos</h2>
              <p>
                ADIVAN ("nosotros"), con domicilio en México y correo de contacto{" "}
                <a href="mailto:Adivanwesternbooots@gmail.com" className="text-[hsl(35,45%,45%)] underline">
                  Adivanwesternbooots@gmail.com
                </a>
                , es responsable del tratamiento de tus datos personales conforme a este aviso de privacidad.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">2. Datos que recopilamos</h2>
              <p>Podemos recopilar los siguientes datos cuando compras, te registras o nos contactas:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Datos de identificación: nombre completo, teléfono, correo electrónico.</li>
                <li>Datos de envío: domicilio, ciudad, código postal.</li>
                <li>Datos del pedido: los artículos, tallas y cantidades que agregas al carrito, para armar el resumen que se envía por WhatsApp.</li>
                <li>Datos de navegación: dirección IP, tipo de dispositivo y cookies (ver sección 6).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">3. Finalidades del tratamiento</h2>
              <p>Tus datos se utilizan para:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Procesar y dar seguimiento a tus pedidos y envíos.</li>
                <li>Responder dudas, aclaraciones o solicitudes de pedidos personalizados.</li>
                <li>Enviar confirmaciones de compra y, si lo autorizas, promociones o novedades.</li>
                <li>Mejorar la experiencia de navegación y el funcionamiento del sitio.</li>
                <li>Cumplir obligaciones legales y fiscales.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">4. Transferencia de datos</h2>
              <p>
                No vendemos ni rentamos tus datos personales. Este sitio no procesa pagos en línea: al enviar
                tu pedido por WhatsApp, la conversación y el acuerdo de pago (transferencia, efectivo, etc.)
                se manejan directamente por ese medio, sujeto a los términos de privacidad de WhatsApp/Meta.
                Podemos compartir información estrictamente necesaria con paqueterías para realizar el envío,
                quienes están obligadas a proteger tu información conforme a la ley aplicable.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">5. Derechos ARCO</h2>
              <p>
                Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (derechos ARCO) al tratamiento de
                tus datos personales, así como a revocar tu consentimiento en cualquier momento. Para
                ejercer estos derechos, escríbenos a{" "}
                <a href="mailto:Adivanwesternbooots@gmail.com" className="text-[hsl(35,45%,45%)] underline">
                  Adivanwesternbooots@gmail.com
                </a>{" "}
                indicando tu nombre y la solicitud específica. Responderemos en un plazo razonable conforme
                a la ley.
              </p>
            </div>

            <div id="cookies">
              <h2 className="font-serif text-2xl font-bold mb-3">6. Uso de cookies</h2>
              <p>
                Este sitio utiliza cookies y tecnologías similares para recordar tus preferencias, mantener
                tu carrito de compras activo y entender cómo se usa el sitio con fines estadísticos.
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  <strong>Cookies esenciales:</strong> necesarias para el funcionamiento del carrito y la
                  navegación. No se pueden desactivar.
                </li>
                <li>
                  <strong>Cookies de preferencias:</strong> recuerdan configuraciones como tallas o colores
                  vistos recientemente.
                </li>
                <li>
                  <strong>Cookies analíticas (opcionales):</strong> nos ayudan a entender qué páginas se
                  visitan más, siempre de forma agregada y anónima.
                </li>
              </ul>
              <p className="mt-2">
                Puedes aceptar o rechazar las cookies no esenciales desde el banner que aparece al ingresar
                al sitio, o borrarlas en cualquier momento desde la configuración de tu navegador.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">7. Seguridad</h2>
              <p>
                Implementamos medidas administrativas y técnicas razonables para proteger tus datos
                personales contra daño, pérdida, alteración o acceso no autorizado.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">8. Cambios a este aviso</h2>
              <p>
                Podemos actualizar este aviso de privacidad para reflejar cambios en nuestras prácticas o en
                la legislación aplicable. La fecha de la última actualización se muestra al inicio de esta
                página.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-3">9. Contacto</h2>
              <p>
                Si tienes dudas sobre este aviso de privacidad, escríbenos a{" "}
                <a href="mailto:Adivanwesternbooots@gmail.com" className="text-[hsl(35,45%,45%)] underline">
                  Adivanwesternbooots@gmail.com
                </a>{" "}
                o al teléfono +52 479 320 3429.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import contactImage from "@/assets/contact-image.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", type: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "¡Mensaje enviado!", description: "Te responderemos lo antes posible." });
    setFormData({ name: "", email: "", phone: "", type: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[hsl(0,0%,5%)] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Contacto
            </h1>
            <p className="text-lg text-white/60">
              Pedidos personalizados & mayoreo
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Info */}
              <div>
                <div className="aspect-video overflow-hidden rounded-2xl shadow-xl mb-8">
                  <img src={contactImage} alt="ADIVAN contacto" className="w-full h-full object-cover" />
                </div>
                <p className="text-foreground leading-relaxed mb-8">
                  ¿Buscas un cinturón con medidas especiales, una serie de carteras para regalo corporativo 
                  o una línea exclusiva para tu tienda? Hablemos de lo que quieres crear con piel.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[hsl(35,45%,65%)]" />
                    <span className="text-foreground">ventas@adivan.mx</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[hsl(35,45%,65%)]" />
                    <span className="text-foreground">+52 (477) 787 1652</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[hsl(35,45%,65%)]" />
                    <span className="text-foreground">México · Envíos nacionales</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  También puedes escribirnos directamente por WhatsApp con un solo clic en el botón flotante.
                </p>
              </div>

              {/* Right: Form */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold mb-6">Cuéntanos tu idea</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="correo@ejemplo.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Tipo de consulta</Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Elige una opción</option>
                        <option value="personal">Pedido personal</option>
                        <option value="mayoreo">Mayoreo</option>
                        <option value="corporativo">Corporativo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono (opcional)</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(###) ### ####" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Comparte detalles de lo que estás buscando..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90 py-6">
                    Enviar mensaje
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    *Este formulario es de demostración. Aquí puedes conectar tu backend de correo o CRM.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

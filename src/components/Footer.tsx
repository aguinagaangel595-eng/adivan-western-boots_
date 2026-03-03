import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(0,0%,5%)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="font-serif text-2xl font-bold tracking-tight">ADIVAN</span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs">
              Artículos de piel genuina hechos a mano con tradición Western y diseño moderno.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[hsl(35,45%,65%)] mb-4 font-semibold">Enlaces</h3>
            <ul className="space-y-2">
              {[
                { name: "Inicio", href: "/" },
                { name: "Tienda", href: "/shop" },
                { name: "Contacto", href: "/contact" },
                { name: "Aviso de privacidad", href: "/privacy" },
                { name: "Términos de compra", href: "/terms" },
              ].map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="text-sm text-white/60 hover:text-[hsl(35,45%,65%)] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[hsl(35,45%,65%)] mb-4 font-semibold">Redes</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[hsl(35,45%,65%)] transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[hsl(35,45%,65%)] transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/524777871652" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[hsl(35,45%,65%)] transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[hsl(35,45%,65%)] transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 003.76.92V6.34a4.85 4.85 0 01-.01.35z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">&copy; {currentYear} ADIVAN. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

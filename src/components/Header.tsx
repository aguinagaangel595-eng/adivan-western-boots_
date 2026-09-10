import { Link } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/shop" },
    { name: "Nosotros", href: "/about" },
    { name: "Artesanía", href: "/craftsmanship" },
    { name: "Contacto", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[hsl(30,9%,6%)] border-b border-[hsl(30,8%,16%)]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/adivan-logo-legado.png"
              alt="ADIVAN — Legado en cada paso"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 hover:text-[hsl(30,43%,58%)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-[hsl(30,43%,58%)] hover:bg-white/10"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[hsl(30,43%,58%)] text-[hsl(30,9%,6%)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/10"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[hsl(30,43%,58%)] text-[hsl(30,9%,6%)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-2 text-sm uppercase tracking-[0.15em] font-medium text-white/80 hover:text-[hsl(30,43%,58%)] hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

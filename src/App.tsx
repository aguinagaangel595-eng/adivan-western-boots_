import { useState, useEffect } from "react";

export default function Cookies() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("privacidadAceptada");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const aceptar = () => {
    localStorage.setItem("privacidadAceptada", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center">
      <p>
        Este sitio utiliza datos para mejorar tu experiencia. Al continuar aceptas
        nuestro <a href="/privacidad" className="underline">Aviso de Privacidad</a>.
      </p>

      <button
        onClick={aceptar}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Aceptar
      </button>
    </div>
  );
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/CartModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Craftsmanship from "./pages/Craftsmanship";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartModal />
          <WhatsAppButton />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

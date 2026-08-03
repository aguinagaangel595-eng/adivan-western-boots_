import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("adivan_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const setConsent = (value) => {
    localStorage.setItem("adivan_cookie_consent", value);
    localStorage.setItem("adivan_cookie_consent_date", new Date().toISOString());
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-6"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-4xl bg-[hsl(35,30%,96%)] text-[hsl(30,15%,15%)] border-2 border-[hsl(35,45%,65%)] rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[hsl(35,45%,65%)] flex items-center justify-center">
              <Cookie className="h-6 w-6 text-[hsl(0,0%,5%)]" />
            </div>
            <p className="text-sm leading-relaxed flex-1">
              Usamos cookies propias y de terceros para que el carrito funcione, recordar tus preferencias y
              entender cómo se usa el sitio. Puedes aceptar todas o solo las esenciales.{" "}
              <Link to="/privacy#cookies" className="underline font-semibold text-[hsl(35,45%,40%)] hover:text-[hsl(35,45%,30%)]">
                Leer más
              </Link>
              .
            </p>
            <div className="flex gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setConsent("essential-only")}
                className="flex-1 sm:flex-none border-2 border-[hsl(0,0%,5%)] text-[hsl(0,0%,5%)] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[hsl(0,0%,5%)] hover:text-white transition-colors"
              >
                Solo esenciales
              </button>
              <button
                onClick={() => setConsent("all")}
                className="flex-1 sm:flex-none bg-[hsl(0,0%,5%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[hsl(0,0%,15%)] transition-colors"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

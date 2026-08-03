import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("adivan_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const setConsent = (value) => {
    localStorage.setItem("adivan_cookie_consent", value);
    localStorage.setItem("adivan_cookie_consent_date", new Date().toISOString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl bg-[hsl(0,0%,7%)] text-white border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 flex-1 leading-relaxed">
          Usamos cookies propias y de terceros para que el carrito funcione, recordar tus preferencias y
          entender cómo se usa el sitio. Puedes aceptar todas o solo las esenciales.{" "}
          <Link to="/privacy#cookies" className="underline text-[hsl(35,45%,65%)] hover:text-[hsl(35,45%,75%)]">
            Leer más
          </Link>
          .
        </p>
        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setConsent("essential-only")}
            className="flex-1 sm:flex-none border border-white/25 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={() => setConsent("all")}
            className="flex-1 sm:flex-none bg-[hsl(35,45%,65%)] text-[hsl(0,0%,5%)] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[hsl(35,45%,55%)] transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

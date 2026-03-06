import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 flex justify-between items-center z-50">
      <p className="text-sm">
        Usamos cookies para mejorar tu experiencia. Al continuar aceptas nuestro{" "}
        <a href="/privacidad" className="underline">
          aviso de privacidad
        </a>.
      </p>

      <button
        onClick={acceptCookies}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Aceptar
      </button>
    </div>
  );
}

import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      <div className="bg-white max-w-lg p-8 rounded-xl shadow-2xl text-center">

        <h2 className="text-2xl font-bold mb-4">
          Aviso de Privacidad
        </h2>

        <p className="text-gray-600 mb-6">
          En ADIVAN utilizamos cookies para mejorar tu experiencia y procesar
          tus compras. Al continuar navegando aceptas nuestro aviso de privacidad.
        </p>

        <button
          onClick={acceptCookies}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Aceptar y continuar
        </button>

      </div>
    </div>
  );
};

export default CookieConsent;

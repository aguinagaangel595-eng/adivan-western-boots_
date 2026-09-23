import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getSupabaseBrowser } from "@/lib/supabaseClient";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<"cargando" | "autenticado" | "anonimo" | "error">("cargando");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabaseBrowser();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "autenticado" : "anonimo");
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "autenticado" : "anonimo");
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(30,9%,6%)] text-white/70 px-6 text-center">
        {error}
      </div>
    );
  }

  if (status === "cargando") {
    return <div className="min-h-screen flex items-center justify-center bg-[hsl(30,9%,6%)] text-white/60">Cargando…</div>;
  }
  if (status === "anonimo") {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;

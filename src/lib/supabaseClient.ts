import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// OJO: este módulo se importa desde rutas /admin/*, pero como Vite empaqueta
// todo en el mismo bundle, si createClient() se llamara aquí arriba (a nivel
// de módulo) con variables de entorno vacías, tronaría TODA la app, no solo
// el panel admin. Por eso el cliente se crea perezosamente, solo cuando
// getSupabaseBrowser() se invoca de verdad (dentro de los componentes de /admin).
let client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Configúralas para usar /admin/pedidos."
    );
  }

  client = createClient(url, anonKey);
  return client;
}

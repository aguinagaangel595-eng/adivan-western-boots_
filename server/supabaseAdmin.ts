// Cliente de Supabase con la service role key — solo se usa server-side
// (webhook, scripts). NUNCA se importa desde código de navegador (src/).
import { createClient } from "@supabase/supabase-js";

// No generamos tipos de Database desde Supabase (el esquema es chico y vive
// en supabase/migrations/0001_init.sql); tipamos <any> aquí para no pelear
// con la inferencia genérica de supabase-js, y confiamos en los tipos propios
// de server/types.ts en el resto del código.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ReturnType<typeof createClient<any>> | null = null;

export function getSupabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno."
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client = createClient<any>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

// Lee src/data/products.ts (la fuente de verdad del sitio) y sincroniza la
// tabla `productos` de Supabase, que es lo que consulta el agente de WhatsApp.
//
// Uso:  npm run sync:catalogo
//
// Corre esto cada vez que cambies precios/productos en products.ts. Si prefieres
// que sea automático, agrégalo como paso de build en Vercel (ver WHATSAPP_AGENT.md).

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { products } from "../src/data/products";

// Debe reflejar exactamente TALLAS_POR_CATEGORIA de src/components/ProductCard.tsx.
// Si agregas una categoría nueva con tallas allá, agrégala aquí también.
const TALLAS_POR_CATEGORIA: Record<string, (number | string)[]> = {
  Rodeo: [22, 23, 24, 25, 26, 27, 28, 29],
  Exótica: [22, 23, 24, 25, 26, 27, 28, 29],
  Tejida: [22, 23, 24, 25, 26, 27, 28, 29],
  Botín: [22, 23, 24, 25, 26, 27, 28, 29],
  Cintos: [28, 30, 32, 34, 36, 38, 40, 42],
  Chamarras: ["S", "M", "L", "XL", "XXL"],
};

function colores(p: (typeof products)[number]): string[] {
  const deVariantes = (p.variants ?? []).map((v) => v.color);
  const deSwatches = (p.colorSwatches ?? []).map((c) => c.name);
  return Array.from(new Set([...deVariantes, ...deSwatches])).filter(
    (c) => c.toLowerCase() !== "único" && c.toLowerCase() !== "surtido" && c.toLowerCase() !== "colores disponibles"
  );
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (revisa tu .env).");
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey);

  const filas = products.map((p) => ({
    id: p.id,
    nombre: p.name,
    precio: p.price,
    precio_original: p.originalPrice ?? null,
    grupo: p.group,
    categoria: p.category,
    genero: p.genero ?? null,
    descripcion: p.description,
    tallas: TALLAS_POR_CATEGORIA[p.category] ?? [],
    colores: colores(p),
    grabado_personalizable: Array.isArray(p.grabadoPatrones) && p.grabadoPatrones.length > 0,
    actualizado_en: new Date().toISOString(),
  }));

  console.log(`Sincronizando ${filas.length} productos con Supabase...`);

  const { error: errorUpsert } = await supabase.from("productos").upsert(filas, { onConflict: "id" });
  if (errorUpsert) {
    console.error("Error al sincronizar catálogo:", errorUpsert.message);
    process.exit(1);
  }

  // Borra de Supabase los productos que ya no existen en products.ts.
  const idsActuales = filas.map((f) => f.id);
  const { data: existentes, error: errorSelect } = await supabase.from("productos").select("id");
  if (errorSelect) {
    console.error("Advertencia: no se pudo verificar productos obsoletos:", errorSelect.message);
  } else {
    const idsObsoletos = (existentes ?? [])
      .map((r) => r.id as number)
      .filter((id) => !idsActuales.includes(id));
    if (idsObsoletos.length > 0) {
      const { error: errorDelete } = await supabase.from("productos").delete().in("id", idsObsoletos);
      if (errorDelete) console.error("Advertencia: no se pudieron borrar productos obsoletos:", errorDelete.message);
      else console.log(`Borrados ${idsObsoletos.length} productos que ya no están en products.ts:`, idsObsoletos);
    }
  }

  console.log("Catálogo sincronizado ✔");
}

main();

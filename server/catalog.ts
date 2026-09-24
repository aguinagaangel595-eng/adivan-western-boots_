import { getSupabaseAdmin } from "./supabaseAdmin.js";
import type { ProductoDB } from "./types.js";

/**
 * Trae el catálogo completo y vigente desde Supabase. Se llama en cada
 * mensaje entrante: el agente nunca usa una copia guardada en el código,
 * siempre lee lo que hay en la tabla `productos` en ese momento.
 */
export async function fetchCatalogo(): Promise<ProductoDB[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("grupo", { ascending: true })
    .order("nombre", { ascending: true });

  if (error) throw new Error(`No se pudo leer el catálogo de Supabase: ${error.message}`);
  return (data ?? []) as unknown as ProductoDB[];
}

/**
 * Versión compacta del catálogo para inyectar en el system prompt de Claude.
 * Quita campos que no aportan a la conversación (fechas, etc.) para ahorrar tokens.
 */
export function formatCatalogoParaPrompt(catalogo: ProductoDB[]): string {
  const compacto = catalogo.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    grupo: p.grupo,
    categoria: p.categoria,
    genero: p.genero ?? undefined,
    precio: p.precio,
    precio_original: p.precio_original ?? undefined,
    tallas: p.tallas.length > 0 ? p.tallas : undefined,
    colores: p.colores.length > 0 ? p.colores : undefined,
    grabado_personalizable: p.grabado_personalizable || undefined,
    descripcion: p.descripcion,
  }));
  return JSON.stringify(compacto);
}

// Arma el sitio (carpeta dist/) que publica Vercel:
//   1. copia public/ (logos, fotos, robots.txt, etc.)
//   2. copia site/ (las páginas del diseño nuevo)
//   3. genera dist/assets/products.js LEYENDO src/data/products.ts  <- aquí se editan precios y productos
//   4. (opcional) sincroniza el catálogo con Supabase para el agente de WhatsApp, si hay llaves en el entorno
//
// Uso local:  npm run build      (y luego  npx http-server dist  para verlo)
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { products, GRUPOS, SUBCATEGORIAS_BOTA, tallasDe } from "../src/data/products";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public");
const SITE = path.join(ROOT, "site");
const DIST = path.join(ROOT, "dist");

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(PUB, DIST, { recursive: true });
fs.cpSync(SITE, DIST, { recursive: true });
fs.mkdirSync(path.join(DIST, "assets", "p"), { recursive: true });

const missing: string[] = [];
const img = (p: string) => {
  const name = path.basename(p);
  const src = path.join(PUB, name);
  if (!fs.existsSync(src)) missing.push(p);
  else fs.copyFileSync(src, path.join(DIST, "assets", "p", name));
  return "assets/p/" + name;
};

const data = {
  grupos: GRUPOS,
  subBota: SUBCATEGORIAS_BOTA,
  products: products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice ?? null,
    group: p.group,
    category: p.category,
    genero: p.genero ?? null,
    description: p.description,
    referenceImage: !!p.referenceImage,
    tallas: tallasDe(p),
    variants: (p.variants ?? []).map((v) => ({ color: v.color, images: v.images.map(img) })),
    swatches: p.colorSwatches ?? [],
    grabadoPatrones: p.grabadoPatrones ?? [],
    grabadoImages: (p.grabadoImages ?? []).map(img),
    grabadoCatalogUrl: p.grabadoCatalogUrl ?? null,
    image: p.image ? img(p.image) : null,
  })),
};
fs.writeFileSync(path.join(DIST, "assets", "products.js"), "window.ADIVAN_DATA=" + JSON.stringify(data) + ";\n");

// Datos públicos para el panel /admin/pedidos (la llave anon es pública; la protección real es RLS en Supabase).
const cfg = {
  url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  anon: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "",
};
fs.writeFileSync(path.join(DIST, "assets", "config.js"), "window.ADIVAN_CFG=" + JSON.stringify(cfg) + ";\n");

console.log(`Sitio armado en dist/ · ${data.products.length} productos`);
if (missing.length) {
  console.error("⚠ Faltan fotos en public/ para:", missing);
  process.exitCode = 1;
}

// Catálogo del agente de WhatsApp (no bloquea el deploy si falla).
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    execFileSync(process.execPath, [path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs"), path.join(ROOT, "scripts", "sync-catalog.ts")], { stdio: "inherit" });
  } catch {
    console.warn("No se pudo sincronizar el catálogo con Supabase (el sitio sí se publicó).");
  }
}

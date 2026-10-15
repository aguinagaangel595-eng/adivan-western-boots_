// Arma el sitio (carpeta dist/) que publica Vercel:
//   1. copia public/ (logos, fotos) y site/ (páginas del diseño)
//   2. genera dist/assets/products.js LEYENDO src/data/products.ts  <- aquí se editan precios y productos
//   3. SEO (scripts/seo-build.ts): páginas de producto y categoría, sitemap.xml, robots.txt, datos estructurados
//   4. (opcional) sincroniza el catálogo con Supabase para el agente de WhatsApp, si hay llaves en el entorno
//
// Uso local:  npm run build      (y luego  npm run preview  para verlo)
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { products, GRUPOS, SUBCATEGORIAS_BOTA } from "../src/data/products";
import { buildSeo, enrichProducts } from "./seo-build";
import { PAGINAS } from "../src/data/seo";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public");
const SITE = path.join(ROOT, "site");
const DIST = path.join(ROOT, "dist");

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(PUB, DIST, { recursive: true });
fs.cpSync(SITE, DIST, { recursive: true, filter: (src) => !src.includes(`${path.sep}_templates`) });
fs.rmSync(path.join(DIST, "robots.txt"), { force: true }); // lo genera seo-build
// Rutas absolutas (/assets/...) en todas las páginas, para que funcionen también si se abren desde otra ruta.
for (const f of fs.readdirSync(DIST)) {
  if (!f.endsWith(".html")) continue;
  const fp = path.join(DIST, f);
  fs.writeFileSync(fp, fs.readFileSync(fp, "utf8").replace(/(href|src)="assets\//g, '$1="/assets/'));
}
fs.mkdirSync(path.join(DIST, "assets", "p"), { recursive: true });

const missing: string[] = [];
const img = (p: string) => {
  const name = path.basename(p);
  const src = path.join(PUB, name);
  if (!fs.existsSync(src)) missing.push(p);
  else fs.copyFileSync(src, path.join(DIST, "assets", "p", name));
  return "/assets/p/" + name;
};

const enriched = enrichProducts(products);
const data = {
  grupos: GRUPOS,
  subBota: SUBCATEGORIAS_BOTA,
  products: enriched.map((p) => ({
    id: p.id,
    slug: p.slug,
    url: p.url,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice ?? null,
    group: p.group,
    category: p.category,
    genero: p.genero ?? null,
    description: p.description,
    referenceImage: !!p.referenceImage,
    esDeVestir: !!p.esDeVestir,
    tallas: p.tallas,
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

// SEO
buildSeo({ dist: DIST, site: SITE, products });

console.log(`Sitio armado en dist/ · ${data.products.length} productos · páginas: ${Object.keys(PAGINAS).length}`);
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

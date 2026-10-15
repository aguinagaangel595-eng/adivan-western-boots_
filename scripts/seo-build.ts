// SEO técnico de ADIVAN, generado en cada publicación a partir de:
//   src/data/products.ts  (productos)   +   src/data/seo.ts  (textos y categorías)
//
// Genera: una página por producto (/producto/<slug>), una por categoría (/botas-vaqueras, ...),
// sitemap.xml, robots.txt, y mete título/descripción/canonical/Open Graph/datos estructurados
// (JSON-LD) en las páginas fijas.
import fs from "node:fs";
import path from "node:path";
import type { Product } from "../src/data/products";
import { tallasDe } from "../src/data/products";
import { SITE, PAGINAS, CATEGORIAS, type CategoriaSEO } from "../src/data/seo";

// ───────────────────────── utilidades ─────────────────────────
export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fmt = (n: number) => "$" + n.toLocaleString("es-MX");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p: string) => (p.startsWith("http") ? p : SITE.url + (p.startsWith("/") ? p : "/" + p));
const NO_COLOR = ["único", "surtido", "colores disponibles"];

function cutAt(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

export interface ProductoSEO extends Product {
  slug: string;
  url: string;
  mainImage: string;
  images: string[];
  colors: string[];
  tallas: (number | string)[];
}

const GROUP_NOUN: Record<string, string> = {
  Botas: "Botas vaqueras",
  Cintos: "Cinturones de piel",
  Carteras: "Carteras de piel",
  Bolsos: "Bolsos de piel",
  Sombreros: "Sombreros vaqueros",
  Chamarras: "Chamarras de piel",
  Gorras: "Accesorios de piel",
  Otros: "Accesorios de piel",
};

function tallasTxt(t: (number | string)[]): string {
  if (!t.length) return "";
  if (t.every((x) => typeof x === "number")) {
    const n = t as number[];
    const step = n.length > 1 ? n[1] - n[0] : 1;
    return step === 1 ? `${n[0]} a ${n[n.length - 1]}` : n.join(", ");
  }
  return t.join(", ");
}

const imgPath = (p: string) => "/assets/p/" + path.basename(p);

export function enrichProducts(products: Product[]): ProductoSEO[] {
  const used = new Set<string>();
  return products.map((p) => {
    let slug = p.slug || slugify(p.name);
    if (used.has(slug)) slug = `${slug}-${p.id}`;
    used.add(slug);
    const imgs = [
      ...(p.variants ?? []).flatMap((v) => v.images),
      ...(p.grabadoImages ?? []),
      ...(p.image ? [p.image] : []),
    ].map(imgPath);
    const uniq = Array.from(new Set(imgs));
    const colors = Array.from(
      new Set([...(p.variants ?? []).map((v) => v.color), ...(p.colorSwatches ?? []).map((c) => c.name)])
    ).filter((c) => !NO_COLOR.includes(c.toLowerCase()));
    return {
      ...p,
      slug,
      url: "/producto/" + slug,
      mainImage: uniq[0] ?? SITE.logo,
      images: uniq,
      colors,
      tallas: tallasDe(p),
    };
  });
}

// ───────────────────────── textos por producto ─────────────────────────
function longName(p: ProductoSEO): string {
  if (p.group === "Botas" && !/\b(bota|botas|botín|botin|botina|botines)\b/i.test(p.name)) return `Bota ${p.name}`;
  return p.name;
}

export function productTitle(p: ProductoSEO): string {
  if (p.seoTitle) return p.seoTitle;
  const para = p.genero ? ` para ${p.genero === "Dama" ? "dama" : "hombre"}` : "";
  const full = `${longName(p)}${para} | ${GROUP_NOUN[p.group] ?? "Artículos de piel"} | ADIVAN`;
  return full.length <= 72 ? full : `${longName(p)}${para} | ADIVAN`;
}

export function productDescription(p: ProductoSEO): string {
  if (p.seoDescription) return p.seoDescription;
  const tail = ` ${fmt(p.price)} MXN. Hecho a mano en León, Gto. Envío a todo México.`;
  let base = p.description.replace(/\s+/g, " ").trim();
  if (base.length > 158 - tail.length) {
    const cut = base.slice(0, 158 - tail.length);
    base = cut.slice(0, cut.lastIndexOf(" "));
  }
  return base.replace(/[,;:.\s]+$/, "") + "." + tail;
}

function productCopy(p: ProductoSEO): string[] {
  const para = p.genero ? (p.genero === "Dama" ? "para dama" : "para hombre") : "";
  const tl = tallasTxt(p.tallas);
  const col = p.colors.length ? p.colors.join(", ").toLowerCase() : "";
  const lines: string[] = [];
  const grabado = p.grabadoPatrones && p.grabadoPatrones.length > 0;
  switch (p.group) {
    case "Botas": {
      const tipo =
        p.category === "Rodeo" ? "bota rodeo" : p.category === "Exótica" ? "bota con grabado tipo exótico" : p.category === "Tejida" ? "bota de piel tejida" : p.category === "Botín" ? "botín vaquero" : "bota vaquera";
      lines.push(
        `${p.name} es una ${tipo}${para ? " " + para : ""} hecha a mano en León, Guanajuato, con piel de res genuina. Disponible en tallas ${tl}${col ? ` y en color ${col}` : ""}.`
      );
      if (grabado) lines.push("Puedes elegir el patrón de grabado que más te guste: te mostramos el catálogo y lo hacemos a mano. Es piel de res con grabado tipo exótico, no piel exótica original.");
      break;
    }
    case "Cintos":
      lines.push(`${p.name} es un cinturón de piel hecho a mano en León, Guanajuato. Disponible en tallas ${tl}${col ? ` y en color ${col}` : ""}.`);
      if (!p.esDeVestir) lines.push("Cuenta para el Paquete JUMBO: junto con un par de botas te regalamos una cartera grabada.");
      break;
    case "Carteras":
      lines.push(`${p.name} es una cartera de piel hecha a mano${col ? `, disponible en ${col}` : ""}. Práctica, resistente y lista para regalar.`);
      break;
    case "Bolsos":
      lines.push(`${p.name} es un bolso de piel hecho a mano en León, Guanajuato${grabado ? ", que puedes pedir con el grabado tipo exótico que prefieras" : ""}.`);
      break;
    case "Sombreros":
      lines.push(`${p.name} es un sombrero estilo vaquero para completar tu look Western junto con tus botas y tu cinto.`);
      break;
    case "Chamarras":
      lines.push(`${p.name} es una chamarra tipo camisola hecha en nobuck${col ? `, disponible en ${col}` : ""}. Tallas ${tl}.`);
      break;
    default:
      lines.push(`${p.name} es un accesorio de piel hecho a mano en León, Guanajuato${grabado ? ", que puedes pedir con grabado" : ""}.`);
  }
  lines.push(
    `Pídelo por WhatsApp o agrégalo al carrito: aceptamos transferencia, depósito o efectivo contra entrega, y enviamos a todo México (envío gratis desde ${fmt(SITE.freeShipMin)} MXN). Tienes 15 días naturales para cambios o devoluciones.`
  );
  return lines;
}

function detailRows(p: ProductoSEO, cat?: CategoriaSEO): [string, string][] {
  const rows: [string, string][] = [];
  rows.push(["Categoría", cat ? `<a href="/${cat.slug}">${esc(cat.label)}</a>` : esc(p.category)]);
  if (p.genero) rows.push(["Para", p.genero === "Dama" ? "Dama" : "Hombre"]);
  if (p.tallas.length) rows.push(["Tallas", esc(tallasTxt(p.tallas))]);
  if (p.colors.length) rows.push(["Colores", esc(p.colors.join(", "))]);
  rows.push(["Precio", `${fmt(p.price)} MXN${p.originalPrice ? ` (antes ${fmt(p.originalPrice)})` : ""}`]);
  rows.push(["Envío", `A todo México. Gratis desde ${fmt(SITE.freeShipMin)} MXN; si no, se cobra aparte según tu ciudad.`]);
  rows.push(["Pago", "Transferencia, depósito o efectivo contra entrega"]);
  rows.push(["Cambios", "15 días naturales, producto sin uso y en su empaque"]);
  return rows;
}

// ───────────────────────── categorías ─────────────────────────
function inCategoria(p: ProductoSEO, c: CategoriaSEO): boolean {
  const f = c.filtro;
  if (f.groups && !f.groups.includes(p.group)) return false;
  if (f.category && p.category !== f.category) return false;
  if (f.genero && p.genero !== f.genero) return false;
  return true;
}

function fillTokens(txt: string, list: ProductoSEO[]): string {
  const prices = list.map((p) => p.price);
  return txt
    .replace(/\{n\}/g, String(list.length))
    .replace(/\{min\}/g, fmt(Math.min(...prices)))
    .replace(/\{max\}/g, fmt(Math.max(...prices)))
    .replace(/\{envioGratis\}/g, fmt(SITE.freeShipMin));
}

// ───────────────────────── JSON-LD ─────────────────────────
const ld = (o: unknown) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

function negocioLD() {
  return {
    "@context": "https://schema.org",
    "@type": "ShoeStore",
    "@id": SITE.url + "/#negocio",
    name: SITE.nameLong,
    alternateName: SITE.name,
    url: SITE.url + "/",
    logo: abs(SITE.logo),
    image: abs(SITE.ogImage),
    description:
      "Botas vaqueras, cintos, carteras y bolsos de piel genuina hechos a mano en León, Guanajuato. Envíos a todo México.",
    slogan: SITE.slogan,
    telephone: SITE.phone,
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: { "@type": "Country", name: "México" },
    contactPoint: [
      { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service", areaServed: "MX", availableLanguage: "es" },
    ],
    sameAs: SITE.sameAs,
  };
}

function websiteLD() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE.url + "/#sitio", url: SITE.url + "/", name: SITE.name, inLanguage: "es-MX" };
}

function breadcrumbLD(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

function faqLD(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

function itemListLD(list: ProductoSEO[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(p.url), name: p.name })),
  };
}

function productLD(p: ProductoSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: longName(p),
    description: productDescription(p),
    image: p.images.slice(0, 6).map(abs),
    sku: String(p.id),
    category: GROUP_NOUN[p.group] ?? p.group,
    brand: { "@type": "Brand", name: SITE.name },
    url: abs(p.url),
    offers: {
      "@type": "Offer",
      url: abs(p.url),
      priceCurrency: "MXN",
      price: p.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MX",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 15,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      },
    },
  };
}

// ───────────────────────── <head> ─────────────────────────
interface HeadOpts {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonld?: unknown[];
  noindex?: boolean;
}

function headTags(o: HeadOpts): string {
  const url = abs(o.path);
  const img = abs(o.image ?? SITE.ogImage);
  const t = esc(o.title), d = esc(o.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}">`,
    o.noindex ? `<meta name="robots" content="noindex, nofollow">` : `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(SITE.name)}">`,
    `<meta property="og:locale" content="es_MX">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${img}">`,
    ...(o.jsonld ?? []).map(ld),
  ].join("\n");
}

function stripHead(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="(description|robots|twitter:[^"]+)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="(og:|article:)[^"]*"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
}

function applyHead(html: string, head: string): string {
  const clean = stripHead(html);
  return clean.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${head}`);
}

// ───────────────────────── plantillas ─────────────────────────
const fill = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : ""));

function priceHtml(p: ProductoSEO): string {
  return `${p.originalPrice ? `<s>${fmt(p.originalPrice)}</s> ` : ""}<b>${fmt(p.price)}</b> MXN`;
}

function cardStatic(p: ProductoSEO): string {
  return `<a class="ccard" href="${p.url}">
  <div class="cimg"><img src="${p.mainImage}" alt="${esc(longName(p))}${p.colors[0] ? " - " + esc(p.colors[0]) : ""}" loading="lazy">${p.originalPrice ? '<span class="badge sale">Oferta</span>' : ""}${p.referenceImage ? '<span class="ref">Imagen de referencia</span>' : ""}</div>
  <div class="cinfo"><h3>${esc(p.name)}</h3><p class="cprice">${priceHtml(p)}</p></div></a>`;
}

// ───────────────────────── orquestador ─────────────────────────
export interface SeoResult {
  slugOf: Map<number, string>;
  productos: ProductoSEO[];
  categorias: { cat: CategoriaSEO; list: ProductoSEO[] }[];
}

export function buildSeo(opts: { dist: string; site: string; products: Product[] }): SeoResult {
  const { dist, site } = opts;
  const productos = enrichProducts(opts.products);
  const slugOf = new Map(productos.map((p) => [p.id, p.slug]));

  const categorias = CATEGORIAS.map((cat) => ({ cat, list: productos.filter((p) => inCategoria(p, cat)) })).filter((c) => c.list.length >= 2);

  const catDeGrupo = (g: string) =>
    categorias.find((c) => c.cat.filtro.groups?.includes(g) && !c.cat.filtro.category && !c.cat.filtro.genero)?.cat;

  const tplProducto = fs.readFileSync(path.join(site, "_templates", "producto.html"), "utf8");
  const tplCategoria = fs.readFileSync(path.join(site, "_templates", "categoria.html"), "utf8");

  const urls: { loc: string; priority: string; changefreq: string }[] = [];

  // — páginas fijas —
  for (const [file, meta] of Object.entries(PAGINAS)) {
    const fp = path.join(dist, file);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, "utf8");

    // enlaces a productos desde la portada: /tienda?p=ID -> página del producto
    html = html.replace(/href="\/tienda\?p=(\d+)"/g, (m, id) => {
      const s = slugOf.get(Number(id));
      return s ? `href="/producto/${s}"` : 'href="/tienda"';
    });

    const jsonld: unknown[] = [];
    const crumbs = [{ name: "Inicio", path: "/" }];
    if (file === "index.html") {
      jsonld.push(negocioLD(), websiteLD());
      const faq = extractFaq(html);
      if (faq.length) jsonld.push(faqLD(faq));
    } else {
      crumbs.push({ name: meta.crumb, path: meta.path });
      jsonld.push(breadcrumbLD(crumbs));
      if (file === "tienda.html") {
        jsonld.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tienda ADIVAN",
          url: abs(meta.path),
          inLanguage: "es-MX",
          isPartOf: { "@id": SITE.url + "/#sitio" },
        });
        jsonld.push(itemListLD(productos));
      } else {
        jsonld.push({ "@context": "https://schema.org", "@type": meta.tipo ?? "WebPage", name: meta.title, url: abs(meta.path), inLanguage: "es-MX", description: meta.description });
      }
    }
    html = applyHead(html, headTags({ title: meta.title, description: meta.description, path: meta.path, jsonld }));
    fs.writeFileSync(fp, html);
    urls.push({
      loc: meta.path,
      priority: file === "index.html" ? "1.0" : file === "tienda.html" ? "0.9" : ["privacidad.html", "terminos.html"].includes(file) ? "0.2" : "0.5",
      changefreq: file === "index.html" || file === "tienda.html" ? "weekly" : "monthly",
    });
  }

  // — categorías —
  const catLinks = categorias.map((c) => `<a class="chip sm" href="/${c.cat.slug}">${esc(c.cat.label)}</a>`).join("");
  for (const { cat, list } of categorias) {
    const intro = cat.intro.map((t) => `<p>${esc(fillTokens(t, list))}</p>`).join("\n");
    const faq = cat.faq.map((f) => ({ q: f.q, a: fillTokens(f.a, list) }));
    const faqHtml = faq.map((f) => `<details class="qa"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n");
    const otras = categorias.filter((c) => c.cat.slug !== cat.slug).map((c) => `<a class="chip dark" href="/${c.cat.slug}">${esc(c.cat.label)}</a>`).join("");
    const meta = { title: cat.title, description: cat.description, path: "/" + cat.slug };
    const head = headTags({
      ...meta,
      image: list[0]?.mainImage,
      jsonld: [
        breadcrumbLD([{ name: "Inicio", path: "/" }, { name: "Tienda", path: "/tienda" }, { name: cat.label, path: meta.path }]),
        { "@context": "https://schema.org", "@type": "CollectionPage", name: cat.h1, url: abs(meta.path), inLanguage: "es-MX", description: cat.description },
        itemListLD(list),
        faqLD(faq),
      ],
    });
    const html = fill(tplCategoria, {
      HEAD: head,
      H1: esc(cat.h1),
      LABEL: esc(cat.label),
      INTRO: intro,
      COUNT: `${list.length} ${list.length === 1 ? "pieza" : "piezas"}`,
      GRID: list.map(cardStatic).join("\n"),
      FAQ: faqHtml,
      OTRAS: otras,
    });
    fs.writeFileSync(path.join(dist, cat.slug + ".html"), html);
    urls.push({ loc: meta.path, priority: "0.8", changefreq: "weekly" });
  }

  // — productos —
  fs.mkdirSync(path.join(dist, "producto"), { recursive: true });
  for (const p of productos) {
    const cat = catDeGrupo(p.group);
    const titulo = productTitle(p), desc = productDescription(p);
    const head = headTags({
      title: titulo,
      description: desc,
      path: p.url,
      image: p.mainImage,
      jsonld: [
        breadcrumbLD([
          { name: "Inicio", path: "/" },
          cat ? { name: cat.label, path: "/" + cat.slug } : { name: "Tienda", path: "/tienda" },
          { name: p.name, path: p.url },
        ]),
        productLD(p),
      ],
    });
    const rel = productos
      .filter((x) => x.id !== p.id && x.group === p.group)
      .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
      .slice(0, 4);
    const details = detailRows(p, cat)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
      .join("");
    const html = fill(tplProducto, {
      HEAD: head,
      PID: String(p.id),
      H1: esc(longName(p)),
      PARA: p.genero ? ` para ${p.genero === "Dama" ? "dama" : "hombre"}` : "",
      CRUMB_CAT: cat ? `<a href="/${cat.slug}">${esc(cat.label)}</a>` : `<a href="/tienda">Tienda</a>`,
      CRUMB_NAME: esc(p.name),
      PRICE: priceHtml(p),
      DESC: esc(p.description),
      COPY: productCopy(p).map((t) => `<p>${esc(t)}</p>`).join("\n"),
      DETAILS: details,
      IMG: p.mainImage,
      ALT: esc(longName(p)),
      WAMSG: encodeURIComponent(`Hola ADIVAN, me interesa ${longName(p)}`),
      RELATED: rel.length ? `<h2>También te puede gustar</h2><div class="cgrid">${rel.map(cardStatic).join("\n")}</div>` : "",
    });
    fs.writeFileSync(path.join(dist, "producto", p.slug + ".html"), html);
    urls.push({ loc: p.url, priority: "0.7", changefreq: "weekly" });
  }

  // — sitemap y robots —
  const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${abs(u.loc)}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, "sitemap.xml"), sm);
  fs.writeFileSync(
    path.join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`
  );

  // — datos para el menú/pie (categorías) y envío gratis —
  const sj = path.join(dist, "assets", "site.js");
  if (fs.existsSync(sj)) {
    let js = fs.readFileSync(sj, "utf8");
    js = js.replace("/*__CATS__*/[]", JSON.stringify(categorias.map((c) => ({ slug: c.cat.slug, label: c.cat.label }))));
    js = js.replace("/*__FREE__*/1100", String(SITE.freeShipMin));
    fs.writeFileSync(sj, js);
  }

  // — tienda: enlaces a categorías (rastreables) —
  const tp = path.join(dist, "tienda.html");
  if (fs.existsSync(tp)) {
    fs.writeFileSync(tp, fs.readFileSync(tp, "utf8").replace("{{CATLINKS}}", catLinks));
  }
  const ip = path.join(dist, "index.html");
  if (fs.existsSync(ip)) {
    fs.writeFileSync(ip, fs.readFileSync(ip, "utf8").replace("{{CATLINKS}}", catLinks));
  }

  console.log(`SEO: ${productos.length} páginas de producto, ${categorias.length} de categoría, sitemap con ${urls.length} URLs`);
  return { slugOf, productos, categorias };
}

function extractFaq(html: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  const re = /<div class="item[^"]*"><button[^>]*><span>([\s\S]*?)<\/span>[\s\S]*?<div class="ans"><div><p>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  const clean = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  while ((m = re.exec(html))) out.push({ q: clean(m[1]), a: clean(m[2]) });
  return out;
}

export interface ProductVariant {
  color: string;
  images: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hex2?: string; // si existe, se pinta mitad y mitad (para "Combinado")
}

// Fuente única del catálogo — la Tienda y los destacados del Inicio leen de aquí,
// así que un cambio de precio/nombre/foto se refleja en todo el sitio a la vez.
// Precios de boceto/referencia.
// "Exótica" = piel de res con grabado tipo exótico (grabado, no piel exótica genuina).

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  group: string;
  category: string;
  genero?: "Dama" | "Hombre"; // Solo para group "Botas" — habilita el filtro Dama/Hombre en la Tienda
  description: string;
  image?: string;
  referenceImage?: boolean; // true = la foto es una imagen de referencia (no la foto real del producto)
  variants?: ProductVariant[];
  colorSwatches?: ColorSwatch[];
  grabadoPatrones?: string[];
  grabadoImages?: string[];
  grabadoCatalogUrl?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Botas Rosas",
    price: 1299,
    originalPrice: 1800,
    group: "Botas",
    category: "Rodeo",
    genero: "Dama",
    description: "Botas coquetas en piel rosa, para dama, con pespunte en tono contrastante.",
    variants: [{ color: "Rosa", images: ["/Botasrosas.jpg"] }],
  },
  {
    id: 2,
    name: "Rodeo Café Enmielado",
    price: 1199,
    group: "Botas",
    category: "Rodeo",
    genero: "Hombre",
    description: "Bota rodeo clásica en piel café enmielado, tubo bordado y suela de doble vida.",
    variants: [
      { color: "Café enmielado", images: ["/Rodeo-cafe-enmielado-1.jpeg", "/Rodeo-cafe-enmielado-2.jpeg", "/Rodeo-cafe-enmielado-3.jpeg"] },
    ],
  },
  {
    id: 3,
    name: "Rodeo Mango",
    price: 1199,
    group: "Botas",
    category: "Rodeo",
    genero: "Hombre",
    description: "Bota rodeo en piel color mango con bordado floral en hilo tono hueso.",
    variants: [
      { color: "Mango", images: ["/Rodeo-mango-1.jpeg", "/Rodeo-mango-2.jpeg", "/Rodeo-mango-3.jpeg"] },
    ],
  },
  {
    id: 4,
    name: "Bota Grabada",
    price: 1299,
    originalPrice: 1600,
    group: "Botas",
    category: "Exótica",
    genero: "Hombre",
    description: "Piel de res con grabado tipo exótico. Ve el catálogo y dinos qué patrón quieres.",
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoImages: ["/cocologo.jpeg", "/coco-papada.jpg"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 8,
    name: "Tejida Original Miel",
    price: 1499,
    group: "Botas",
    category: "Tejida",
    genero: "Hombre",
    description: "Bota de piel tejida a mano en tono miel, con tubo liso color café.",
    variants: [{ color: "Miel", images: ["/tejida-miel.jpg"] }],
  },
  {
    id: 9,
    name: "Cartera Bifold",
    price: 150,
    group: "Carteras",
    category: "Carteras",
    description: "Cartera de piel 100% genuina, hecha en México, con portatarjetas y compartimentos.",
    variants: [{ color: "Negro", images: ["/cartera-negra-1.jpg", "/cartera-negra-2.jpg"] }],
    colorSwatches: [
      { name: "Negro", hex: "#1a1512" },
      { name: "Café", hex: "#4a2f1f" },
      { name: "Miel", hex: "#c9963f" },
      { name: "Vino", hex: "#5c1f2b" },
      { name: "Azul marino", hex: "#1b2a4a" },
      { name: "Combinado", hex: "#4a2f1f", hex2: "#1a1512" },
    ],
  },
  {
    id: 10,
    name: "Bota Grabada Mantarraya Negra",
    price: 1300,
    group: "Botas",
    category: "Exótica",
    genero: "Hombre",
    description: "Bota alta en piel de res negra con grabado tipo mantarraya en el empeine, tubo bordado a tono.",
    variants: [{ color: "Negro", images: ["/bota-mantarraya-negra.jpg"] }],
  },
  {
    id: 11,
    name: "Bota Grabada Pitón Negra",
    price: 1300,
    group: "Botas",
    category: "Exótica",
    genero: "Hombre",
    description: "Bota alta en piel de res negra con grabado tipo pitón tono sobre tono, tubo bordado.",
    variants: [{ color: "Negro", images: ["/bota-piton-negra.jpg"] }],
  },
  {
    id: 29,
    name: "Botina de Dama",
    price: 890,
    group: "Botas",
    category: "Botín",
    genero: "Dama",
    description: "Botina de tacón para dama, piel grabada con bordado tipo talavera y hebilla.",
    variants: [{ color: "Surtido", images: ["/botina-dama-1.jpg", "/botina-dama-2.jpg"] }],
  },
  {
    id: 15,
    name: "Gorra",
    price: 160,
    group: "Gorras",
    category: "Gorras",
    description: "Gorra trucker con malla y ala en piel grabada, emblema metálico de gallo.",
    variants: [{ color: "Único", images: ["/gorra-gallo.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 16,
    name: "Sombrero de Piel Negro",
    price: 480,
    group: "Sombreros",
    category: "Sombreros",
    description: "Sombrero de piel genuina en negro, banda trenzada y cordón ajustable.",
    variants: [{ color: "Negro", images: ["/sombrero-piel-negro.jpg"] }],
  },
  {
    id: 35,
    name: "Sombrero Laredo",
    price: 380,
    group: "Sombreros",
    category: "Sombreros",
    description: "Sombrero de palma tipo vaquero, marca Laredo Hats, ala ancha y toquilla trenzada.",
    variants: [{ color: "Natural", images: ["/sombrero-laredo.jpg"] }],
  },
  {
    id: 17,
    name: "Bolso Colgante",
    price: 299,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolso pequeño tipo riñonera/colgante, disponible en piel escamada o tallada.",
    variants: [{ color: "Único", images: ["/bolso-colgante.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 18,
    name: "Mariconera chica",
    price: 289,
    group: "Bolsos",
    category: "Bolsos",
    description: "Mariconera chica cruzada con panel en piel grabada tipo avestruz.",
    variants: [{ color: "Único", images: ["/bolso-avestruz.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 19,
    name: "Bolsa Yareli",
    price: 399,
    originalPrice: 799,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolsa tipo caja con doble asa y cadena, en piel de res con grabado tipo exótico.",
    variants: [{ color: "Único", images: ["/bolsa-de-mano.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 20,
    name: "Crossbody",
    price: 299,
    originalPrice: 499,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolso cruzado tipo cámara en piel grabada tipo pitón, correa ajustable.",
    variants: [{ color: "Único", images: ["/bolso-piton.jpg", "/crossbody-2.jpg"] }],
  },
  {
    id: 21,
    name: "Cartera Dama",
    price: 219,
    originalPrice: 290,
    group: "Carteras",
    category: "Carteras",
    description: "Clutch grande para dama en piel grabada tipo cocodrilo, cierre y cadena dorados.",
    variants: [{ color: "Cognac", images: ["/clutch-cocodrilo.jpg", "/cartera-dama-2.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 22,
    name: "Cartera San Judas Tadeo",
    price: 100,
    originalPrice: 150,
    group: "Carteras",
    category: "Carteras",
    description: "Cartera de piel con diseño tallado de San Judas Tadeo.",
    variants: [{ color: "Café", images: ["/cartera-san-judas.jpg"] }],
  },
  {
    id: 23,
    name: "Cinto Conchos",
    price: 199,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel color mostaza con conchos metálicos y hebilla grabada.",
    variants: [{ color: "Mostaza", images: ["/cinto-mostaza.jpg"] }],
  },
  {
    id: 24,
    name: "Cinto Clásico Negro",
    price: 115,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel lisa negra, hebilla rectangular sencilla.",
    variants: [{ color: "Negro", images: ["/cinto-clasico-negro.jpg"] }],
  },
  {
    id: 25,
    name: "Cinto Piteado Negro",
    price: 220,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto ancho tallado estilo piteado, en negro con detalles plateados.",
    variants: [{ color: "Negro", images: ["/cinto-piteado-negro.jpg"] }],
  },
  {
    id: 26,
    name: "Cinto Tejido",
    price: 380,
    group: "Cintos",
    category: "Cintos",
    description: "Cinto de piel trenzada en negro, hebilla con pedrería.",
    variants: [{ color: "Negro", images: ["/cinto-trenzado.jpg"] }],
  },
  {
    id: 27,
    name: "Sacabotas",
    price: 220,
    group: "Otros",
    category: "Otros",
    description: "Jalador de botas en piel grabada tipo pitón, con tachuelas doradas.",
    variants: [{ color: "Café", images: ["/sacabotas-piton.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 28,
    name: "Set de Tequileros",
    price: 559,
    group: "Otros",
    category: "Otros",
    description: "Set de 6 caballitos tequileros forrados en piel tallada, diseños surtidos.",
    variants: [{ color: "Surtido", images: ["/tequileros.jpg"] }],
  },
  {
    id: 30,
    name: "Bolsa de pelo",
    price: 690,
    group: "Bolsos",
    category: "Bolsos",
    description: "Bolsa grande en pelo de vaca, asas y jareta de piel lisa.",
    variants: [{ color: "Único", images: ["/bolsa-grande.jpg"] }],
  },
  {
    id: 31,
    name: "Sobaqueras",
    price: 240,
    group: "Otros",
    category: "Otros",
    description: "Neceser tipo sobaquera en piel lisa con panel grabado, cierre doble y correa de mano.",
    variants: [{ color: "Surtido", images: ["/sobaquera-1.jpg", "/sobaquera-2.jpg", "/sobaquera-3.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 32,
    name: "Portacelular",
    price: 129,
    group: "Otros",
    category: "Otros",
    description: "Funda para celular en piel, con panel grabado o cincelado.",
    variants: [{ color: "Negro", images: ["/portacelular.jpg"] }],
    grabadoPatrones: ["Avestruz", "Cocodrilo", "Pescado", "Elefante", "Cincelado"],
    grabadoCatalogUrl: "https://canva.link/f9olgb75t9hbhv7",
  },
  {
    id: 33,
    name: "Portanavajas",
    price: 40,
    group: "Otros",
    category: "Otros",
    description: "Funda para navaja en piel con grabado cincelado (más modelos).",
    variants: [{ color: "Café", images: ["/portanavajas.jpg"] }],
  },
  {
    id: 34,
    name: "Cartera Trifold",
    price: 150,
    group: "Carteras",
    category: "Carteras",
    description: "Cartera trifold en piel genuina, hecha en México, con portatarjetas y compartimentos.",
    variants: [{ color: "Negro", images: ["/cartera-trifold-1.jpg", "/cartera-trifold-2.jpg"] }],
    colorSwatches: [
      { name: "Negro", hex: "#1a1512" },
      { name: "Café", hex: "#4a2f1f" },
      { name: "Miel", hex: "#c9963f" },
      { name: "Vino", hex: "#5c1f2b" },
      { name: "Azul marino", hex: "#1b2a4a" },
      { name: "Combinado", hex: "#4a2f1f", hex2: "#1a1512" },
    ],
  },
  {
    id: 36,
    name: "Chamarra de Nobuck",
    price: 1700,
    originalPrice: 2000,
    group: "Chamarras",
    category: "Chamarras",
    description: "Chamarra tipo camisola en nobuck, con bolsas de solapa y botones de presión metálicos. Forro interior.",
    variants: [{ color: "Colores disponibles", images: ["/chamarra-colores.jpg"] }],
    colorSwatches: [
      { name: "Café oscuro", hex: "#4a2f24" },
      { name: "Verde musgo", hex: "#5b5a35" },
      { name: "Miel", hex: "#c47a2e" },
    ],
  },
  {
    id: 37,
    name: "Mandil de Piel",
    price: 600,
    group: "Otros",
    category: "Otros",
    description: "Mandil de piel negra con bolsas y porta-herramientas en piel café, correas ajustables y costura reforzada.",
    variants: [{ color: "Negro", images: ["/mandil-piel.jpg"] }],
  },
  {
    id: 38,
    name: "Bota de Dama Retro",
    price: 1299,
    originalPrice: 1700,
    group: "Botas",
    category: "Rodeo",
    genero: "Dama",
    referenceImage: true,
    description: "Bota de dama estilo retro, caña alta con bordado floral tono sobre tono y punta fina.",
    variants: [{ color: "Colores disponibles", images: ["/bota-retro.jpg"] }],
    colorSwatches: [
      { name: "Miel", hex: "#c48a55" },
      { name: "Caoba", hex: "#8b3a1e" },
      { name: "Blanco", hex: "#f3efe8" },
    ],
  },
  {
    id: 39,
    name: "Botín Elegante",
    price: 900,
    originalPrice: 1199,
    group: "Botas",
    category: "Botín",
    genero: "Hombre",
    referenceImage: true,
    description: "Botín corto en piel de res café oscuro con grano natural, tubo en nobuck, cierre lateral y suela de cuero.",
    variants: [{ color: "Café oscuro", images: ["/botin-elegante-1.jpg", "/botin-elegante-2.jpg", "/botin-elegante-3.jpg"] }],
  },
];

export const GRUPOS = ["Todo", "Ofertas", "Botas", "Carteras", "Bolsos", "Cintos", "Sombreros", "Gorras", "Chamarras", "Otros"];
export const SUBCATEGORIAS_BOTA = ["Todas", "Rodeo", "Exótica", "Tejida", "Botín"];

// Tallas por producto. Botas: hombre 22 a 31, dama 22 a 27. Se usa en la tienda y en el agente de WhatsApp.
const rango = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export function tallasDe(p: Pick<Product, "group" | "category" | "genero">): (number | string)[] {
  if (p.group === "Botas") return p.genero === "Dama" ? rango(22, 27) : rango(22, 31);
  if (p.category === "Cintos") return [28, 30, 32, 34, 36, 38, 40, 42];
  if (p.category === "Chamarras") return ["S", "M", "L", "XL", "XXL"];
  return [];
}

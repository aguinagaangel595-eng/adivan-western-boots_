// SEO de ADIVAN: textos que ven Google y las personas que llegan desde el buscador.
// Se edita aquí, en GitHub: al guardar, Vercel vuelve a publicar solo.
//
// IMPORTANTE: no cambies los `slug` de las categorías ni de los productos una vez publicados
// (la dirección web cambiaría y se pierde el posicionamiento ganado).

export const SITE = {
  url: "https://adivanwesternboots.com",
  name: "ADIVAN",
  nameLong: "ADIVAN Western Boots",
  slogan: "Legado en cada paso",
  phone: "+52 479 320 3429",
  whatsapp: "524793203429",
  email: "Adivanwesternbooots@gmail.com",
  city: "León",
  region: "Guanajuato",
  country: "MX",
  geo: { lat: 21.1238068, lng: -101.6751618 },
  freeShipMin: 1100, // envío gratis desde este total (también lo usa el carrito)
  logo: "/adivan-logo-legado.png",
  ogImage: "/Rodeo-cafe-enmielado-1.jpeg", // 1080x1350, imagen al compartir el enlace
  sameAs: [
    "https://www.google.com/maps/place/ADIVAN+WESTERN+BOOTS/@21.1238068,-101.6751618,17z/data=!3m1!4b1!4m6!3m5!1s0x842bbf00053b6b3f:0xd3a269cc6c24a141!8m2!3d21.1238068!4d-101.6751618!16s%2Fg%2F11nqlktkvz",
    "https://www.tiktok.com/@adivan.western",
  ],
};

// Título (≈60 caracteres) y descripción (≈155) de cada página fija.
export const PAGINAS: Record<string, { title: string; description: string; path: string; crumb: string; tipo?: string }> = {
  "index.html": {
    crumb: "Inicio",
    path: "/",
    title: "Botas vaqueras hechas a mano en León, Guanajuato | ADIVAN",
    description:
      "Botas vaqueras, cintos, carteras y bolsos de piel genuina hechos a mano en León, Guanajuato. Botas para hombre y dama. Envíos a todo México. Pide por WhatsApp.",
  },
  "tienda.html": {
    crumb: "Tienda",
    path: "/tienda",
    title: "Tienda de botas vaqueras y artículos de piel | ADIVAN",
    description:
      "Compra botas vaqueras para hombre y dama, botines, cintos piteados, carteras, bolsos y chamarras de piel hechos a mano en León, Gto. Envío a todo México.",
  },
  "nosotros.html": {
    crumb: "Nosotros",
    path: "/nosotros",
    tipo: "AboutPage",
    title: "Nosotros: marca mexicana de botas de piel hechas a mano | ADIVAN",
    description:
      "ADIVAN es una marca mexicana de León, Guanajuato que transforma piel de res genuina en botas vaqueras y artículos de piel hechos a mano, con diseño Western moderno.",
  },
  "artesania.html": {
    crumb: "Oficio",
    path: "/artesania",
    title: "Oficio: así se hacen nuestras botas de piel a mano | ADIVAN",
    description:
      "Conoce el proceso artesanal de ADIVAN: selección de piel, corte, grabado y bordado, costura y acabados. Botas vaqueras hechas a mano en León, Guanajuato.",
  },
  "contacto.html": {
    crumb: "Contacto",
    path: "/contacto",
    tipo: "ContactPage",
    title: "Contacto, pedidos personalizados y mayoreo de botas | ADIVAN",
    description:
      "Escríbenos por WhatsApp al 479 320 3429 para pedidos personalizados, grabados y mayoreo de botas y artículos de piel hechos a mano en León, Guanajuato.",
  },
  "privacidad.html": {
    crumb: "Aviso de privacidad",
    path: "/privacidad",
    title: "Aviso de privacidad | ADIVAN",
    description: "Aviso de privacidad de ADIVAN: qué datos recopilamos, para qué los usamos y cómo ejercer tus derechos ARCO.",
  },
  "terminos.html": {
    crumb: "Términos de compra",
    path: "/terminos",
    title: "Términos de compra, envíos y cambios | ADIVAN",
    description: "Términos de compra de ADIVAN: precios, formas de pago, envíos a todo México, cambios y devoluciones, y garantía.",
  },
};

export interface CategoriaSEO {
  slug: string; // dirección: /<slug>
  label: string; // nombre corto para menús y migas de pan
  h1: string;
  title: string;
  description: string;
  filtro: { groups?: string[]; category?: string; genero?: "Dama" | "Hombre" };
  intro: string[]; // {n} = número de productos, {min}/{max} = precios, {envioGratis} = envío gratis desde
  faq: { q: string; a: string }[];
}

const JUMBO = {
  q: "¿Qué es el Paquete JUMBO?",
  a: "Si compras un par de botas y un cinto que no sea de vestir, te regalamos una cartera grabada.",
};

// Una página por categoría; si una categoría tiene menos de 2 productos no se publica (sería muy "delgada").
export const CATEGORIAS: CategoriaSEO[] = [
  {
    slug: "botas-vaqueras",
    label: "Botas vaqueras",
    h1: "Botas vaqueras de piel hechas a mano",
    title: "Botas vaqueras de piel para hombre y dama | ADIVAN",
    description:
      "Botas vaqueras de piel de res genuina hechas a mano en León, Guanajuato: rodeo, grabadas, tejidas y botines. Tallas 22 a 31. Envío a todo México.",
    filtro: { groups: ["Botas"] },
    intro: [
      "Las botas vaqueras ADIVAN se hacen a mano en León, Guanajuato, la capital del calzado en México. Trabajamos piel de res genuina con bordados, grabados y costuras reforzadas, pensadas para el uso diario, el jaripeo, el rodeo o la fiesta.",
      "Aquí encuentras {n} modelos de botas y botines para hombre (tallas 25 a 31) y para dama (tallas 22 a 27), desde {min} hasta {max} MXN. Pides por WhatsApp o desde el carrito, pagas por transferencia, depósito o efectivo contra entrega, y enviamos a todo México.",
    ],
    faq: [
      {
        q: "¿De qué material son las botas vaqueras ADIVAN?",
        a: "De piel de res genuina. Algunos modelos llevan grabado tipo exótico (avestruz, cocodrilo, pescado, pitón o mantarraya) sobre piel de res; no usamos piel exótica original.",
      },
      { q: "¿Qué tallas de botas manejan?", a: "Botas para hombre de la 25 a la 31 y botas para dama de la 22 a la 27." },
      {
        q: "¿Hacen envíos de botas a todo México?",
        a: "Sí. El costo y el tiempo dependen de la paquetería y del destino. Los pedidos desde {envioGratis} MXN tienen envío gratis.",
      },
      JUMBO,
    ],
  },
  {
    slug: "botas-vaqueras-hombre",
    label: "Botas para hombre",
    h1: "Botas vaqueras para hombre",
    title: "Botas vaqueras para hombre, de piel | ADIVAN",
    description:
      "Botas vaqueras para hombre en piel de res genuina: rodeo, grabadas, tejidas y botines. Hechas a mano en León, Gto. Tallas 25 a 31. Envío a todo México.",
    filtro: { groups: ["Botas"], genero: "Hombre" },
    intro: [
      "Botas vaqueras para hombre hechas a mano en León, Guanajuato, con piel de res genuina y costuras reforzadas. Hay modelos rodeo, grabadas tipo exótico, tejidas y botines, en tallas 25 a 31.",
      "Tenemos {n} modelos desde {min} hasta {max} MXN. Si no estás seguro de tu talla o quieres un grabado a tu gusto, escríbenos por WhatsApp y te ayudamos a elegir.",
    ],
    faq: [
      { q: "¿Qué tallas hay en botas para hombre?", a: "De la 25 a la 31." },
      {
        q: "¿Puedo elegir el grabado de mis botas?",
        a: "Sí. En las botas grabadas te mostramos el catálogo de patrones (avestruz, cocodrilo, pescado, elefante y cincelado) y eliges el que más te guste.",
      },
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: "Depende de la paquetería y de tu ciudad. Al armar tu pedido por WhatsApp te confirmamos el tiempo estimado.",
      },
    ],
  },
  {
    slug: "botas-vaqueras-dama",
    label: "Botas para dama",
    h1: "Botas vaqueras para dama",
    title: "Botas vaqueras para mujer y dama, de piel | ADIVAN",
    description:
      "Botas vaqueras para dama en piel genuina: botas rodeo, botinas de tacón y modelos retro. Hechas a mano en León, Gto. Tallas 22 a 27. Envío a todo México.",
    filtro: { groups: ["Botas"], genero: "Dama" },
    intro: [
      "Botas vaqueras para dama hechas a mano en León, Guanajuato. Encuentra botas rodeo, botinas de tacón y modelos retro en piel genuina, en tallas 22 a 27.",
      "Hay {n} modelos desde {min} hasta {max} MXN. Nos mandas tu talla y color por WhatsApp y te confirmamos tu pedido.",
    ],
    faq: [
      { q: "¿Qué tallas hay en botas para dama?", a: "De la 22 a la 27." },
      {
        q: "¿Las fotos de las botas son reales?",
        a: "Casi todas son fotos del producto. Cuando una foto es una imagen de referencia lo indicamos en la ficha y confirmamos el color con una muestra real antes de tu pedido.",
      },
      {
        q: "¿Puedo pagar contra entrega?",
        a: "Sí, además de transferencia o depósito. Lo acordamos por WhatsApp al confirmar tu pedido.",
      },
    ],
  },
  {
    slug: "botines-vaqueros",
    label: "Botines",
    h1: "Botines vaqueros de piel",
    title: "Botines vaqueros de piel para hombre y dama | ADIVAN",
    description:
      "Botines vaqueros de piel hechos a mano en León, Guanajuato: cortos, cómodos y con estilo Western. Modelos para hombre y botinas para dama. Envío a todo México.",
    filtro: { groups: ["Botas"], category: "Botín" },
    intro: [
      "Botines vaqueros de piel hechos a mano en León, Guanajuato: cortos, cómodos y con el estilo Western de siempre. Hay botines para hombre y botinas de tacón para dama.",
      "Tenemos {n} modelos desde {min} hasta {max} MXN. Pides por WhatsApp o desde el carrito y enviamos a todo México.",
    ],
    faq: [
      {
        q: "¿Cuál es la diferencia entre bota y botín?",
        a: "El botín es corto y llega al tobillo; la bota vaquera tiene el tubo alto y sube hacia la pantorrilla.",
      },
      { q: "¿Qué tallas manejan en botines?", a: "Botines para hombre de la 25 a la 31 y botinas para dama de la 22 a la 27." },
    ],
  },
  {
    slug: "botas-rodeo",
    label: "Botas rodeo",
    h1: "Botas rodeo de piel",
    title: "Botas rodeo de piel hechas a mano | ADIVAN",
    description:
      "Botas rodeo clásicas de piel de res genuina, con tubo bordado, hechas a mano en León, Guanajuato. Para hombre y dama. Envío a todo México.",
    filtro: { groups: ["Botas"], category: "Rodeo" },
    intro: [
      "La bota rodeo es la bota vaquera clásica: tubo alto con bordado, punta fuerte y costura reforzada. Las nuestras se hacen a mano en León, Guanajuato, con piel de res genuina.",
      "Hay {n} modelos rodeo desde {min} hasta {max} MXN, para hombre y para dama. Pide por WhatsApp y enviamos a todo México.",
    ],
    faq: [
      {
        q: "¿Para qué sirven las botas rodeo?",
        a: "Son botas vaqueras de uso diario y de fiesta: jaripeos, rodeos, ferias, bailes o simplemente para vestir con estilo Western.",
      },
      { q: "¿Qué tallas hay en botas rodeo?", a: "Para hombre de la 25 a la 31 y para dama de la 22 a la 27." },
    ],
  },
  {
    slug: "botas-grabadas",
    label: "Botas grabadas",
    h1: "Botas grabadas tipo exótico",
    title: "Botas grabadas tipo exótico en piel de res | ADIVAN",
    description:
      "Botas de piel de res con grabado tipo avestruz, cocodrilo, pescado, pitón o mantarraya, hechas a mano en León, Gto. Elige tu patrón. Envío a todo México.",
    filtro: { groups: ["Botas"], category: "Exótica" },
    intro: [
      "Botas de piel de res genuina con grabado tipo exótico: avestruz, cocodrilo, pescado, pitón, mantarraya o elefante. Tienen la textura y el look de la piel exótica, pero son piel de res grabada, con un precio más accesible que la piel exótica original.",
      "Hay {n} modelos desde {min} hasta {max} MXN. En la bota grabada puedes elegir el patrón que quieras: te mostramos el catálogo y lo hacemos a mano.",
    ],
    faq: [
      {
        q: "¿Es piel exótica original?",
        a: "No. Es piel de res genuina con grabado tipo exótico. Lo decimos claro para que sepas exactamente lo que compras.",
      },
      {
        q: "¿Qué patrones de grabado hay?",
        a: "Avestruz, cocodrilo, pescado, elefante y cincelado, además de los modelos con textura tipo pitón y mantarraya.",
      },
    ],
  },
  {
    slug: "cinturones-de-piel",
    label: "Cinturones",
    h1: "Cinturones de piel hechos a mano",
    title: "Cinturones de piel: piteados, con conchos y tejidos | ADIVAN",
    description:
      "Cintos de piel hechos a mano en León, Guanajuato: piteados, con conchos, tejidos y clásicos. Tallas 28 a 42. Envío a todo México. Pide por WhatsApp.",
    filtro: { groups: ["Cintos"] },
    intro: [
      "Cinturones y cintos de piel hechos a mano en León, Guanajuato: piteados, con conchos metálicos, tejidos y clásicos lisos, en tallas 28 a 42.",
      "Hay {n} modelos desde {min} hasta {max} MXN. Combínalos con tus botas: si compras un par de botas y un cinto que no sea de vestir, te regalamos una cartera grabada (Paquete JUMBO).",
    ],
    faq: [
      { q: "¿Qué tallas de cinto manejan?", a: "De la 28 a la 42." },
      { q: "¿Qué es un cinto piteado?", a: "Es un cinto de piel tallada o bordada a mano con motivos vaqueros, muy usado con botas y sombrero." },
      JUMBO,
    ],
  },
  {
    slug: "carteras-de-piel",
    label: "Carteras",
    h1: "Carteras de piel para hombre y dama",
    title: "Carteras de piel: bifold, trifold y clutch | ADIVAN",
    description:
      "Carteras de piel genuina hechas en México: bifold, trifold y clutch para dama, con portatarjetas. Hechas a mano en León, Gto. Envío a todo México.",
    filtro: { groups: ["Carteras"] },
    intro: [
      "Carteras de piel genuina hechas a mano en México: bifold, trifold y clutch para dama, con portatarjetas y compartimentos. Algunas se pueden pedir en varios colores.",
      "Hay {n} modelos desde {min} hasta {max} MXN. Pide por WhatsApp o agrega al carrito, y enviamos a todo México.",
    ],
    faq: [
      { q: "¿Las carteras son de piel genuina?", a: "Sí, hechas a mano en México. Algunas llevan grabado tipo exótico sobre piel de res." },
      { q: "¿En qué colores hay?", a: "Depende del modelo: negro, café, miel, vino, azul marino o combinado. Lo ves en cada ficha." },
    ],
  },
  {
    slug: "bolsos-de-piel",
    label: "Bolsos",
    h1: "Bolsos y bolsas de piel hechos a mano",
    title: "Bolsos y bolsas de piel hechos a mano | ADIVAN",
    description:
      "Bolsos crossbody, mariconeras, bolsas de mano y bolsas de pelo en piel, hechos a mano en León, Guanajuato. Envío a todo México. Pide por WhatsApp.",
    filtro: { groups: ["Bolsos"] },
    intro: [
      "Bolsos y bolsas de piel hechos a mano en León, Guanajuato: crossbody, mariconeras, bolsos colgantes, bolsas de mano y bolsas de pelo de vaca. Varios se pueden pedir con grabado tipo exótico.",
      "Hay {n} modelos desde {min} hasta {max} MXN. Enviamos a todo México.",
    ],
    faq: [
      { q: "¿Puedo elegir el grabado de mi bolso?", a: "En los modelos grabados sí: te mostramos el catálogo de patrones y eliges el que más te guste." },
      { q: "¿Cómo pago mi bolso?", a: "Por transferencia, depósito o efectivo contra entrega, lo acordamos por WhatsApp." },
    ],
  },
  {
    slug: "sombreros-vaqueros",
    label: "Sombreros",
    h1: "Sombreros vaqueros",
    title: "Sombreros vaqueros de piel y de palma | ADIVAN",
    description:
      "Sombreros vaqueros de piel y de palma para hombre: ala ancha, banda trenzada y cordón ajustable. Complementa tus botas. Envío a todo México.",
    filtro: { groups: ["Sombreros"] },
    intro: [
      "Sombreros vaqueros de piel y de palma, con ala ancha y banda trenzada, para completar tu look Western junto con tus botas y tu cinto.",
      "Hay {n} modelos desde {min} hasta {max} MXN. Pide por WhatsApp y enviamos a todo México.",
    ],
    faq: [{ q: "¿Hacen envíos de sombreros?", a: "Sí, a todo México. El costo depende de la paquetería y el destino." }],
  },
  {
    slug: "accesorios-de-piel",
    label: "Accesorios",
    h1: "Accesorios de piel hechos a mano",
    title: "Accesorios de piel: sacabotas, sobaqueras, mandil y más | ADIVAN",
    description:
      "Accesorios de piel hechos a mano en León, Gto: sacabotas, sobaqueras, portacelular, portanavajas, mandil de piel, tequileros y gorras. Envío a todo México.",
    filtro: { groups: ["Otros", "Gorras"] },
    intro: [
      "Accesorios de piel hechos a mano en León, Guanajuato: sacabotas, sobaqueras, portacelulares, portanavajas, mandil de piel, set de tequileros y gorras con ala de piel.",
      "Hay {n} piezas desde {min} hasta {max} MXN. Son ideales para regalo. Enviamos a todo México.",
    ],
    faq: [{ q: "¿Puedo pedir un accesorio con grabado?", a: "En varias piezas sí. Escríbenos por WhatsApp y te mostramos las opciones." }],
  },
];

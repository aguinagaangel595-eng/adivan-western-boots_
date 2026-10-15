# SEO de ADIVAN

Qué está hecho, cómo se edita y qué falta hacer fuera de la página.

## Qué genera la página sola (cada vez que se publica)

- **Una página por producto**: `/producto/<nombre>`, con su título, descripción, fotos, precio y datos estructurados de producto (así Google puede mostrar precio y foto).
- **Una página por categoría**: `/botas-vaqueras`, `/botas-vaqueras-hombre`, `/botas-vaqueras-dama`, `/botines-vaqueros`, `/botas-rodeo`, `/botas-grabadas`, `/cinturones-de-piel`, `/carteras-de-piel`, `/bolsos-de-piel`, `/sombreros-vaqueros`, `/accesorios-de-piel`. Cada una con texto, preguntas frecuentes y lista de productos. (Si una categoría tiene menos de 2 productos, no se publica.)
- `sitemap.xml` (la lista de páginas para Google) y `robots.txt`.
- En todas las páginas: título, descripción, dirección canónica, vista previa al compartir (WhatsApp, Facebook) y datos del negocio (León, Guanajuato, teléfono, mapa).

## Dónde se editan los textos

| Qué | Archivo |
|---|---|
| Título y descripción de cada página fija, datos del negocio, textos y preguntas de cada categoría | [`src/data/seo.ts`](src/data/seo.ts) |
| Título/descripción/dirección de un producto en particular (opcional) | en [`src/data/products.ts`](src/data/products.ts): `seoTitle`, `seoDescription`, `slug` |
| Textos de la portada, nosotros, oficio, contacto | [`site/`](site) |

Si no pones `seoTitle`/`seoDescription` en un producto, se arman solos con su nombre, tipo, precio y descripción.

**No cambies un `slug` ni el nombre de una categoría ya publicada**: cambia la dirección web y se pierde lo ganado en Google. Si renombras un producto, pon antes `slug: "nombre-anterior"` para que su dirección no cambie.

## Palabras que buscamos posicionar

- **Botas**: botas vaqueras, botas vaqueras hombre / dama / mujer, botas rodeo, botines vaqueros, botas de piel, botas hechas a mano, botas grabadas, botas tejidas.
- **Local**: botas León Guanajuato, botas vaqueras León Gto, botas hechas en León.
- **Compra**: comprar botas vaqueras, botas vaqueras envío a todo México, botas mayoreo.
- **Accesorios**: cinturones de piel, cinto piteado, carteras de piel, bolsos de piel, sombrero vaquero, chamarra de nobuck, mandil de piel.

## Lo que tienes que hacer tú (la página no puede)

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)): agrega `adivanwesternboots.com` como propiedad de dominio, verifícala con el registro DNS que te da Google, y en *Sitemaps* envía `https://adivanwesternboots.com/sitemap.xml`. Ahí ves qué búsquedas te traen visitas.
2. **Perfil de Empresa en Google** (tu ficha de Maps): pon la dirección web `https://adivanwesternboots.com`, categoría principal "Tienda de botas", horario, el WhatsApp, fotos reales y reseñas. Es lo que más ayuda para "botas en León".
3. **Pide reseñas** a tus clientes en Google (con el link directo de tu ficha).
4. **Pon el enlace de la página** en la biografía de TikTok, Instagram y Facebook.
5. Las fotos reales de producto (no de referencia) y más reseñas ayudan mucho; Google puede tardar semanas en mostrar resultados.

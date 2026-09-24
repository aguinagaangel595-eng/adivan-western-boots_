# ADIVAN · adivanwesternboots.com

Sitio de ADIVAN (botas y artículos de piel hechos a mano) + agente de ventas de WhatsApp.

## Cómo editar el sitio (desde GitHub, sin instalar nada)

| Quiero cambiar… | Edito este archivo |
|---|---|
| **Precios, nombres, descripciones, ofertas, colores, tallas de productos** | [`src/data/products.ts`](src/data/products.ts) |
| Fotos de productos | Subir la foto a la carpeta [`public/`](public) y ponerla en `products.ts` (ej. `"/mi-foto.jpg"`) |
| Textos de las páginas (inicio, nosotros, oficio, contacto, legales) | [`site/`](site) (un `.html` por página) |
| Colores y estilos | [`site/assets/site.css`](site/assets/site.css) y [`pages.css`](site/assets/pages.css) |

Al guardar un cambio en GitHub, Vercel **vuelve a armar y publica el sitio solo** (1 a 2 minutos). No hay que correr nada: el catálogo de la tienda se genera automáticamente desde `products.ts` en cada publicación.

En `products.ts`:
- `price` es el precio actual y `originalPrice` (opcional) el precio tachado: si existe, el producto aparece en "Ofertas".
- `genero: "Dama" | "Hombre"` aplica solo a botas y alimenta el filtro Dama/Hombre.

## Estructura

```
src/data/products.ts   catálogo (fuente única de precios y productos)
site/                  páginas y estilos del sitio (HTML, CSS y JS simples, sin frameworks)
public/                fotos y archivos estáticos
scripts/build-site.ts  arma dist/ (copia public/ y site/, y genera el catálogo desde products.ts)
api/whatsapp.ts        webhook del agente de WhatsApp (función de Vercel)
server/                lógica del agente (Claude + Supabase)
supabase/migrations/   tablas del agente
```

## Ver el sitio en tu computadora

```bash
npm install
npm run build      # arma dist/
npm run preview    # abre http://localhost:8080
```

## Agente de WhatsApp

Ver [WHATSAPP_AGENT.md](./WHATSAPP_AGENT.md). El panel de pedidos vive en `/admin/pedidos`.

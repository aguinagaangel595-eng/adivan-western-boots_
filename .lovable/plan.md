

## Plan: Rediseñar el sitio al estilo del HTML proporcionado

El usuario quiere que el sitio se vea como el diseño del archivo HTML subido. Las diferencias principales son:

### 1. Header/Navbar — Fondo negro, links blancos, estilo uppercase
- Cambiar el header a fondo negro sólido (`bg-black`) con links blancos
- Links en uppercase con letter-spacing amplio, hover en color camel
- Mantener el logo "ADIVAN" como texto (sin cambiar)
- Agregar subtítulo "Western Boots" debajo del logo

### 2. Hero — Layout de dos columnas con fondo negro/gradiente
- Cambiar de imagen fullscreen a un layout de dos columnas: texto a la izquierda, imagen con bordes redondeados a la derecha
- Fondo con gradiente radial negro (no imagen de fondo)
- Agregar tag/badge "Autenticidad en cada puntada" con borde pill
- Título grande: "La piel cobra vida con ADIVAN."
- Dos CTAs con bordes redondeados (pill)
- Imagen con label overlay en la parte inferior

### 3. Tienda/Catálogo — Filtros por categoría + más productos
- Agregar pills de filtro por categoría (Todo, Botas, Cinturones, Carteras, Bolsas, Accesorios)
- Cards con bordes más redondeados (1.5rem), sombra suave, badge de categoría dark
- Precios en formato MXN ($1,299.00)
- Agregar descripción corta a cada producto
- Grid de 4 columnas en desktop (en vez de 3)

### 4. Secciones Nosotros y Oficio — Actualizar contenido
- Nosotros: fondo paper/beige, texto actualizado con checklist de valores
- Oficio: layout con pasos numerados (Paso 01-04) con borde izquierdo

### 5. Contacto — Formulario mejorado + resumen de carrito
- Agregar campos: tipo de consulta (select), teléfono
- Info de contacto visible (email, teléfono, ubicación)
- Sección de resumen rápido de carrito debajo del formulario

### 6. Footer — Simplificado, fondo negro oscuro
- Layout más compacto en 3 columnas
- Agregar TikTok a redes sociales

### 7. WhatsApp flotante
- Botón flotante verde en esquina inferior derecha (fijo)

### 8. Carrito funcional
- Estado global del carrito con context/state
- Modal/sheet del carrito con items, cantidades (+/-), eliminar, total
- Badge con contador en el header
- Funcionalidad de "Comprar ahora" que agrega al carrito

### Archivos a modificar:
- `src/index.css` — Ajustar variables y agregar estilos (pill, process-step, etc.)
- `src/components/Header.tsx` — Rediseño completo con fondo negro
- `src/components/Hero.tsx` — Layout dos columnas con gradiente
- `src/components/ProductCard.tsx` — Nuevo diseño con descripción y badge
- `src/components/Footer.tsx` — Simplificar y oscurecer
- `src/pages/Index.tsx` — Actualizar contenido y productos
- `src/pages/Shop.tsx` — Agregar filtros, más productos, grid 4 cols
- `src/pages/About.tsx` — Actualizar contenido
- `src/pages/Craftsmanship.tsx` — Pasos numerados con borde
- `src/pages/Contact.tsx` — Formulario mejorado + info contacto

### Archivos nuevos:
- `src/components/WhatsAppButton.tsx` — Botón flotante
- `src/context/CartContext.tsx` — Estado global del carrito
- `src/components/CartModal.tsx` — Modal del carrito

### Nota:
- El logo "ADIVAN" se mantiene como texto, sin cambios
- Se usarán imágenes de Pexels (URLs externas) como en el HTML original para las nuevas imágenes de productos


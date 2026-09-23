# Agente de WhatsApp — ADIVAN

Agente que contesta WhatsApp automáticamente usando el catálogo real de la tienda, guía la venta hasta juntar todos los datos del pedido, lo guarda en Supabase y te avisa a ti por WhatsApp. Si el cliente pide mayoreo, grabado personalizado, tiene una queja o pide hablar con alguien, deja de responder y te avisa para que tomes tú la conversación.

## Arquitectura

```
Cliente WhatsApp
      │
      ▼
Meta (WhatsApp Cloud API)
      │  POST
      ▼
/api/whatsapp  (función serverless en Vercel)
      │
      ├─ valida firma (WHATSAPP_APP_SECRET)
      ├─ guarda mensaje en Supabase (idempotente por wamid)
      ├─ lee catálogo vigente + historial reciente de Supabase
      ├─ llama a Claude (tool use: registrar_pedido / escalar_a_humano)
      ├─ responde al cliente por WhatsApp
      └─ si hubo pedido o escalación, te avisa por WhatsApp (plantilla)

src/data/products.ts  ──(npm run sync:catalogo)──▶  tabla `productos` en Supabase
```

`src/data/products.ts` sigue siendo la única fuente de verdad del catálogo (la usa también la tienda). El agente **nunca** lee ese archivo ni tiene precios en el prompt: en cada mensaje consulta la tabla `productos` de Supabase, que se llena corriendo el script de sincronización.

## 1. Crear el proyecto en Supabase

1. Entra a [supabase.com](https://supabase.com) → **New project**. Elige una contraseña de base de datos y guárdala.
2. Cuando termine de aprovisionarse, ve a **SQL Editor** → **New query**, pega el contenido de [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql) y ejecútalo. Esto crea las tablas `productos`, `conversaciones`, `mensajes`, `pedidos` y sus políticas de seguridad.
3. Ve a **Project Settings → API** y copia:
   - **Project URL** → lo usarás como `SUPABASE_URL` y `VITE_SUPABASE_URL`.
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`.
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (¡secreta! nunca la pongas en variables `VITE_*` ni en código de navegador).
4. Crea tu usuario para entrar al panel: **Authentication → Users → Add user**, con tu correo y una contraseña. Con eso entras en `/admin/pedidos`.

## 2. Crear la app de WhatsApp en Meta for Developers

1. Entra a [developers.facebook.com](https://developers.facebook.com/) → **My Apps → Create App** → tipo **Business**.
2. Dentro de la app, agrega el producto **WhatsApp**.
3. En **WhatsApp → API Setup** vas a ver un número de prueba gratis y un **token temporal** (dura 24h, sirve para probar). Copia:
   - **Phone number ID** → `WHATSAPP_PHONE_NUMBER_ID`.
   - **Temporary access token** → `WHATSAPP_TOKEN` (para producción genera uno permanente, ver paso 5).
4. En **App settings → Basic**, copia el **App Secret** → `WHATSAPP_APP_SECRET`.
5. Para un token que no expire: **Business Settings → Users → System users** → crea uno, asígnale la app y el permiso `whatsapp_business_messaging`, y genera un token sin caducidad desde ahí.
6. Define tú mismo un valor cualquiera (una contraseña larga inventada) para `WHATSAPP_VERIFY_TOKEN` — lo vas a pegar también en el paso 4.

## 3. Crear las plantillas de notificación (para avisarte a ti)

WhatsApp no deja mandar texto libre a un número si ese número no le escribió primero a la empresa en las últimas 24h — y tú no vas a estar escribiéndole al bot cada día. Por eso tus avisos usan **plantillas aprobadas**, que sí pueden llegar en cualquier momento.

En **WhatsApp → Message Templates → Create Template**, crea estas dos (categoría **Utility**, idioma **Spanish (MEX)**):

**`adivan_nuevo_pedido`**
```
🔔 Pedido nuevo {{1}}
Cliente: {{2}} ({{3}})
Producto: {{4}}
Piel: {{5}}
Envío: {{6}}
Pago: {{7}}
Notas: {{8}}
```

**`adivan_requiere_atencion`**
```
⚠️ Conversación requiere atención
Teléfono: {{1}}
Motivo: {{2}}
```

La aprobación de Meta suele tardar minutos u horas. Mientras no estén aprobadas, el envío del aviso falla silenciosamente (el webhook no se cae por eso, solo se queda sin avisarte — revisa los logs de Vercel si no te llegan avisos).

## 4. Variables de entorno

Copia `.env.example` a `.env` y llena todo con lo que juntaste arriba, incluyendo:

- `OWNER_PHONE`: tu número con código de país, sin `+` (ej. `524791234567`).
- `ANTHROPIC_API_KEY`: de [console.anthropic.com](https://console.anthropic.com).

Sube las mismas variables a **Vercel → Project Settings → Environment Variables** (todas como server-side, excepto `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, que si necesitan ir también expuestas al build del frontend — en Vercel, cualquier variable con prefijo `VITE_` ya se incluye correctamente en el build de Vite).

## 5. Instalar, sincronizar catálogo y probar local

```bash
npm install
npm run sync:catalogo   # sube src/data/products.ts a la tabla `productos`
npm run test:agente     # conversación por consola, sin tocar WhatsApp real
```

`test:agente` usa Supabase y Claude reales, así que sí necesitas `.env` lleno (menos las variables de `WHATSAPP_*`, esas no se usan en la prueba local — los avisos al dueño solo se imprimen en la terminal).

Corre `npm run sync:catalogo` cada vez que cambies precios/productos en `products.ts`. Si prefieres que sea automático, cambia el build command de Vercel a `npm run sync:catalogo && npm run build` (necesita `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` disponibles en tiempo de build, que ya estarán si las agregaste en el paso 4).

## 6. Deploy y conectar el webhook

1. Sube los cambios a `main` (o hazte tu propio deploy de Vercel si es otro proyecto). Vercel detecta `/api/whatsapp.ts` solo, no necesitas configurar nada extra.
2. En Meta, **WhatsApp → Configuration → Webhook → Edit**:
   - **Callback URL**: `https://adivanwesternboots.com/api/whatsapp`
   - **Verify token**: el mismo valor que pusiste en `WHATSAPP_VERIFY_TOKEN`.
   - Verifica y suscríbete al campo **`messages`**.
3. Mándale un WhatsApp al número de prueba (o al número real, una vez que lo migres de sandbox a producción) y confirma que el agente responde.

## 7. Panel de pedidos

`https://adivanwesternboots.com/admin/pedidos` — pide correo/contraseña (el usuario que creaste en el paso 1.4). Ahí ves:

- **Requieren atención**: conversaciones que el agente escaló, con botón para abrir el chat en WhatsApp Web y otro para "Reactivar agente" (vuelve a contestar solo en ese chat).
- **Pedidos**: todos los pedidos con folio, cliente, producto, envío, pago y fecha.

## Cosas a saber

- **No hay control de inventario.** Todo se trata como sobre pedido/artesanal — el agente nunca dice "agotado". Si más adelante quieres marcar productos sin stock, se agrega fácil (columna `disponible` en `productos`).
- **Productos con grabado a elegir** (`grabado_personalizable = true` en la tabla) el agente los escala directo a humano en vez de intentar cerrarlos solo, porque implican elegir un patrón por catálogo aparte — igual que ya lo manejas hoy por WhatsApp normal.
- **Historial**: el agente ve los últimos 20 mensajes de cada conversación (ajustable en `HISTORIAL_MAX_MENSAJES`, en `api/whatsapp.ts` y `scripts/test-agent-local.ts`).
- **Idempotencia**: si Meta reenvía el mismo mensaje (pasa seguido), el `message_id` (wamid) es único en la tabla `mensajes`, así que el segundo intento no genera una respuesta duplicada.
- **Modelo**: `claude-sonnet-5`, configurable en `server/agent.ts`.

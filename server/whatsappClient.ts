import crypto from "node:crypto";

const GRAPH_VERSION = "v21.0";

function apiUrl(path: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!phoneNumberId) throw new Error("Falta WHATSAPP_PHONE_NUMBER_ID en las variables de entorno.");
  return `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}${path}`;
}

function authHeader() {
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) throw new Error("Falta WHATSAPP_TOKEN en las variables de entorno.");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

/**
 * Verifica la firma X-Hub-Signature-256 que manda Meta en cada POST del webhook.
 * `rawBody` debe ser el cuerpo crudo (Buffer) tal como llegó, antes de hacer JSON.parse.
 */
export function verificarFirmaMeta(rawBody: Buffer, firmaHeader: string | undefined): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) throw new Error("Falta WHATSAPP_APP_SECRET en las variables de entorno.");
  if (!firmaHeader || !firmaHeader.startsWith("sha256=")) return false;

  const firmaEsperada = crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const firmaRecibida = firmaHeader.slice("sha256=".length);

  const a = Buffer.from(firmaEsperada, "hex");
  const b = Buffer.from(firmaRecibida, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function enviarTexto(to: string, body: string): Promise<void> {
  const res = await fetch(apiUrl("/messages"), {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body, preview_url: false },
    }),
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`Error enviando texto por WhatsApp (${res.status}): ${detalle}`);
  }
}

/**
 * Manda un mensaje usando una plantilla aprobada por Meta. Necesario para avisarte
 * a ti (OWNER_PHONE) de pedidos/escalaciones, porque esos mensajes los inicia la
 * empresa y pueden llegar fuera de la ventana de 24h de un mensaje de texto libre.
 */
export async function enviarPlantilla(
  to: string,
  nombrePlantilla: string,
  parametros: string[],
  idioma = "es_MX"
): Promise<void> {
  // Los parámetros de una plantilla de WhatsApp no pueden llevar saltos de línea.
  const parametrosSeguros = parametros.map((p) => p.replace(/\r?\n/g, " · "));

  const res = await fetch(apiUrl("/messages"), {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: nombrePlantilla,
        language: { code: idioma },
        components: [
          {
            type: "body",
            parameters: parametrosSeguros.map((text) => ({ type: "text", text })),
          },
        ],
      },
    }),
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`Error enviando plantilla "${nombrePlantilla}" (${res.status}): ${detalle}`);
  }
}

export interface MensajeEntrante {
  messageId: string;
  from: string; // teléfono en formato de WhatsApp (sin '+')
  nombreContacto?: string;
  texto: string | null; // null si es un tipo de mensaje que no manejamos (imagen, audio, etc.)
}

/** Extrae el primer mensaje de texto del payload que manda Meta al webhook. Devuelve null si no hay mensajes nuevos (ej. es un evento de status/entregado). */
export function extraerMensajeEntrante(payload: unknown): MensajeEntrante | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = (payload as any)?.entry?.[0];
    const value = entry?.changes?.[0]?.value;
    const mensaje = value?.messages?.[0];
    if (!mensaje) return null;

    const nombreContacto = value?.contacts?.[0]?.profile?.name as string | undefined;
    const texto =
      mensaje.type === "text"
        ? (mensaje.text?.body as string)
        : mensaje.type === "button"
        ? (mensaje.button?.text as string)
        : mensaje.type === "interactive"
        ? (mensaje.interactive?.button_reply?.title ?? mensaje.interactive?.list_reply?.title ?? null)
        : null;

    return {
      messageId: mensaje.id as string,
      from: mensaje.from as string,
      nombreContacto,
      texto: texto ?? null,
    };
  } catch {
    return null;
  }
}

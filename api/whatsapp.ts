import type { VercelRequest, VercelResponse } from "@vercel/node";
import { correrAgente, enviarNotificacionesDueno } from "../server/agent.js";
import { fetchCatalogo } from "../server/catalog.js";
import {
  getHistorialReciente,
  getOrCreateConversacion,
  guardarMensaje,
  mensajeYaProcesado,
} from "../server/db.js";
import { enviarTexto, extraerMensajeEntrante, verificarFirmaMeta } from "../server/whatsappClient.js";

// Desactivamos el body parser automático de Vercel: necesitamos el cuerpo
// crudo (bytes exactos) para validar la firma X-Hub-Signature-256 de Meta.
export const config = {
  api: { bodyParser: false },
};

const HISTORIAL_MAX_MENSAJES = 20;

async function leerCuerpoCrudo(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return manejarVerificacion(req, res);
  }
  if (req.method === "POST") {
    return manejarWebhook(req, res);
  }
  res.status(405).send("Method Not Allowed");
}

function manejarVerificacion(req: VercelRequest, res: VercelResponse) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(String(challenge ?? ""));
    return;
  }
  res.status(403).send("Forbidden");
}

async function manejarWebhook(req: VercelRequest, res: VercelResponse) {
  let rawBody: Buffer;
  try {
    rawBody = await leerCuerpoCrudo(req);
  } catch {
    res.status(400).send("No se pudo leer el cuerpo de la petición.");
    return;
  }

  const firmaValida = verificarFirmaMeta(rawBody, req.headers["x-hub-signature-256"] as string | undefined);
  if (!firmaValida) {
    res.status(401).send("Firma inválida.");
    return;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    res.status(400).send("JSON inválido.");
    return;
  }

  // Respondemos 200 lo antes posible: Meta reintenta si no contesta rápido,
  // y cualquier error de aquí en adelante ya no debe traducirse en reintentos
  // que dupliquen mensajes (la idempotencia por wamid ya nos protege igual).
  try {
    await procesarEvento(payload);
  } catch (err) {
    console.error("Error procesando webhook de WhatsApp:", err);
  }

  res.status(200).send("OK");
}

async function procesarEvento(payload: unknown) {
  const entrante = extraerMensajeEntrante(payload);
  if (!entrante) return; // eventos de status (entregado/leído) u otros tipos que no manejamos

  if (await mensajeYaProcesado(entrante.messageId)) return; // Meta reenvió el mismo evento

  const conversacion = await getOrCreateConversacion(entrante.from, entrante.nombreContacto);

  if (entrante.texto === null) {
    // Tipo de mensaje que no sabemos leer (imagen, audio, ubicación...) — lo dejamos
    // registrado para el historial/panel, pero no lo mandamos a Claude como texto.
    await guardarMensaje({
      conversacionId: conversacion.id,
      messageId: entrante.messageId,
      direccion: "entrante",
      rol: "user",
      contenido: "[Mensaje no soportado: imagen, audio, ubicación u otro adjunto]",
    });
    if (conversacion.estado === "activa") {
      await enviarTexto(
        entrante.from,
        "Por ahora solo puedo leer texto por aquí 🙏 ¿Me lo escribes en un mensaje?"
      );
    }
    return;
  }

  await guardarMensaje({
    conversacionId: conversacion.id,
    messageId: entrante.messageId,
    direccion: "entrante",
    rol: "user",
    contenido: entrante.texto,
  });

  if (conversacion.estado === "requiere_humano") {
    // Ya está escalada: guardamos el mensaje para que quede en el historial/panel,
    // pero el agente deja de responder en este chat hasta que se reactive.
    return;
  }

  const [historial, catalogo] = await Promise.all([
    getHistorialReciente(conversacion.id, HISTORIAL_MAX_MENSAJES),
    fetchCatalogo(),
  ]);

  const resultado = await correrAgente({
    historial,
    catalogo,
    conversacionId: conversacion.id,
    telefonoConversacion: entrante.from,
  });

  await guardarMensaje({
    conversacionId: conversacion.id,
    direccion: "saliente",
    rol: "assistant",
    contenido: resultado.respuestaTexto,
  });

  await enviarTexto(entrante.from, resultado.respuestaTexto);

  await enviarNotificacionesDueno(resultado.notificacionesDueno);
}

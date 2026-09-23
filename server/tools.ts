import type Anthropic from "@anthropic-ai/sdk";
import { registrarPedido as insertarPedido } from "./db";
import { setEstadoConversacion } from "./db";
import { enviarPlantilla } from "./whatsappClient";
import type { ProductoDB } from "./types";

export const TOOLS: Anthropic.Tool[] = [
  {
    name: "registrar_pedido",
    description:
      "Guarda un pedido ya confirmado por el cliente. Solo llámala después de repetirle el resumen completo y que el cliente lo confirme explícitamente (sí, correcto, va, etc.). No la llames si falta algún dato obligatorio.",
    input_schema: {
      type: "object",
      properties: {
        nombre: { type: "string", description: "Nombre completo del cliente." },
        telefono: {
          type: "string",
          description: "Teléfono de contacto. Si el cliente no da uno distinto, usa el número desde el que escribe.",
        },
        producto_id: {
          type: "integer",
          description: "id del producto en el catálogo, si el pedido corresponde a un producto del catálogo.",
        },
        producto_nombre: { type: "string", description: "Nombre del producto/modelo tal como aparece en el catálogo." },
        piel: { type: "string", description: "Tipo de piel/material (ej. 'piel de res', 'nobuck'). Tómalo de la descripción del catálogo si no es ambiguo." },
        color: { type: "string" },
        talla: { type: "string", description: "Vacío si el producto no maneja tallas (carteras, bolsos, sombreros, etc.)." },
        cantidad: { type: "integer", minimum: 1 },
        ciudad: { type: "string" },
        direccion: { type: "string", description: "Dirección completa de envío (calle, número, colonia, C.P.)." },
        forma_pago: { type: "string", description: "Ej. transferencia, depósito, efectivo contra entrega." },
        fecha_limite: { type: "string", description: "Formato AAAA-MM-DD. Omitir si no aplica." },
        notas: { type: "string" },
      },
      required: [
        "nombre",
        "telefono",
        "producto_nombre",
        "color",
        "cantidad",
        "ciudad",
        "direccion",
        "forma_pago",
      ],
    },
  },
  {
    name: "escalar_a_humano",
    description:
      "Pasa la conversación a atención humana y deja de responder automáticamente en ese chat. Úsala cuando: piden mayoreo, piden grabado o diseño personalizado, hay una queja, piden hablar con una persona, o no estás seguro de cómo responder.",
    input_schema: {
      type: "object",
      properties: {
        motivo: { type: "string", description: "Resumen breve de por qué se escala (1 línea)." },
      },
      required: ["motivo"],
    },
  },
];

interface ContextoTools {
  conversacionId: string;
  telefonoConversacion: string;
  catalogo: ProductoDB[];
}

export interface ResultadoTool {
  resultadoParaClaude: string;
  notificacionDueno?: { tipo: "pedido" | "escalacion"; parametros: string[] };
}

export async function ejecutarTool(
  nombreTool: string,
  input: Record<string, unknown>,
  ctx: ContextoTools
): Promise<ResultadoTool> {
  if (nombreTool === "registrar_pedido") {
    return ejecutarRegistrarPedido(input, ctx);
  }
  if (nombreTool === "escalar_a_humano") {
    return ejecutarEscalarHumano(input, ctx);
  }
  return { resultadoParaClaude: `Herramienta desconocida: ${nombreTool}` };
}

async function ejecutarRegistrarPedido(
  input: Record<string, unknown>,
  ctx: ContextoTools
): Promise<ResultadoTool> {
  const nombre = String(input.nombre ?? "").trim();
  const telefono = String(input.telefono ?? ctx.telefonoConversacion).trim();
  const productoNombre = String(input.producto_nombre ?? "").trim();
  const color = String(input.color ?? "").trim();
  const cantidad = Number(input.cantidad ?? 1);
  const ciudad = String(input.ciudad ?? "").trim();
  const direccion = String(input.direccion ?? "").trim();
  const formaPago = String(input.forma_pago ?? "").trim();

  if (!nombre || !productoNombre || !color || !ciudad || !direccion || !formaPago || !cantidad) {
    return {
      resultadoParaClaude:
        "ERROR: faltan campos obligatorios (nombre, producto_nombre, color, cantidad, ciudad, direccion o forma_pago). Pregúntale al cliente lo que falte y vuelve a intentar.",
    };
  }

  const productoId = typeof input.producto_id === "number" ? input.producto_id : undefined;
  const productoCatalogo = productoId ? ctx.catalogo.find((p) => p.id === productoId) : undefined;

  const pedido = await insertarPedido({
    nombre,
    telefono,
    producto_id: productoId,
    producto_nombre: productoNombre,
    piel: input.piel ? String(input.piel) : undefined,
    color,
    talla: input.talla ? String(input.talla) : undefined,
    cantidad,
    ciudad,
    direccion,
    forma_pago: formaPago,
    fecha_limite: input.fecha_limite ? String(input.fecha_limite) : undefined,
    notas: input.notas ? String(input.notas) : undefined,
    conversacionId: ctx.conversacionId,
    precioUnitario: productoCatalogo?.precio ?? null,
  });

  const resumen = [
    `Cliente: ${nombre} (${telefono})`,
    `Producto: ${productoNombre}${pedido.color ? ` — ${pedido.color}` : ""}${pedido.talla ? `, talla ${pedido.talla}` : ""} x${cantidad}`,
    pedido.piel ? `Piel: ${pedido.piel}` : null,
    `Envío: ${ciudad} — ${direccion}`,
    `Pago: ${formaPago}`,
    pedido.fecha_limite ? `Fecha límite: ${pedido.fecha_limite}` : null,
    pedido.notas ? `Notas: ${pedido.notas}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    resultadoParaClaude: `Pedido guardado con folio ${pedido.folio}. Confírmaselo al cliente con ese folio.`,
    notificacionDueno: {
      tipo: "pedido",
      parametros: [
        pedido.folio,
        nombre,
        telefono,
        `${productoNombre}${pedido.color ? " - " + pedido.color : ""}${pedido.talla ? " talla " + pedido.talla : ""} x${cantidad}`,
        pedido.piel ?? "-",
        `${ciudad} - ${direccion}`,
        formaPago,
        [pedido.fecha_limite ? `Límite: ${pedido.fecha_limite}` : null, pedido.notas].filter(Boolean).join(" | ") || "-",
      ],
    },
  };
}

async function ejecutarEscalarHumano(
  input: Record<string, unknown>,
  ctx: ContextoTools
): Promise<ResultadoTool> {
  const motivo = String(input.motivo ?? "El cliente necesita atención humana.").trim();

  await setEstadoConversacion(ctx.conversacionId, "requiere_humano", motivo);

  return {
    resultadoParaClaude:
      "Conversación escalada. Despídete brevemente avisando que alguien del equipo lo va a atender en breve. No prometas un tiempo exacto.",
    notificacionDueno: {
      tipo: "escalacion",
      parametros: [ctx.telefonoConversacion, motivo],
    },
  };
}

export async function notificarDueno(notificacion: ResultadoTool["notificacionDueno"]) {
  const ownerPhone = process.env.OWNER_PHONE;
  if (!ownerPhone || !notificacion) return;

  if (notificacion.tipo === "pedido") {
    await enviarPlantilla(ownerPhone, "adivan_nuevo_pedido", notificacion.parametros);
  } else {
    await enviarPlantilla(ownerPhone, "adivan_requiere_atencion", notificacion.parametros);
  }
}

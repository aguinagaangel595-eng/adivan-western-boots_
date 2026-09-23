import { getSupabaseAdmin } from "./supabaseAdmin";
import type {
  ConversacionDB,
  DireccionMensaje,
  EstadoConversacion,
  MensajeDB,
  PedidoDB,
  RegistrarPedidoInput,
  RolMensaje,
} from "./types";

export async function getOrCreateConversacion(
  telefono: string,
  nombreContacto?: string
): Promise<ConversacionDB> {
  const supabase = getSupabaseAdmin();

  const { data: existente, error: errBusqueda } = await supabase
    .from("conversaciones")
    .select("*")
    .eq("telefono", telefono)
    .maybeSingle();

  if (errBusqueda) throw new Error(`Error buscando conversación: ${errBusqueda.message}`);
  if (existente) return existente as unknown as ConversacionDB;

  const { data: creada, error: errCrear } = await supabase
    .from("conversaciones")
    .insert({ telefono, nombre_contacto: nombreContacto ?? null })
    .select("*")
    .single();

  if (errCrear) throw new Error(`Error creando conversación: ${errCrear.message}`);
  return creada as unknown as ConversacionDB;
}

export async function setEstadoConversacion(
  conversacionId: string,
  estado: EstadoConversacion,
  motivoEscalacion?: string
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("conversaciones")
    .update({ estado, motivo_escalacion: motivoEscalacion ?? null })
    .eq("id", conversacionId);
  if (error) throw new Error(`Error actualizando estado de conversación: ${error.message}`);
}

/** true si ya procesamos este wamid antes (evita respuestas duplicadas si Meta reenvía el evento) */
export async function mensajeYaProcesado(messageId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("mensajes")
    .select("id")
    .eq("message_id", messageId)
    .maybeSingle();
  if (error) throw new Error(`Error verificando idempotencia: ${error.message}`);
  return !!data;
}

export async function guardarMensaje(params: {
  conversacionId: string;
  messageId?: string | null;
  direccion: DireccionMensaje;
  rol: RolMensaje;
  contenido: string;
}): Promise<MensajeDB> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("mensajes")
    .insert({
      conversacion_id: params.conversacionId,
      message_id: params.messageId ?? null,
      direccion: params.direccion,
      rol: params.rol,
      contenido: params.contenido,
    })
    .select("*")
    .single();
  if (error) throw new Error(`Error guardando mensaje: ${error.message}`);
  return data as unknown as MensajeDB;
}

/** Últimos N mensajes de la conversación, en orden cronológico (viejo → nuevo). */
export async function getHistorialReciente(
  conversacionId: string,
  limite = 20
): Promise<MensajeDB[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .eq("conversacion_id", conversacionId)
    .order("creado_en", { ascending: false })
    .limit(limite);
  if (error) throw new Error(`Error leyendo historial: ${error.message}`);
  return ((data ?? []) as unknown as MensajeDB[]).reverse();
}

export async function registrarPedido(
  input: RegistrarPedidoInput & { conversacionId: string | null; precioUnitario: number | null }
): Promise<PedidoDB> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pedidos")
    .insert({
      conversacion_id: input.conversacionId,
      telefono: input.telefono,
      nombre_cliente: input.nombre,
      producto_id: input.producto_id ?? null,
      producto_nombre: input.producto_nombre,
      piel: input.piel ?? null,
      color: input.color ?? null,
      talla: input.talla ?? null,
      cantidad: input.cantidad,
      precio_unitario: input.precioUnitario,
      ciudad: input.ciudad,
      direccion: input.direccion,
      forma_pago: input.forma_pago,
      fecha_limite: input.fecha_limite ?? null,
      notas: input.notas ?? null,
    })
    .select("*")
    .single();
  if (error) throw new Error(`Error registrando pedido: ${error.message}`);
  return data as unknown as PedidoDB;
}

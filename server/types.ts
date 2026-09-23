// Tipos compartidos entre el webhook (api/whatsapp.ts), el agente y los scripts.

export interface ProductoDB {
  id: number;
  nombre: string;
  precio: number;
  precio_original: number | null;
  grupo: string;
  categoria: string;
  genero: string | null;
  descripcion: string;
  tallas: (number | string)[];
  colores: string[];
  grabado_personalizable: boolean;
}

export type EstadoConversacion = "activa" | "requiere_humano" | "cerrada";

export interface ConversacionDB {
  id: string;
  telefono: string;
  nombre_contacto: string | null;
  estado: EstadoConversacion;
  motivo_escalacion: string | null;
  creada_en: string;
  actualizada_en: string;
}

export type RolMensaje = "user" | "assistant" | "system";
export type DireccionMensaje = "entrante" | "saliente";

export interface MensajeDB {
  id: string;
  conversacion_id: string;
  message_id: string | null;
  direccion: DireccionMensaje;
  rol: RolMensaje;
  contenido: string;
  creado_en: string;
}

export interface RegistrarPedidoInput {
  nombre: string;
  telefono: string;
  producto_id?: number;
  producto_nombre: string;
  piel?: string;
  color?: string;
  talla?: string;
  cantidad: number;
  ciudad: string;
  direccion: string;
  forma_pago: string;
  fecha_limite?: string;
  notas?: string;
}

export interface PedidoDB extends RegistrarPedidoInput {
  id: string;
  folio: string;
  conversacion_id: string | null;
  precio_unitario: number | null;
  estado: "listo" | "confirmado" | "cancelado";
  creado_en: string;
}

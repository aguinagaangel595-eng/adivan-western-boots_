-- ADIVAN — Agente de WhatsApp
-- Esquema inicial: catálogo, conversaciones, mensajes y pedidos.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- CATÁLOGO (sincronizado desde src/data/products.ts vía npm run sync:catalogo)
-- ─────────────────────────────────────────────────────────────
create table if not exists productos (
  id integer primary key,               -- mismo id que en products.ts
  nombre text not null,
  precio numeric(10,2) not null,
  precio_original numeric(10,2),
  grupo text not null,
  categoria text not null,
  genero text,                          -- 'Dama' | 'Hombre' | null (no aplica)
  descripcion text not null,
  tallas jsonb not null default '[]',   -- ej. [22,23,24,...] o ["S","M","L"] o []
  colores jsonb not null default '[]',  -- nombres de color disponibles
  grabado_personalizable boolean not null default false, -- true = el cliente elige patrón de grabado (escalar a humano)
  actualizado_en timestamptz not null default now()
);

comment on table productos is 'Espejo de src/data/products.ts. Se actualiza con npm run sync:catalogo, nunca a mano salvo pruebas.';
comment on column productos.grabado_personalizable is 'Si es true, el agente debe escalar a humano en vez de cerrar la venta (grabado a elegir por catálogo aparte).';

-- ─────────────────────────────────────────────────────────────
-- CONVERSACIONES
-- ─────────────────────────────────────────────────────────────
do $$ begin
  create type estado_conversacion as enum ('activa', 'requiere_humano', 'cerrada');
exception when duplicate_object then null; end $$;

create table if not exists conversaciones (
  id uuid primary key default gen_random_uuid(),
  telefono text not null unique,        -- formato E.164, ej. 524793203429
  nombre_contacto text,
  estado estado_conversacion not null default 'activa',
  motivo_escalacion text,
  creada_en timestamptz not null default now(),
  actualizada_en timestamptz not null default now()
);

create index if not exists idx_conversaciones_estado on conversaciones (estado);

-- ─────────────────────────────────────────────────────────────
-- MENSAJES (historial + idempotencia por wamid)
-- ─────────────────────────────────────────────────────────────
do $$ begin
  create type rol_mensaje as enum ('user', 'assistant', 'system');
exception when duplicate_object then null; end $$;

create table if not exists mensajes (
  id uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references conversaciones(id) on delete cascade,
  message_id text unique,               -- wamid de WhatsApp; null para mensajes generados internamente
  direccion text not null check (direccion in ('entrante', 'saliente')),
  rol rol_mensaje not null,
  contenido text not null,
  creado_en timestamptz not null default now()
);

create index if not exists idx_mensajes_conversacion on mensajes (conversacion_id, creado_en desc);

-- ─────────────────────────────────────────────────────────────
-- PEDIDOS
-- ─────────────────────────────────────────────────────────────
do $$ begin
  create type estado_pedido as enum ('listo', 'confirmado', 'cancelado');
exception when duplicate_object then null; end $$;

create sequence if not exists pedidos_folio_seq start 1;

create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  folio text not null unique default ('ADV-' || lpad(nextval('pedidos_folio_seq')::text, 6, '0')),
  conversacion_id uuid references conversaciones(id) on delete set null,
  telefono text not null,
  nombre_cliente text not null,
  producto_id integer references productos(id),
  producto_nombre text not null,        -- snapshot: nombre del producto al momento del pedido
  piel text,
  color text,
  talla text,
  cantidad integer not null default 1 check (cantidad > 0),
  precio_unitario numeric(10,2),        -- snapshot del precio al momento del pedido
  ciudad text not null,
  direccion text not null,
  forma_pago text not null,
  fecha_limite date,
  notas text,
  estado estado_pedido not null default 'listo',
  creado_en timestamptz not null default now()
);

create index if not exists idx_pedidos_estado on pedidos (estado);
create index if not exists idx_pedidos_conversacion on pedidos (conversacion_id);

-- ─────────────────────────────────────────────────────────────
-- Trigger para actualizar `actualizada_en` en conversaciones
-- ─────────────────────────────────────────────────────────────
create or replace function set_actualizada_en()
returns trigger as $$
begin
  new.actualizada_en = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_conversaciones_actualizada_en on conversaciones;
create trigger trg_conversaciones_actualizada_en
  before update on conversaciones
  for each row execute function set_actualizada_en();

-- ─────────────────────────────────────────────────────────────
-- RLS: el webhook usa la service role key (bypassa RLS).
-- El panel /admin/pedidos usa un usuario autenticado de Supabase y solo lee.
-- ─────────────────────────────────────────────────────────────
alter table productos enable row level security;
alter table conversaciones enable row level security;
alter table mensajes enable row level security;
alter table pedidos enable row level security;

create policy "lectura autenticada - productos" on productos
  for select using (auth.role() = 'authenticated');

create policy "lectura autenticada - conversaciones" on conversaciones
  for select using (auth.role() = 'authenticated');

create policy "actualizacion autenticada - conversaciones" on conversaciones
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "lectura autenticada - mensajes" on mensajes
  for select using (auth.role() = 'authenticated');

create policy "lectura autenticada - pedidos" on pedidos
  for select using (auth.role() = 'authenticated');

create policy "actualizacion autenticada - pedidos" on pedidos
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

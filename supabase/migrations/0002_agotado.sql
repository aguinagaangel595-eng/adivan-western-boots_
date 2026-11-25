-- Productos agotados: se llena desde src/data/products.ts (campo `agotado`) con npm run sync:catalogo.
--   null            = hay stock
--   'no-pedir'      = agotado, NO se puede pedir
--   'sobre-pedido'  = agotado, se puede pedir pero tarda más en salir
alter table productos
  add column if not exists agotado text
  check (agotado in ('no-pedir', 'sobre-pedido'));

comment on column productos.agotado is 'null = hay stock; no-pedir = agotado y no se puede pedir; sobre-pedido = agotado, se puede pedir pero tarda más.';

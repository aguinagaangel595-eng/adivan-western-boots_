import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseBrowser } from "@/lib/supabaseClient";

interface Pedido {
  id: string;
  folio: string;
  telefono: string;
  nombre_cliente: string;
  producto_nombre: string;
  piel: string | null;
  color: string | null;
  talla: string | null;
  cantidad: number;
  precio_unitario: number | null;
  ciudad: string;
  direccion: string;
  forma_pago: string;
  fecha_limite: string | null;
  notas: string | null;
  estado: string;
  creado_en: string;
}

interface Conversacion {
  id: string;
  telefono: string;
  nombre_contacto: string | null;
  estado: string;
  motivo_escalacion: string | null;
  actualizada_en: string;
}

const formatPrecio = (n: number | null) =>
  n == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

const AdminPedidos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [escaladas, setEscaladas] = useState<Conversacion[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    setCargando(true);
    const supabase = getSupabaseBrowser();
    const [{ data: pedidosData, error: errPedidos }, { data: convData, error: errConv }] = await Promise.all([
      supabase.from("pedidos").select("*").order("creado_en", { ascending: false }).limit(100),
      supabase
        .from("conversaciones")
        .select("*")
        .eq("estado", "requiere_humano")
        .order("actualizada_en", { ascending: false }),
    ]);

    if (errPedidos) toast({ title: "Error cargando pedidos", description: errPedidos.message, variant: "destructive" });
    if (errConv) toast({ title: "Error cargando conversaciones", description: errConv.message, variant: "destructive" });

    setPedidos((pedidosData as Pedido[]) ?? []);
    setEscaladas((convData as Conversacion[]) ?? []);
    setCargando(false);
  }, [toast]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const reactivar = async (id: string) => {
    const { error } = await getSupabaseBrowser().from("conversaciones").update({ estado: "activa" }).eq("id", id);
    if (error) {
      toast({ title: "No se pudo reactivar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Conversación reactivada", description: "El agente vuelve a responder en ese chat." });
    cargar();
  };

  const cerrarSesion = async () => {
    await getSupabaseBrowser().auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[hsl(30,9%,6%)] text-white">
      <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <h1 className="font-serif text-2xl font-bold">Panel ADIVAN — Pedidos</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" onClick={cargar}>
            Actualizar
          </Button>
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-10 max-w-7xl mx-auto">
        {/* Conversaciones que requieren atención humana */}
        <section>
          <h2 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2">
            Requieren atención
            {escaladas.length > 0 && <Badge variant="destructive">{escaladas.length}</Badge>}
          </h2>
          {escaladas.length === 0 ? (
            <p className="text-white/50 text-sm">Sin conversaciones pendientes de atención humana.</p>
          ) : (
            <div className="space-y-3">
              {escaladas.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      {c.nombre_contacto || "Sin nombre"} — {c.telefono}
                    </p>
                    <p className="text-sm text-white/60">{c.motivo_escalacion || "Sin motivo registrado"}</p>
                    <p className="text-xs text-white/40 mt-1">{new Date(c.actualizada_en).toLocaleString("es-MX")}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${c.telefono}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 rounded-full bg-[#25D366] text-white font-semibold"
                    >
                      Abrir WhatsApp
                    </a>
                    <Button size="sm" className="rounded-full" onClick={() => reactivar(c.id)}>
                      Reactivar agente
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pedidos */}
        <section>
          <h2 className="font-serif text-lg font-semibold mb-3">Pedidos ({pedidos.length})</h2>
          {cargando ? (
            <p className="text-white/50 text-sm">Cargando…</p>
          ) : pedidos.length === 0 ? (
            <p className="text-white/50 text-sm">Todavía no hay pedidos registrados.</p>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60">Folio</TableHead>
                    <TableHead className="text-white/60">Cliente</TableHead>
                    <TableHead className="text-white/60">Producto</TableHead>
                    <TableHead className="text-white/60">Envío</TableHead>
                    <TableHead className="text-white/60">Pago</TableHead>
                    <TableHead className="text-white/60">Estado</TableHead>
                    <TableHead className="text-white/60">Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((p) => (
                    <TableRow key={p.id} className="border-white/10">
                      <TableCell className="font-mono text-sm">{p.folio}</TableCell>
                      <TableCell>
                        <p className="font-medium">{p.nombre_cliente}</p>
                        <p className="text-xs text-white/50">{p.telefono}</p>
                      </TableCell>
                      <TableCell>
                        <p>{p.producto_nombre}</p>
                        <p className="text-xs text-white/50">
                          {[p.piel, p.color, p.talla && `talla ${p.talla}`, `x${p.cantidad}`].filter(Boolean).join(" · ")}
                        </p>
                        <p className="text-xs text-white/40">{formatPrecio(p.precio_unitario)} c/u</p>
                      </TableCell>
                      <TableCell className="text-sm">
                        <p>{p.ciudad}</p>
                        <p className="text-xs text-white/50 max-w-[220px]">{p.direccion}</p>
                        {p.fecha_limite && <p className="text-xs text-amber-400">Límite: {p.fecha_limite}</p>}
                      </TableCell>
                      <TableCell className="text-sm">{p.forma_pago}</TableCell>
                      <TableCell>
                        <Badge variant={p.estado === "listo" ? "default" : "secondary"}>{p.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-white/50 whitespace-nowrap">
                        {new Date(p.creado_en).toLocaleString("es-MX")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPedidos;

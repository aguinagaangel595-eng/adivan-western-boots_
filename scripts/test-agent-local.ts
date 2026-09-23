// Simula una conversación de WhatsApp por consola, sin tocar la API de Meta.
// Usa Supabase y Claude reales (por eso sigue necesitando SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY y ANTHROPIC_API_KEY en tu .env), pero en vez de
// mandar mensajes por WhatsApp los imprime en la terminal.
//
// Uso:
//   npm run test:agente                  -> conversación de prueba nueva
//   npm run test:agente -- 5217771234567 -> continúa la conversación de ese teléfono

import "dotenv/config";
import readline from "node:readline/promises";
import { correrAgente } from "../server/agent";
import { fetchCatalogo } from "../server/catalog";
import { getHistorialReciente, getOrCreateConversacion, guardarMensaje } from "../server/db";

const HISTORIAL_MAX_MENSAJES = 20;

async function main() {
  const telefono = process.argv[2] ?? `test-${Date.now()}`;
  console.log(`\n🧪 Probando el agente de ADIVAN — teléfono simulado: ${telefono}`);
  console.log("Escribe como si fueras el cliente. Ctrl+C para salir.\n");

  const conversacion = await getOrCreateConversacion(telefono, "Cliente de prueba");

  if (conversacion.estado === "requiere_humano") {
    console.log(
      "⚠️  Esta conversación de prueba está marcada como 'requiere_humano' (el agente no respondería). " +
        "Reactívala en Supabase o usa otro teléfono para seguir probando.\n"
    );
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    for (;;) {
      const texto = await rl.question("Tú: ");
      if (!texto.trim()) continue;

      await guardarMensaje({
        conversacionId: conversacion.id,
        direccion: "entrante",
        rol: "user",
        contenido: texto,
      });

      const [historial, catalogo] = await Promise.all([
        getHistorialReciente(conversacion.id, HISTORIAL_MAX_MENSAJES),
        fetchCatalogo(),
      ]);

      const resultado = await correrAgente({
        historial,
        catalogo,
        conversacionId: conversacion.id,
        telefonoConversacion: telefono,
      });

      await guardarMensaje({
        conversacionId: conversacion.id,
        direccion: "saliente",
        rol: "assistant",
        contenido: resultado.respuestaTexto,
      });

      console.log(`ADIVAN: ${resultado.respuestaTexto}\n`);

      for (const n of resultado.notificacionesDueno) {
        if (!n) continue;
        console.log(`📣 [Se le avisaría al dueño por WhatsApp — plantilla "${n.tipo}"]`);
        console.log(`   ${n.parametros.join(" | ")}\n`);
      }
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error("Error en la prueba local:", err);
  process.exit(1);
});

import { Client } from "pg";
import { env } from "./env.js";

// Script exécuté manuellement (npm run db:test) pour vérifier que
// DATABASE_URL est correctement configuré, AVANT de brancher Prisma (Étape 5).
async function testConnection(): Promise<void> {
  const client = new Client({ connectionString: env.DATABASE_URL });

  try {
    console.log("🔌 Tentative de connexion à PostgreSQL...");
    await client.connect();

    const result = await client.query("SELECT current_database(), current_user, version();");
    const row = result.rows[0];

    console.log("✅ Connexion réussie !");
    console.log(`   Base de données : ${row.current_database}`);
    console.log(`   Utilisateur     : ${row.current_user}`);
    console.log(`   Version         : ${row.version.split(",")[0]}`);
  } catch (err) {
    console.error("❌ Échec de connexion à PostgreSQL :");
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

testConnection();

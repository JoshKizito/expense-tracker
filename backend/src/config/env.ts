import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis (voir .env.example)"),
  // JWT_SECRET sera requis à partir de l'Étape 6 (Authentification)
  JWT_SECRET: z.string().optional(),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variables d'environnement invalides :", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

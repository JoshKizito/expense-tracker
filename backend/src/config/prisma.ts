import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// En dev, tsx watch recharge le module à chaque changement de fichier.
// Sans singleton global, ça créerait une nouvelle connexion Prisma à chaque
// rechargement, jusqu'à épuiser le pool de connexions PostgreSQL.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (env.NODE_ENV === "development") {
  global.__prisma = prisma;
}

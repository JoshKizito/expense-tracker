import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { apiRouter } from "./modules/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export function createApp(): Express {
  const app = express();

  // Sécurité HTTP de base (headers)
  app.use(helmet());

  // CORS restreint aux origines autorisées (configurable via .env, séparées par des virgules)
const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // `origin` est undefined pour les requêtes sans navigateur (Postman, curl...)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origine non autorisée par CORS : ${origin}`));
      }
    },
    credentials: true,
  })
);

  // Logs des requêtes HTTP (format "dev" = coloré et concis, adapté au développement)
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  // Parsing du JSON entrant
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Toutes les routes API sont préfixées par /api
  app.use("/api", apiRouter);

  // 404 puis gestion centralisée des erreurs (ordre important : toujours en dernier)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Erreurs de validation Zod → 422 avec le détail des champs
  if (err instanceof ZodError) {
    res.status(422).json({
      error: "Erreur de validation",
      details: err.flatten().fieldErrors,
    });
    return;
  }

  // Erreurs métier connues (AppError et ses sous-classes)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Erreurs inattendues → log complet côté serveur, message générique côté client
  console.error("💥 Erreur non gérée :", err);
  res.status(500).json({
    error: "Erreur interne du serveur",
    ...(env.NODE_ENV === "development" && err instanceof Error ? { stack: err.stack } : {}),
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} introuvable` });
}

import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

interface ValidationSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

// Usage : router.post("/", validate({ body: createExpenseSchema }), controller.create)
// En cas d'échec, l'erreur ZodError remonte jusqu'à errorHandler (via asyncHandler ou next).
export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
}

import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerHandler, loginHandler, meHandler } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), registerHandler);
authRouter.post("/login", validate({ body: loginSchema }), loginHandler);
authRouter.get("/me", authenticate, meHandler);

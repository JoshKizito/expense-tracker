import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "./auth/auth.routes.js";
import { expensesRouter } from "./expenses/expenses.routes.js";
import { categoriesRouter } from "./categories/categories.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/expenses", expensesRouter);
apiRouter.use("/categories", categoriesRouter);

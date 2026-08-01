import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  createExpenseSchema,
  updateExpenseSchema,
  expenseIdParamSchema,
} from "./expenses.schema.js";
import {
  listExpensesHandler,
  createExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
} from "./expenses.controller.js";

export const expensesRouter = Router();

// Toutes les routes de dépenses nécessitent d'être connecté
expensesRouter.use(authenticate);

expensesRouter.get("/", listExpensesHandler);
expensesRouter.post("/", validate({ body: createExpenseSchema }), createExpenseHandler);
expensesRouter.put(
  "/:id",
  validate({ params: expenseIdParamSchema, body: updateExpenseSchema }),
  updateExpenseHandler
);
expensesRouter.delete(
  "/:id",
  validate({ params: expenseIdParamSchema }),
  deleteExpenseHandler
);

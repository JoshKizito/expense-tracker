import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  createGoalSchema,
  updateGoalSchema,
  addFundsSchema,
  goalIdParamSchema,
} from "./goals.schema.js";
import {
  listGoalsHandler,
  createGoalHandler,
  updateGoalHandler,
  addFundsHandler,
  deleteGoalHandler,
} from "./goals.controller.js";

export const goalsRouter = Router();

goalsRouter.use(authenticate);

goalsRouter.get("/", listGoalsHandler);
goalsRouter.post("/", validate({ body: createGoalSchema }), createGoalHandler);
goalsRouter.put("/:id", validate({ params: goalIdParamSchema, body: updateGoalSchema }), updateGoalHandler);
goalsRouter.post(
  "/:id/add-funds",
  validate({ params: goalIdParamSchema, body: addFundsSchema }),
  addFundsHandler
);
goalsRouter.delete("/:id", validate({ params: goalIdParamSchema }), deleteGoalHandler);

import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/AppError.js";
import * as goalsService from "./goals.service.js";

function requireUserId(req: Request): string {
  if (!req.userId) throw new UnauthorizedError();
  return req.userId;
}

export const listGoalsHandler = asyncHandler(async (req: Request, res: Response) => {
  const goals = await goalsService.listGoals(requireUserId(req));
  res.json({ goals });
});

export const createGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  const goal = await goalsService.createGoal(requireUserId(req), req.body);
  res.status(201).json({ goal });
});

export const updateGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  const goal = await goalsService.updateGoal(requireUserId(req), req.params.id as string, req.body);
  res.json({ goal });
});

export const addFundsHandler = asyncHandler(async (req: Request, res: Response) => {
  const goal = await goalsService.addFunds(requireUserId(req), req.params.id as string, req.body.amount);
  res.json({ goal });
});

export const deleteGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  await goalsService.deleteGoal(requireUserId(req), req.params.id as string);
  res.status(204).send();
});

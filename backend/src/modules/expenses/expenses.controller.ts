import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/AppError.js";
import * as expensesService from "./expenses.service.js";

function requireUserId(req: Request): string {
  if (!req.userId) throw new UnauthorizedError();
  return req.userId;
}

export const listExpensesHandler = asyncHandler(async (req: Request, res: Response) => {
  const expenses = await expensesService.listExpenses(requireUserId(req));
  res.json({ expenses });
});

export const createExpenseHandler = asyncHandler(async (req: Request, res: Response) => {
  const expense = await expensesService.createExpense(requireUserId(req), req.body);
  res.status(201).json({ expense });
});

export const updateExpenseHandler = asyncHandler(async (req: Request, res: Response) => {
  const expense = await expensesService.updateExpense(
    requireUserId(req),
    req.params.id as string,
    req.body
  );
  res.json({ expense });
});

export const deleteExpenseHandler = asyncHandler(async (req: Request, res: Response) => {
  await expensesService.deleteExpense(requireUserId(req), req.params.id as string);
  res.status(204).send();
});

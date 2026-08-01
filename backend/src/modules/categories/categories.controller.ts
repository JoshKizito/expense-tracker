import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/AppError.js";
import * as categoriesService from "./categories.service.js";

function requireUserId(req: Request): string {
  if (!req.userId) throw new UnauthorizedError();
  return req.userId;
}

export const listCategoriesHandler = asyncHandler(async (req: Request, res: Response) => {
  const categories = await categoriesService.listCategories(requireUserId(req));
  res.json({ categories });
});

export const createCategoryHandler = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoriesService.createCategory(requireUserId(req), req.body);
  res.status(201).json({ category });
});

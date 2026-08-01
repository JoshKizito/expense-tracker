import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateCategoryInput } from "./categories.schema.js";

export async function listCategories(userId: string) {
  return prisma.category.findMany({
    where: { OR: [{ isDefault: true }, { userId }] },
    orderBy: [{ isDefault: "desc" }, { name: "asc" }],
  });
}

export async function createCategory(userId: string, input: CreateCategoryInput) {
  const existing = await prisma.category.findFirst({
    where: { userId, name: input.name },
  });
  if (existing) {
    throw new AppError("Une catégorie avec ce nom existe déjà", 409);
  }

  return prisma.category.create({
    data: { ...input, userId, isDefault: false },
  });
}

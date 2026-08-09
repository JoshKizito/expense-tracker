import { prisma } from "../../config/prisma.js";
import { NotFoundError, ForbiddenError } from "../../utils/AppError.js";
import type { CreateExpenseInput, UpdateExpenseInput } from "./expenses.schema.js";

const withCategory = { category: true } as const;

export async function listExpenses(userId: string) {
  return prisma.expense.findMany({
    where: { userId },
    include: withCategory,
    orderBy: { date: "desc" },
  });
}

export async function getExpenseById(userId: string, expenseId: string) {
  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: withCategory,
  });

  if (!expense) throw new NotFoundError("Dépense");
  if (expense.userId !== userId) throw new ForbiddenError();

  return expense;
}

async function assertCategoryIsUsable(userId: string, categoryId: string) {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) throw new NotFoundError("Catégorie");
  if (!category.isDefault && category.userId !== userId) throw new ForbiddenError();
}

export async function createExpense(userId: string, input: CreateExpenseInput) {
  if (input.categoryId) {
    await assertCategoryIsUsable(userId, input.categoryId);
  }

  return prisma.expense.create({
    data: { ...input, userId },
    include: withCategory,
  });
}

export async function updateExpense(
  userId: string,
  expenseId: string,
  input: UpdateExpenseInput
) {
  await getExpenseById(userId, expenseId);

  if (input.categoryId) {
    await assertCategoryIsUsable(userId, input.categoryId);
  }

  const { categoryId, ...rest } = input;
  const data = categoryId !== undefined ? { ...rest, categoryId } : rest;

  return prisma.expense.update({
    where: { id: expenseId },
    data,
    include: withCategory,
  });
}

export async function deleteExpense(userId: string, expenseId: string) {
  await getExpenseById(userId, expenseId);
  await prisma.expense.delete({ where: { id: expenseId } });
}

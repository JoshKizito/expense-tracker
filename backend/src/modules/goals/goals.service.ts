import { prisma } from "../../config/prisma.js";
import { NotFoundError, ForbiddenError } from "../../utils/AppError.js";
import type { CreateGoalInput, UpdateGoalInput } from "./goals.schema.js";

export async function listGoals(userId: string) {
  return prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

async function getGoalById(userId: string, goalId: string) {
  const goal = await prisma.goal.findUnique({ where: { id: goalId } });
  if (!goal) throw new NotFoundError("Objectif");
  if (goal.userId !== userId) throw new ForbiddenError();
  return goal;
}

export async function createGoal(userId: string, input: CreateGoalInput) {
  return prisma.goal.create({ data: { ...input, userId } });
}

export async function updateGoal(userId: string, goalId: string, input: UpdateGoalInput) {
  await getGoalById(userId, goalId);
  return prisma.goal.update({ where: { id: goalId }, data: input });
}

// Incrémentation atomique côté base (évite tout risque de valeur écrasée
// si deux requêtes arrivaient en même temps).
export async function addFunds(userId: string, goalId: string, amount: number) {
  await getGoalById(userId, goalId);
  return prisma.goal.update({
    where: { id: goalId },
    data: { savedAmount: { increment: amount } },
  });
}

export async function deleteGoal(userId: string, goalId: string) {
  await getGoalById(userId, goalId);
  await prisma.goal.delete({ where: { id: goalId } });
}

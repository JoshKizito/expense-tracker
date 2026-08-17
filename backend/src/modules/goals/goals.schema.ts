import { z } from "zod";

export const createGoalSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  targetAmount: z.number().positive("Le montant doit être positif").max(1_000_000_000),
  monthlyContribution: z.number().positive("Le montant doit être positif").max(1_000_000_000),
});

export const updateGoalSchema = createGoalSchema.partial();

export const addFundsSchema = z.object({
  amount: z.number().positive("Le montant doit être positif"),
});

export const goalIdParamSchema = z.object({
  id: z.string().uuid("id invalide"),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
export type AddFundsInput = z.infer<typeof addFundsSchema>;

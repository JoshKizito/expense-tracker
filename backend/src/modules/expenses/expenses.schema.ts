import { z } from "zod";

const baseExpenseFields = {
  amount: z.number().positive("Le montant doit être positif").max(1_000_000_000),
  description: z.string().trim().min(1, "Description requise").max(255),
  date: z.coerce.date().optional(),
  type: z.enum(["EXPENSE", "INCOME"]).default("EXPENSE"),
  categoryId: z.string().uuid("categoryId invalide").optional(),
};

export const createExpenseSchema = z.object(baseExpenseFields).superRefine((data, ctx) => {
  if (data.type === "EXPENSE" && !data.categoryId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["categoryId"],
      message: "Catégorie requise pour une dépense",
    });
  }
});

export const updateExpenseSchema = z.object(baseExpenseFields).partial();

export const expenseIdParamSchema = z.object({
  id: z.string().uuid("id invalide"),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

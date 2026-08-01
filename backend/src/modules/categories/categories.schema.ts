import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(50),
  icon: z.string().trim().max(50).optional(),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide (format #RRGGBB)")
    .optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

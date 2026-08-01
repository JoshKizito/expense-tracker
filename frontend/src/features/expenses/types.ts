import type { Category } from "@/features/categories/types";

export interface Expense {
  id: string;
  amount: string; // Prisma Decimal sérialisé en string par Express/JSON
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  category: Category;
}

export interface CreateExpensePayload {
  amount: number;
  description: string;
  date?: string;
  categoryId: string;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

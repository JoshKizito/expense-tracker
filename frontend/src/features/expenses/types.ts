import type { Category } from "@/features/categories/types";

export type TransactionType = "EXPENSE" | "INCOME";

export interface Expense {
  id: string;
  amount: string;
  description: string;
  type: TransactionType;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string | null;
  category: Category | null;
}

export interface CreateExpensePayload {
  amount: number;
  description: string;
  date?: string;
  type: TransactionType;
  categoryId?: string;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

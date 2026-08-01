import { apiClient } from "@/lib/apiClient";
import type { CreateExpensePayload, Expense, UpdateExpensePayload } from "../types";

export async function listExpensesRequest(): Promise<Expense[]> {
  const { data } = await apiClient.get<{ expenses: Expense[] }>("/expenses");
  return data.expenses;
}

export async function createExpenseRequest(payload: CreateExpensePayload): Promise<Expense> {
  const { data } = await apiClient.post<{ expense: Expense }>("/expenses", payload);
  return data.expense;
}

export async function updateExpenseRequest(
  id: string,
  payload: UpdateExpensePayload
): Promise<Expense> {
  const { data } = await apiClient.put<{ expense: Expense }>(`/expenses/${id}`, payload);
  return data.expense;
}

export async function deleteExpenseRequest(id: string): Promise<void> {
  await apiClient.delete(`/expenses/${id}`);
}

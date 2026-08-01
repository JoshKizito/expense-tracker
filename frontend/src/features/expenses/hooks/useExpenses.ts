import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listExpensesRequest,
  createExpenseRequest,
  updateExpenseRequest,
  deleteExpenseRequest,
} from "../api/expensesApi";
import type { UpdateExpensePayload } from "../types";

export const expensesQueryKey = ["expenses"] as const;

export function useExpenses() {
  return useQuery({
    queryKey: expensesQueryKey,
    queryFn: listExpensesRequest,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpenseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesQueryKey });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateExpensePayload }) =>
      updateExpenseRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesQueryKey });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpenseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expensesQueryKey });
    },
  });
}

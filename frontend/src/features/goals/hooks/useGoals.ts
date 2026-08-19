import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listGoalsRequest,
  createGoalRequest,
  updateGoalRequest,
  addFundsRequest,
  deleteGoalRequest,
} from "../api/goalsApi";
import type { UpdateGoalPayload } from "../types";

export const goalsQueryKey = ["goals"] as const;

export function useGoals() {
  return useQuery({ queryKey: goalsQueryKey, queryFn: listGoalsRequest });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoalRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsQueryKey }),
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGoalPayload }) =>
      updateGoalRequest(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsQueryKey }),
  });
}

export function useAddFunds() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => addFundsRequest(id, amount),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsQueryKey }),
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGoalRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goalsQueryKey }),
  });
}

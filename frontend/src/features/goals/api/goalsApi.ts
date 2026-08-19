import { apiClient } from "@/lib/apiClient";
import type { CreateGoalPayload, Goal, UpdateGoalPayload } from "../types";

export async function listGoalsRequest(): Promise<Goal[]> {
  const { data } = await apiClient.get<{ goals: Goal[] }>("/goals");
  return data.goals;
}

export async function createGoalRequest(payload: CreateGoalPayload): Promise<Goal> {
  const { data } = await apiClient.post<{ goal: Goal }>("/goals", payload);
  return data.goal;
}

export async function updateGoalRequest(id: string, payload: UpdateGoalPayload): Promise<Goal> {
  const { data } = await apiClient.put<{ goal: Goal }>(`/goals/${id}`, payload);
  return data.goal;
}

export async function addFundsRequest(id: string, amount: number): Promise<Goal> {
  const { data } = await apiClient.post<{ goal: Goal }>(`/goals/${id}/add-funds`, { amount });
  return data.goal;
}

export async function deleteGoalRequest(id: string): Promise<void> {
  await apiClient.delete(`/goals/${id}`);
}

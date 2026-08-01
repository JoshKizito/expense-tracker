import { apiClient } from "@/lib/apiClient";
import type { AuthResponse, LoginPayload, RegisterPayload, User, Currency } from "../types";

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function meRequest(): Promise<User> {
  const { data } = await apiClient.get<{ user: User }>("/auth/me");
  return data.user;
}

export async function updateCurrencyRequest(currency: Currency): Promise<User> {
  const { data } = await apiClient.patch<{ user: User }>("/auth/me/currency", { currency });
  return data.user;
}

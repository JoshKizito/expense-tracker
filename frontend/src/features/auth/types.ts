export type Currency = "EUR" | "USD" | "RUB";

export interface User {
  id: string;
  email: string;
  name: string;
  currency: Currency;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

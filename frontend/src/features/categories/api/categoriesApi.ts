import { apiClient } from "@/lib/apiClient";
import type { Category, CreateCategoryPayload } from "../types";

export async function listCategoriesRequest(): Promise<Category[]> {
  const { data } = await apiClient.get<{ categories: Category[] }>("/categories");
  return data.categories;
}

export async function createCategoryRequest(payload: CreateCategoryPayload): Promise<Category> {
  const { data } = await apiClient.post<{ category: Category }>("/categories", payload);
  return data.category;
}

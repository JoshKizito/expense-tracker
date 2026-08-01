export interface Category {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  isDefault: boolean;
  userId: string | null;
  createdAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  icon?: string;
  color?: string;
}

import type { Expense } from "@/features/expenses/types";

export interface CategoryBreakdown {
  categoryId: string;
  name: string;
  color: string;
  icon: string | null;
  total: number;
}

export function getMonthRange(reference: Date): { start: Date; end: Date } {
  const start = new Date(reference.getFullYear(), reference.getMonth(), 1);
  const end = new Date(reference.getFullYear(), reference.getMonth() + 1, 1);
  return { start, end };
}

export function computeCategoryBreakdown(
  expenses: Expense[],
  range: { start: Date; end: Date }
): CategoryBreakdown[] {
  const map = new Map<string, CategoryBreakdown>();

  for (const expense of expenses) {
    if (expense.type !== "EXPENSE") continue;
    const date = new Date(expense.date);
    if (date < range.start || date >= range.end) continue;

    const key = expense.category?.id ?? "uncategorized";
    const existing = map.get(key);
    const amount = Number(expense.amount);

    if (existing) {
      existing.total += amount;
    } else {
      map.set(key, {
        categoryId: key,
        name: expense.category?.name ?? "Sans catégorie",
        color: expense.category?.color ?? "#9ca3af",
        icon: expense.category?.icon ?? null,
        total: amount,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

import type { Expense } from "@/features/expenses/types";

export function suggestMonthlyContribution(expenses: Expense[]): number {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const recent = expenses.filter((e) => new Date(e.date) >= threeMonthsAgo);
  if (recent.length === 0) return 0;

  const net = recent.reduce(
    (sum, e) => sum + (e.type === "INCOME" ? Number(e.amount) : -Number(e.amount)),
    0
  );

  const monthlyAverage = net / 3;
  return Math.max(0, Math.round(monthlyAverage * 100) / 100);
}

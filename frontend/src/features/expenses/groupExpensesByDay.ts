import type { TFunction } from "i18next";
import type { Expense } from "./types";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatGroupLabel(date: Date, t: TFunction, locale: string): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return t("dashboard.today");
  if (isSameDay(date, yesterday)) return t("dashboard.yesterday");

  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const label = formatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export interface ExpenseGroup {
  label: string;
  total: number;
  expenses: Expense[];
}

export function groupExpensesByDay(
  expenses: Expense[],
  t: TFunction,
  locale = "fr"
): ExpenseGroup[] {
  const groups: ExpenseGroup[] = [];

  for (const expense of expenses) {
    const date = new Date(expense.date);
    const label = formatGroupLabel(date, t, locale);
    const lastGroup = groups[groups.length - 1];
    const signedAmount = expense.type === "INCOME" ? Number(expense.amount) : -Number(expense.amount);

    if (lastGroup && lastGroup.label === label) {
      lastGroup.expenses.push(expense);
      lastGroup.total += signedAmount;
    } else {
      groups.push({ label, total: signedAmount, expenses: [expense] });
    }
  }

  return groups;
}

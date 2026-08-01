import type { Expense } from "./types";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const longDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function formatGroupLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Aujourd'hui";
  if (isSameDay(date, yesterday)) return "Hier";

  const label = longDateFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export interface ExpenseGroup {
  label: string;
  total: number;
  expenses: Expense[];
}

export function groupExpensesByDay(expenses: Expense[]): ExpenseGroup[] {
  const groups: ExpenseGroup[] = [];

  for (const expense of expenses) {
    const date = new Date(expense.date);
    const label = formatGroupLabel(date);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.expenses.push(expense);
      lastGroup.total += Number(expense.amount);
    } else {
      groups.push({ label, total: Number(expense.amount), expenses: [expense] });
    }
  }

  return groups;
}

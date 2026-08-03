import type { Expense } from "./types";

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

interface CsvHeaders {
  date: string;
  description: string;
  category: string;
  type: string;
  amount: string;
  expenseLabel: string;
  incomeLabel: string;
  noCategoryLabel: string;
}

export function exportExpensesToCsv(
  expenses: Expense[],
  currency: string,
  headers: CsvHeaders,
  filename: string
): void {
  const rows = [
    [headers.date, headers.description, headers.category, headers.type, `${headers.amount} (${currency})`],
    ...expenses.map((e) => [
      new Date(e.date).toISOString().slice(0, 10),
      e.description,
      e.category?.name ?? headers.noCategoryLabel,
      e.type === "INCOME" ? headers.incomeLabel : headers.expenseLabel,
      (e.type === "INCOME" ? Number(e.amount) : -Number(e.amount)).toFixed(2),
    ]),
  ];

  const csvContent = "\uFEFF" + rows.map((row) => row.map(escapeCsvField).join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

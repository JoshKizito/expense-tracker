import { Trash2, Pencil, Wallet } from "lucide-react";
import { getCategoryIcon } from "@/features/categories/getCategoryIcon";
import { formatMoney, type Currency } from "@/lib/formatMoney";
import type { Expense } from "../types";

interface ExpenseCardProps {
  expense: Expense;
  currency: Currency;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export default function ExpenseCard({ expense, currency, onEdit, onDelete }: ExpenseCardProps) {
  const isIncome = expense.type === "INCOME";
  const Icon = expense.category ? getCategoryIcon(expense.category.icon) : Wallet;
  const color = isIncome ? "#22c55e" : expense.category?.color ?? "#9ca3af";
  const label = expense.category?.name ?? (isIncome ? "Revenu" : "Sans catégorie");

  return (
    <div className="group flex items-center gap-4 py-3.5">
      <Icon size={24} color={color} strokeWidth={1.75} className="shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-gray-900 dark:text-white">
          {expense.description}
        </p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500">{label}</p>
      </div>

      <p
        className={`text-[15px] font-medium whitespace-nowrap ${
          isIncome ? "text-green-500" : "text-gray-900 dark:text-white"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatMoney(Number(expense.amount), currency)}
      </p>

      <div className="hidden group-hover:flex items-center -mr-1">
        <button
          onClick={() => onEdit(expense)}
          aria-label="Modifier"
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(expense)}
          aria-label="Supprimer"
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

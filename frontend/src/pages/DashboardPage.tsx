import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, Wallet } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useExpenses, useDeleteExpense } from "@/features/expenses/hooks/useExpenses";
import { groupExpensesByDay } from "@/features/expenses/groupExpensesByDay";
import { formatMoney } from "@/lib/formatMoney";
import ExpenseCard from "@/features/expenses/components/ExpenseCard";
import ExpenseFormModal from "@/features/expenses/components/ExpenseFormModal";
import ConfirmDeleteModal from "@/features/expenses/components/ConfirmDeleteModal";
import type { Expense, TransactionType } from "@/features/expenses/types";

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { data: expenses = [], isLoading, isError } = useExpenses();
  const deleteExpense = useDeleteExpense();
  const currency = user?.currency ?? "EUR";

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formDefaultType, setFormDefaultType] = useState<TransactionType>("EXPENSE");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const balance = expenses.reduce(
    (sum, e) => sum + (e.type === "INCOME" ? Number(e.amount) : -Number(e.amount)),
    0
  );
  const groups = groupExpensesByDay(expenses, t, i18n.language);

  function openCreateForm(type: TransactionType) {
    setEditingExpense(null);
    setFormDefaultType(type);
    setIsFormOpen(true);
  }

  function openEditForm(expense: Expense) {
    setEditingExpense(expense);
    setIsFormOpen(true);
  }

  async function confirmDelete() {
    if (!expenseToDelete) return;
    await deleteExpense.mutateAsync(expenseToDelete.id);
    setExpenseToDelete(null);
  }

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-8">
        <button
          aria-label="Search"
          className="p-2 -ml-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Search size={20} />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">
          {t("dashboard.title")}
        </h1>
        <button
          onClick={() => openCreateForm("EXPENSE")}
          aria-label={t("dashboard.addExpense")}
          className="p-2 -mr-2 text-gray-900 dark:text-white hover:text-primary-600"
        >
          <Plus size={22} />
        </button>
      </div>

      <div className="text-center mb-10">
        <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {formatMoney(balance, currency)}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t("dashboard.balance")}</p>
      </div>

      <button
        onClick={() => openCreateForm("INCOME")}
        className="w-full mb-8 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
      >
        <Wallet size={16} /> {t("dashboard.rechargeBalance")}
      </button>

      {isLoading && (
        <p className="text-center text-gray-500 dark:text-gray-400">{t("common.loading")}</p>
      )}
      {isError && (
        <p className="text-center text-red-500">{t("dashboard.loadingError")}</p>
      )}
      {!isLoading && expenses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          {t("dashboard.noTransactions")}
        </p>
      )}

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-center text-sm text-gray-400 dark:text-gray-500 mb-2">
              {group.label}
            </h2>
            <div className="divide-y divide-gray-50 dark:divide-gray-900">
              {group.expenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  currency={currency}
                  onEdit={openEditForm}
                  onDelete={setExpenseToDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ExpenseFormModal
          expense={editingExpense}
          defaultType={formDefaultType}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {expenseToDelete && (
        <ConfirmDeleteModal
          description={expenseToDelete.description}
          onConfirm={confirmDelete}
          onCancel={() => setExpenseToDelete(null)}
          isDeleting={deleteExpense.isPending}
        />
      )}
    </div>
  );
}

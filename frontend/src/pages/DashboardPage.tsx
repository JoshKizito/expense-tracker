import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, Wallet, SlidersHorizontal, X, Download } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useExpenses, useDeleteExpense } from "@/features/expenses/hooks/useExpenses";
import { groupExpensesByDay } from "@/features/expenses/groupExpensesByDay";
import { exportExpensesToCsv } from "@/features/expenses/exportToCsv";
import { formatMoney } from "@/lib/formatMoney";
import ExpenseCard from "@/features/expenses/components/ExpenseCard";
import ExpenseFormModal from "@/features/expenses/components/ExpenseFormModal";
import ConfirmDeleteModal from "@/features/expenses/components/ConfirmDeleteModal";
import FilterPanel, { EMPTY_FILTERS, type ExpenseFilters } from "@/features/expenses/components/FilterPanel";
import ExportChoiceModal from "@/features/expenses/components/ExportChoiceModal";
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [filters, setFilters] = useState<ExpenseFilters>(EMPTY_FILTERS);
  const hasActiveFilters =
    filters.categoryId !== "" || filters.type !== "" || filters.from !== "" || filters.to !== "" || searchText.trim() !== "";

  const balance = expenses.reduce(
    (sum, e) => sum + (e.type === "INCOME" ? Number(e.amount) : -Number(e.amount)),
    0
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (searchText.trim() && !expense.description.toLowerCase().includes(searchText.trim().toLowerCase())) {
        return false;
      }
      if (filters.categoryId && expense.categoryId !== filters.categoryId) return false;
      if (filters.type && expense.type !== filters.type) return false;
      if (filters.from && new Date(expense.date) < new Date(filters.from)) return false;
      if (filters.to && new Date(expense.date) > new Date(`${filters.to}T23:59:59`)) return false;
      return true;
    });
  }, [expenses, searchText, filters]);

  const groups = groupExpensesByDay(filteredExpenses, t, i18n.language);

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

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchText("");
  }

  const csvHeaders = {
    date: t("dashboard.csvDate"),
    description: t("dashboard.csvDescription"),
    category: t("dashboard.csvCategory"),
    type: t("dashboard.csvType"),
    amount: t("dashboard.csvAmount"),
    expenseLabel: t("dashboard.csvExpenseLabel"),
    incomeLabel: t("dashboard.csvIncomeLabel"),
    noCategoryLabel: t("expenses.noCategoryLabel"),
  };

  function runExport(list: Expense[]) {
    const filename = `expense-tracker-${new Date().toISOString().slice(0, 10)}.csv`;
    exportExpensesToCsv(list, currency, csvHeaders, filename);
    setIsExportOpen(false);
  }

  function handleExportClick() {
    if (hasActiveFilters) {
      setIsExportOpen(true);
    } else {
      runExport(expenses);
    }
  }

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-8 gap-2">
        {isSearchOpen ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t("dashboard.searchPlaceholder")}
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={closeSearch}
              aria-label={t("common.cancel")}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label={t("dashboard.searchPlaceholder")}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <Search size={20} />
            </button>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">
              {t("dashboard.title")}
            </h1>
            <div className="flex items-center -mr-2">
              <button
                onClick={handleExportClick}
                aria-label={t("dashboard.exportCsv")}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => setIsFilterOpen(true)}
                aria-label={t("filters.title")}
                className={`relative p-2 ${
                  hasActiveFilters ? "text-primary-600" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                <SlidersHorizontal size={19} />
                {hasActiveFilters && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-600" />
                )}
              </button>
              <button
                onClick={() => openCreateForm("EXPENSE")}
                aria-label={t("dashboard.addExpense")}
                className="p-2 text-gray-900 dark:text-white hover:text-primary-600"
              >
                <Plus size={22} />
              </button>
            </div>
          </>
        )}
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
      {isError && <p className="text-center text-red-500">{t("dashboard.loadingError")}</p>}
      {!isLoading && expenses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          {t("dashboard.noTransactions")}
        </p>
      )}
      {!isLoading && expenses.length > 0 && filteredExpenses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          {t("dashboard.noResults")}
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

      {isFilterOpen && (
        <FilterPanel filters={filters} onChange={setFilters} onClose={() => setIsFilterOpen(false)} />
      )}

      {isExportOpen && (
        <ExportChoiceModal
          totalCount={expenses.length}
          filteredCount={filteredExpenses.length}
          onExportAll={() => runExport(expenses)}
          onExportFiltered={() => runExport(filteredExpenses)}
          onCancel={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}

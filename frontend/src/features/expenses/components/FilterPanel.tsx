import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import type { TransactionType } from "../types";

export interface ExpenseFilters {
  categoryId: string;
  type: TransactionType | "";
  from: string;
  to: string;
}

export const EMPTY_FILTERS: ExpenseFilters = { categoryId: "", type: "", from: "", to: "" };

interface FilterPanelProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  onClose: () => void;
}

const selectClass =
  "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:border-primary-500 transition-colors";

export default function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  const { t } = useTranslation();
  const { data: categories = [] } = useCategories();

  function update<K extends keyof ExpenseFilters>(key: K, value: ExpenseFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("filters.title")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("common.cancel")}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("expenses.category")}</label>
            <select
              value={filters.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className={selectClass}
            >
              <option value="">{t("filters.allCategories")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("expenses.type")}</label>
            <select
              value={filters.type}
              onChange={(e) => update("type", e.target.value as ExpenseFilters["type"])}
              className={selectClass}
            >
              <option value="">{t("filters.allTypes")}</option>
              <option value="EXPENSE">{t("expenses.expense")}</option>
              <option value="INCOME">{t("expenses.income")}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">{t("filters.from")}</label>
              <input
                type="date"
                value={filters.from}
                onChange={(e) => update("from", e.target.value)}
                className={selectClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("filters.to")}</label>
              <input
                type="date"
                value={filters.to}
                onChange={(e) => update("to", e.target.value)}
                className={selectClass}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {t("filters.reset")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
          >
            {t("filters.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

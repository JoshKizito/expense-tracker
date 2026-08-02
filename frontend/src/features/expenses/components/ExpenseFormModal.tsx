import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateExpense, useUpdateExpense } from "../hooks/useExpenses";
import type { Expense, TransactionType } from "../types";

interface ExpenseFormModalProps {
  expense: Expense | null;
  defaultType?: TransactionType;
  onClose: () => void;
}

function toDateInputValue(date: string): string {
  return new Date(date).toISOString().slice(0, 10);
}

export default function ExpenseFormModal({
  expense,
  defaultType = "EXPENSE",
  onClose,
}: ExpenseFormModalProps) {
  const { t } = useTranslation();
  const { data: categories = [] } = useCategories();
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const isEditing = Boolean(expense);

  const expenseFormSchema = useMemo(
    () =>
      z
        .object({
          description: z.string().min(1, t("expenses.validation.descriptionRequired")).max(255),
          amount: z.coerce.number().positive(t("expenses.validation.amountPositive")),
          type: z.enum(["EXPENSE", "INCOME"]),
          categoryId: z.string().optional(),
          date: z.string().min(1, t("expenses.validation.dateRequired")),
        })
        .superRefine((data, ctx) => {
          if (data.type === "EXPENSE" && !data.categoryId) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["categoryId"],
              message: t("expenses.validation.categoryRequired"),
            });
          }
        }),
    [t]
  );
  type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: expense
      ? {
          description: expense.description,
          amount: Number(expense.amount),
          type: expense.type,
          categoryId: expense.categoryId ?? "",
          date: toDateInputValue(expense.date),
        }
      : {
          type: defaultType,
          date: new Date().toISOString().slice(0, 10),
        },
  });

  const currentType = watch("type");
  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary-500 transition-colors";

  async function onSubmit(values: ExpenseFormValues) {
    const { categoryId, ...rest } = values;
    const payload = categoryId ? { ...rest, categoryId } : rest;

    if (isEditing && expense) {
      await updateExpense.mutateAsync({ id: expense.id, payload });
    } else {
      await createExpense.mutateAsync(payload);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditing ? t("expenses.edit") : t("expenses.newTransaction")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("common.cancel")}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setValue("type", "EXPENSE")}
              className={`py-2 rounded-md text-sm font-medium transition ${
                currentType === "EXPENSE"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("expenses.expense")}
            </button>
            <button
              type="button"
              onClick={() => setValue("type", "INCOME")}
              className={`py-2 rounded-md text-sm font-medium transition ${
                currentType === "INCOME"
                  ? "bg-white dark:bg-gray-700 text-green-600 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("expenses.income")}
            </button>
            <input type="hidden" {...register("type")} />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              {t("expenses.description")}
            </label>
            <input
              id="description"
              type="text"
              placeholder={
                currentType === "INCOME"
                  ? t("expenses.descriptionPlaceholderIncome")
                  : t("expenses.descriptionPlaceholderExpense")
              }
              {...register("description")}
              className={inputClass}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                {t("expenses.amount")}
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount")}
                className={inputClass}
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                {t("expenses.date")}
              </label>
              <input id="date" type="date" {...register("date")} className={inputClass} />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
              {currentType === "INCOME" ? t("expenses.categoryOptional") : t("expenses.category")}
            </label>
            <select
              id="categoryId"
              {...register("categoryId")}
              className={inputClass}
            >
              <option value="">
                {currentType === "INCOME" ? t("expenses.none") : t("expenses.selectCategory")}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg text-white font-medium transition disabled:opacity-50 ${
              currentType === "INCOME"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary-600 hover:bg-primary-700"
            }`}
          >
            {isSubmitting ? t("expenses.saving") : isEditing ? t("common.save") : t("expenses.add")}
          </button>
        </form>
      </div>
    </div>
  );
}

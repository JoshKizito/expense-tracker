import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatMoney, type Currency } from "@/lib/formatMoney";
import { useCreateGoal } from "../hooks/useGoals";

interface GoalFormModalProps {
  suggestedContribution: number;
  currency: Currency;
  onClose: () => void;
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary-500 transition-colors";

export default function GoalFormModal({ suggestedContribution, currency, onClose }: GoalFormModalProps) {
  const { t } = useTranslation();
  const createGoal = useCreateGoal();

  const goalFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("goals.validation.nameRequired")).max(100),
        targetAmount: z.coerce.number().positive(t("goals.validation.targetPositive")),
        monthlyContribution: z.coerce.number().positive(t("goals.validation.contributionPositive")),
      }),
    [t]
  );
  type GoalFormValues = z.infer<typeof goalFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: { monthlyContribution: suggestedContribution || undefined },
  });

  async function onSubmit(values: GoalFormValues) {
    await createGoal.mutateAsync(values);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("goals.newGoal")}
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              {t("goals.name")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t("goals.namePlaceholder")}
              {...register("name")}
              className={inputClass}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium mb-1">
              {t("goals.targetAmount")}
            </label>
            <input
              id="targetAmount"
              type="number"
              step="0.01"
              {...register("targetAmount")}
              className={inputClass}
            />
            {errors.targetAmount && (
              <p className="text-sm text-red-500 mt-1">{errors.targetAmount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="monthlyContribution" className="block text-sm font-medium mb-1">
              {t("goals.monthlyContribution")}
            </label>
            <input
              id="monthlyContribution"
              type="number"
              step="0.01"
              {...register("monthlyContribution")}
              className={inputClass}
            />
            {suggestedContribution > 0 && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t("goals.suggested", { amount: formatMoney(suggestedContribution, currency) })}
              </p>
            )}
            {errors.monthlyContribution && (
              <p className="text-sm text-red-500 mt-1">{errors.monthlyContribution.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition disabled:opacity-50"
          >
            {isSubmitting ? t("goals.saving") : t("goals.add")}
          </button>
        </form>
      </div>
    </div>
  );
}

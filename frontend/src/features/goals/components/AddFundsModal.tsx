import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAddFunds } from "../hooks/useGoals";
import type { Goal } from "../types";

const addFundsSchema = z.object({
  amount: z.coerce.number().positive(),
});
type AddFundsValues = z.infer<typeof addFundsSchema>;

interface AddFundsModalProps {
  goal: Goal;
  onClose: () => void;
}

export default function AddFundsModal({ goal, onClose }: AddFundsModalProps) {
  const { t } = useTranslation();
  const addFunds = useAddFunds();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddFundsValues>({ resolver: zodResolver(addFundsSchema) });

  async function onSubmit(values: AddFundsValues) {
    await addFunds.mutateAsync({ id: goal.id, amount: values.amount });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("goals.addFundsTitle")}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              {t("goals.amountToAdd")}
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              autoFocus
              {...register("amount")}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary-500 transition-colors"
            />
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition disabled:opacity-50"
          >
            {isSubmitting ? t("goals.saving") : t("goals.save")}
          </button>
        </form>
      </div>
    </div>
  );
}

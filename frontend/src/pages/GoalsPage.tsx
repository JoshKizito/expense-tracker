import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { useGoals, useDeleteGoal } from "@/features/goals/hooks/useGoals";
import { suggestMonthlyContribution } from "@/features/goals/suggestMonthlyContribution";
import GoalCard from "@/features/goals/components/GoalCard";
import GoalFormModal from "@/features/goals/components/GoalFormModal";
import AddFundsModal from "@/features/goals/components/AddFundsModal";
import ConfirmDeleteModal from "@/features/expenses/components/ConfirmDeleteModal";
import type { Goal } from "@/features/goals/types";

export default function GoalsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const currency = user?.currency ?? "EUR";
  const { data: expenses = [] } = useExpenses();
  const { data: goals = [], isLoading } = useGoals();
  const deleteGoal = useDeleteGoal();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fundingGoal, setFundingGoal] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  const suggested = suggestMonthlyContribution(expenses);

  async function confirmDelete() {
    if (!goalToDelete) return;
    await deleteGoal.mutateAsync(goalToDelete.id);
    setGoalToDelete(null);
  }

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">
          {t("goals.title")}
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          aria-label={t("goals.newGoal")}
          className="p-2 text-gray-900 dark:text-white hover:text-primary-600"
        >
          <Plus size={22} />
        </button>
      </div>

      {isLoading && <p className="text-gray-500 dark:text-gray-400">{t("common.loading")}</p>}

      {!isLoading && goals.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">{t("goals.noGoals")}</p>
      )}

      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            currency={currency}
            onAddFunds={setFundingGoal}
            onDelete={setGoalToDelete}
          />
        ))}
      </div>

      {isFormOpen && (
        <GoalFormModal
          suggestedContribution={suggested}
          currency={currency}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {fundingGoal && <AddFundsModal goal={fundingGoal} onClose={() => setFundingGoal(null)} />}

      {goalToDelete && (
        <ConfirmDeleteModal
          description={goalToDelete.name}
          onConfirm={confirmDelete}
          onCancel={() => setGoalToDelete(null)}
          isDeleting={deleteGoal.isPending}
        />
      )}
    </div>
  );
}

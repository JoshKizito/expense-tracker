import { useTranslation } from "react-i18next";
import { Trash2, Plus } from "lucide-react";
import { formatMoney, type Currency } from "@/lib/formatMoney";
import type { Goal } from "../types";

interface GoalCardProps {
  goal: Goal;
  currency: Currency;
  onAddFunds: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

export default function GoalCard({ goal, currency, onAddFunds, onDelete }: GoalCardProps) {
  const { t } = useTranslation();

  const target = Number(goal.targetAmount);
  const saved = Number(goal.savedAmount);
  const monthly = Number(goal.monthlyContribution);
  const remaining = Math.max(0, target - saved);
  const progress = target > 0 ? Math.min(100, (saved / target) * 100) : 0;
  const isReached = saved >= target;

  const monthsLeft = monthly > 0 && !isReached ? Math.ceil(remaining / monthly) : null;
  const estimatedDate =
    monthsLeft !== null
      ? new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(
          new Date(new Date().setMonth(new Date().getMonth() + monthsLeft))
        )
      : null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{goal.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {formatMoney(saved, currency)} / {formatMoney(target, currency)}
          </p>
        </div>
        <button
          onClick={() => onDelete(goal)}
          aria-label={t("common.delete")}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all ${isReached ? "bg-green-500" : "bg-primary-600"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isReached
            ? t("goals.reached")
            : monthsLeft !== null
              ? `${t("goals.estimatedDate")} ${estimatedDate}`
              : t("goals.noContribution")}
        </p>
        {!isReached && (
          <button
            onClick={() => onAddFunds(goal)}
            className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            <Plus size={14} /> {t("goals.addFunds")}
          </button>
        )}
      </div>
    </div>
  );
}

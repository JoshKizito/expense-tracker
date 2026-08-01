import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { getCategoryIcon } from "@/features/categories/getCategoryIcon";
import { formatMoney } from "@/lib/formatMoney";
import { getMonthRange, computeCategoryBreakdown } from "@/features/stats/computeCategoryBreakdown";

const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

export default function StatsPage() {
  const { user } = useAuth();
  const { data: expenses = [] } = useExpenses();
  const currency = user?.currency ?? "EUR";
  const [refDate, setRefDate] = useState(new Date());

  const range = useMemo(() => getMonthRange(refDate), [refDate]);
  const breakdown = useMemo(() => computeCategoryBreakdown(expenses, range), [expenses, range]);
  const total = breakdown.reduce((sum, c) => sum + c.total, 0);
  const top = breakdown[0];

  function goToPreviousMonth() {
    setRefDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setRefDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  const monthLabel = monthFormatter.format(refDate);

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto px-5 py-6">
      <h1 className="text-base font-semibold text-center text-gray-900 dark:text-white mb-6">
        Catégories principales
      </h1>

      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={goToPreviousMonth}
          aria-label="Mois précédent"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize w-40 text-center">
          {monthLabel}
        </span>
        <button
          onClick={goToNextMonth}
          aria-label="Mois suivant"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {breakdown.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          Aucune dépense sur cette période.
        </p>
      ) : (
        <>
          <div className="relative h-64 md:h-80 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="total"
                  nameKey="name"
                  innerRadius="72%"
                  outerRadius="100%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {breakdown.map((entry) => (
                    <Cell key={entry.categoryId} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {top && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {(() => {
                  const TopIcon = getCategoryIcon(top.icon);
                  return <TopIcon size={26} color={top.color} strokeWidth={1.75} />;
                })()}
                <p className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                  {formatMoney(top.total, currency)}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{top.name}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-baseline mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total dépensé</span>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {formatMoney(total, currency)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {breakdown.slice(0, 3).map((cat, index) => {
              const CatIcon = getCategoryIcon(cat.icon);
              return (
                <div
                  key={cat.categoryId}
                  className={`rounded-xl p-3 text-center ${
                    index === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-transparent"
                  }`}
                >
                  <CatIcon size={20} color={cat.color} strokeWidth={1.75} className="mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatMoney(cat.total, currency)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{cat.name}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

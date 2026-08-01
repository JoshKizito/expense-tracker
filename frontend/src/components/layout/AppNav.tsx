import { NavLink } from "react-router-dom";
import { ArrowLeftRight, PieChart, Settings } from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", icon: ArrowLeftRight, label: "Historique" },
  { to: "/stats", icon: PieChart, label: "Stats" },
  { to: "/settings", icon: Settings, label: "Réglages" },
];

function navLinkClass(isActive: boolean): string {
  return `flex items-center justify-center md:justify-start gap-3 rounded-xl transition ${
    isActive
      ? "text-primary-600 dark:text-primary-500"
      : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300"
  }`;
}

export default function AppNav() {
  return (
    <>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 px-6 py-3 flex justify-around">
        {NAV_ITEMS.map(({ to, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)}>
            <Icon size={22} strokeWidth={1.75} />
          </NavLink>
        ))}
      </nav>

      <nav className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-56 md:border-r md:border-gray-100 dark:md:border-gray-900 bg-white dark:bg-black px-4 py-8 gap-2">
        <p className="text-lg font-semibold px-3 mb-6 text-gray-900 dark:text-white">
          Expense Tracker
        </p>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${navLinkClass(isActive)} px-3 py-2.5 text-sm font-medium`}
          >
            <Icon size={20} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

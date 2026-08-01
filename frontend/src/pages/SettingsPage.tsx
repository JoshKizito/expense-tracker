import { useTranslation } from "react-i18next";
import { Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import type { Currency } from "@/lib/formatMoney";

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "Dollar ($)" },
  { value: "RUB", label: "Rouble (₽)" },
];

const LANGUAGES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "ar", label: "العربية" },
];

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-900">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout, updateCurrency } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto px-5 py-6">
      <h1 className="text-base font-semibold text-center text-gray-900 dark:text-white mb-8">
        Réglages
      </h1>

      <div className="mb-8 text-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">{user?.email}</p>
      </div>

      <SettingsRow label="Devise">
        <select
          value={user?.currency ?? "EUR"}
          onChange={(e) => updateCurrency(e.target.value as Currency)}
          className="text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-300"
        >
          {CURRENCIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </SettingsRow>

      <SettingsRow label="Langue">
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-300"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </SettingsRow>

      <SettingsRow label="Apparence">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300"
        >
          {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
          {theme === "light" ? "Clair" : "Sombre"}
        </button>
      </SettingsRow>

      <button
        onClick={logout}
        className="w-full mt-8 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        <LogOut size={16} /> Déconnexion
      </button>
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center gap-4"
    >
      <h1 className="text-3xl font-semibold">{t("app.name")}</h1>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Setup Étape 2 opérationnel — routing, thème, i18n, animations ✅
      </p>
    </motion.main>
  );
}

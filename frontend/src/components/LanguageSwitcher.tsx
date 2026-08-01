import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const LANGUAGES = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "ar", label: "AR" },
];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Languages size={15} className="text-gray-400" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Changer de langue"
        className="text-xs bg-transparent text-gray-500 dark:text-gray-400 focus:outline-none cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

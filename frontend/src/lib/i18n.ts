import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "@/locales/fr/common.json";
import en from "@/locales/en/common.json";
import ru from "@/locales/ru/common.json";
import ar from "@/locales/ar/common.json";

export const RTL_LANGUAGES = ["ar"];

export const resources = {
  fr: { common: fr },
  en: { common: en },
  ru: { common: ru },
  ar: { common: ar },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs par défaut
    },
  });

// Met à jour dir="rtl"/"ltr" sur <html> à chaque changement de langue
i18n.on("languageChanged", (lng) => {
  const isRtl = RTL_LANGUAGES.includes(lng);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;

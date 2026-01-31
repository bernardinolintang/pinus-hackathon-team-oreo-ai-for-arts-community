import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import id from "./locales/id.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "id", label: "Bahasa Indonesia" },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const i18nReady = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      id: { translation: id },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "zh", "id"],
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "atelier_lang",
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng.startsWith("zh") ? "zh" : lng.startsWith("id") ? "id" : "en";
  }
});

export default i18n;

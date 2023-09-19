import locales, { Locale, LocaleObj } from "@/i18n/locales";
import { create } from "zustand";

type AppState = {
  locale: LocaleObj;
  setLocale: (locale: Locale) => void;
};

const useAppStore = create<AppState>()((set) => ({
  locale: locales["en"],
  setLocale: (locale) => set(() => ({ locale: locales[locale] })),
}));

export default useAppStore;

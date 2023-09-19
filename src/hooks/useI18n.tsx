import { useTranslation } from "react-i18next";
import { Locale } from "@/i18n/locales";
import useAppStore from "@/store/app.slice";
import { useCallback } from "react";

const useI18n = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const changeLocale = useCallback(
    (locale: Locale) => {
      changeLanguage(locale);
      setLocale(locale);
      localStorage.setItem("locale", locale);
    },
    [changeLanguage, setLocale]
  );

  return {
    t,
    locale: language,
    language: locale,
    changeLocale,
  };
};

export default useI18n;

import useI18n from "@/hooks/useI18n";
import { Locale } from "@/i18n/locales";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/ar"; // without this line it didn't work
moment.locale("ar");

export type LanguageProviderProps = {
  children: JSX.Element;
  defaultLocale: Locale;
};
const LanguageProvider = ({
  defaultLocale = "en",
  children,
}: LanguageProviderProps) => {
  const { language, changeLocale } = useI18n();

  useEffect(() => {
    const storeLocale = (localStorage.getItem("locale") ||
      defaultLocale) as Locale;
    changeLocale(storeLocale);
  }, [changeLocale, defaultLocale]);

  return <div dir={language.dir}>{children}</div>;
};

export default LanguageProvider;

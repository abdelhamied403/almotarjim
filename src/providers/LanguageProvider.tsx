import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { Locale } from "@/i18n/locales";
import { useEffect } from "react";

export type LanguageProviderProps = {
  children: JSX.Element;
  defaultLocale: Locale;
};
const LanguageProvider = ({
  defaultLocale = "en",
  children,
}: LanguageProviderProps) => {
  const { language, changeLocale, t } = useI18n();

  useEffect(() => {
    const storeLocale = (localStorage.getItem("locale") ||
      defaultLocale) as Locale;
    changeLocale(storeLocale);
  }, [changeLocale, defaultLocale]);

  return (
    <div dir={language.dir}>
      <Button onClick={() => changeLocale("ar")}>ar</Button>
      <Button onClick={() => changeLocale("en")}>en</Button>
      {t("translations:specificKey")}
      {JSON.stringify(language)}
      {children}
    </div>
  );
};

export default LanguageProvider;

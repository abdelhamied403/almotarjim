export type Locale = "ar" | "en";
export type Direction = "ltr" | "rtl";
export type LocaleObj = { locale: string; code: Locale; dir: Direction };
export type Locales = Record<
  Locale,
  { locale: string; code: Locale; dir: Direction }
>;

const locales: Locales = {
  en: {
    locale: "English",
    code: "en",
    dir: "ltr",
  },
  ar: {
    locale: "Arabic",
    code: "ar",
    dir: "rtl",
  },
};
export default locales;

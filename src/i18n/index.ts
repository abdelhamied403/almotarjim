import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import ar from "./translations/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
    ar,
  },
  lng: "en",
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEnglish from '../src/translations/english/translation.json';
import translationBelurussian from '../src/translations/belorussian/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  bl: {
    translation: translationBelurussian,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import RU from './ru/RU.json';
// import EN from './en/EN.json';
// eslint-disable-next-line import/extensions
import EN from './en/EN';
// eslint-disable-next-line import/extensions
import RU from './ru/RU';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'ru',
    lng: 'ru',
    resources: {
      en: { translation: EN },
      ru: { translation: RU },
    },
  });

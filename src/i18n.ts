import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import jaCommon from './locales/ja/common.json';
import enCommon from './locales/en/common.json';

const resources = {
  ja: {
    common: jaCommon,
  },
  en: {
    common: enCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // Default language
    fallbackLng: 'ja',
    debug: false,
    
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;

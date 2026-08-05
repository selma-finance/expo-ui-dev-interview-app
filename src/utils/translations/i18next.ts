import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './resources/en.json';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

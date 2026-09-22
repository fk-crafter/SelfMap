import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  i18n.use(LanguageDetector)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  fallbackLng: 'en',
  lng: isBrowser ? undefined : 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

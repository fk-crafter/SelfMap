import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'

const isBrowser = typeof window !== 'undefined'

const getInitialLang = () => {
  if (isBrowser) {
    const path = window.location.pathname.toLowerCase()
    if (path === '/fr' || path.startsWith('/fr/')) return 'fr'
    if (path === '/en' || path.startsWith('/en/')) return 'en'
    const stored = window.localStorage.getItem('i18nextLng')
    if (stored?.startsWith('fr')) return 'fr'
    if (stored?.startsWith('en')) return 'en'
  }
  return 'en'
}

if (isBrowser) {
  i18n.use(LanguageDetector)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  fallbackLng: 'en',
  lng: isBrowser ? getInitialLang() : 'en',
  detection: {
    order: ['path', 'querystring', 'localStorage', 'navigator'],
    lookupFromPathIndex: 0,
    lookupQuerystring: 'lang',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

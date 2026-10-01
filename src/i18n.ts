import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'

const isBrowser = typeof window !== 'undefined'

export const detectBrowserLanguage = (): 'fr' | 'en' => {
  if (!isBrowser) return 'en'
  try {
    const saved = localStorage.getItem('soultype_user_lang')
    if (saved === 'fr' || saved === 'en') return saved
  } catch (e) {}

  const lang =
    (typeof navigator !== 'undefined' &&
      (navigator.languages[0] || navigator.language)) ||
    ''
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

const getInitialLang = () => {
  if (isBrowser) {
    const path = window.location.pathname.toLowerCase()
    if (path === '/fr' || path.startsWith('/fr/')) {
      try {
        localStorage.setItem('soultype_user_lang', 'fr')
      } catch (e) {}
      return 'fr'
    }
    if (path === '/en' || path.startsWith('/en/')) {
      try {
        localStorage.setItem('soultype_user_lang', 'en')
      } catch (e) {}
      return 'en'
    }

    try {
      const saved = localStorage.getItem('soultype_user_lang')
      if (saved === 'fr' || saved === 'en') return saved
    } catch (e) {}

    return detectBrowserLanguage()
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
    order: ['path', 'localStorage', 'navigator'],
    lookupLocalStorage: 'soultype_user_lang',
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

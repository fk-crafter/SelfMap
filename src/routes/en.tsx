import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HomePage } from './index'

export const Route = createFileRoute('/en')({
  component: EnglishRoutePage,
  head: () => ({
    meta: [
      { title: 'SoulType | Discover Your Essence' },
      {
        name: 'description',
        content:
          'Discover your psychological profile and engage daily with your personal AI life coach.',
      },
    ],
  }),
})

function EnglishRoutePage() {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== 'en') {
      void i18n.changeLanguage('en')
    }
  }, [i18n])

  return <HomePage usersHelped={1205} />
}

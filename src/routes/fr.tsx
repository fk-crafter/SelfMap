import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeContent } from '@/components/home/HomeContent'

export const Route = createFileRoute('/fr')({
  component: FrenchRoutePage,
  head: () => ({
    meta: [
      { title: 'SoulType | Découvrez Votre Essence' },
      {
        name: 'description',
        content:
          'Découvrez votre profil psychologique et échangez au quotidien avec votre coach de vie IA personnel.',
      },
    ],
  }),
})

function FrenchRoutePage() {
  const { i18n } = useTranslation()

  useEffect(() => {
    try {
      localStorage.setItem('soultype_user_lang', 'fr')
    } catch {}
    if (i18n.language !== 'fr') {
      void i18n.changeLanguage('fr')
    }
  }, [i18n])

  return <HomeContent usersHelped={1205} />
}

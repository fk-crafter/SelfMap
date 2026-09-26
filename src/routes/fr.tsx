import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HomePage } from './index'

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
    if (i18n.language !== 'fr') {
      void i18n.changeLanguage('fr')
    }
  }, [i18n])

  return <HomePage usersHelped={1205} />
}

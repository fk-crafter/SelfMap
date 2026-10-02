import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { detectBrowserLanguage } from '@/i18n'
import { HeroSection } from '@/components/home/HeroSection'
import { Navbar } from '@/components/home/Navbar'
import { ValueProposition } from '@/components/home/ValueProposition'
import { FeaturesBento } from '@/components/home/FeaturesBento'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FoundersNote } from '@/components/home/FoundersNote'
import { Pricing } from '#/components/home/Pricing'
import { FAQ } from '#/components/home/FAQ'
import { CTA } from '#/components/home/CTA'
import { Footer } from '#/components/home/Footer'

export function HomeContent({
  usersHelped = 1205,
}: { usersHelped?: number } = {}) {
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const detected = detectBrowserLanguage()
      if (detected === 'fr') {
        void i18n.changeLanguage('fr')
        navigate({ to: '/fr', replace: true })
      } else {
        if (i18n.language !== 'en') {
          void i18n.changeLanguage('en')
        }
      }
    }
  }, [i18n, navigate])

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(233,195,73,0.1)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 z-0 h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(197,192,254,0.1)_0%,transparent_70%)]" />

      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-32 pt-32 md:px-12">
        <HeroSection usersHelped={usersHelped} />
        <ValueProposition />
        <FeaturesBento />
        <HowItWorks />
        <FoundersNote />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}

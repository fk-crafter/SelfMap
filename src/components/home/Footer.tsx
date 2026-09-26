import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#001809]/80 px-6 py-12 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2 text-[#e9c349]">
          <img
            src="/logo.png"
            alt="SoulType"
            className="h-8 w-8 object-contain"
          />
          <span className="font-serif text-xl font-normal tracking-tight">
            SoulType
          </span>
        </div>

        <div className="flex gap-6 text-sm text-[#c8c5d0]/60">
          <Link
            to="/privacy"
            className="transition-colors hover:text-[#e9c349]"
          >
            {t('footer.privacy')}
          </Link>
          <Link to="/terms" className="transition-colors hover:text-[#e9c349]">
            {t('footer.terms')}
          </Link>
          <a
            href="mailto:contact@soultype.test"
            className="transition-colors hover:text-[#e9c349]"
          >
            {t('footer.contact')}
          </a>
        </div>

        <div className="text-sm text-[#c8c5d0]/40">
          © {new Date().getFullYear()} SoulType. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}

import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { Toaster } from 'sonner'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'SoulType',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#001809] relative overflow-hidden">
      <div className="absolute w-125 h-125 rounded-full bg-[#c5c0fe] opacity-10 blur-[80px] pointer-events-none z-0" />
      <div className="relative z-10 p-12 text-center rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl shadow-2xl">
        <h1 className="font-serif text-8xl font-normal text-[#e9c349]">404</h1>
        <p className="mt-4 text-lg text-[#c8c5d0]">
          This dimension doesn't exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-block px-8 py-4 bg-[#e9c349] text-[#001809] font-bold rounded-full no-underline hover:bg-[#e9c349]/90 transition-transform active:scale-95 shadow-[0_0_15px_rgba(233,195,73,0.2)]"
        >
          Return to Sanctuary
        </a>
      </div>
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession()
      if (data?.user) {
        setUser(data.user)
      }
    }

    fetchSession()
  }, [setUser])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[#e9c349]/20 bg-[#001809] dark text-[#c9ebd0]">
        {children}

        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast:
                'bg-[#032110] border border-white/10 text-[#c9ebd0] font-sans rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3 px-4 py-3 w-full',
              title: 'text-[#c9ebd0] font-bold text-sm',
              description: 'text-[#c8c5d0]/70 text-xs',
              success: 'text-[#e9c349]',
              error: 'text-[#ffb4ab]',
            },
          }}
        />

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

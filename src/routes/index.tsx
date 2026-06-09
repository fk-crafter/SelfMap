import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HeroSection } from '@/components/home/HeroSection'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { usersHelped: 1205 }
  },
  head: () => ({
    meta: [
      { title: 'SelfMap | Ton coach de vie IA' },
      {
        name: 'description',
        content:
          'Découvre ton profil psychologique et échange au quotidien avec ton coach de vie IA.',
      },
    ],
  }),
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-[#001809] p-6">
      <div className="animate-pulse text-sm text-[#e9c349]">
        Chargement de ton espace personnalisé...
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-[#001809] p-6 text-center">
      <Card className="border-red-900 bg-red-950/50">
        <CardHeader>
          <CardTitle className="text-red-400">Oups !</CardTitle>
          <CardDescription className="text-red-300/80">
            Une erreur est survenue lors de l'accès à la plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-200">{error.message}</p>
        </CardContent>
      </Card>
    </main>
  ),
})

function HomePage() {
  const { usersHelped } = Route.useLoaderData()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#001809] p-6 text-[#c9ebd0] md:p-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 z-0 h-[600px] w-[600px] pointer-events-none rounded-full bg-[#e9c349] opacity-10 blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 z-0 h-[600px] w-[600px] pointer-events-none rounded-full bg-[#c5c0fe] opacity-10 blur-[100px]" />

      <HeroSection usersHelped={usersHelped} />
    </main>
  )
}

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
    <main className="flex min-h-screen items-center justify-center bg-[#F9F7FA] p-6">
      <div className="animate-pulse text-sm text-[#1D1B4B]/70">
        Chargement de ton espace personnalisé...
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-[#F9F7FA] p-6 text-center">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Oups !</CardTitle>
          <CardDescription className="text-red-500/80">
            Une erreur est survenue lors de l'accès à la plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-700">{error.message}</p>
        </CardContent>
      </Card>
    </main>
  ),
})

function HomePage() {
  const { usersHelped } = Route.useLoaderData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9F7FA] p-6 text-[#1A1A1A] md:p-10">
      <HeroSection usersHelped={usersHelped} />
    </main>
  )
}

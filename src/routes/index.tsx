import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HeroSection } from '../components/home/HeroSection'

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
    <main className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="text-sm text-muted-foreground animate-pulse">
        Chargement de ton espace personnalisé...
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="flex min-h-[80vh] items-center justify-center text-center p-6">
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
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
      <HeroSection usersHelped={usersHelped} />
    </main>
  )
}

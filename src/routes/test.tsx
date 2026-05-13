import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/test')({
  component: TestPage,
  head: () => ({
    meta: [
      { title: 'SelfMap | Ton Test' },
      {
        name: 'description',
        content:
          'Passe ton test de personnalité pour initialiser ton coach IA.',
      },
    ],
  }),
})

function TestPage() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <Button variant="ghost" asChild className="-ml-4 mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Ton Profil Psychologique
          </h1>
          <p className="text-muted-foreground mt-2">
            Réponds spontanément à ces questions pour calibrer ton coach IA.
          </p>
        </div>

        <Card className="border-primary/10 shadow-md">
          <CardHeader>
            <CardTitle>Question 1</CardTitle>
            <CardDescription>Mise en situation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-lg font-medium text-foreground">
              Dans un groupe d'inconnus, comment te comportes-tu généralement ?
            </p>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="h-auto justify-start whitespace-normal py-4 text-left"
              >
                Je prends les devants et j'engage la conversation.
              </Button>
              <Button
                variant="outline"
                className="h-auto justify-start whitespace-normal py-4 text-left"
              >
                J'attends que quelqu'un vienne me parler.
              </Button>
              <Button
                variant="outline"
                className="h-auto justify-start whitespace-normal py-4 text-left"
              >
                J'observe d'abord la dynamique avant d'interagir.
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

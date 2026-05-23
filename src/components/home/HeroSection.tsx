import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users } from 'lucide-react'

export function HeroSection({ usersHelped }: { usersHelped: number }) {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-12 text-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl">
          SelfMap
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-normal">
          Découvre ton profil psychologique et échange au quotidien avec ton{' '}
          <span className="font-semibold text-primary">coach de vie IA</span>{' '}
          ultra-personnalisé pour atteindre tes objectifs.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle>Prêt à te comprendre ?</CardTitle>
          <CardDescription>
            Passe un test de 5 minutes pour cartographier ta personnalité.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button size="lg" className="w-full text-lg h-12">
            <Link to="/test">Commencer mon test</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
          <Separator />
          <div className="flex items-center gap-2 pt-1">
            <Users className="h-4 w-4 text-primary" />
            <p>
              Déjà{' '}
              <span className="font-medium text-foreground">
                {usersHelped} personnes
              </span>{' '}
              accompagnées vers leur meilleure version.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

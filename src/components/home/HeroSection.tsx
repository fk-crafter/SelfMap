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
import { Users, Wind } from 'lucide-react'

export function HeroSection({ usersHelped }: { usersHelped: number }) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-12 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1D1B4B]/5 mb-2">
          <Wind className="h-8 w-8 text-[#1D1B4B]" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter text-[#1D1B4B] sm:text-7xl">
          SoulGuided
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-normal text-[#1A1A1A]/70">
          Découvre ton profil psychologique et échange au quotidien avec ton{' '}
          <span className="font-semibold text-[#1D1B4B]">coach de vie IA</span>{' '}
          ultra-personnalisé pour atteindre tes objectifs.
        </p>
      </div>

      <Card className="w-full max-w-md overflow-hidden border-none bg-white shadow-xl shadow-[#1D1B4B]/5">
        <CardHeader className="bg-white">
          <CardTitle className="text-2xl text-[#1D1B4B]">
            Prêt à te comprendre ?
          </CardTitle>
          <CardDescription className="text-[#1A1A1A]/60">
            Passe un test de 5 minutes pour cartographier ta personnalité.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white grid gap-4">
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-[#1D1B4B] text-lg text-white hover:bg-[#1D1B4B]/90"
            asChild
          >
            <Link to="/test">Commencer mon test</Link>
          </Button>
        </CardContent>
        <CardFooter className="bg-white flex flex-col gap-3 text-sm text-[#1A1A1A]/60 pb-6">
          <Separator className="bg-[#1D1B4B]/10" />
          <div className="flex items-center gap-2 pt-1">
            <Users className="h-4 w-4 text-[#1D1B4B]" />
            <p>
              Déjà{' '}
              <span className="font-medium text-[#1D1B4B]">
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

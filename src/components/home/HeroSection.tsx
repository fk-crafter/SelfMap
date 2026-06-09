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
    <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-12 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-[#e9c349]/20 bg-[#e9c349]/10 shadow-[0_0_30px_rgba(233,195,73,0.15)]">
          <Wind className="h-8 w-8 text-[#e9c349]" />
        </div>
        <h1 className="font-serif text-5xl font-normal tracking-tight text-[#e9c349] sm:text-7xl">
          SoulType
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#c8c5d0]">
          Discover your psychological profile and chat daily with your{' '}
          <span className="font-medium text-[#c9ebd0]">AI Growth Coach</span>{' '}
          tailored to help you reach your self-actualization goals.
        </p>
      </div>

      <Card className="w-full max-w-md overflow-hidden border border-white/5 bg-[rgba(197,192,254,0.02)] p-2 shadow-2xl backdrop-blur-xl rounded-[2.5rem]">
        <CardHeader className="pt-8 pb-4">
          <CardTitle className="font-serif text-2xl font-normal text-[#c9ebd0]">
            Ready to understand yourself?
          </CardTitle>
          <CardDescription className="text-base text-[#c8c5d0]/70">
            Take a 5-minute test to map your personality.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-6">
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-[#e9c349] text-lg font-bold text-[#001809] shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-transform hover:bg-[#e9c349]/90 active:scale-95"
            asChild
          >
            <Link to="/test">Start my test</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-8 text-sm text-[#c8c5d0]/60">
          <Separator className="bg-white/10" />
          <div className="flex items-center gap-2 pt-2">
            <Users className="h-4 w-4 text-[#e9c349]" />
            <p>
              Join{' '}
              <span className="font-medium text-[#e9c349]">
                {usersHelped} explorers
              </span>{' '}
              guided towards their true essence.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

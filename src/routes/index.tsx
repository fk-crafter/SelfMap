import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HeroSection } from '@/components/home/HeroSection'
import { Navbar } from '@/components/home/Navbar'
import { ValueProposition } from '@/components/home/ValueProposition'
import { FeaturesBento } from '@/components/home/FeaturesBento'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { usersHelped: 1205 }
  },
  head: () => ({
    meta: [
      { title: 'SoulType | Discover Your Essence' },
      {
        name: 'description',
        content:
          'Découvre ton profil psychologique et échange au quotidien avec ton coach de vie IA.',
      },
    ],
  }),
  pendingComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-[#001809] p-6">
      <div className="animate-pulse text-sm font-medium tracking-widest text-[#e9c349] uppercase">
        Loading Sanctuary...
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-[#001809] p-6 text-center">
      <Card className="border border-[#93000a]/30 bg-[#93000a]/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-[#ffb4ab]">System Error</CardTitle>
          <CardDescription className="text-[#ffb4ab]/80">
            An anomaly occurred while accessing the sanctuary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#ffb4ab]">{error.message}</p>
        </CardContent>
      </Card>
    </main>
  ),
})

function HomePage() {
  const { usersHelped } = Route.useLoaderData()

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-150 w-150 rounded-full bg-[#e9c349] opacity-10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 z-0 h-150 w-150 rounded-full bg-[#c5c0fe] opacity-10 blur-[100px]" />

      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-32 pt-32 md:px-12">
        <HeroSection usersHelped={usersHelped} />
        <ValueProposition />
        <FeaturesBento />
      </main>
    </div>
  )
}

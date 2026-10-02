import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HomeContent } from '@/components/home/HomeContent'

export const Route = createFileRoute('/')({
  component: IndexPage,
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
          'Discover your psychological profile and engage daily with your personal AI life coach.',
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
          <p className="text-sm text-[#ffb4ab]">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </CardContent>
      </Card>
    </main>
  ),
})

function IndexPage() {
  const data = Route.useLoaderData()
  return <HomeContent usersHelped={data.usersHelped} />
}

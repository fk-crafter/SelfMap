import { createFileRoute } from '@tanstack/react-router'

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
    <main className="flex min-h-[80vh] items-center justify-center">
      <div className="animate-pulse rounded-full bg-slate-200 px-6 py-3 font-semibold text-slate-600">
        Chargement de l'expérience...
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="flex min-h-[80vh] items-center justify-center text-center">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h2 className="mb-2 text-xl font-bold text-red-600">
          Oups, une erreur est survenue !
        </h2>
        <p className="text-red-500/80">{error.message}</p>
      </div>
    </main>
  ),
})

function HomePage() {
  const { usersHelped } = Route.useLoaderData()

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
        SelfMap
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Découvre ton profil psychologique et échange au quotidien avec ton coach
        de vie IA ultra-personnalisé.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4">
        <button className="rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
          Commencer mon test
        </button>
        <p className="text-sm text-slate-500">
          Déjà {usersHelped} personnes accompagnées.
        </p>
      </div>
    </main>
  )
}

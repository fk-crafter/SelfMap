import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { DimensionBar } from '@/components/profile/DimensionBar'
import { CalibrationScore } from '@/components/profile/CalibrationScore'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { DashboardBottomNav } from '@/components/layout/DashboardBottomNav'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type ExtendedUser = {
  id: string
  name: string
  type?: string | null
  insight?: string | null
  avatarSeed?: string | null
  scores?: string | null
  calibrationScore?: number
}

function ProfilePage() {
  const navigate = useNavigate()
  const { data, isPending, refetch } = authClient.useSession()
  const [currentCalibration, setCurrentCalibration] = useState(0)

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!isPending && !data?.session) {
      navigate({ to: '/login' })
    }
  }, [data, isPending, navigate])

  const profile = data?.user as ExtendedUser | undefined

  useEffect(() => {
    if (profile?.id) {
      const savedScore = localStorage.getItem(`calibration_${profile.id}`)
      if (savedScore) {
        setCurrentCalibration(Number(savedScore))
      } else if (profile.calibrationScore) {
        setCurrentCalibration(profile.calibrationScore)
      }
    }
  }, [profile?.id, profile?.calibrationScore])

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  if (!profile || !profile.type) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#001809] p-6 text-center text-[#c9ebd0]">
        <h1 className="mb-4 font-serif text-3xl font-normal text-[#e9c349]">
          Profile incomplete
        </h1>
        <p className="mb-8 text-[#c8c5d0]/70">
          Take the test to discover your results.
        </p>
        <Button
          asChild
          className="rounded-full bg-[#e9c349] px-8 py-6 font-bold text-[#001809] hover:bg-[#e9c349]/90"
        >
          <Link to="/test">Take the test</Link>
        </Button>
      </div>
    )
  }

  let scores = { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 }
  if (profile.scores) {
    try {
      scores = JSON.parse(profile.scores)
    } catch (e) {
      console.error('Error parsing scores')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-125 w-125 rounded-full bg-[#c5c0fe] opacity-10 blur-[80px]" />

      <header className="sticky top-0 z-30 flex items-center justify-center border-b border-white/5 bg-[#001809]/80 px-6 py-5 backdrop-blur-xl">
        <h1 className="font-serif text-2xl font-normal tracking-tight text-[#e9c349]">
          My Profile
        </h1>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 pb-32">
        <div className="mt-8 flex flex-col items-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[rgba(197,192,254,0.05)] shadow-[0_0_30px_rgba(197,192,254,0.1)]">
            <img
              src={profile.avatarSeed || './avatar-coach.png'}
              alt="User Avatar"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
          <h2 className="mt-6 font-serif text-4xl font-normal tracking-tight text-[#c9ebd0]">
            {profile.type}
          </h2>
          <span className="mt-2 rounded-full border border-[#e9c349]/30 bg-[#e9c349]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#e9c349]">
            {profile.name}
          </span>
        </div>

        <Card className="mt-10 rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 shadow-xl backdrop-blur-xl">
          <h3 className="mb-6 font-serif text-xl text-[#c9ebd0]">
            Cognitive Mapping
          </h3>
          <div className="flex flex-col gap-6">
            <DimensionBar
              leftLabel="Extraverted"
              rightLabel="Introverted"
              leftValue={scores.E}
              rightValue={scores.I}
              colorClass="bg-[#e9c349] shadow-[0_0_10px_#e9c349]"
            />
            <DimensionBar
              leftLabel="Sensing"
              rightLabel="Intuition"
              leftValue={scores.S}
              rightValue={scores.N}
              colorClass="bg-[#c5c0fe] shadow-[0_0_10px_#c5c0fe]"
            />
            <DimensionBar
              leftLabel="Thinking"
              rightLabel="Feeling"
              leftValue={scores.T}
              rightValue={scores.F}
              colorClass="bg-[#c9ebd0] shadow-[0_0_10px_#c9ebd0]"
            />
            <DimensionBar
              leftLabel="Judging"
              rightLabel="Perceiving"
              leftValue={scores.J}
              rightValue={scores.P}
              colorClass="bg-[#ffb4ab] shadow-[0_0_10px_#ffb4ab]"
            />
          </div>
        </Card>

        <div className="mt-6 flex flex-col gap-6">
          <CalibrationScore score={currentCalibration} />

          <Card className="rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] p-6 shadow-xl backdrop-blur-xl">
            <h3 className="mb-3 font-serif text-xl text-[#c9ebd0]">
              AI Analysis
            </h3>
            <p className="text-sm italic leading-relaxed text-[#c8c5d0]">
              "{profile.insight}"
            </p>
          </Card>
        </div>
      </main>

      <DashboardBottomNav />
    </div>
  )
}

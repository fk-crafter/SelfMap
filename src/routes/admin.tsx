import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Loader2, ArrowLeft, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})

type AdminUser = {
  id: string
  name: string
  email: string
  plan: string
  type: string | null
  gender: string | null
  createdAt: string
}

function AdminDashboard() {
  const navigate = useNavigate()
  const storedUser = useUserStore((state: any) => state.user)

  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [isUpdatingPlan, setIsUpdatingPlan] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminUrl = import.meta.env.PROD
          ? '/users/admin/list'
          : 'https://selfmap-bck.onrender.com/users/admin/list'

        const res = await window.fetch(adminUrl, {
          credentials: 'include',
        })

        if (res.ok) {
          const data = await res.json()
          setUsers(data)
        } else if (res.status === 404) {
          toast.error(
            'Le backend Render est en train de se mettre à jour (404), réessaie dans 2 min',
          )
          navigate({ to: '/dashboard' })
        } else {
          toast.error(
            'Accès non autorisé : as-tu coché isAdmin dans la base de données ?',
          )
          navigate({ to: '/dashboard' })
        }
      } catch (error) {
        console.error(error)
        toast.error('Erreur réseau avec le serveur')
        navigate({ to: '/dashboard' })
      } finally {
        setIsLoadingUsers(false)
      }
    }

    if (!storedUser) {
      navigate({ to: '/login' })
    } else {
      fetchUsers()
    }
  }, [storedUser, navigate])

  const handlePlanChange = async (userId: string, newPlan: string) => {
    setIsUpdatingPlan(userId)

    try {
      const updateUrl = import.meta.env.PROD
        ? '/users/admin/update-plan'
        : 'https://selfmap-bck.onrender.com/users/admin/update-plan'

      const res = await window.fetch(updateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ targetUserId: userId, newPlan }),
      })

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, plan: newPlan.toUpperCase() } : u,
          ),
        )
        toast.success(`Plan mis à jour : ${newPlan}`)
      } else {
        toast.error('Erreur lors de la modification')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur réseau')
    } finally {
      setIsUpdatingPlan(null)
    }
  }

  if (isLoadingUsers) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#001809]">
        <Loader2 className="h-8 w-8 animate-spin text-[#e9c349]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#001809] text-[#c9ebd0] font-sans p-6">
      <header className="flex items-center gap-4 mb-8">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9ebd0] hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#e9c349]" />
          <h1 className="font-serif text-2xl text-[#e9c349]">Espace Admin</h1>
        </div>
      </header>

      <div className="rounded-[2rem] border border-white/5 bg-[rgba(197,192,254,0.02)] backdrop-blur-xl p-6 shadow-xl overflow-hidden">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#c8c5d0]">
            Base Utilisateurs ({users.length})
          </h2>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-200 text-left text-sm text-[#c8c5d0]">
            <thead className="border-b border-white/10 text-xs uppercase text-[#c8c5d0]/50">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Date</th>
                <th className="whitespace-nowrap px-4 py-3">Nom</th>
                <th className="whitespace-nowrap px-4 py-3">Email</th>
                <th className="whitespace-nowrap px-4 py-3">Plan</th>
                <th className="whitespace-nowrap px-4 py-3">Type</th>
                <th className="whitespace-nowrap px-4 py-3">Genre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="whitespace-nowrap px-4 py-4">
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-[#c9ebd0]">
                    {u.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">{u.email}</td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <select
                      value={u.plan}
                      onChange={(e) => handlePlanChange(u.id, e.target.value)}
                      disabled={isUpdatingPlan === u.id}
                      className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider outline-none cursor-pointer transition-colors ${
                        u.plan === 'PRO'
                          ? 'bg-purple-500/20 text-purple-400'
                          : u.plan === 'BETA'
                            ? 'bg-[#e9c349]/20 text-[#e9c349]'
                            : 'bg-gray-500/20 text-gray-400'
                      } ${isUpdatingPlan === u.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="FREE" className="bg-[#001809] text-white">
                        FREE
                      </option>
                      <option value="BETA" className="bg-[#001809] text-white">
                        BETA
                      </option>
                      <option value="PRO" className="bg-[#001809] text-white">
                        PRO
                      </option>
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {u.type || '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {u.gender || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

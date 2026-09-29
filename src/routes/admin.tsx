import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/userStore'
import { Loader2, ArrowLeft, Shield, Trash2, AlertTriangle, Search } from 'lucide-react'
import { toast } from 'sonner'

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
  const { data: sessionData, isPending } = authClient.useSession()
  const storedUser = useUserStore((state: any) => state.user)
  const hasHydrated = useUserStore((state: any) => state._hasHydrated)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [isUpdatingPlan, setIsUpdatingPlan] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null)
  const [isDeletingUser, setIsDeletingUser] = useState<string | null>(null)

  const currentAdminId = sessionData?.user?.id || storedUser?.id

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

    if (hasHydrated && !isPending) {
      if (!sessionData?.session && !storedUser) {
        navigate({ to: '/login', replace: true })
      } else {
        fetchUsers()
      }
    }
  }, [hasHydrated, sessionData, isPending, storedUser, navigate])

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

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    const targetId = userToDelete.id
    setIsDeletingUser(targetId)

    try {
      const deleteUrl = import.meta.env.PROD
        ? '/users/admin/delete-user'
        : 'https://selfmap-bck.onrender.com/users/admin/delete-user'

      const res = await window.fetch(deleteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ targetUserId: targetId }),
      })

      const data = await res.json()

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== targetId))
        toast.success(data.message || 'Utilisateur supprimé de la base de données')
        setUserToDelete(null)
      } else {
        toast.error(data.message || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur réseau lors de la suppression')
    } finally {
      setIsDeletingUser(null)
    }
  }

  const filteredUsers = users.filter((u) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.type?.toLowerCase().includes(term) ||
      u.plan?.toLowerCase().includes(term)
    )
  })

  if (((isPending && !storedUser) || (!hasHydrated && !storedUser)) && isLoadingUsers) {
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
        <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#c8c5d0]">
            Base Utilisateurs ({filteredUsers.length}{searchTerm ? ` / ${users.length}` : ''})
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c8c5d0]/50" />
            <input
              type="text"
              placeholder="Rechercher nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-white/10 bg-[#001809]/60 text-[#c9ebd0] placeholder-[#c8c5d0]/40 outline-none focus:border-[#e9c349]/50 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-220 text-left text-sm text-[#c8c5d0]">
            <thead className="border-b border-white/10 text-xs uppercase text-[#c8c5d0]/50">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Date</th>
                <th className="whitespace-nowrap px-4 py-3">Nom</th>
                <th className="whitespace-nowrap px-4 py-3">Email</th>
                <th className="whitespace-nowrap px-4 py-3">Plan</th>
                <th className="whitespace-nowrap px-4 py-3">Type</th>
                <th className="whitespace-nowrap px-4 py-3">Genre</th>
                <th className="whitespace-nowrap px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="whitespace-nowrap px-4 py-4 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-[#c9ebd0]">
                    {u.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs font-mono">{u.email}</td>
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
                  <td className="whitespace-nowrap px-4 py-4 text-xs font-mono">
                    {u.type || '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs">
                    {u.gender || '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    {u.id === currentAdminId ? (
                      <span className="text-[11px] text-[#e9c349]/60 font-mono italic">
                        Vous (Admin)
                      </span>
                    ) : (
                      <button
                        onClick={() => setUserToDelete(u)}
                        disabled={isDeletingUser === u.id}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 hover:border-red-500/40 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        title="Supprimer cet utilisateur de la base de données"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Supprimer</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-[#93000a]/40 bg-[#001206] p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-[#ffb4ab]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#93000a]/20 border border-[#93000a]/30">
                <AlertTriangle className="h-5 w-5 text-[#ffb4ab]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#ffdad6]">
                  Supprimer l'utilisateur ?
                </h3>
                <p className="text-xs text-[#ffb4ab]/80">
                  Cette action est irréversible
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-xs space-y-1.5 text-[#c8c5d0]">
              <p>
                <span className="text-white/40">Nom :</span>{' '}
                <strong className="text-white">{userToDelete.name}</strong>
              </p>
              <p>
                <span className="text-white/40">Email :</span>{' '}
                <strong className="text-white">{userToDelete.email}</strong>
              </p>
              <p>
                <span className="text-white/40">ID :</span>{' '}
                <span className="font-mono text-[10px] text-white/60">{userToDelete.id}</span>
              </p>
            </div>

            <p className="text-xs text-[#c8c5d0]/80 leading-relaxed">
              L'utilisateur et toutes ses données associées (profil psychologique, sessions, historique de chat, journal, synthèses) seront <strong className="text-[#ffdad6]">définitivement supprimés</strong> de la base de données.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={Boolean(isDeletingUser)}
                onClick={() => setUserToDelete(null)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-[#c9ebd0] hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={Boolean(isDeletingUser)}
                onClick={handleDeleteUser}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#93000a] py-2.5 text-xs font-bold text-[#ffdad6] hover:bg-[#690005] active:scale-95 transition-all shadow-[0_0_15px_rgba(147,0,10,0.3)] cursor-pointer disabled:opacity-50"
              >
                {isDeletingUser ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Suppression...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Supprimer définitivement</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

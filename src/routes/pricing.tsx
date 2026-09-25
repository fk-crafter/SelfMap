import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/pricing')({
  component: PricingRedirect,
})

function PricingRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/subscription', replace: true })
  }, [navigate])

  return null
}

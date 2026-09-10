import { createFileRoute, Link } from '@tanstack/react-router'
import { Sparkles, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/terms')({
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-[600px] w-[600px] rounded-full bg-[#e9c349] opacity-10 blur-[100px]" />
      
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#001809]/80 px-6 py-4 backdrop-blur-xl md:px-12">
        <Link to="/" className="flex items-center gap-2 text-[#e9c349] transition-opacity hover:opacity-80">
          <Sparkles className="h-5 w-5" />
          <span className="font-serif text-xl font-normal tracking-tight">SoulType</span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm text-[#c8c5d0] transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </nav>

      <main className="prose prose-invert prose-headings:font-serif prose-headings:text-[#c9ebd0] prose-p:text-[#c8c5d0] prose-a:text-[#e9c349] relative z-10 mx-auto w-full max-w-4xl px-6 pb-32 pt-32 md:px-12">
        <h1 className="mb-2 text-4xl sm:text-5xl">Terms of Service</h1>
        <p className="mb-10 text-sm opacity-60">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <section className="space-y-6">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the SoulType service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.</p>

          <h2>2. Description of Service</h2>
          <p>SoulType provides an AI-powered psychological assessment and conversational coaching platform. The coaching provided by the AI is for informational and self-reflection purposes only and does not substitute professional mental health advice, diagnosis, or treatment.</p>

          <h2>3. User Accounts</h2>
          <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

          <h2>4. Subscriptions and Payments</h2>
          <p>Certain aspects of the Service are billed on a subscription basis ("Awakened" tier). You will be billed in advance on a recurring and periodic basis (such as monthly or annually), depending on the type of subscription plan you select when purchasing the Subscription.</p>

          <h2>5. Intellectual Property</h2>
          <p>The Service and its original content (excluding Content provided by you), features and functionality are and will remain the exclusive property of SoulType and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

          <h2>6. Limitation of Liability</h2>
          <p>In no event shall SoulType, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          
          <h2>7. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
        </section>
      </main>
    </div>
  )
}

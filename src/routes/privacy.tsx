import { createFileRoute, Link } from '@tanstack/react-router'
import { Sparkles, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#001809] font-sans text-[#c9ebd0]">
      <div className="pointer-events-none absolute -left-40 -top-40 z-0 h-150 w-150 rounded-full bg-[#e9c349] opacity-10 blur-[100px]" />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#001809]/80 px-6 py-4 backdrop-blur-xl md:px-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#e9c349] transition-opacity hover:opacity-80"
        >
          <Sparkles className="h-5 w-5" />
          <span className="font-serif text-xl font-normal tracking-tight">
            SoulType
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-[#c8c5d0] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </nav>

      <main className="prose prose-invert prose-headings:font-serif prose-headings:text-[#c9ebd0] prose-p:text-[#c8c5d0] prose-a:text-[#e9c349] relative z-10 mx-auto w-full max-w-4xl px-6 pb-32 pt-32 md:px-12">
        <h1 className="mb-2 text-4xl sm:text-5xl">Privacy Policy</h1>
        <p className="mb-10 text-sm opacity-60">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        <section className="space-y-6">
          <h2>1. Introduction</h2>
          <p>
            Welcome to SoulType. We respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you
            as to how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law
            protects you.
          </p>

          <h2>2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul>
            <li>
              <strong>Identity Data</strong> includes first name, last name,
              username or similar identifier.
            </li>
            <li>
              <strong>Contact Data</strong> includes email address and telephone
              numbers.
            </li>
            <li>
              <strong>Psychological Data</strong> includes the responses to your
              cognitive assessments and journal entries you share with your AI
              coach.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP)
              address, your login data, browser type and version, time zone
              setting and location.
            </li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul>
            <li>
              To provide and maintain our Service, including to monitor the
              usage of our Service.
            </li>
            <li>
              To manage Your Account and personalize the AI coach experience for
              you.
            </li>
            <li>
              To communicate with you about updates or informative
              communications related to the functionalities, products or
              contracted services.
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed. Your psychological data and
            journal entries are encrypted and kept strictly confidential.
          </p>

          <h2>5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to
            request access, correction, erasure, restriction, transfer, to
            object to processing, to portability of data and (where the lawful
            ground of processing is consent) to withdraw consent.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at{' '}
            <a href="mailto:contact@soultype.test">contact@soultype.test</a>.
          </p>
        </section>
      </main>
    </div>
  )
}

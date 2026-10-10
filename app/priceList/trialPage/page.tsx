import type { Metadata } from 'next'
import CopyEmail from '../../../components/CopyEmail'
import { Bullet, Button, Chip, Eyebrow, Section } from '../../../components/ui'
import { TRIAL } from '../../../lib/site'

export const metadata: Metadata = {
  title: 'Trial Lesson',
  description: 'Book a 50-minute trial Japanese lesson with Hiyori sensei for $10.',
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-5 rounded-3xl border border-line/70 bg-white p-6 shadow-card sm:p-7">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-bold text-white">
        {n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h2 className="text-[22px]">{title}</h2>
        {children}
      </div>
    </li>
  )
}

export default function TrialPage() {
  return (
    <Section bg="hero" className="!py-12 md:!py-20">
      <div className="flex flex-col gap-3">
        <Eyebrow>Trial lesson</Eyebrow>
        <h1 className="text-4xl sm:text-5xl">Book your trial lesson</h1>
        <p className="text-lg text-ink-soft">
          Enjoy speaking Japanese with Hiyori sensei! It takes three short steps.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_400px]">
        <ol className="flex flex-col gap-4">
          <Step n={1} title="Pay for your trial">
            <p className="leading-relaxed text-ink-soft">
              Choose the payment method you prefer. Both open in a new tab.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button href={TRIAL.stripeUrl} variant="accent">
                Pay with Stripe
              </Button>
              <Button href={TRIAL.wiseUrl} variant="outline">
                Pay with Wise
              </Button>
            </div>
          </Step>
          <Step n={2} title="Email Hiyori">
            <p className="leading-relaxed text-ink-soft">
              After paying, send an email with the subject{' '}
              <strong className="text-ink">&quot;Trial Lesson&quot;</strong> and include your name.
            </p>
            <CopyEmail />
          </Step>
          <Step n={3} title="Pick your time">
            <p className="leading-relaxed text-ink-soft">
              Hiyori will reply with a reservation link so you can book the time that suits you.
            </p>
          </Step>
        </ol>

        <aside className="flex flex-col gap-5 rounded-[1.75rem] bg-white p-8 shadow-card lg:sticky lg:top-28">
          <Chip>Trial lesson</Chip>
          <p className="flex items-baseline gap-2.5">
            <span className="font-heading text-6xl font-bold leading-none">${TRIAL.price}</span>
            <span className="text-[15px] font-medium text-ink-soft">USD, one-time</span>
          </p>
          <ul className="flex flex-col gap-2.5">
            <Bullet>50-minute 1-on-1 online lesson</Bullet>
            <Bullet>Conversation-focused, beginner-friendly</Bullet>
            <Bullet>One-time payment</Bullet>
          </ul>
          <hr className="border-line" />
          <div className="flex flex-col gap-1.5">
            <h2 className="font-body text-sm font-bold">Changes and cancellations</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Please change or cancel at least 24 hours before your lesson starts. Later cancellations are charged in
              full.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  )
}

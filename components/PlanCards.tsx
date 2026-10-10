import Link from 'next/link'
import { PLANS } from '../lib/plans'
import { Chip, hoverLift } from './ui'

export default function PlanCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PLANS.map((plan) => {
        const perLesson = (plan.price / plan.lessons).toFixed(2)
        const rec = plan.recommended
        return (
          <div
            key={plan.name}
            className={`flex flex-col gap-5 rounded-3xl p-7 ${hoverLift} ${
              rec
                ? 'bg-gradient-to-br from-ink to-[#2B4B77] text-white shadow-lift'
                : 'border border-line/70 bg-white shadow-card'
            }`}
          >
            <div className="flex min-h-7 items-center justify-between gap-2">
              <h3 className="font-body text-lg font-bold">{plan.lessons} lessons</h3>
              {rec && <Chip className="!bg-peach">Recommended</Chip>}
            </div>
            <div>
              <p className="flex items-baseline gap-2">
                <span className="font-heading text-[44px] font-bold leading-none">${plan.price}</span>
                <span className={`text-sm font-medium ${rec ? 'text-white/75' : 'text-ink-soft'}`}>USD / month</span>
              </p>
              <p className={`mt-1 text-sm ${rec ? 'text-white/75' : 'text-ink-soft'}`}>${perLesson} per lesson</p>
            </div>
            <Link
              href={{ pathname: '/payment', query: { price: plan.price, name: plan.name } }}
              className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-bold transition-colors ${
                rec
                  ? 'bg-sakura text-white hover:bg-sakura-dark'
                  : 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white'
              }`}
            >
              Select plan
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export function CancellationNote() {
  return (
    <p className="flex flex-col gap-1 rounded-2xl bg-mint px-6 py-5 text-[15px] sm:flex-row sm:gap-4">
      <strong className="shrink-0">Changes and cancellations</strong>
      <span>
        Please change or cancel at least 24 hours before your lesson starts. Later cancellations are charged in full.
      </span>
    </p>
  )
}

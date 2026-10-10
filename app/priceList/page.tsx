import type { Metadata } from 'next'
import PlanCards, { CancellationNote } from '../../components/PlanCards'
import { Button, Section, SectionHeading } from '../../components/ui'
import { TRIAL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Monthly lesson plans from $84, and a 50-minute trial lesson for $10.',
}

export default function PriceListPage() {
  return (
    <Section bg="cream" className="!py-12 md:!py-20">
      <SectionHeading
        eyebrow="Pricing"
        title="Choose Your Lesson Plan"
        sub="Every lesson is 50 minutes. New to the lessons? Start with a trial."
      />
      <div className="mt-12 flex flex-col gap-6">
        <PlanCards />
        <CancellationNote />
        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <p className="text-ink-soft">Not ready to commit to a plan?</p>
          <Button href={TRIAL.page} variant="accent">
            Try a ${TRIAL.price} trial lesson
          </Button>
        </div>
      </div>
    </Section>
  )
}

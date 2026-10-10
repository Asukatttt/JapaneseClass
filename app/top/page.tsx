import type { Metadata } from 'next'
import Image from 'next/image'
import PlanCards, { CancellationNote } from '../../components/PlanCards'
import { Bullet, Button, CtaBand, Eyebrow, Section, SectionHeading } from '../../components/ui'
import { EMAIL, TRIAL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Japanese Lessons',
  description: 'Conversation-focused 1-on-1 online Japanese lessons with Hiyori sensei. Try a 50-minute trial for $10.',
}

const features = [
  {
    title: 'Conversation-focused',
    text: 'Practice real-life conversations to learn Japanese naturally.',
  },
  {
    title: 'Beginner-friendly',
    text: 'Perfect for those who know Hiragana / Katakana or are studying JLPT N5.',
  },
  {
    title: 'Flexible learning',
    text: 'Learn at your own pace with personalized lessons and practice.',
  },
]

const steps = [
  {
    title: 'Pay for your trial',
    text: `$${TRIAL.price} for a 50-minute trial lesson. Pay securely with Stripe or Wise.`,
  },
  {
    title: 'Email Hiyori',
    text: 'Send an email with the subject "Trial Lesson" and include your name.',
  },
  {
    title: 'Pick your time',
    text: 'You will receive a reservation link to book the time that suits you.',
  },
]

export default function LessonsPage() {
  return (
    <>
      <Section bg="hero" className="!py-12 md:!py-20 lg:!pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6 md:gap-7">
            <Eyebrow>Japanese lessons</Eyebrow>
            <h1 className="text-4xl leading-[1.18] sm:text-5xl lg:text-[52px]">
              Speak Japanese naturally, and have fun doing it
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-[19px]">
              Conversation-focused 1-on-1 online lessons with Hiyori sensei. Perfect if you know Hiragana and
              Katakana or are studying for JLPT N5.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={TRIAL.page} variant="accent">
                Try a trial lesson for ${TRIAL.price}
              </Button>
              <Button href="#plans" variant="outline">
                See monthly plans
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink-soft">
              <Bullet>50 minutes</Bullet>
              <Bullet>Online, 1-on-1</Bullet>
              <Bullet>Stripe or Wise</Bullet>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] pb-5 pr-4 lg:mx-0 lg:justify-self-end">
            <div aria-hidden className="absolute bottom-0 right-0 h-[92%] w-[92%] rounded-[2rem] bg-gradient-to-br from-sakura-soft to-peach/70" />
            <div className="relative aspect-[440/500] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
              <Image
                src="/images/HiyoriProf.jpg"
                alt="Hiyori sensei"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section bg="white">
        <SectionHeading eyebrow="Why learn with Hiyori" title="Lessons built around real conversation" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="flex flex-col gap-4 rounded-3xl border border-line/70 bg-cream p-8 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sakura-soft text-base font-bold text-sakura">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px]">{f.title}</h3>
              <p className="leading-relaxed text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="sand">
        <SectionHeading eyebrow="How to start" title="Three steps to your first lesson" />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-[22px]">{s.title}</h3>
              <p className="leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <Button href={TRIAL.page} variant="accent">
            Start with a trial lesson
          </Button>
        </div>
      </Section>

      <Section bg="cream" id="plans">
        <SectionHeading
          eyebrow="Monthly plans"
          title="Choose how often you want to learn"
          sub="After your trial lesson, pick a monthly plan. Every lesson is 50 minutes."
        />
        <div className="mt-12 flex flex-col gap-6">
          <PlanCards />
          <CancellationNote />
        </div>
      </Section>

      <CtaBand title="Not sure yet? Start with one trial lesson." text={`Questions? Email ${EMAIL}`}>
        <Button href={TRIAL.page} variant="accent">
          Book a ${TRIAL.price} trial lesson
        </Button>
        <Button href={`mailto:${EMAIL}`} variant="white">
          Email Hiyori
        </Button>
      </CtaBand>
    </>
  )
}

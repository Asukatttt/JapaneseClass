import type { Metadata } from 'next'
import Image from 'next/image'
import Script from 'next/script'
import TourList from '../../components/TourList'
import { Button, Chip, CtaBand, Section, SectionHeading, hoverLift } from '../../components/ui'
import { EMAIL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Private Tours',
  description: 'Private Tokyo tours and day trips with Hiyori, personalized to your interests.',
}

const mail = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

const groupRates = [
  ['4-hour tour', '+¥7,000 per extra guest'],
  ['7-hour tour', '+¥10,000 per extra guest'],
  ['10-hour tour', '+¥13,000 per extra guest'],
]

const cancellation = [
  ['15 or more days before', 'Free'],
  ['8 to 14 days before', '¥10,000'],
  ['7 days or less before', '100% of the booking fee'],
]

const comingSoon = [
  'Baseball match',
  'Japanese sports',
  'Soba making',
  'Temple meditation (Zen)',
  'Japanese art',
]

function RateTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[22px]">{title}</h3>
      <dl className="overflow-hidden rounded-2xl border border-line bg-white">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              i % 2 ? 'bg-sand' : ''
            }`}
          >
            <dt className="text-[15px]">{k}</dt>
            <dd className="text-[15px] font-bold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ExtraCard({
  title,
  rows,
  subject,
}: {
  title: string
  rows: string[][]
  subject: string
}) {
  return (
    <div className={`flex flex-col gap-5 rounded-3xl border border-line/70 bg-white p-8 shadow-card ${hoverLift}`}>
      <h3 className="text-[22px]">{title}</h3>
      <dl className="flex flex-col gap-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-soft">{k}</dt>
            <dd className="text-right font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <Button href={mail(subject)} variant="outline" className="mt-auto self-start">
        Ask by email
      </Button>
    </div>
  )
}

export default function GuidePage() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2FT8CFF75J" strategy="afterInteractive" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2FT8CFF75J');
          `,
        }}
      />

      <section className="bg-cream px-5 pt-4 md:px-10 md:pt-6">
        <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] px-6 py-16 text-center md:min-h-[520px]">
          <Image
            src="/images/asakusa-kaminarimon.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-ink/35" />
          <div className="relative flex flex-col items-center gap-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Private tours</p>
            <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl md:text-[56px]">
              Private Tokyo tours with Hiyori
            </h1>
            <p className="max-w-xl text-lg text-white/90 md:text-[19px]">
              Personalized tours built around your interests, for first-time and returning visitors.
            </p>
          </div>
        </div>
      </section>

      <Section bg="cream" id="tours">
        <SectionHeading
          eyebrow="Tours"
          title="Choose your tour"
          sub="To make a reservation, send a request by email from the tour you like."
        />
        <div className="mt-12">
          <TourList />
        </div>
      </Section>

      <Section bg="white">
        <SectionHeading eyebrow="Good to know" title="Group size and cancellations" />
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          <RateTable title="Groups over 4 guests" rows={groupRates} />
          <RateTable title="Cancellation policy" rows={cancellation} />
        </div>
      </Section>

      <Section bg="sand">
        <SectionHeading eyebrow="Extra services" title="Make your trip easier" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ExtraCard
            title="Itinerary planning"
            subject="Make itinerary for your trip"
            rows={[
              ['Trips up to 3 days', '¥10,000'],
              ['Trips up to 7 days', '¥20,000'],
            ]}
          />
          <ExtraCard
            title="Airport pickup"
            subject="AirPort pick up service"
            rows={[
              ['Airport to hotel', '¥20,000'],
              ['Transportation fee', 'Charged separately'],
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-sakura-soft px-6 py-8 text-center">
          <h3 className="text-[22px]">Coming soon</h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {comingSoon.map((s) => (
              <Chip key={s} className="!bg-white">
                {s}
              </Chip>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Not sure which tour fits? Let's plan it together."
        text={`Tell me your dates, group size and interests: ${EMAIL}`}
      >
        <Button href={mail('Japan tour: Travel Plan Consultation')} variant="accent">
          Email Hiyori
        </Button>
      </CtaBand>
    </>
  )
}

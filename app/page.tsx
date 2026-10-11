import Image from 'next/image'
import { Bullet, Button, Chip, CtaBand, Eyebrow, Section, SectionHeading, hoverLift } from '../components/ui'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { EMAIL, SNS, TRIAL, YOUTUBE_INTERVIEW_ID } from '../lib/site'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section bg="hero" className="!py-12 md:!py-20 lg:!pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6 md:gap-7">
            <Eyebrow>Japanese lessons · Private Tokyo tours</Eyebrow>
            <h1 className="text-4xl leading-[1.18] sm:text-5xl lg:text-[56px]">
              Learn Japanese and explore Japan with Hiyori
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-[19px]">
              Friendly 1-on-1 online lessons and private tours in Tokyo, led by Hiyori, a Japanese teacher and guide.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={TRIAL.page} variant="accent">
                Book a ${TRIAL.price} trial lesson
              </Button>
              <Button href="/guidePage" variant="outline">
                See private tours
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink-soft">
              <Bullet>50-minute 1-on-1 lessons</Bullet>
              <Bullet>Beginner-friendly</Bullet>
              <Bullet>Pay with Stripe or Wise</Bullet>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] pb-6 pr-4 lg:mx-0 lg:justify-self-end">
            <div aria-hidden className="absolute bottom-2 right-0 h-[92%] w-[92%] rounded-[2rem] bg-gradient-to-br from-peach to-sakura-soft" />
            <div className="relative aspect-[460/540] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
              <Image
                src="/images/HiyoriProf.jpg"
                alt="Hiyori, your Japanese teacher and Tokyo guide"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-0 left-2 rounded-2xl bg-white/95 px-5 py-3.5 shadow-lift backdrop-blur sm:-left-6">
              <p className="font-heading text-xl font-bold leading-tight text-sakura">こんにちは！</p>
              <p className="text-sm font-medium">I&apos;m Hiyori, your teacher &amp; guide</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section bg="white">
        <SectionHeading eyebrow="What I offer" title="Two ways to enjoy Japan" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className={`flex flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-cream shadow-card ${hoverLift}`}>
            <div className="relative flex h-56 flex-col items-center justify-center gap-1 overflow-hidden bg-gradient-to-br from-sakura-soft via-[#FFF1EE] to-peach/60">
              <span aria-hidden className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-sakura/10" />
              <span aria-hidden className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/50" />
              <p className="relative font-heading text-5xl font-bold text-sakura sm:text-6xl">こんにちは</p>
              <p className="relative text-sm font-medium tracking-wide">Konnichiwa · Hello</p>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-7 md:p-9">
              <Chip>Online · 50 min</Chip>
              <h3 className="text-[28px]">Japanese Lessons</h3>
              <p className="text-ink-soft">Conversation-focused lessons to help you speak naturally.</p>
              <ul className="flex flex-col gap-2.5">
                <Bullet>Practice real-life conversations</Bullet>
                <Bullet>Perfect for Hiragana / Katakana learners and JLPT N5</Bullet>
                <Bullet>Personalized pace and practice</Bullet>
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-3">
                <div>
                  <p className="text-2xl font-bold">Trial lesson ${TRIAL.price}</p>
                  <p className="text-[13px] text-ink-soft">Monthly plans from $84</p>
                </div>
                <Button href="/top">View lessons</Button>
              </div>
            </div>
          </article>

          <article className={`flex flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-cream shadow-card ${hoverLift}`}>
            <div className="relative h-56">
              <Image
                src="/images/asakusa-kaminarimon.jpg"
                alt="Kaminarimon gate in Asakusa, Tokyo"
                fill
                sizes="(min-width: 768px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-5 p-7 md:p-9">
              <Chip>In person · Tokyo</Chip>
              <h3 className="text-[28px]">Private Tours</h3>
              <p className="text-ink-soft">Personalized Tokyo tours and day trips built around your interests.</p>
              <ul className="flex flex-col gap-2.5">
                <Bullet>Tsukiji, Asakusa, Shibuya, Harajuku and more</Bullet>
                <Bullet>Day trips to Hakone, Kamakura, Nikko</Bullet>
                <Bullet>Itinerary planning and airport pickup</Bullet>
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-3">
                <div>
                  <p className="text-2xl font-bold">From ¥30,000</p>
                  <p className="text-[13px] text-ink-soft">4-hour private tour</p>
                </div>
                <Button href="/guidePage">View tours</Button>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* Student interview */}
      <Section bg="sand">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>Student voices</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Hear it from a student</h2>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-soft">
              Watch a short interview with one of Hiyori&apos;s students about what the lessons are like.
            </p>
            <Button href={SNS[1].href} variant="outline">
              Watch on YouTube
            </Button>
          </div>
          <div className="aspect-video overflow-hidden rounded-3xl bg-ink shadow-lift ring-1 ring-black/5">
            <YouTubeEmbed
              videoId={YOUTUBE_INTERVIEW_ID}
              title="Student interview"
              poster="/images/interview-thumbnail.jpg"
              alt="Two people sitting on a bench, one of them waving at the camera"
            />
          </div>
        </div>
      </Section>

      {/* About */}
      <Section bg="cream">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-black/5">
            <Image
              src="/images/shibuya-sky-selfie.jpg"
              alt="Hiyori with a guest at a Tokyo observation deck"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>About</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Hi, I&apos;m Hiyori</h2>
            <p className="max-w-xl text-[17px] leading-relaxed text-ink-soft">
              I teach Japanese online and guide private tours around Tokyo. Whether you are learning your first
              phrases or planning your trip, I&apos;ll help you enjoy Japan in your own way.
            </p>
            <div className="flex flex-wrap gap-3">
              {SNS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink px-5 py-2 text-sm font-semibold hover:bg-ink hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title={`Ready to start? Try a 50-minute lesson for $${TRIAL.price}`}
        text={`Questions about lessons or tours? Email ${EMAIL}`}
      >
        <Button href={TRIAL.page} variant="accent">
          Book a trial lesson
        </Button>
        <Button href={`mailto:${EMAIL}`} variant="white">
          Email Hiyori
        </Button>
      </CtaBand>
    </>
  )
}

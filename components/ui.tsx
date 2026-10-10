import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'outline' | 'white'

const buttonBase =
  'inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold leading-tight tracking-[0.01em] transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

const buttonVariants: Record<Variant, string> = {
  primary:
    'bg-ink text-white shadow-[0_10px_22px_-10px_rgba(29,54,88,0.65)] hover:bg-[#2A4A75] hover:shadow-[0_14px_26px_-10px_rgba(29,54,88,0.6)]',
  accent:
    'bg-sakura text-white shadow-[0_10px_22px_-8px_rgba(201,62,94,0.6)] hover:bg-sakura-dark hover:shadow-[0_14px_26px_-8px_rgba(201,62,94,0.55)]',
  outline: 'border border-ink/70 text-ink hover:border-ink hover:bg-ink hover:text-white',
  white:
    'bg-white text-ink shadow-[0_10px_22px_-12px_rgba(0,0,0,0.35)] hover:bg-sand',
}

// Shared "pop up" feedback for cards the visitor can choose from.
export const hoverLift =
  'transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export function Button({
  href,
  variant = 'primary',
  className = '',
  children,
}: {
  href: string
  variant?: Variant
  className?: string
  children: ReactNode
}) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  const isWeb = href.startsWith('http')
  return (
    <a
      href={href}
      className={classes}
      {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Eyebrow({
  children,
  className = '',
  center = false,
}: {
  children: ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sakura before:h-px before:w-6 before:bg-current before:opacity-60 ${
        center ? 'after:h-px after:w-6 after:bg-current after:opacity-60' : ''
      } ${className}`}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 className="text-3xl leading-tight md:text-[40px]">{title}</h2>
      {sub && <p className="text-lg leading-relaxed text-ink-soft">{sub}</p>}
    </div>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full bg-sakura-soft px-3.5 py-1.5 text-[13px] font-semibold leading-tight tracking-[0.01em] text-ink ring-1 ring-inset ring-sakura/10 ${className}`}
    >
      {children}
    </span>
  )
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-sakura" />
      <span>{children}</span>
    </li>
  )
}

const sectionBg = {
  cream: 'bg-cream',
  white: 'bg-white',
  sand: 'bg-sand',
  // Soft colour washes instead of a flat fill, used for page heroes.
  hero: 'bg-cream bg-[radial-gradient(55%_75%_at_88%_15%,#FDE8EC_0%,transparent_65%),radial-gradient(45%_55%_at_0%_100%,#F6EEE3_0%,transparent_70%)]',
}

export function Section({
  bg = 'cream',
  className = '',
  children,
  id,
}: {
  bg?: keyof typeof sectionBg
  className?: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className={`${sectionBg[bg]} px-5 py-20 md:px-10 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  )
}

export function CtaBand({
  title,
  text,
  children,
}: {
  title: string
  text?: string
  children: ReactNode
}) {
  return (
    <section className="bg-cream px-5 pb-20 md:px-10 md:pb-28">
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink to-[#2B4B77] px-6 py-14 text-center text-white shadow-lift md:px-16 md:py-[76px]">
        <span aria-hidden className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-sakura/25 blur-2xl" />
        <span aria-hidden className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-peach/15 blur-2xl" />
        <h2 className="relative max-w-2xl text-3xl leading-tight md:text-4xl">{title}</h2>
        {text && <p className="relative text-white/80">{text}</p>}
        <div className="relative flex flex-col gap-3 sm:flex-row">{children}</div>
      </div>
    </section>
  )
}

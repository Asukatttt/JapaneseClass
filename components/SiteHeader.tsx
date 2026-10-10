'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV, TRIAL } from '../lib/site'
import { Button } from './ui'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="h-7 w-7 rounded-full bg-gradient-to-br from-[#E0627F] to-sakura shadow-[0_6px_12px_-4px_rgba(201,62,94,0.55)]"
      />
      <span className={`font-heading text-[22px] font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        hiyo japanese
      </span>
    </span>
  )
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/50 bg-cream/85 shadow-[0_8px_24px_-16px_rgba(29,54,88,0.25)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link href="/" aria-label="hiyo japanese home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[15px] font-medium text-ink transition-colors hover:text-sakura after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-sakura after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <Button href={TRIAL.page} variant="accent" className="!px-5 !py-2.5 !text-[15px]">
            Book a ${TRIAL.price} trial
          </Button>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-[22px] bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-[22px] bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-[22px] bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-cream px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="block py-4 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={TRIAL.page} variant="accent" className="mt-5 w-full">
            Book a ${TRIAL.price} trial lesson
          </Button>
        </nav>
      )}
    </header>
  )
}

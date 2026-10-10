import Link from 'next/link'
import { EMAIL, NAV, SNS } from '../lib/site'
import { Logo } from './SiteHeader'

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-body text-[13px] font-bold uppercase tracking-[0.12em] text-peach">{title}</h2>
      <ul className="flex flex-col gap-3 text-[15px] text-white/85">{children}</ul>
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-14 text-white md:px-10 md:pt-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo light />
            <p className="text-[15px] text-white/75">
              Japanese lessons and private Tokyo tours with Hiyori.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-20">
            <Column title="Explore">
              {NAV.filter((n) => n.href.startsWith('/')).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Follow">
              {SNS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 transition-colors hover:text-white hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </Column>
            <div className="col-span-2 sm:col-span-1">
              <Column title="Contact">
                <li>
                  <a href={`mailto:${EMAIL}`} className="break-all underline-offset-4 transition-colors hover:text-white hover:underline">
                    {EMAIL}
                  </a>
                </li>
              </Column>
            </div>
          </div>
        </div>

        <hr className="my-10 border-white/15" />
        <p className="text-[13px] text-white/60">&copy; 2026 hiyo-japanese. All rights reserved.</p>
      </div>
    </footer>
  )
}

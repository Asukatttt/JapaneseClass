import './styles/globals.css'
import type { Metadata } from 'next'
import { DM_Sans, Zen_Maru_Gothic } from 'next/font/google'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const heading = Zen_Maru_Gothic({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const body = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'hiyo-japanese | Japanese Lessons & Private Tokyo Tours',
    template: '%s | hiyo-japanese',
  },
  description:
    'Friendly 1-on-1 online Japanese lessons and private Tokyo tours with Hiyori. Try a 50-minute trial lesson for $10.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

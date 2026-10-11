'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { EMAIL } from '../lib/site'
import { Button, Chip, hoverLift } from './ui'

interface Tour {
  id: string
  title: string
  duration?: string
  price?: number
  additionalPrices?: { duration?: string; price?: number }[]
  description?: string
  details?: string[]
  departure?: string
  image?: string
}

const defaultImages = [
  '/images/shibuya-109.jpg',
  '/images/uji-byodoin.jpg',
  '/images/skytree-asahi.jpg',
  '/images/asakusa-kaminarimon.jpg',
  '/images/shibamata.jpg',
]

type Block =
  | { kind: 'label'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'bullets'; items: string[] }

// data.json mixes plain sentences, "・" bullets and "<Example>" markers.
function toBlocks(items: string[]): Block[] {
  const blocks: Block[] = []
  for (const raw of items) {
    const text = raw.trim()
    if (!text) continue
    if (/^<.*>$/.test(text)) {
      blocks.push({ kind: 'label', text: text.slice(1, -1) })
    } else if (text.startsWith('・')) {
      const item = text.slice(1).trim()
      const last = blocks[blocks.length - 1]
      if (last && last.kind === 'bullets') last.items.push(item)
      else blocks.push({ kind: 'bullets', items: [item] })
    } else {
      blocks.push({ kind: 'text', text })
    }
  }
  return blocks
}

const yen = (n: number) => `¥${Number(n).toLocaleString('ja-JP')}`

export default function TourList() {
  const [tours, setTours] = useState<Tour[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    async function loadTours() {
      try {
        const res = await fetch('/api/tours')
        setTours(await res.json())
        setStatus('ready')
      } catch (err) {
        console.error(err)
        setStatus('error')
      }
    }
    loadTours()
  }, [])

  if (status === 'loading') {
    return <p className="text-center text-ink-soft">Loading tours…</p>
  }
  if (status === 'error') {
    return (
      <p className="text-center text-ink-soft">
        Tours could not be loaded. Please email{' '}
        <a href={`mailto:${EMAIL}`} className="font-semibold underline">
          {EMAIL}
        </a>
        .
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {tours.map((t, idx) => {
        const img = t.image || defaultImages[idx % defaultImages.length]
        const prices = [{ duration: t.duration, price: t.price }, ...(t.additionalPrices ?? [])].filter(
          (p) => p.price
        )
        const blocks = toBlocks([t.description ?? '', ...(t.details ?? [])])
        return (
          <article
            key={t.id}
            className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-white shadow-card lg:flex-row ${hoverLift}`}
          >
            <div className="relative h-56 shrink-0 sm:h-72 lg:h-auto lg:w-[40%]">
              <Image
                src={img}
                alt={t.title || 'Tour photo'}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8 lg:p-10">
              {t.duration && <Chip>{t.duration}</Chip>}
              <h3 className="text-2xl leading-snug md:text-[28px]">{t.title || 'Untitled tour'}</h3>
              {t.departure && <p className="text-sm text-ink-soft">{t.departure}</p>}

              <div className="flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
                {blocks.map((b, i) => {
                  if (b.kind === 'label')
                    return (
                      <p key={i} className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
                        {b.text}
                      </p>
                    )
                  if (b.kind === 'bullets')
                    return (
                      <ul key={i} className="flex flex-col gap-2">
                        {b.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span aria-hidden className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-sakura" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  return <p key={i}>{b.text}</p>
                })}
              </div>

              <div className="mt-auto flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {prices.map((p, i) => (
                    <div key={i}>
                      {p.duration && <p className="text-[13px] font-semibold text-ink-soft">{p.duration}</p>}
                      <p className="font-heading text-[28px] font-bold leading-tight">{yen(p.price as number)}</p>
                    </div>
                  ))}
                </div>
                <Button
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Japan tour: ' + (t.title || 'Reservation'))}`}
                  variant="accent"
                >
                  Request this tour
                </Button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

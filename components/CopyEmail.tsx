'use client'

import { useState } from 'react'
import { EMAIL } from '../lib/site'

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-sand p-3 pl-5 sm:flex-row sm:items-center sm:justify-between">
      <a href={`mailto:${EMAIL}`} className="break-all text-base font-bold text-ink sm:text-[17px]">
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-cream"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

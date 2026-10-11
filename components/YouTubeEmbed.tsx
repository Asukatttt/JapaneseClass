'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  videoId: string
  title: string
  poster: string
  alt: string
}

// 表紙の画像を出し、クリックされてから YouTube のプレーヤーを読み込む。
// 表紙は動画の好きな場面を画像にして使える(YouTube 側のサムネイルとは別)。
export default function YouTubeEmbed({ videoId, title, poster, alt }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-sakura"
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <span aria-hidden className="absolute inset-0 bg-ink/15 transition group-hover:bg-ink/25" />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sakura text-white shadow-lift transition duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-20 md:w-20"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 md:h-8 md:w-8" fill="currentColor">
          <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.06-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </button>
  )
}

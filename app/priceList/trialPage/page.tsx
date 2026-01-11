// app/priceList/page.tsx
"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

// Single hard-coded trial course (includes both Stripe and Wise links)
const course = {
  name: 'Trial Lesson / 50 minutes',
  price: 10,
  // testデータ用
  // stripeUrl: 'https://buy.stripe.com/test_3cIfZjeBW7gU1hl9ey6EU02',

  // 正規データ
  stripeUrl: 'https://buy.stripe.com/dRmaEZ51m7gU6BFeyS6EU04',
  wiseUrl: 'https://wise.com/pay/me/hiyoria14',
  color: 'bg-[#FDE2E4]',
  highlight: false,
}

export default function PriceListPage() {
  const handleCheckout = (url: string) => window.open(url, '_blank')

  return (
  <div className="min-h-screen bg-[#F2FAEF] text-[#1D3658] flex flex-col justify-center items-center px-4 py-8">
    <h1 className="text-6xl font-bold text-center mb-12">Trial Lesson</h1>
    <h2 className="text-2xl font-bold text-center mb-12">Enjoy Speaking  Japanese with Hiyori sensei! </h2>
    <div className="max-w-5xl w-full flex justify-center mb-16">
      <motion.div
        className={`p-8 rounded-2xl shadow-md text-center cursor-pointer transition-transform hover:scale-105 relative
            ${course.color} ${course.highlight ? 'border-4 border-[#1D3658] shadow-xl' : ''}`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0 }}
      >
        {course.highlight && (
          <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-[#1D3658] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
            Recommended
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
        <p className="text-3xl font-bold mb-6">
          ${course.price.toLocaleString()} <span className="text-base font-normal">USD</span>
        </p>
        <p className="mb-8 text-gray-700">
          {course.name.includes('Trial') ? 'one-time only' : 'per month'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => handleCheckout(course.stripeUrl)}
            className="min-w-[140px] bg-[#1D3658] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#447A9C] transition"
          >
            Pay Stripe
          </button>
          <button
            onClick={() => handleCheckout(course.wiseUrl)}
            className="min-w-[140px] bg-[#1D3658] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#447A9C] transition"
          >
            Pay Wise
          </button>
        </div>
      </motion.div>
    </div>
  <div className="mt-1 container mx-auto px-4 max-w-2xl bg-[#F9D1A9] rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#1D3658]">
        After completing your payment,<br />
        please send an email to the address below<br />
        with the subject <span className="underline">"Trial Lesson"</span> and include your name.<br />
        We will then send you a reservation link.
      </h2>
      {/* メール */}
      <div className="text-center">
        <div className="flex flex-col items-center mb-2">
          <span className="text-4xl text-[#1D3658]">&#8595;</span>
        </div>
        <a
          href="mailto:hiyorijapaneseclass@gmail.com"
          className="text-red-600 text-2xl md:text-3xl font-extrabold hover:text-blue-500 transition-colors break-words whitespace-normal max-w-full"
        >
          hiyorijapaneseclass@gmail.com
        </a>
      </div>
      {/* {statusMessage && <p className="mt-4 text-green-600 text-center">{statusMessage}</p>} */}
    </div>
      {/* ホームに戻るボタン */}
      <div className="text-center">
        <Link href="/top">
          <motion.button
            className="mt-5 bg-[#1D3658] text-[#F2FAEF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }}
          >
            Back to Page
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

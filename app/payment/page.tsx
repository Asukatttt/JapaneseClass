'use client'

import { Suspense, useState } from 'react'
import PaymentComponent from './paymentComponent'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <PaymentPage />
    </Suspense>
  )
}

function PaymentPage() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price')
  const name = searchParams.get('name')
  const [copied, setCopied] = useState(false)

  const email = "hiyorijapaneseclass@gmail.com"

  // Read stripe URL from query param if provided (preference), otherwise map by plan name
  const stripeParam = searchParams.get('stripe') || searchParams.get('stripeUrl')

  const stripeMap: Record<string, string> = {
    '2 Lessons / Month': 'https://buy.stripe.com/test_cNieVfezH8ZP1mYdRd24001',
    '4 Lessons / Month': 'https://buy.stripe.com/test_5kQeVf2QZ0tj1mY14r24002',
    '8 Lessons / Month': 'https://buy.stripe.com/test_bJe6oJfDLa3T3v65kH24003',
    '12 Lessons / Month': 'https://buy.stripe.com/test_28E00l0IR5NDc1C14r24004',
    'Trial Lesson / 50 minutes': 'https://buy.stripe.com/test_fZueVfbnvgsh7Lm6oL24000',
  }

  const checkoutUrl = stripeParam || (name ? stripeMap[name] : undefined)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2FAEF] text-[#1D3658] px-6">
      <h1 className="text-4xl font-bold mb-6">Payment Page</h1>

      {price && name ? (
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md mb-6">
        <p className="text-2xl font-semibold mb-4">{name}</p>
        <p className="text-3xl font-bold mb-6">
          ${price} {name?.includes('Trial') ? '/ one-time' : '/ month'}
        </p>

        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4"
          >
            Proceed to checkout
          </a>
        ) : (
          <div className="block bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold mb-4">No checkout URL available for this plan.</div>
        )}

          <p className="text-lg text-black-600 font-semibold mt-6">
            After completing your payment, please contact me at the email below.
          </p>

          {/* メールアドレス表示部分 */}
          <div className="mt-4 bg-[#FFF5F5] border-2 border-red-400 rounded-xl p-6 shadow-md flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📧</span>
              <p className="text-xl font-bold text-black">{email}</p>
            </div>

            {/* Copyボタン（枠内に収める） */}
            <button
              onClick={handleCopy}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              {copied ? "Copied!" : "Copy Email"}
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            ※ This email address is also listed on the home page.
          </p>
        </div>
      ) : (
        <p className="text-2xl mb-6">No plan selected</p>
      )}

      <Link href={name?.includes('Trial') ? '/priceList/trialPage' : '/priceList'}>
        <motion.button
          className="bg-[#1D3658] text-[#F2FAEF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }}
        >
          Back to Page
        </motion.button>
      </Link>
    </div>
  )
}

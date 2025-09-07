'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const coursesData = [
  { name: '2 Lessons / Month', price: 84, stripeUrl: 'https://buy.stripe.com/test_bJe14ofe61Tp3O85zxfQI02', color: 'bg-[#F9D1A9]', highlight: false },
  { name: '4 Lessons / Month', price: 165, stripeUrl: 'https://buy.stripe.com/test_cNibJ27LEapV2K42nlfQI03', color: 'bg-[#B5EAD7]', highlight: false },
  { name: '8 Lessons / Month', price: 328, stripeUrl: 'https://buy.stripe.com/test_3cI6oIfe6cy384oaTRfQI05', color: 'bg-[#A8D8F0]', highlight: true },
  { name: '12 Lessons / Month', price: 490, stripeUrl: 'https://buy.stripe.com/test_8x26oIgiafKfacw1jhfQI06', color: 'bg-[#FFF3B0]', highlight: false },
  { name: 'Trial Lesson / 30 minutes', price: 20, stripeUrl: 'https://buy.stripe.com/test_fZucN67LE7dJ84ogebfQI07', color: 'bg-[#FDE2E4]', highlight: false },
]

export default function PriceListPage() {
  const [courses, setCourses] = useState<typeof coursesData>([])

  useEffect(() => {
    setCourses(coursesData)
  }, [])

  const handleCheckout = (url: string) => {
    window.open(url, '_blank') // 新しいタブでURLを開く
  }

  return (
    <div className="min-h-screen bg-[#F2FAEF] text-[#1D3658] px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Lesson Plan</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            className={`p-8 rounded-2xl shadow-md text-center cursor-pointer transition-transform hover:scale-105 relative
              ${course.color} ${course.highlight ? 'border-4 border-[#1D3658] shadow-xl' : ''}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: i * 0.2 }}
          >
            {course.highlight && (
              <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-[#1D3658] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                Recommended
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
            <p className="text-3xl font-bold mb-6">${course.price.toLocaleString()}</p>
            <p className="mb-8 text-gray-700">
              {course.name.includes('Trial') ? 'one-time only' : 'per month'}
            </p>
            <button
              onClick={() => handleCheckout(course.stripeUrl)} // 各プランのURLに遷移
              className="bg-[#1D3658] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#447A9C] transition"
            >
              Subscribe
            </button>
          </motion.div>
        ))}
      </div>

      {/* ホームに戻るボタン */}
      <div className="text-center">
        <Link href="/">
          <motion.button
            className="bg-[#1D3658] text-[#F2FAEF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }}
          >
            Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

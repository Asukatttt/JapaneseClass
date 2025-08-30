'use client'
import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
declare global {
  interface Window {
    Calendly?: any
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function Home() {
  const [userMessage, setUserMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/reserve', {
      method: 'POST',
      body: JSON.stringify({ name, email, message: userMessage }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.success) setStatusMessage('Reservation completed successfully!')
    else setStatusMessage('Reservation failed.')
  }

  const openCalendly = () => {
    if (typeof window !== 'undefined') {
      window.open('https://calendly.com/hiyorijapaneseclass/50-minutes-class', '_blank')
    }
  }

  return (
    <>
      <Head>
        <title>Japanese Lesson</title>
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </Head>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-[#F2FAEF] to-[#A7DADC] text-[#1D3658] min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Japanese Lesson
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-8 drop-shadow-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Learn Japanese naturally and have fun!
        </motion.p>
        <motion.button 
          onClick={openCalendly} 
          className="bg-[#F2FAEF] text-[#1D3658] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }}
        >
          Book a Lesson
        </motion.button>
        <Link href="/priceList">
          <motion.button
            className="bg-[#1D3658] text-[#F2FAEF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } }}
          >
            Price List & Payment
          </motion.button>
        </Link>
      </header>

      {/* Lesson Features */}
      <motion.section
        className="py-20 bg-[#B3D5C0]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Lesson Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Conversation-Focused', 'Beginner-Friendly', 'Flexible Learning'].map((title, i) => (
              <motion.div
                key={i}
                className="bg-[#F9D1A9] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.2 } }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p>
                  {title === 'Conversation-Focused' && 'Practice real-life conversations to learn Japanese naturally.'}
                  {title === 'Beginner-Friendly' && 'Perfect for those who know Hiragana/Katakana or are studying JLPT N5.'}
                  {title === 'Flexible Learning' && 'Learn at your own pace with personalized lessons and practice.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reservation Form */}
      <motion.section
        className="bg-gradient-to-r from-[#A7DADC] to-[#F2FAEF] text-[#1D3658] py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 max-w-lg bg-[#F9D1A9] rounded-xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1D3658]">Contact Form</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg"
              required
            />
            <textarea
              placeholder="Your message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="border p-3 rounded-lg resize-none"
              rows={5}
              required
            />
            <button
              type="submit"
              className="bg-[#1D3658] text-[#F2FAEF] p-3 rounded-lg font-semibold hover:bg-[#447A9C] transition"
            >
              Send
            </button>
          </form>
          {statusMessage && <p className="mt-4 text-green-600 text-center">{statusMessage}</p>}
        </div>
      </motion.section>
      {/* SNS Links + Email */}
      <motion.section
        className="py-20 bg-[#F2FAEF]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Follow Us on SNS & Email</h2>

          {/* SNSリンク */}
          <div className="flex justify-center items-center gap-10 flex-wrap text-3xl text-[#1D3658] mb-6">
            <a href="https://www.instagram.com/your-account" target="_blank" className="hover:text-pink-500 transition-colors">Instagram</a>
            <a href="https://www.youtube.com/your-channel" target="_blank" className="hover:text-red-500 transition-colors">YouTube</a>
            <a href="https://lin.ee/your-line" target="_blank" className="hover:text-green-500 transition-colors">LINE</a>
          </div>

          {/* メール */}
          <div>
            <a
              href="mailto:hiyorijapaneseclass@gmail.com"
              className="text-[#1D3658] text-xl font-bold hover:text-blue-500 transition-colors"
            >
              hiyorijapaneseclass@gmail.com
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#1D3658] text-[#F2FAEF] py-6 text-center">
        <p>&copy; 2025 Japanese Trial Lesson. All rights reserved.</p>
      </footer>
    </>
  )
}

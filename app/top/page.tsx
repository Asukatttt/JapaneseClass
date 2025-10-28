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
  const trialPricePage = () => {
    if (typeof window !== 'undefined') {
      window.open('https://calendly.com/hiyorijapaneseclass/50-minutes-class', '_blank')
    }
  }

  return (
    <>
      {/* Back to Home button at top-left */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <button className="bg-[#1D3658] text-[#F2FAEF] px-4 py-2 rounded-lg shadow hover:bg-[#447A9C] transition font-semibold text-base">Back to Home</button>
        </Link>
      </div>
      <Head>
        <title>Japanese Lesson</title>
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#F2FAEF] to-[#A7DADC] text-[#1D3658] min-h-[60vh] flex flex-col justify-center items-center px-6">
        <header className="w-full flex flex-col items-center justify-center text-center z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center"
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

          <div className="flex gap-4">
            <motion.button 
              onClick={openCalendly} 
              className="min-w-[200px] bg-[#F2FAEF] text-[#1D3658] text-base font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform whitespace-nowrap text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }}
            >
              Book a Lesson
            </motion.button>
          </div>
          <Link href="/priceList/trialPage">
            <motion.button
              className="mt-10 min-w-[200px] bg-[#FFE5E5] text-[#990000] text-base font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform whitespace-nowrap text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }}
            >
              Trial Lesson
            </motion.button>
          </Link>
          <Link href="/priceList">
            <motion.button
              className="bg-[#1D3658] text-[#F2FAEF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform mt-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } }}
            >
              Price List & Payment
            </motion.button>
          </Link>
          <motion.p
            className="text-sm text-gray-600 mt-10 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            ※ If you wish to change or cancel a class, please do within 24 hours before the class starts.<br />
            If you cancel after that, a full cancellation fee will be charged.
          </motion.p>
        </header>
        {/* プロフィール画像 右側絶対配置 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }}
          className="hidden md:block absolute top-1/2 -translate-y-1/2"
          style={{maxWidth: '1000px', width: '120vw', top: 160, right: '-300px', position: 'absolute'}}
        >
          <img
            src="/images/hiyori.png"
            alt="HIyori Profile"
            className="rounded-lg w-full h-auto"
          />
        </motion.div>
      </div>

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
        {/* 動画埋め込み */}
        <div className="flex flex-col items-center mt-16">
          <h3 className="text-3xl font-bold mb-6 text-[#1D3658]">Student interview</h3>
          <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ILiqBd_j0-Y"
              title="Student interview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
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
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1D3658]">Contact me</h2>
          {/* メール */}
          <div className="text-center">
            <a
              href="mailto:hiyorijapaneseclass@gmail.com"
              className="text-[#1D3658] text-xl font-bold hover:text-blue-500 transition-colors"
            >
              hiyorijapaneseclass@gmail.com
            </a>
          </div>
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
          <h2 className="text-3xl font-bold mb-8">Follow Us on SNS</h2>

          {/* SNSリンク */}
          <div className="flex justify-center items-center gap-10 flex-wrap text-3xl text-[#1D3658] mb-6">
            <a href="https://www.instagram.com/sakura_hiyori_japan" target="_blank" className="hover:text-pink-500 transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@Sakura_hiyori_japan" target="_blank" className="hover:text-red-500 transition-colors">YouTube</a>
            <a href="https://www.tiktok.com/@sakura_hiyori_jap" target="_blank" className="hover:text-pink-400 transition-colors">TikTok</a>
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

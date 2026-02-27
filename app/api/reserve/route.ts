// app/api/reserve/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
// app/api/tours/route.ts
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'api', 'reserve', 'data.json')
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileData)
  return NextResponse.json(data.tours)
}
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // 環境変数の確認
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('環境変数が設定されていません')
      return NextResponse.json({ success: false, message: 'Environment variables are missing' }, { status: 500 })
    }

    // Gmail SMTP 設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // メール送信
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'hiyorijapaneseclass@gmail.com',
      subject: 'New Reservation Request',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('メール送信エラー:', error)
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
  }
}

// import { NextRequest, NextResponse } from "next/server"
// // import clientPromise from "../../../lib/mongodb"

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json()
    
//     // --- DB操作は一時的にコメントアウト ---
//     /*
//     const client = await clientPromise
//     const db = client.db("ninjapanese")
//     const collection = db.collection("reservations")

//     await collection.insertOne({
//       name: data.name,
//       email: data.email,
//       date: new Date()
//     })
//     */

//     return NextResponse.json({ message: "予約完了 (DB未使用)" }, { status: 201 })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const client = await clientPromise
    const db = client.db("ninjapanese")
    const collection = db.collection("reservations")

    await collection.insertOne({
      name: data.name,
      email: data.email,
      date: new Date()
    })

    return NextResponse.json({ message: "予約完了" }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

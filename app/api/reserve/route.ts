// app/api/reserve/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'api', 'reserve', 'data.json')
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileData)
  return NextResponse.json(data.tours)
}

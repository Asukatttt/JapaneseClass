// app/api/tours/route.ts
import { NextResponse } from 'next/server'
import data from '../../../data/tours.json'

// ツアーの元データは data/tours.json。ビルド時に取り込まれる。
export async function GET() {
  return NextResponse.json(data.tours)
}

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "QuranBest API is running",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}

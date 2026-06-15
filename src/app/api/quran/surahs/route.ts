import { NextResponse } from "next/server"
import { surahService } from "@/services/firestoreService"

export const dynamic = "force-dynamic"
export const revalidate = 3600

export async function GET() {
  try {
    const surahs = await surahService.getAll()
    return NextResponse.json(surahs, { 
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    })
  } catch (error: any) {
    console.error("Error fetching surahs:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch surahs" },
      { status: 500 }
    )
  }
}

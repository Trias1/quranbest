import { NextResponse } from "next/server"
import { surahService } from "@/services/firestoreService"

export async function GET() {
  try {
    const surahs = await surahService.getAll()
    return NextResponse.json(surahs, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

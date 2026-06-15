import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

interface RefreshTokenRequest {
  refreshToken: string
}

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = (await request.json()) as RefreshTokenRequest

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      )
    }

    // Generate new token with extended expiry
    const now = Math.floor(Date.now() / 1000)
    const expiresIn = 3600 // 1 hour

    const newToken = JSON.stringify({
      iat: now,
      exp: now + expiresIn,
    })

    return NextResponse.json(
      {
        token: newToken,
        expiresIn,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    )
  }
}

interface TokenPayload {
  uid: string
  email: string
  displayName: string | null
  iat: number
  exp: number
}

const TOKEN_KEY = "auth_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const TOKEN_EXPIRY_KEY = "token_expiry"

export const tokenService = {
  // Store tokens di localStorage
  setTokens(token: string, refreshToken: string, expiresIn: number = 3600) {
    try {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + expiresIn * 1000).toString())
    } catch (error) {
      console.error("Error storing tokens:", error)
    }
  },

  // Get stored token
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },

  // Get refresh token
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  },

  // Check if token expired
  isTokenExpired(): boolean {
    try {
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
      if (!expiry) return true
      return Date.now() > parseInt(expiry)
    } catch {
      return true
    }
  },

  // Decode token
  decodeToken(token: string): TokenPayload | null {
    try {
      return JSON.parse(token) as TokenPayload
    } catch {
      return null
    }
  },

  // Clear tokens
  clearTokens() {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
    } catch (error) {
      console.error("Error clearing tokens:", error)
    }
  },

  // Refresh token via API
  async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) throw new Error("Failed to refresh token")

      const { token, expiresIn } = await response.json()
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + (expiresIn || 3600) * 1000).toString())
      return token
    } catch (error) {
      console.error("Token refresh failed:", error)
      this.clearTokens()
      return null
    }
  },

  // Get valid token (refresh if needed)
  async getValidToken(): Promise<string | null> {
    if (this.isTokenExpired()) {
      return await this.refreshToken()
    }
    return this.getToken()
  },
}

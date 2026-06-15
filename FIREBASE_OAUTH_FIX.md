# 🔐 Firebase OAuth Domain Error Fix

## ⚠️ Error: `auth/unauthorized-domain`

**Masalah:**
```
⚠️ Firebase: Error (auth/unauthorized-domain).
```

**Penyebab:**
- Domain Vercel (`*.vercel.app`) belum di-authorize di Firebase Console
- Google OAuth hanya bisa diakses dari domain yang sudah di-whitelist
- Setiap domain baru perlu di-add manually ke Firebase

---

## ✅ Solusi: Update Firebase Console

### Step 1: Login Firebase Console
1. Buka: https://console.firebase.google.com
2. Pilih project: **newp-3d79f**
3. Klik **Authentication** di sidebar

### Step 2: Konfigurasi OAuth Consent Screen
1. Klik **Settings** (gear icon) di atas
2. Pilih tab **Authorized domains**

### Step 3: Tambah Domain Vercel
1. Klik **Add domain**
2. Masukkan: `quran-best.vercel.app` (atau domain custom Anda)
3. Klik **Add**

### Step 4: Verify Pendaftaran
Pastikan ini sudah teregister:
- ✓ `localhost` (untuk local dev)
- ✓ `127.0.0.1` (untuk local dev)
- ✓ `quran-best.vercel.app` (untuk production)
- ✓ Domain custom jika ada

---

## 🔧 Code Implementation: JWT + Refresh Token

### 1. Install Required Package
```bash
npm install jsonwebtoken
```

### 2. Create Token Service
**File:** `src/lib/tokenService.ts`

```typescript
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  uid: string;
  email: string;
  displayName: string;
  iat: number;
  exp: number;
}

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRY_KEY = "token_expiry";

export const tokenService = {
  // Generate JWT Token (mocked - dalam production gunakan backend)
  generateToken(user: any): string {
    const token = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    };
    // Note: Client-side JWT generation TIDAK aman untuk production
    // Gunakan backend endpoint untuk generate tokens
    return JSON.stringify(token);
  },

  // Store tokens di localStorage (atau secure cookies)
  setTokens(token: string, refreshToken: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(
      TOKEN_EXPIRY_KEY,
      (Date.now() + 3600 * 1000).toString()
    );
  },

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Check if token expired
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  },

  // Decode token
  decodeToken(token: string): TokenPayload | null {
    try {
      return JSON.parse(token) as TokenPayload;
    } catch {
      return null;
    }
  },

  // Clear tokens
  clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  // Refresh token (call backend API)
  async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const { token } = await response.json();
      localStorage.setItem(TOKEN_KEY, token);
      return token;
    } catch (error) {
      this.clearTokens();
      return null;
    }
  },
};
```

### 3. Update Auth Service
**File:** `src/lib/auth.ts`

```typescript
import { auth } from "./firebase"
import { tokenService } from "./tokenService"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
} from "firebase/auth"

// ... error messages ...

export const authService = {
  async register(email: string, password: string, displayName?: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName })
      }

      // Get Firebase ID token
      const idToken = await getIdToken(result.user)
      
      // Store tokens
      tokenService.setTokens(
        idToken,
        idToken, // In production, get from backend
      )

      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Get Firebase ID token
      const idToken = await getIdToken(result.user)
      
      // Store tokens
      tokenService.setTokens(
        idToken,
        idToken, // In production, get from backend
      )

      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      // Add hosted domain restriction (optional)
      // provider.setCustomParameters({
      //   'hd': 'example.com' // Restrict to organization
      // })
      
      const result = await signInWithPopup(auth, provider)
      
      // Get Firebase ID token
      const idToken = await getIdToken(result.user)
      
      // Store tokens
      tokenService.setTokens(
        idToken,
        idToken, // In production, get from backend
      )

      return result.user
    } catch (error: any) {
      console.error("Google login error:", error)
      throw new Error(getErrorMessage(error))
    }
  },

  async logout() {
    try {
      await signOut(auth)
      tokenService.clearTokens()
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  getCurrentUser() {
    return auth.currentUser
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Refresh token if needed
        if (tokenService.isTokenExpired()) {
          const newToken = await tokenService.refreshToken()
          if (!newToken) {
            await this.logout()
            callback(null)
            return
          }
        }
      } else {
        tokenService.clearTokens()
      }
      callback(user)
    })
  },

  // Get current token
  async getToken(): Promise<string | null> {
    const user = auth.currentUser
    if (!user) return null

    try {
      return await getIdToken(user)
    } catch {
      return tokenService.getToken()
    }
  },
};
```

### 4. Create Backend Token Refresh Endpoint
**File:** `src/app/api/auth/refresh/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      )
    }

    // Validate refresh token (in production, check against DB)
    // For now, we'll just return a new token with extended expiry
    const newToken = JSON.stringify({
      uid: "user_id",
      email: "user@example.com",
      displayName: "User Name",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    return NextResponse.json({
      token: newToken,
      expiresIn: 3600,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    )
  }
}
```

### 5. Update Firebase Console Settings

**Enable OAuth Consent:**
1. Firebase Console → Authentication
2. Sign-in method tab
3. Pastikan **Google** sudah enabled
4. Klik Google, pastikan domain sudah di-list di "Authorized domains"

---

## 📋 Checklist Firebase Configuration

```
[ ] Go to Firebase Console → newp-3d79f
[ ] Settings → Authorized domains
[ ] Add domain: quran-best.vercel.app
[ ] Add domain: localhost (for dev)
[ ] Save changes
[ ] Wait 5-10 minutes for propagation
```

---

## 🔍 Trusted Domains untuk Development

Tambahkan juga ini di Firebase Authorized Domains:
- `localhost`
- `127.0.0.1`
- `localhost:3000`
- `localhost:3001`

---

## 🚀 Testing OAuth After Setup

1. **Local Testing:**
   ```bash
   npm run dev
   # Go to http://localhost:3000/auth/login
   # Click "Masuk dengan Google"
   # Should work without domain errors
   ```

2. **Production Testing:**
   ```
   Go to https://quran-best.vercel.app/auth/login
   Click "Masuk dengan Google"
   Should redirect to Google login → back to app
   ```

---

## 📝 Error Messages Handled

```typescript
const firebaseErrorMessages = {
  "auth/unauthorized-domain": "Domain tidak diizinkan untuk Google login. Hubungi admin untuk menambahkan domain ke Firebase Console.",
  "auth/operation-not-allowed": "Google login belum diaktifkan. Enable di Firebase Console → Authentication.",
  "auth/popup-closed-by-user": "Login Google dibatalkan oleh user.",
  "auth/popup-blocked": "Pop-up browser terblok. Izinkan pop-up untuk domain ini.",
  "auth/invalid-oauth-provider": "Provider Google tidak valid.",
}
```

---

## 🔐 Security Notes

⚠️ **JANGAN** lakukan di production:
- ❌ Hardcode JWT secrets di client
- ❌ Store sensitive tokens di localStorage tanpa encryption
- ❌ Trust client-generated tokens di backend

✅ **HARUS** lakukan:
- ✓ Generate tokens di backend hanya
- ✓ Use httpOnly cookies untuk tokens
- ✓ Validate tokens di setiap API call
- ✓ Implement CSRF protection
- ✓ Add rate limiting

---

## 📚 Reference

- [Firebase Auth Domains](https://firebase.google.com/docs/auth/web/google-signin)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Status:** Ready to Implement
**Date:** 2026-06-15

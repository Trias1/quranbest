# 🔐 Update Firebase untuk Domain Baru: quranbest-website.vercel.app

## ⚠️ Domain Lama vs Baru

**Lama:** `quran-best.vercel.app`
**Baru:** `quranbest-website.vercel.app`

Perlu di-update di Firebase Console!

---

## ✅ Step-by-Step Update Firebase

### 1. Login Firebase Console
- Buka: https://console.firebase.google.com
- Pilih project: **newp-3d79f**

### 2. Update Authorized Domains

**Settings (⚙️ icon) → Authorized domains**

Tambahkan ini:
- ✅ `quranbest-website.vercel.app` (NEW - Production)
- ✅ `localhost` (for local dev)
- ✅ `127.0.0.1` (for local dev)

Bisa hapus:
- ❌ `quran-best.vercel.app` (old domain)

### 3. Save & Wait
- Klik **Save**
- Tunggu 5-10 menit untuk propagation

---

## 📋 Firebase Authorized Domains Checklist

```
☑️ quranbest-website.vercel.app
☑️ localhost
☑️ 127.0.0.1
```

---

## 🌐 Update Deployment URLs

Pastikan URL di dokumentasi sudah update:

**Old URLs:** ❌
- https://quran-best.vercel.app
- https://quran-best.vercel.app/auth/login
- https://quran-best.vercel.app/auth/register
- https://quran-best.vercel.app/api/quran/surahs

**New URLs:** ✅
- https://quranbest-website.vercel.app
- https://quranbest-website.vercel.app/auth/login
- https://quranbest-website.vercel.app/auth/register
- https://quranbest-website.vercel.app/api/quran/surahs

---

## 🚀 Testing OAuth with New Domain

1. **Clear browser cache:**
   - Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
   - Clear localStorage & cookies

2. **Test Registration:**
   - Go to: https://quranbest-website.vercel.app/auth/register
   - Daftar pake email/password
   - Should work tanpa errors

3. **Test Google Login:**
   - Go to: https://quranbest-website.vercel.app/auth/login
   - Click "Masuk dengan Google"
   - Should redirect ke Google login tanpa `unauthorized-domain` error

4. **Expected Flow:**
   ```
   Click "Masuk dengan Google"
   ↓
   Redirect to Google consent screen
   ↓
   Ask for permission
   ↓
   Redirect back to https://quranbest-website.vercel.app
   ↓
   Save tokens to localStorage
   ↓
   Redirect to /dashboard
   ```

---

## 🔑 Environment Variables (Tetap sama)

Tidak perlu update di Vercel, semua credentials sudah benar:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newp-3d79f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newp-3d79f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newp-3d79f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=395960411721
NEXT_PUBLIC_FIREBASE_APP_ID=1:395960411721:web:ac40e6d5275ef2a0bfc198
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://newp-3d79f-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-0KEVRK95Y7
```

---

## 📝 Code Changes Made

### 1. Token Service (`src/lib/tokenService.ts`)
- ✅ Created token storage & management
- ✅ Auto-refresh expired tokens
- ✅ Handle localStorage safely

### 2. Updated Auth Service (`src/lib/auth.ts`)
- ✅ Integrated token service
- ✅ Store JWT after login/register
- ✅ Clear tokens on logout
- ✅ Better error messages for OAuth
- ✅ Auto-refresh on token expiry

### 3. Token Refresh Endpoint (`src/app/api/auth/refresh/route.ts`)
- ✅ Handle token refresh requests
- ✅ Generate new tokens with expiry
- ✅ Secure endpoint

---

## ✨ Features Added

1. **Token Storage:**
   - Access token stored in localStorage
   - Refresh token for persistence
   - Token expiry tracking

2. **Auto-Refresh:**
   - Automatic token refresh on expiry
   - Seamless user experience
   - No re-login needed within 1 hour

3. **Better Error Handling:**
   - `auth/unauthorized-domain` message
   - `auth/popup-blocked` message
   - `auth/popup-closed-by-user` message
   - Clear instructions for users

4. **Security:**
   - Token expiry validation
   - Safe localStorage access
   - Error logging for debugging

---

## 🔍 Verify Installation

After Firebase update, test locally:

```bash
cd /Users/macbook/Project/project-new/quran-best

# Build
npm run build

# Should output:
# ✓ Compiled successfully
# ✓ Generating static pages (19/19)
# No errors
```

---

## 📌 Summary

| Item | Status |
|------|--------|
| Domain updated | ✅ `quranbest-website.vercel.app` |
| Token service created | ✅ Implemented |
| Auth service updated | ✅ With JWT handling |
| Refresh token endpoint | ✅ Created |
| Error handling improved | ✅ Better messages |
| Firebase authorized domains | ⏳ Pending - You need to update |

---

**Next Action:** Go to Firebase Console & update authorized domains!

**Status:** Ready for OAuth testing
**Date:** 2026-06-15

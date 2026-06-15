#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   🚀 QuranBest - Deploy to GitHub + Vercel   ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ============================
# STEP 1: Create GitHub Repo
# ============================
echo "📦 STEP 1: Push ke GitHub"
echo "========================="
echo ""

# Check if gh CLI exists
if command -v gh &> /dev/null; then
    echo "✓ GitHub CLI ditemukan"
    
    # Create repo
    echo "→ Membuat repository di GitHub..."
    gh repo create quran-best --public --description "QuranBest - Platform Pembelajaran Al-Qur'an Terbaik" --source=. --remote=origin --push
    
    if [ $? -eq 0 ]; then
        echo "✅ Repository berhasil dibuat dan di-push!"
    else
        echo "⚠️  Mungkin repo sudah ada. Mencoba push..."
        git remote add origin https://github.com/$(gh api user -q .login)/quran-best.git 2>/dev/null
        git push -u origin main --force
    fi
else
    echo "⚠️  GitHub CLI (gh) tidak ditemukan."
    echo ""
    echo "PILIH SALAH SATU:"
    echo ""
    echo "OPSI A - Install GitHub CLI dulu:"
    echo "  brew install gh"
    echo "  gh auth login"
    echo "  lalu jalankan script ini lagi"
    echo ""
    echo "OPSI B - Manual push:"
    echo "  1. Buka https://github.com/new"
    echo "  2. Buat repo 'quran-best' (JANGAN centang apapun)"
    echo "  3. Jalankan:"
    echo "     git remote add origin https://github.com/USERNAME_ANDA/quran-best.git"
    echo "     git push -u origin main"
    echo ""
    read -p "Tekan Enter setelah selesai push ke GitHub..."
fi

echo ""

# ============================
# STEP 2: Deploy ke Vercel
# ============================
echo "🌐 STEP 2: Deploy ke Vercel"
echo "==========================="
echo ""

# Check if vercel CLI exists
if command -v vercel &> /dev/null; then
    echo "✓ Vercel CLI ditemukan"
else
    echo "→ Installing Vercel CLI..."
    npm install -g vercel
fi

echo "→ Deploying ke Vercel..."
echo ""

# Deploy with environment variables
vercel deploy --prod \
  -e NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE \
  -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newp-3d79f.firebaseapp.com \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID=newp-3d79f \
  -e NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newp-3d79f.firebasestorage.app \
  -e NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=395960411721 \
  -e NEXT_PUBLIC_FIREBASE_APP_ID=1:395960411721:web:ac40e6d5275ef2a0bfc198

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║         ✅ DEPLOYMENT SELESAI! ✅              ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "🎉 QuranBest sudah live!"
echo ""

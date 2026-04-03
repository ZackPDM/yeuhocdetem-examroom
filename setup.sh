#!/bin/bash

# ExamRoom Quick Start Script

echo "🚀 ExamRoom - Setup Script"
echo "=========================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js 18+"
  exit 1
fi

echo "✅ Node.js $(node --version) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Setup .env.local
echo ""
echo "🔑 Setting up environment variables..."
if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo "✅ .env.local created"
  echo "⚠️  Please edit .env.local with your Supabase credentials:"
  echo "   - NEXT_PUBLIC_SUPABASE_URL"
  echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
else
  echo "⚠️  .env.local already exists"
fi

# Done
echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "📖 For more info:"
echo "   - README.md"
echo "   - DEVELOPMENT.md"
echo "   - DEPLOYMENT.md"

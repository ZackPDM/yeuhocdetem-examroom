#!/bin/bash
# Verification script to check all files exist

echo "🔍 ExamRoom - File Verification Script"
echo "======================================"
echo ""

# Define arrays of required files
declare -a APP_FILES=(
  "app/layout.tsx"
  "app/page.tsx"
  "app/auth/page.tsx"
  "app/exam/[id]/page.tsx"
  "app/result/[submissionId]/page.tsx"
  "app/history/page.tsx"
  "app/admin/page.tsx"
  "app/admin/create/page.tsx"
  "app/admin/edit/[id]/page.tsx"
)

declare -a COMPONENT_FILES=(
  "components/Layout.tsx"
  "components/Navbar.tsx"
  "components/ExamCard.tsx"
  "components/QuestionRenderer.tsx"
  "components/MathToolbar.tsx"
  "components/ProtectedRoute.tsx"
  "components/Toast.tsx"
)

declare -a LIB_FILES=(
  "lib/supabase.ts"
  "lib/auth-context.tsx"
  "lib/services.ts"
  "lib/utils.ts"
  "lib/schema.sql"
)

declare -a CONFIG_FILES=(
  "package.json"
  "tsconfig.json"
  "next.config.ts"
  "tailwind.config.ts"
  "postcss.config.js"
  ".gitignore"
)

declare -a DOC_FILES=(
  "README.md"
  "DEVELOPMENT.md"
  "DEPLOYMENT.md"
  "SUPABASE_SETUP.md"
  "FEATURES.md"
  "PROJECT_STATUS.md"
  "REPLIT.md"
)

declare -a SCRIPT_FILES=(
  "setup.sh"
  "setup.bat"
  "replit.nix"
)

# Function to check files
check_files() {
  local category=$1
  local count=0
  local total=${#@}
  
  echo "📂 $category:"
  
  for i in "${@:2}"; do
    if [ -f "$i" ]; then
      echo "  ✅ $i"
      ((count++))
    else
      echo "  ❌ $i (missing)"
    fi
  done
  
  echo "  Result: $count/$((${#@}-1)) files"
  echo ""
}

# Check all categories
check_files "App Pages" "${APP_FILES[@]}"
check_files "Components" "${COMPONENT_FILES[@]}"
check_files "Library" "${LIB_FILES[@]}"
check_files "Configuration" "${CONFIG_FILES[@]}"
check_files "Documentation" "${DOC_FILES[@]}"
check_files "Scripts" "${SCRIPT_FILES[@]}"

# Count total
TOTAL=$((${#APP_FILES[@]} + ${#COMPONENT_FILES[@]} + ${#LIB_FILES[@]} + ${#CONFIG_FILES[@]} + ${#DOC_FILES[@]} + ${#SCRIPT_FILES[@]}))

echo "📊 Summary"
echo "=========="
echo "Total files expected: $TOTAL"

# Final check
echo ""
echo "✅ Verification complete!"
echo ""
echo "Next: Add .env.local with Supabase credentials"

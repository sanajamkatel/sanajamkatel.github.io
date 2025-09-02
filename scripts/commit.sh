#!/bin/bash

# Conventional Commit Helper Script
# Usage: ./scripts/commit.sh

echo "🌸 Sana's Portfolio - Conventional Commit Helper"
echo "================================================"
echo ""

echo "Select commit type:"
echo "1) feat     - New feature"
echo "2) fix      - Bug fix"
echo "3) docs     - Documentation"
echo "4) style    - Code style"
echo "5) refactor - Code refactoring"
echo "6) test     - Tests"
echo "7) chore    - Maintenance"
echo "8) perf     - Performance"
echo "9) ci       - CI/CD"
echo "10) build   - Build system"
echo "11) revert  - Revert changes"
echo ""

read -p "Enter choice (1-11): " choice

case $choice in
    1) type="feat" ;;
    2) type="fix" ;;
    3) type="docs" ;;
    4) type="style" ;;
    5) type="refactor" ;;
    6) type="test" ;;
    7) type="chore" ;;
    8) type="perf" ;;
    9) type="ci" ;;
    10) type="build" ;;
    11) type="revert" ;;
    *) echo "Invalid choice. Using 'feat'"; type="feat" ;;
esac

echo ""
read -p "Enter scope (optional, e.g., navbar, hero): " scope
read -p "Enter description: " description

# Build commit message
if [ -z "$scope" ]; then
    commit_msg="$type: $description"
else
    commit_msg="$type($scope): $description"
fi

echo ""
echo "Commit message: $commit_msg"
echo ""

read -p "Proceed with commit? (y/n): " confirm

if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    git add .
    git commit -m "$commit_msg"
    echo "✅ Committed successfully!"
    echo "🚀 Ready to push to GitHub!"
else
    echo "❌ Commit cancelled."
fi 
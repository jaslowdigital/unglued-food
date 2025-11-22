#!/bin/bash

echo "🚀 Pushing Unglued Food to GitHub..."
echo ""

# Remove any git lock files that might be stuck
rm -f .git/index.lock .git/config.lock 2>/dev/null

# Configure git user
git config user.email "github@ungluedfood.com"
git config user.name "Unglued Food"

# Check if origin already exists
if git remote | grep -q "^origin$"; then
  echo "📝 Updating existing origin remote..."
  git remote set-url origin https://github.com/jaslowdigital/unglued-food.git
else
  echo "📝 Adding origin remote..."
  git remote add origin https://github.com/jaslowdigital/unglued-food.git
fi

# Add all files
echo "📦 Adding files..."
git add .

# Create commit
echo "💾 Creating commit..."
git commit -m "Initial commit: Unglued Food - Gluten-free recipe website with 791+ AI-generated recipes

Features:
- 791 gluten-free recipes across multiple categories
- Full-stack React + Express application
- PostgreSQL database with Drizzle ORM
- Static site generation for SEO optimization
- Automatic static page regeneration
- AI recipe image generation
- Admin interface for recipe management
- Dark theme with Tailwind CSS
- Mobile-responsive design"

# Get current branch name
BRANCH=$(git branch --show-current)

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin $BRANCH

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "📍 Repository: https://github.com/jaslowdigital/unglued-food"
echo ""

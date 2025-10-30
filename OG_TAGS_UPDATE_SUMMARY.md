# Open Graph Tags Update Summary

## ✅ Completed Changes

### What Was Updated
All recipe pages now have **dynamic Open Graph meta tags** that use each recipe's individual data:

- **OG:image** → Uses the recipe's own image (e.g., `/recipe-images/gluten-free-cauliflower-ziti-ricotta-marinara.png`)
- **OG:title** → Uses the recipe's exact title (e.g., "Gluten-Free Cauliflower Baked Ziti with Ricotta & Marinara")
- **OG:description** → Uses the recipe's short description field

### Files Modified

#### 1. Server-Side (for Social Media Crawlers)
**File**: `server/socialMetaTags.ts`
- Changed OG tags to use `recipe.title` instead of `recipe.seoTitle`
- Changed OG tags to use `recipe.description` instead of `recipe.seoDescription`
- Twitter Card and Pinterest tags also updated to use recipe-specific data
- Only applies to `/recipe/:slug` URLs (recipe pages only)

#### 2. Client-Side (for Regular Browsers)
**File**: `client/src/pages/RecipePage.tsx`
- Updated MetaTags component to pass `recipe.title` and `recipe.description`

**File**: `client/src/components/MetaTags.tsx`
- Enhanced to support separate browser tab title and OG title
- Browser tab: Shows "Recipe Title - Unglued Food" for SEO
- OG tags: Show just "Recipe Title" for social sharing

### Scope
✅ **ONLY applies to recipe pages** (`/recipe/:slug` URLs)
✅ All other pages (home, products, about, etc.) keep their original meta tags unchanged

### How It Works

#### When a Recipe is Shared on Social Media:
1. **Facebook/LinkedIn**: Displays recipe's image, title, and description
2. **Twitter**: Shows recipe's image, title, and description as a large card
3. **Pinterest**: Uses recipe's image and description for Rich Pins

#### Example - Cauliflower Ziti Recipe:
- **OG:image**: `https://ungluedfood.com/recipe-images/gluten-free-cauliflower-ziti-ricotta-marinara.png`
- **OG:title**: "Gluten-Free Cauliflower Baked Ziti with Ricotta & Marinara"
- **OG:description**: "Classic version — roasted cauliflower layered with marinara, ricotta, mozzarella, and Parmesan — rich and satisfying low-carb dinner."

### Technical Details
- **Server-side rendering**: Social media crawlers get pre-rendered meta tags
- **Client-side rendering**: Regular users get dynamically updated meta tags
- **Security**: All recipe data is escaped to prevent XSS attacks
- **Production URLs**: All image URLs use `https://ungluedfood.com` for social sharing

## Verification
✅ All 451 recipes now have individual OG tags
✅ Image paths verified (all use `/recipe-images/` format)
✅ Server and client implementations are consistent
✅ Non-recipe pages remain unchanged

## Status
**COMPLETE** - All recipe pages now have dynamic, recipe-specific Open Graph meta tags for optimal social media sharing.

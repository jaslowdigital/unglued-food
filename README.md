# Unglued Food - Gluten-Free Recipe Website

A full-stack gluten-free food blog and recipe website featuring 791+ AI-generated recipes with SEO-optimized static site generation.

## Features

### Recipe Management
- **791 Gluten-Free Recipes** across multiple categories:
  - Desserts, Breads, Scones, Waffles, Pizza, Entrees
  - White Lasagna, One-Pan Meals, Kosher Meals, Low-Carb/Keto
  - Custard Cakes, Potato Cakes, Grain Alternatives, Burrito Bowls
  - Soups & Stews, Sides, and more
- **Admin Interface** for easy recipe creation and management
- **AI Image Generation** for recipe photos
- **Search & Filtering** by category, difficulty, and keywords
- **Pagination** (48 recipes per page)

### SEO Optimization
- **Static Site Generation (SSG)** - All 791 recipe pages pre-rendered as static HTML
- **Automatic Regeneration** - Static pages rebuild automatically when recipes are added/edited/deleted
- **Complete SEO Meta Tags** - Title, description, canonical URLs
- **Open Graph Tags** - Beautiful previews on Facebook, LinkedIn
- **Twitter Card Tags** - Rich previews on Twitter
- **Schema.org Recipe Markup** - Enables Google Rich Results with ratings, cook times
- **Smart Queueing** - Prevents overlapping builds during concurrent updates
- **Debouncing** - Optimized to rebuild max once every 5 seconds

### Technical Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Shadcn/ui + Radix UI components
- Tailwind CSS with dark theme
- Vite build tool

**Backend:**
- Node.js with Express.js
- TypeScript with ES modules
- RESTful API design
- Static HTML middleware for SEO
- Hybrid rendering (Static + SPA)

**Database:**
- PostgreSQL (Neon)
- Drizzle ORM
- Schema management with Drizzle Kit

**SEO & Analytics:**
- Static site generation
- Google Tag Manager
- Google Analytics
- Sitemap, robots.txt, RSS feed
- AI optimization files (llms.txt, ai.txt)

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- OpenAI API key (for recipe image generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jaslowdigital/unglued-food.git
cd unglued-food
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# OpenAI (for image generation)
OPENAI_API_KEY=your_openai_api_key
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Static Site Generation

### Automatic Regeneration
Static pages regenerate automatically when:
- Adding recipes through admin interface
- Editing existing recipes
- Deleting recipes
- Running AI recipe generation scripts

### Manual Regeneration
To manually regenerate all static pages:
```bash
cd server
tsx build-static-pages.ts
```

This rebuilds all 791+ recipe pages in ~2-3 seconds.

## Project Structure

```
.
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Route components
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Utilities and helpers
│   └── public/         # Static assets
├── server/              # Express backend
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Database interface
│   ├── build-static-pages.ts  # SSG generator
│   └── static-html-middleware.ts  # SEO middleware
├── shared/              # Shared types and schemas
│   └── schema.ts       # Drizzle database schema
└── dist/public/        # Generated static HTML
```

## Key Features

### Recipe Pages
Each recipe includes:
- Complete ingredient list
- Step-by-step instructions
- Nutrition information
- Difficulty rating
- Prep/cook/total time
- Tips and variations
- AI-generated images

### Admin Interface
- Add new recipes
- Edit existing recipes
- Upload images
- Manage categories
- Publish/unpublish recipes

### SEO Benefits
- Instant crawling by Google
- Rich results in search
- Social media previews
- Fast page load times
- Better search rankings

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Database Management
```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

All rights reserved.

## Author

Created by Jaslow Digital

## Repository

https://github.com/jaslowdigital/unglued-food

# Overview

This is a gluten-free food blog and recipe website called "Unglued Food" (ungluedfood.com). The application provides a comprehensive platform for gluten-free living, featuring 30 delicious gluten-free recipes (15 Halloween desserts + 5 breads + 10 oven-roasted chicken entrees) with AI-generated images, product recommendations, educational content, and newsletter functionality. It's built as a full-stack web application with a React frontend and Express backend, using a PostgreSQL database for data persistence.

## Recent Major Achievements

### October 26, 2025
✅ **Entrees Category - 10 Oven-Roasted Chicken Recipes**
- Created new "Entrees" recipe category with 10 diverse oven-roasted chicken recipes:
  - Classic Herb Roasted Chicken (whole chicken with herbs)
  - Lemon Garlic Roasted Chicken (Mediterranean-inspired)
  - Honey Mustard Glazed Roasted Chicken (sweet and tangy)
  - Mediterranean Roasted Chicken (with olives, tomatoes, feta)
  - BBQ Spiced Roasted Chicken (smoky drumsticks)
  - Asian Sesame Roasted Chicken (honey-sesame glaze)
  - Cajun Roasted Chicken (Louisiana-spiced)
  - Maple Balsamic Roasted Chicken (elegant fall dinner)
  - Tandoori-Style Roasted Chicken (Indian spices)
  - Italian Parmesan Herb Roasted Chicken (crispy cheese crust)
- All recipes feature professional AI-generated food photography
- Complete ingredients, instructions, tips, variations, and nutritional information
- All naturally gluten-free with diverse flavor profiles
- SEO optimized with dynamic meta tags for social sharing

✅ **Bread Category - 5 New Recipes**
- Created new "Breads" recipe category with 5 gluten-free bread recipes:
  - Classic Gluten-Free Sandwich Bread (everyday soft loaf)
  - Artisan Gluten-Free Sourdough Bread (crusty with tangy flavor)
  - Gluten-Free Rosemary Focaccia (Italian flatbread)
  - Gluten-Free Banana Bread (moist quick bread)
  - Gluten-Free Cinnamon Raisin Bread (sweet breakfast bread)
- All recipes include professional AI-generated food photography
- Complete ingredients, instructions, tips, and nutritional information
- SEO optimized with dynamic meta tags for social sharing

**Total Recipe Count: 30 recipes (15 Desserts + 5 Breads + 10 Entrees)**

### October 17, 2025
✅ **Comprehensive SEO & AI Optimization Suite - 25 Files**
- Created/updated complete suite of 25 SEO and AI optimization files in client/public/
- **Core SEO Files**: sitemap.xml, robots.txt, feed.xml, webmaster.txt
- **AI Training Files**: llms.txt, ai.txt, gpt.txt, claude.txt, training.txt
- **Bot Permission Files**: bots.txt, crawlers.txt, accessibility.txt
- **Optimization Files**: seo.txt, nlp.txt, geo.txt, performance.txt, images.txt
- **Web Standards**: manifest.json, schema.json, browserconfig.xml, opensearch.xml
- **Compliance Files**: security.txt, ads.txt, compliance.txt, humans.txt
- All files configured with maximum search engine visibility and AI training permissions
- Updated all content with current Halloween dessert recipes and ungluedfood.com domain
- Comprehensive crawler permissions for Google, Bing, AI bots (GPT, Claude, etc.)
- Zero restrictions on data mining and commercial AI training usage

✅ **Google Tag Manager and Analytics Installation**
- Installed Google Tag Manager (GTM-NRXXRPWB) for enhanced tracking capabilities
- Added Google Analytics (G-J282M4L38N) for comprehensive website analytics
- Both tracking codes properly implemented in client/index.html following best practices
- GTM script placed high in <head>, noscript fallback added after <body> tag
- Analytics script configured for optimal data collection

✅ **Halloween Desserts Collection - 15 Recipes**
- Created 15 gluten-free Halloween dessert recipes with AI-generated images
- All recipes in Desserts category with spooky Halloween themes:
  - Ghostly White Chocolate Mousse
  - Pumpkin Spice Cheesecake Bars
  - Chocolate Graveyard Pudding
  - Orange and Black Chocolate Tart
  - Spider Web Brownies
  - Witch Hat Chocolate Cupcakes
  - Candy Corn Panna Cotta
  - Poison Caramel Apples
  - Black Velvet Halloween Cake
  - Mummy Chocolate Truffles
  - Monster Eye Meringue Cookies
  - Vampire Blood Red Velvet Cookies
  - Haunted Forest Chocolate Bark
  - Ghostly Marshmallow Pops
  - Frankenstein Rice Crispy Treats
- Each recipe includes detailed instructions, nutritional information, and SEO optimization
- Professional AI-generated food photography for all Halloween desserts

### Earlier Achievements (2025)
✅ **Static Site Conversion** (September 25, 2025)
- Successfully converted React site to static HTML/CSS/JavaScript
- Generated 64 total pages with individual URLs for every recipe and menu option
- Implemented comprehensive SEO with meta tags, Open Graph, and Twitter cards
- Built vanilla JavaScript search and filtering functionality

✅ **Navigation Enhancement** (January 24, 2025)
- Added consistent navigation menu to all pages
- Mobile-responsive menu with hamburger toggle
- Footer component for consistent user experience

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for recipes, products, and newsletter
- **Development Setup**: Vite middleware integration for seamless full-stack development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Storage Solutions
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Data Models**: Recipes, products, and newsletter subscriptions with proper relationships

## Design System
- **Component Library**: Custom components built on Radix UI primitives
- **Theme**: Dark theme with warm amber accent colors
- **Typography**: Inter and Playfair Display fonts for modern, readable design
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built-in accessibility features from Radix UI components

## Content Management
- **Recipe System**: Categorized recipes with filtering, search, and difficulty ratings
- **Product Recommendations**: Affiliate product listings with category filtering
- **Educational Content**: Static educational sections about gluten-free living
- **Newsletter**: Email subscription system for community engagement

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connection**: Uses `@neondatabase/serverless` for database connectivity

## UI and Component Libraries
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets including social media icons
- **Embla Carousel**: Carousel/slider functionality

## Development Tools
- **TypeScript**: Static type checking across the entire stack
- **ESLint/Prettier**: Code formatting and linting (implied by project structure)
- **Replit Integration**: Custom Replit-specific development tools and plugins

## Form and Data Handling
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema validation
- **Date-fns**: Date manipulation and formatting utilities

## Build and Development
- **Vite**: Frontend build tool and development server
- **PostCSS**: CSS processing with Tailwind CSS
- **ESBuild**: Backend bundling for production deployment
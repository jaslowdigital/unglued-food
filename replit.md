# Overview

This project, "Unglued Food," is a gluten-free food blog and recipe website providing a platform for gluten-free living. It features 321 AI-generated recipes across various categories (desserts, breads, scones, entrees, one-pan meals, kosher meals, low-carb/keto, custard cakes, grain alternatives, burrito bowls, soups & stews, sides), product recommendations, educational content, and newsletter functionality. The application is a full-stack web application with a React frontend and Express backend, utilizing a PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Framework**: Shadcn/ui built on Radix UI
- **Styling**: Tailwind CSS with custom CSS variables
- **Build Tool**: Vite

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API
- **Development Setup**: Vite middleware integration
- **Error Handling**: Centralized middleware

## Data Storage Solutions
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Schema Management**: Drizzle Kit
- **Development Storage**: In-memory storage for development
- **Data Models**: Recipes, products, and newsletter subscriptions

## Design System
- **Component Library**: Custom components built on Radix UI
- **Theme**: Dark theme with warm amber accents
- **Typography**: Inter and Playfair Display fonts
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built-in features from Radix UI

## Content Management
- **Recipe System**: 321 categorized recipes with filtering, search, difficulty ratings, and pagination (48 recipes/page)
  - Desserts (71): Halloween Desserts (10) + Cranberry Tarts (10) + Brownies & Cheesecake Bars (10) + Fruit Crisps & Crumbles (10) + Gluten-Free Cookies (10) + Custard Cakes (10: Vanilla Bean, Chocolate, Lemon Blueberry, Coconut, Matcha, Salted Caramel, Pumpkin Spice, Almond Honey, Espresso, Strawberry Cream) + Kosher Honey Cake (1) + Keto Mini Cheesecake Bites (1) + Others (9)
  - Breads (16): Artisan Loaves (5) + Muffins (10) + Low-Carb Cheddar Chive Biscuits (1)
  - Scones (10): Zesty Blueberry varieties (Lemon, Orange Cream, Lime Poppyseed, Buttermilk, Vanilla Bean, Almond, Lavender, Coconut, Honey Yogurt, Cardamom)
  - Entrees: Oven-Roasted Chicken, Lasagna variations, Pizza, Burrito Bowls, Halloumi dishes, Miso-Butter Chicken variants, One-Pan Meals (10), Kosher Meals (7), Low-Carb/Keto (8: Chicken Alfredo Bake, Zucchini Noodle Carbonara, Cauliflower Crust Pizza, Cheeseburger Skillet, Garlic Butter Shrimp, Buffalo Chicken Wraps, Eggplant Lasagna, Taco Casserole)
  - Grain & Flour Alternatives (10): Cauliflower rice, zucchini noodles, quinoa, etc.
  - Soups & Stews (12): Creamy Soups (10) + Kosher Meals (2: Matzo Ball Soup, Moroccan Chickpea Stew)
  - Sides (2): Kosher Meals (Latkes, Sweet Noodle Kugel)
  - Additional categories: Thanksgiving, Venison
- **Product Recommendations**: Affiliate product listings with category filtering
- **Educational Content**: Static sections on gluten-free living
- **Newsletter**: Email subscription system

## SEO & Analytics
- Comprehensive SEO files (sitemap, robots, feed)
- AI optimization files (llms.txt, ai.txt)
- Google Tag Manager and Google Analytics for tracking

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: `@neondatabase/serverless`

## UI and Component Libraries
- **Radix UI**: Headless UI components
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets
- **Embla Carousel**: Carousel/slider functionality

## Development Tools
- **TypeScript**: Static type checking
- **ESLint/Prettier**: Code formatting and linting
- **Replit Integration**: Custom Replit-specific tools

## Form and Data Handling
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type and schema validation
- **Date-fns**: Date manipulation utilities

## Build and Development
- **Vite**: Frontend build tool and development server
- **PostCSS**: CSS processing
- **ESBuild**: Backend bundling
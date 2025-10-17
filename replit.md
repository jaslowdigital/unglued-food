# Overview

This is a gluten-free food blog and recipe website called "Unglued Food". The application provides a comprehensive platform for gluten-free living, featuring delicious gluten-free recipes with AI-generated images, product recommendations, educational content, and newsletter functionality. It's built as a full-stack web application with a React frontend and Express backend, using a PostgreSQL database for data persistence.

## Recent Major Achievements

### October 17, 2025
✅ **Google Tag Manager and Analytics Installation**
- Installed Google Tag Manager (GTM-NRXXRPWB) for enhanced tracking capabilities
- Added Google Analytics (G-J282M4L38N) for comprehensive website analytics
- Both tracking codes properly implemented in client/index.html following best practices
- GTM script placed high in <head>, noscript fallback added after <body> tag
- Analytics script configured for optimal data collection

✅ **Fresh Start with Halloween Desserts Collection**
- Completely reset all existing recipes and images to start from scratch
- Created 10 new gluten-free Halloween dessert recipes with AI-generated images
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
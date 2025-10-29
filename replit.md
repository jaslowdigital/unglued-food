# Overview

This project, "Unglued Food," is a gluten-free food blog and recipe website providing a platform for gluten-free living. It features 441 AI-generated recipes across various categories (desserts, breads, scones, waffles, pizza, focaccia, entrees, white lasagna, one-pan meals, kosher meals, low-carb/keto, custard cakes, grain alternatives, burrito bowls, soups & stews, sides), product recommendations, educational content, and newsletter functionality. The application is a full-stack web application with a React frontend and Express backend, utilizing a PostgreSQL database.

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
- **Recipe System**: 441 categorized recipes with filtering, search, difficulty ratings, and pagination (48 recipes/page)
  - Gluten-Free Recipes: Gluten-Free Mochi (10: Strawberry Daifuku, Matcha Mochi Brownies, Chocolate Peanut Butter Bites, Coconut Mango Bars, Ice Cream Mochi, Black Sesame Squares, Taro Coconut, Chocolate Ganache, Brown Sugar Boba, Ube Butter Cake)
  - Desserts (81): Original Gluten-Free Desserts (10: Chocolate Lava Cake, Lemon Pudding Cups, Strawberry Shortcake Bars, Tiramisu Cups, Almond Butter Brownies, Coconut Cream Pie Bars, Salted Caramel Cheesecake Cups, Blueberry Crumble Bars, Peanut Butter Chocolate Mousse, Apple Cinnamon Galette) + Halloween Desserts (10) + Cranberry Tarts (10) + Brownies & Cheesecake Bars (10) + Fruit Crisps & Crumbles (10) + Gluten-Free Cookies (10) + Custard Cakes (10: Vanilla Bean, Chocolate, Lemon Blueberry, Coconut, Matcha, Salted Caramel, Pumpkin Spice, Almond Honey, Espresso, Strawberry Cream) + Kosher Honey Cake (1) + Keto Mini Cheesecake Bites (1) + Others (9)
  - Breads (26): Artisan Loaves (5) + Muffins (10) + Waffles (10: Almond Flour with Vanilla Bean Syrup, Buckwheat with Blueberries & Maple Butter, Coconut Flour with Chocolate Chips, Oat Flour with Banana & Cinnamon, Rice Flour with Strawberry Ice Cream, Tapioca Flour with Caramel Drizzle, Quinoa Flour with Berry Compote, Chickpea Flour with Maple Butter & Pecans, Triple Chocolate Ice Cream Sundae, Sorghum Flour with Lemon Curd & Blueberries) + Low-Carb Cheddar Chive Biscuits (1)
  - Scones (10): Zesty Blueberry varieties (Lemon, Orange Cream, Lime Poppyseed, Buttermilk, Vanilla Bean, Almond, Lavender, Coconut, Honey Yogurt, Cardamom)
  - Pizza (10): Gluten-Free Focaccia Pizza Crusts (Garlic & Rosemary, Tomato & Basil, Caramelized Onions & Thyme, Olive Tapenade, Roasted Peppers & Feta, Sun-Dried Tomato & Parmesan, Za'atar & Olive Oil, Roasted Garlic & Sea Salt, Everything Bagel Seasoning, Spinach & Ricotta Swirl)
  - Entrees: Oven-Roasted Chicken, Lasagna variations, Burrito Bowls, Halloumi dishes, Miso-Butter Chicken variants, One-Pan Meals (10), Kosher Meals (7), Low-Carb/Keto (8: Chicken Alfredo Bake, Zucchini Noodle Carbonara, Cauliflower Crust Pizza, Cheeseburger Skillet, Garlic Butter Shrimp, Buffalo Chicken Wraps, Eggplant Lasagna, Taco Casserole)
  - White Lasagna (10): Spinach & Ricotta, Chicken Alfredo, Pesto & Zucchini, Seafood, Mushroom & Leek, Sausage & Kale, Four-Cheese, Roasted Vegetable, Butternut Squash, Crab & Spinach Roll-Ups
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
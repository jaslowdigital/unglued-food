// Build script to convert React site to static HTML, CSS, JS
const fs = require('fs');
const path = require('path');

// Read exported recipes
const recipesData = JSON.parse(fs.readFileSync('./server/static-export/recipes.json', 'utf8'));
const recipes = recipesData.recipes;
const categories = [...new Set(recipes.map(r => r.category))].sort();

console.log(`🚀 Building static site with ${recipes.length} recipes...`);

// Create directory structure
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Create all necessary directories
createDir('dist');
createDir('dist/css');
createDir('dist/js');
createDir('dist/images');
createDir('dist/recipe');
createDir('dist/recipes');
createDir('dist/category');
createDir('dist/education');

// Copy images from existing sources
console.log('📂 Setting up image directories...');

// Create base HTML template
const createBaseTemplate = (title, description, content, canonicalUrl = '', ogImage = '') => `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://unglutedfood.com${canonicalUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://unglutedfood.com${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:site_name" content="Unglued Food - Gluten-Free Recipes">
    ${ogImage ? `<meta property="og:image" content="https://unglutedfood.com${ogImage}">` : ''}
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://unglutedfood.com${canonicalUrl}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    ${ogImage ? `<meta property="twitter:image" content="https://unglutedfood.com${ogImage}">` : ''}
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'dark-primary': '#0f0f0f',
                        'dark-secondary': '#1a1a1a',
                        'dark-accent': '#2a2a2a',
                        'light-text': '#f5f5f5',
                        'muted-gray': '#a3a3a3',
                        'warm-amber': '#f59e0b',
                        'warm-orange': '#ea580c'
                    },
                    fontFamily: {
                        'playfair': ['Playfair Display', 'serif']
                    }
                }
            }
        }
    </script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="min-h-screen bg-dark-primary text-light-text">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-dark-primary/95 backdrop-blur-sm border-b border-warm-amber/20 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-playfair font-bold text-warm-amber">
                        Unglued Food
                    </a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="/recipes/" class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">All Recipes</a>
                        <div class="relative group">
                            <button class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">Categories</button>
                            <div class="absolute left-0 mt-2 w-48 bg-dark-secondary border border-warm-amber/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                ${categories.map(cat => `<a href="/category/${cat.toLowerCase().replace(/\s+/g, '-')}/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">${cat}</a>`).join('')}
                            </div>
                        </div>
                        <div class="relative group">
                            <button class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">Education</button>
                            <div class="absolute left-0 mt-2 w-48 bg-dark-secondary border border-warm-amber/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <a href="/education/gluten-free-basics/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">Gluten-Free Basics</a>
                                <a href="/education/shopping-guide/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">Shopping Guide</a>
                                <a href="/education/label-reading/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">Label Reading</a>
                                <a href="/education/cross-contamination/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">Cross Contamination</a>
                                <a href="/education/substitutions/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">Substitutions</a>
                            </div>
                        </div>
                        <a href="/about/" class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">About</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="text-light-text hover:text-warm-amber">
                        <i data-lucide="menu" class="h-6 w-6"></i>
                    </button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden bg-dark-secondary border-t border-warm-amber/20">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="/recipes/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">All Recipes</a>
                ${categories.map(cat => `<a href="/category/${cat.toLowerCase().replace(/\s+/g, '-')}/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">${cat}</a>`).join('')}
                <a href="/education/gluten-free-basics/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Gluten-Free Basics</a>
                <a href="/education/shopping-guide/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Shopping Guide</a>
                <a href="/education/label-reading/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Label Reading</a>
                <a href="/education/cross-contamination/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Cross Contamination</a>
                <a href="/education/substitutions/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">Substitutions</a>
                <a href="/about/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">About</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
        ${content}
    </main>

    <!-- Footer -->
    <footer class="bg-dark-secondary border-t border-warm-amber/20 mt-16">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-playfair font-bold text-warm-amber mb-4">Unglued Food</h3>
                    <p class="text-muted-gray mb-4">
                        Your trusted source for delicious gluten-free recipes, tips, and inspiration for living your best gluten-free life.
                    </p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-light-text mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="/recipes/" class="text-muted-gray hover:text-warm-amber">All Recipes</a></li>
                        <li><a href="/category/breakfast/" class="text-muted-gray hover:text-warm-amber">Breakfast</a></li>
                        <li><a href="/category/dinner/" class="text-muted-gray hover:text-warm-amber">Dinner</a></li>
                        <li><a href="/category/desserts/" class="text-muted-gray hover:text-warm-amber">Desserts</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-light-text mb-4">Learn</h4>
                    <ul class="space-y-2">
                        <li><a href="/education/gluten-free-basics/" class="text-muted-gray hover:text-warm-amber">Gluten-Free Basics</a></li>
                        <li><a href="/education/shopping-guide/" class="text-muted-gray hover:text-warm-amber">Shopping Guide</a></li>
                        <li><a href="/education/substitutions/" class="text-muted-gray hover:text-warm-amber">Substitutions</a></li>
                        <li><a href="/about/" class="text-muted-gray hover:text-warm-amber">About</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-warm-amber/20 mt-8 pt-8 text-center">
                <p class="text-muted-gray">&copy; 2024 Unglued Food. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="/js/main.js"></script>
    <script>
        lucide.createIcons();
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
    </script>
</body>
</html>`;

// Create recipe card HTML
const createRecipeCard = (recipe) => `
<div class="bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
    <div class="relative">
        <img src="${recipe.image || '/images/placeholder-recipe.jpg'}" 
             alt="${recipe.title}" 
             class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
        <div class="absolute top-4 right-4">
            <span class="bg-warm-amber text-dark-primary px-2 py-1 rounded-full text-sm font-semibold">
                ⭐ ${recipe.rating}
            </span>
        </div>
    </div>
    <div class="p-6">
        <div class="flex items-center justify-between mb-2">
            <span class="bg-dark-accent text-warm-amber px-3 py-1 rounded-full text-sm">${recipe.category}</span>
            <span class="text-muted-gray text-sm">${recipe.difficulty}</span>
        </div>
        <h3 class="text-xl font-semibold text-light-text mb-2 group-hover:text-warm-amber transition-colors">
            <a href="/recipe/${recipe.slug}/">${recipe.title}</a>
        </h3>
        <p class="text-muted-gray text-sm mb-4 line-clamp-2">${recipe.description}</p>
        <div class="flex items-center justify-between text-sm text-muted-gray">
            <span class="flex items-center">
                <i data-lucide="clock" class="h-4 w-4 mr-1"></i>
                ${recipe.totalTime || recipe.cookTime} mins
            </span>
            <span class="flex items-center">
                <i data-lucide="users" class="h-4 w-4 mr-1"></i>
                ${recipe.servings} servings
            </span>
        </div>
        <div class="mt-4 flex flex-wrap gap-1">
            ${recipe.tags.slice(0, 3).map(tag => `<span class="bg-dark-accent text-warm-amber px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
        </div>
    </div>
</div>`;

// Generate Home Page
console.log('🏠 Generating home page...');
const homeContent = `
<section class="relative bg-gradient-to-r from-dark-primary to-dark-secondary py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-playfair font-bold text-light-text mb-6">
            Welcome to <span class="text-warm-amber">Unglued Food</span>
        </h1>
        <p class="text-xl text-muted-gray mb-8 max-w-3xl mx-auto">
            Discover delicious gluten-free recipes that don't compromise on flavor. 
            From quick weeknight dinners to spectacular desserts, we've got you covered.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Browse All Recipes
            </a>
            <a href="/education/gluten-free-basics/" class="border border-warm-amber text-warm-amber px-8 py-3 rounded-lg font-semibold hover:bg-warm-amber hover:text-dark-primary transition-colors">
                Learn the Basics
            </a>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-playfair font-bold text-center mb-12">Featured Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${categories.map(category => {
                const categoryRecipes = recipes.filter(r => r.category === category);
                const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
                return `
                <a href="/category/${categorySlug}/" class="group">
                    <div class="bg-dark-secondary rounded-xl p-6 text-center hover:bg-dark-accent transition-colors">
                        <h3 class="text-lg font-semibold text-light-text group-hover:text-warm-amber">${category}</h3>
                        <p class="text-muted-gray text-sm mt-2">${categoryRecipes.length} recipes</p>
                    </div>
                </a>`;
            }).join('')}
        </div>
    </div>
</section>

<section class="py-16 bg-dark-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
            <div>
                <h2 class="text-3xl font-playfair font-bold text-light-text">Featured Recipes</h2>
                <p class="text-muted-gray mt-2">Hand-picked favorites from our collection</p>
            </div>
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-6 py-2 rounded-lg hover:bg-warm-orange transition-colors">
                View All
            </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${recipes.slice(0, 6).map(recipe => createRecipeCard(recipe)).join('')}
        </div>
    </div>
</section>

<!-- Halloween Recipes Section -->
<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-playfair font-bold text-light-text mb-4">🎃 Halloween Recipes</h2>
            <p class="text-muted-gray">Spooky gluten-free treats perfect for the season</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${recipes.filter(r => r.tags.some(tag => tag.toLowerCase().includes('halloween'))).slice(0, 6).map(recipe => createRecipeCard(recipe)).join('')}
        </div>
        <div class="text-center mt-8">
            <a href="/recipes/?filter=halloween" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                View All Halloween Recipes
            </a>
        </div>
    </div>
</section>`;

const homePage = createBaseTemplate(
    'Unglued Food - Delicious Gluten-Free Recipes',
    'Discover amazing gluten-free recipes that taste incredible. From breakfast to dessert, find your new favorite dishes.',
    homeContent,
    '',
    '/images/hero-image.jpg'
);

fs.writeFileSync('dist/index.html', homePage);

console.log('✅ Home page created');
console.log(`🎃 Found ${recipes.filter(r => r.tags.some(tag => tag.toLowerCase().includes('halloween'))).length} Halloween recipes for home page`);

// Continue with more pages...
console.log('📄 Static site base structure created!');
console.log('Next: Run the script to generate all recipe pages and category pages...');
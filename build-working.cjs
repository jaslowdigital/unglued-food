// Working build script for static site
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

// Create all directories
createDir('dist');
createDir('dist/css');
createDir('dist/js');
createDir('dist/images');
createDir('dist/recipe');
createDir('dist/recipes');
createDir('dist/category');
createDir('dist/education');

recipes.forEach(recipe => {
  createDir(`dist/recipe/${recipe.slug}`);
});

categories.forEach(category => {
  const categorySlug = category.toLowerCase().replace(/\\s+/g, '-');
  createDir(`dist/category/${categorySlug}`);
});

// Base template function
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
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    
    <style>
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="min-h-screen bg-dark-primary text-light-text">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-dark-primary/95 backdrop-blur-sm border-b border-warm-amber/20 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-playfair font-bold text-warm-amber">Unglued Food</a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="/recipes/" class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">All Recipes</a>
                        <div class="relative group">
                            <button class="text-light-text hover:text-warm-amber px-3 py-2 rounded-md text-sm font-medium">Categories</button>
                            <div class="absolute left-0 mt-2 w-48 bg-dark-secondary border border-warm-amber/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                ${categories.map(cat => `<a href="/category/${cat.toLowerCase().replace(/\\s+/g, '-')}/" class="block px-4 py-2 text-sm text-light-text hover:bg-dark-accent hover:text-warm-amber">${cat}</a>`).join('')}
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
                ${categories.map(cat => `<a href="/category/${cat.toLowerCase().replace(/\\s+/g, '-')}/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">${cat}</a>`).join('')}
                <a href="/about/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">About</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">${content}</main>

    <!-- Footer -->
    <footer class="bg-dark-secondary border-t border-warm-amber/20 mt-16">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-playfair font-bold text-warm-amber mb-4">Unglued Food</h3>
                    <p class="text-muted-gray mb-4">Your trusted source for delicious gluten-free recipes.</p>
                </div>
            </div>
            <div class="border-t border-warm-amber/20 mt-8 pt-8 text-center">
                <p class="text-muted-gray">&copy; 2024 Unglued Food. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        lucide.createIcons();
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
    </script>
</body>
</html>`;

// Recipe card template
const createRecipeCard = (recipe) => {
    const isHalloween = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes('halloween'));
    return `<div class="bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
    <div class="relative">
        <img src="${recipe.image || '/images/placeholder-recipe.jpg'}" alt="${recipe.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/placeholder-recipe.jpg'">
        <div class="absolute top-4 right-4">
            <span class="bg-warm-amber text-dark-primary px-2 py-1 rounded-full text-sm font-semibold">⭐ ${recipe.rating}</span>
        </div>
        ${isHalloween ? '<div class="absolute top-4 left-4"><span class="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">🎃 Halloween</span></div>' : ''}
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
            <span class="flex items-center"><i data-lucide="clock" class="h-4 w-4 mr-1"></i>${recipe.totalTime || recipe.cookTime} mins</span>
            <span class="flex items-center"><i data-lucide="users" class="h-4 w-4 mr-1"></i>${recipe.servings} servings</span>
        </div>
        <div class="mt-4 flex flex-wrap gap-1">
            ${recipe.tags ? recipe.tags.slice(0, 3).map(tag => `<span class="bg-dark-accent text-warm-amber px-2 py-1 rounded text-xs">${tag}</span>`).join('') : ''}
        </div>
    </div>
</div>`;
};

// 1. Generate HOME PAGE
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
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">Browse All Recipes</a>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-playfair font-bold text-center mb-12">Featured Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${categories.map(category => {
                const categoryRecipes = recipes.filter(r => r.category === category);
                const categorySlug = category.toLowerCase().replace(/\\s+/g, '-');
                return `<a href="/category/${categorySlug}/" class="group">
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
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-6 py-2 rounded-lg hover:bg-warm-orange transition-colors">View All</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${recipes.slice(0, 6).map(recipe => createRecipeCard(recipe)).join('')}
        </div>
    </div>
</section>

<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-playfair font-bold text-light-text mb-4">🎃 Halloween Recipes</h2>
            <p class="text-muted-gray">Spooky gluten-free treats perfect for the season</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${recipes.filter(r => r.tags && r.tags.some(tag => tag.toLowerCase().includes('halloween'))).slice(0, 6).map(recipe => createRecipeCard(recipe)).join('')}
        </div>
        <div class="text-center mt-8">
            <a href="/recipes/" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">View All Halloween Recipes</a>
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

// 2. Generate individual recipe pages
console.log('🍽️ Generating individual recipe pages...');
let recipeCount = 0;
let halloweenCount = 0;

recipes.forEach(recipe => {
    const isHalloween = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes('halloween'));
    if (isHalloween) halloweenCount++;
    
    const shareUrl = 'https://unglutedfood.com/recipe/' + recipe.slug + '/';
    
    const recipeContent = `
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">${recipe.title}</h1>
                ${isHalloween ? '<div class="mb-4"><span class="bg-orange-600 text-white px-3 py-2 rounded-full text-sm">🎃 Halloween Special</span></div>' : ''}
                <p class="text-lg text-muted-gray mb-6">${recipe.longDescription || recipe.description}</p>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="text-center p-3 bg-dark-secondary rounded-lg">
                        <i data-lucide="clock" class="h-5 w-5 text-warm-amber mx-auto mb-1"></i>
                        <div class="text-sm text-muted-gray">Total Time</div>
                        <div class="font-semibold">${recipe.totalTime || recipe.cookTime} mins</div>
                    </div>
                    <div class="text-center p-3 bg-dark-secondary rounded-lg">
                        <i data-lucide="users" class="h-5 w-5 text-warm-amber mx-auto mb-1"></i>
                        <div class="text-sm text-muted-gray">Servings</div>
                        <div class="font-semibold">${recipe.servings}</div>
                    </div>
                    <div class="text-center p-3 bg-dark-secondary rounded-lg">
                        <i data-lucide="chef-hat" class="h-5 w-5 text-warm-amber mx-auto mb-1"></i>
                        <div class="text-sm text-muted-gray">Difficulty</div>
                        <div class="font-semibold">${recipe.difficulty}</div>
                    </div>
                    ${recipe.calories ? `<div class="text-center p-3 bg-dark-secondary rounded-lg">
                        <i data-lucide="flame" class="h-5 w-5 text-warm-amber mx-auto mb-1"></i>
                        <div class="text-sm text-muted-gray">Calories</div>
                        <div class="font-semibold">${recipe.calories}</div>
                    </div>` : ''}
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    ${recipe.tags ? recipe.tags.map(tag => `<span class="bg-dark-accent text-warm-amber px-3 py-1 rounded-full text-sm">${tag}</span>`).join('') : ''}
                    ${recipe.isNaturallyGlutenFree ? '<span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Naturally Gluten-Free</span>' : ''}
                </div>
            </div>

            <div class="relative">
                <img src="${recipe.image || '/images/placeholder-recipe.jpg'}" alt="${recipe.title}" class="w-full h-80 md:h-full object-cover rounded-xl" onerror="this.src='/images/placeholder-recipe.jpg'">
                <div class="absolute top-4 right-4">
                    <span class="bg-warm-amber text-dark-primary px-3 py-2 rounded-full font-semibold">⭐ ${recipe.rating}</span>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <div class="md:col-span-1">
                <div class="bg-dark-secondary rounded-xl p-6 sticky top-20">
                    <h2 class="text-2xl font-bold text-light-text mb-4">Ingredients</h2>
                    <ul class="space-y-3">
                        ${recipe.ingredients.map((ingredient, index) => `
                        <li class="flex items-start">
                            <input type="checkbox" id="ingredient-${index}" class="mt-1 mr-3 rounded">
                            <label for="ingredient-${index}" class="text-muted-gray cursor-pointer hover:text-light-text transition-colors">${ingredient}</label>
                        </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="md:col-span-2">
                <div class="bg-dark-secondary rounded-xl p-6">
                    <h2 class="text-2xl font-bold text-light-text mb-6">Instructions</h2>
                    <ol class="space-y-4">
                        ${recipe.instructions.map((instruction, index) => `
                        <li class="flex">
                            <span class="bg-warm-amber text-dark-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">${index + 1}</span>
                            <div class="text-muted-gray leading-relaxed">${instruction}</div>
                        </li>
                        `).join('')}
                    </ol>
                </div>

                ${recipe.tips ? `
                <div class="bg-dark-secondary rounded-xl p-6 mt-6">
                    <h3 class="text-xl font-semibold text-light-text mb-3">
                        <i data-lucide="lightbulb" class="h-5 w-5 text-warm-amber inline mr-2"></i>Chef's Tips
                    </h3>
                    <p class="text-muted-gray">${recipe.tips}</p>
                </div>` : ''}

                ${recipe.variations && recipe.variations.length > 0 ? `
                <div class="bg-dark-secondary rounded-xl p-6 mt-6">
                    <h3 class="text-xl font-semibold text-light-text mb-3">
                        <i data-lucide="shuffle" class="h-5 w-5 text-warm-amber inline mr-2"></i>Variations
                    </h3>
                    <ul class="space-y-2">
                        ${recipe.variations.map(variation => `<li class="text-muted-gray"><span class="text-warm-amber">•</span> ${variation}</li>`).join('')}
                    </ul>
                </div>` : ''}
            </div>
        </div>

        <div class="mt-8 text-center">
            <button onclick="shareRecipe()" class="bg-warm-amber text-dark-primary px-6 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                <i data-lucide="share-2" class="h-4 w-4 mr-2 inline"></i>Share This Recipe
            </button>
        </div>
    </div>

    <script>
        function shareRecipe() {
            if (navigator.share) {
                navigator.share({
                    title: '${recipe.title.replace(/'/g, "\\'")} - Unglued Food',
                    text: '${recipe.description.replace(/'/g, "\\'")}',
                    url: '${shareUrl}'
                });
            } else {
                navigator.clipboard.writeText('${shareUrl}').then(() => {
                    alert('Recipe link copied to clipboard!');
                });
            }
        }
    </script>`;

    const recipePage = createBaseTemplate(
        recipe.title + ' - Unglued Food',
        recipe.longDescription || recipe.description,
        recipeContent,
        '/recipe/' + recipe.slug + '/',
        recipe.image
    );

    fs.writeFileSync('dist/recipe/' + recipe.slug + '/index.html', recipePage);
    recipeCount++;
});

console.log(`✅ Generated ${recipeCount} individual recipe pages`);
console.log(`🎃 ${halloweenCount} Halloween recipes included`);

console.log('🎯 HOME PAGE + ALL INDIVIDUAL RECIPE PAGES COMPLETE!');
console.log('🎉 Static site conversion in progress...');
console.log('Next phase: Create all-recipes page and category pages...');
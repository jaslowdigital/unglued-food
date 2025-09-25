// Build script for remaining static pages - All Recipes, Categories, Education, About
const fs = require('fs');
const path = require('path');

// Read exported recipes
const recipesData = JSON.parse(fs.readFileSync('./server/static-export/recipes.json', 'utf8'));
const recipes = recipesData.recipes;
const categories = [...new Set(recipes.map(r => r.category))].sort();

console.log(`🚀 Building remaining static pages...`);

// Create directory structure for education
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

createDir('dist/education/gluten-free-basics');
createDir('dist/education/shopping-guide');
createDir('dist/education/label-reading');
createDir('dist/education/cross-contamination');
createDir('dist/education/substitutions');
createDir('dist/about');

// Base template function (same as before)
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
                ${categories.map(cat => `<a href="/category/${cat.toLowerCase().replace(/\\s+/g, '-')}/" class="text-light-text hover:text-warm-amber block px-3 py-2 rounded-md text-base font-medium">${cat}</a>`).join('')}
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
    <main class="pt-16">${content}</main>

    <!-- Footer -->
    <footer class="bg-dark-secondary border-t border-warm-amber/20 mt-16">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-playfair font-bold text-warm-amber mb-4">Unglued Food</h3>
                    <p class="text-muted-gray mb-4">Your trusted source for delicious gluten-free recipes.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-light-text mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="/recipes/" class="text-muted-gray hover:text-warm-amber">All Recipes</a></li>
                        ${categories.slice(0, 4).map(cat => `<li><a href="/category/${cat.toLowerCase().replace(/\\s+/g, '-')}/" class="text-muted-gray hover:text-warm-amber">${cat}</a></li>`).join('')}
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

// 1. Generate ALL RECIPES PAGE
console.log('📚 Generating All Recipes page...');
const allRecipesContent = `
<div class="max-w-7xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">All Gluten-Free Recipes</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">
            Explore our complete collection of ${recipes.length} delicious gluten-free recipes
        </p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-dark-secondary rounded-xl p-6 mb-8">
        <div class="space-y-4">
            <div class="relative">
                <i data-lucide="search" class="absolute left-3 top-3 h-4 w-4 text-muted-gray"></i>
                <input type="text" 
                       id="recipe-search" 
                       placeholder="Search recipes by name, ingredients, or tags..." 
                       class="w-full pl-10 pr-4 py-2 bg-dark-accent border border-muted-gray/20 rounded-lg text-light-text placeholder:text-muted-gray focus:border-warm-amber focus:outline-none">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select id="category-filter" class="bg-dark-accent border border-muted-gray/20 rounded-lg px-3 py-2 text-light-text focus:border-warm-amber focus:outline-none">
                    <option value="">All Categories</option>
                    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
                <select id="difficulty-filter" class="bg-dark-accent border border-muted-gray/20 rounded-lg px-3 py-2 text-light-text focus:border-warm-amber focus:outline-none">
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <select id="time-filter" class="bg-dark-accent border border-muted-gray/20 rounded-lg px-3 py-2 text-light-text focus:border-warm-amber focus:outline-none">
                    <option value="">All Times</option>
                    <option value="quick">Quick (≤30 min)</option>
                    <option value="medium">Medium (30-60 min)</option>
                    <option value="long">Long (60+ min)</option>
                </select>
                <button onclick="clearFilters()" class="bg-warm-amber text-dark-primary px-4 py-2 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                    Clear Filters
                </button>
            </div>
        </div>
    </div>

    <!-- Halloween Recipes Showcase -->
    <div class="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl p-8 mb-8">
        <div class="text-center">
            <h2 class="text-3xl font-bold text-white mb-4">🎃 Halloween Specials</h2>
            <p class="text-orange-100 mb-6">Spooky gluten-free treats perfect for the season!</p>
            <button onclick="filterHalloween()" class="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                View Halloween Recipes (${recipes.filter(r => r.tags && r.tags.some(tag => tag.toLowerCase().includes('halloween'))).length})
            </button>
        </div>
    </div>

    <!-- Recipe Grid -->
    <div id="recipe-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${recipes.map(recipe => createRecipeCard(recipe)).join('')}
    </div>

    <!-- No Results Message -->
    <div id="no-results" class="text-center py-12 hidden">
        <i data-lucide="search" class="h-16 w-16 text-muted-gray mx-auto mb-4"></i>
        <h3 class="text-xl font-semibold text-light-text mb-2">No recipes found</h3>
        <p class="text-muted-gray">Try adjusting your search terms or filters</p>
    </div>
</div>

<script>
    // Recipe data for filtering
    const allRecipes = ${JSON.stringify(recipes)};
    
    function createRecipeCard(recipe) {
        const isHalloween = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes('halloween'));
        return \`<div class="bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
        <div class="relative">
            <img src="\${recipe.image || '/images/placeholder-recipe.jpg'}" alt="\${recipe.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/images/placeholder-recipe.jpg'">
            <div class="absolute top-4 right-4">
                <span class="bg-warm-amber text-dark-primary px-2 py-1 rounded-full text-sm font-semibold">⭐ \${recipe.rating}</span>
            </div>
            \${isHalloween ? '<div class="absolute top-4 left-4"><span class="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">🎃 Halloween</span></div>' : ''}
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="bg-dark-accent text-warm-amber px-3 py-1 rounded-full text-sm">\${recipe.category}</span>
                <span class="text-muted-gray text-sm">\${recipe.difficulty}</span>
            </div>
            <h3 class="text-xl font-semibold text-light-text mb-2 group-hover:text-warm-amber transition-colors">
                <a href="/recipe/\${recipe.slug}/">\${recipe.title}</a>
            </h3>
            <p class="text-muted-gray text-sm mb-4 line-clamp-2">\${recipe.description}</p>
            <div class="flex items-center justify-between text-sm text-muted-gray">
                <span class="flex items-center"><i data-lucide="clock" class="h-4 w-4 mr-1"></i>\${recipe.totalTime || recipe.cookTime} mins</span>
                <span class="flex items-center"><i data-lucide="users" class="h-4 w-4 mr-1"></i>\${recipe.servings} servings</span>
            </div>
            <div class="mt-4 flex flex-wrap gap-1">
                \${recipe.tags ? recipe.tags.slice(0, 3).map(tag => \`<span class="bg-dark-accent text-warm-amber px-2 py-1 rounded text-xs">\${tag}</span>\`).join('') : ''}
            </div>
        </div>
    </div>\`;
    }
    
    function filterRecipes() {
        const search = document.getElementById('recipe-search').value.toLowerCase();
        const category = document.getElementById('category-filter').value;
        const difficulty = document.getElementById('difficulty-filter').value;
        const timeFilter = document.getElementById('time-filter').value;
        
        const filtered = allRecipes.filter(recipe => {
            const matchesSearch = !search || 
                recipe.title.toLowerCase().includes(search) ||
                recipe.description.toLowerCase().includes(search) ||
                (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(search))) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(search));
            
            const matchesCategory = !category || recipe.category === category;
            const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
            
            let matchesTime = true;
            if (timeFilter === 'quick') matchesTime = (recipe.totalTime || recipe.cookTime) <= 30;
            else if (timeFilter === 'medium') matchesTime = (recipe.totalTime || recipe.cookTime) > 30 && (recipe.totalTime || recipe.cookTime) <= 60;
            else if (timeFilter === 'long') matchesTime = (recipe.totalTime || recipe.cookTime) > 60;
            
            return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
        });
        
        displayRecipes(filtered);
    }
    
    function displayRecipes(recipesToShow) {
        const grid = document.getElementById('recipe-grid');
        const noResults = document.getElementById('no-results');
        
        if (recipesToShow.length === 0) {
            grid.classList.add('hidden');
            noResults.classList.remove('hidden');
        } else {
            grid.classList.remove('hidden');
            noResults.classList.add('hidden');
            
            grid.innerHTML = recipesToShow.map(recipe => createRecipeCard(recipe)).join('');
        }
        
        // Re-initialize Lucide icons
        lucide.createIcons();
    }
    
    function clearFilters() {
        document.getElementById('recipe-search').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('difficulty-filter').value = '';
        document.getElementById('time-filter').value = '';
        displayRecipes(allRecipes);
    }
    
    function filterHalloween() {
        document.getElementById('recipe-search').value = 'halloween';
        filterRecipes();
    }
    
    // Add event listeners
    document.getElementById('recipe-search').addEventListener('input', filterRecipes);
    document.getElementById('category-filter').addEventListener('change', filterRecipes);
    document.getElementById('difficulty-filter').addEventListener('change', filterRecipes);
    document.getElementById('time-filter').addEventListener('change', filterRecipes);
</script>`;

const allRecipesPage = createBaseTemplate(
    'All Gluten-Free Recipes - Unglued Food',
    `Browse all ${recipes.length} delicious gluten-free recipes. Find the perfect dish for any occasion.`,
    allRecipesContent,
    '/recipes/'
);

fs.writeFileSync('dist/recipes/index.html', allRecipesPage);

// 2. Generate CATEGORY PAGES
console.log('📂 Generating category pages...');
categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/\\s+/g, '-');
    const categoryRecipes = recipes.filter(r => r.category === category);
    
    const categoryContent = `
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">${category} Recipes</h1>
            <p class="text-muted-gray max-w-2xl mx-auto">
                Discover ${categoryRecipes.length} delicious gluten-free ${category.toLowerCase()} recipes
            </p>
        </div>

        <!-- Recipe Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${categoryRecipes.map(recipe => createRecipeCard(recipe)).join('')}
        </div>

        <!-- Back to All Recipes -->
        <div class="text-center mt-12">
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-6 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                View All Recipes
            </a>
        </div>
    </div>`;
    
    const categoryPage = createBaseTemplate(
        `${category} - Gluten-Free Recipes | Unglued Food`,
        `Discover ${categoryRecipes.length} delicious gluten-free ${category.toLowerCase()} recipes. Perfect for any meal or occasion.`,
        categoryContent,
        `/category/${categorySlug}/`
    );
    
    fs.writeFileSync(`dist/category/${categorySlug}/index.html`, categoryPage);
});

console.log(`✅ Generated ${categories.length} category pages`);

console.log('🎯 Phase 2 Complete: All Recipes + Category pages generated');
console.log('Next: Run part 3 to generate education and about pages...');
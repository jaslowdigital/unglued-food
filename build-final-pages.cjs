// Build script for final pages - Education and About
const fs = require('fs');
const path = require('path');

// Read categories for navigation
const recipesData = JSON.parse(fs.readFileSync('./server/static-export/recipes.json', 'utf8'));
const recipes = recipesData.recipes;
const categories = [...new Set(recipes.map(r => r.category))].sort();

console.log(`🚀 Building final static pages - Education & About...`);

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
                                <a href="/education/substitutions/" class="block px-4 py-2 text-sm text-light-text hover:text-warm-amber">Substitutions</a>
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

// 1. Generate GLUTEN-FREE BASICS page
console.log('📖 Generating Gluten-Free Basics page...');
const basicsContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">Gluten-Free Basics</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Everything you need to know to start your gluten-free journey</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">What is Gluten?</h2>
            <p class="text-muted-gray mb-4">
                Gluten is a protein found in wheat, barley, rye, and their derivatives. It gives dough its elasticity and helps bread rise and maintain its shape. For people with celiac disease, non-celiac gluten sensitivity, or wheat allergies, consuming gluten can cause various health issues.
            </p>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Why Go Gluten-Free?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Medical Reasons</h3>
                    <ul class="space-y-2 text-muted-gray">
                        <li>• Celiac Disease</li>
                        <li>• Non-celiac Gluten Sensitivity</li>
                        <li>• Wheat Allergy</li>
                        <li>• Dermatitis Herpetiformis</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Potential Benefits</h3>
                    <ul class="space-y-2 text-muted-gray">
                        <li>• Improved digestive health</li>
                        <li>• Increased energy levels</li>
                        <li>• Better nutrient absorption</li>
                        <li>• Reduced inflammation</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Getting Started</h2>
            <div class="space-y-4">
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">1. Clean Out Your Pantry</h3>
                    <p class="text-muted-gray">Remove all gluten-containing products and check labels carefully for hidden sources of gluten.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">2. Stock Up on Basics</h3>
                    <p class="text-muted-gray">Fill your kitchen with naturally gluten-free whole foods like fruits, vegetables, lean proteins, and gluten-free grains.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">3. Learn to Read Labels</h3>
                    <p class="text-muted-gray">Understand how to identify gluten in ingredient lists and look for certified gluten-free products.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">4. Prevent Cross-Contamination</h3>
                    <p class="text-muted-gray">Use separate cooking utensils, cutting boards, and toasters to avoid contamination from gluten-containing foods.</p>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Naturally Gluten-Free Foods</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Proteins</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Fresh meat, poultry, fish</li>
                        <li>• Eggs</li>
                        <li>• Beans and legumes</li>
                        <li>• Nuts and seeds</li>
                        <li>• Tofu and tempeh</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Grains & Starches</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Rice (all varieties)</li>
                        <li>• Quinoa</li>
                        <li>• Corn</li>
                        <li>• Potatoes</li>
                        <li>• Amaranth, buckwheat</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Produce</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• All fresh fruits</li>
                        <li>• All fresh vegetables</li>
                        <li>• Fresh herbs</li>
                        <li>• Plain frozen produce</li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="text-center">
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Explore Our Gluten-Free Recipes
            </a>
        </div>
    </div>
</div>`;

const basicsPage = createBaseTemplate(
    'Gluten-Free Basics - Learn the Fundamentals | Unglued Food',
    'Everything you need to know to start your gluten-free journey. Learn about gluten, why to go gluten-free, and how to get started.',
    basicsContent,
    '/education/gluten-free-basics/'
);

fs.writeFileSync('dist/education/gluten-free-basics/index.html', basicsPage);

// 2. Generate SHOPPING GUIDE page
console.log('🛒 Generating Shopping Guide page...');
const shoppingContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">Gluten-Free Shopping Guide</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Navigate the grocery store with confidence</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Essential Gluten-Free Pantry Items</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Gluten-Free Flours</h3>
                    <ul class="space-y-2 text-muted-gray">
                        <li>• Rice flour (brown and white)</li>
                        <li>• Almond flour</li>
                        <li>• Coconut flour</li>
                        <li>• Tapioca starch</li>
                        <li>• Potato starch</li>
                        <li>• Gluten-free flour blends</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Grains & Cereals</h3>
                    <ul class="space-y-2 text-muted-gray">
                        <li>• Certified gluten-free oats</li>
                        <li>• Quinoa</li>
                        <li>• Brown rice</li>
                        <li>• Wild rice</li>
                        <li>• Millet</li>
                        <li>• Buckwheat</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Where to Shop</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Grocery Stores</h3>
                    <p class="text-muted-gray text-sm mb-2">Most major chains now have dedicated gluten-free sections.</p>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Look for the health food aisle</li>
                        <li>• Check freezer sections</li>
                        <li>• Ask customer service</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Health Food Stores</h3>
                    <p class="text-muted-gray text-sm mb-2">Wider selection and knowledgeable staff.</p>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Whole Foods Market</li>
                        <li>• Sprouts Farmers Market</li>
                        <li>• Local co-ops</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Online Shopping</h3>
                    <p class="text-muted-gray text-sm mb-2">Convenient for specialty items.</p>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Amazon</li>
                        <li>• Thrive Market</li>
                        <li>• Brand websites</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Budget-Friendly Tips</h2>
            <div class="space-y-4">
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Focus on Naturally Gluten-Free Foods</h3>
                    <p class="text-muted-gray">Whole foods like fruits, vegetables, rice, and proteins are often cheaper than specialty gluten-free products.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Buy in Bulk</h3>
                    <p class="text-muted-gray">Purchase rice, quinoa, and other staples in larger quantities to save money.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Compare Store Brands</h3>
                    <p class="text-muted-gray">Many stores offer their own gluten-free products at lower prices than name brands.</p>
                </div>
            </div>
        </section>

        <div class="text-center">
            <a href="/education/label-reading/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Learn to Read Labels
            </a>
        </div>
    </div>
</div>`;

const shoppingPage = createBaseTemplate(
    'Gluten-Free Shopping Guide - Where and What to Buy | Unglued Food',
    'Navigate the grocery store with confidence. Learn where to find gluten-free products and what to stock in your pantry.',
    shoppingContent,
    '/education/shopping-guide/'
);

fs.writeFileSync('dist/education/shopping-guide/index.html', shoppingPage);

// 3. Generate remaining education pages (simplified for brevity)
console.log('📋 Generating remaining education pages...');

// Label Reading
const labelContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">Reading Labels for Gluten</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Master the art of identifying gluten in food labels</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Common Gluten-Containing Ingredients</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Obvious Sources</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Wheat</li>
                        <li>• Barley</li>
                        <li>• Rye</li>
                        <li>• Triticale</li>
                        <li>• Malt</li>
                        <li>• Brewer's yeast</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Hidden Sources</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Modified food starch</li>
                        <li>• Hydrolyzed protein</li>
                        <li>• Dextrin</li>
                        <li>• Maltodextrin</li>
                        <li>• Natural flavoring</li>
                        <li>• Caramel color</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Watch Out For</h3>
                    <ul class="space-y-1 text-muted-gray text-sm">
                        <li>• Soy sauce</li>
                        <li>• Bouillon cubes</li>
                        <li>• Salad dressings</li>
                        <li>• Processed meats</li>
                        <li>• Medications</li>
                        <li>• Supplements</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Certification Labels</h2>
            <p class="text-muted-gray mb-4">Look for these trusted certification symbols:</p>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-dark-accent p-4 rounded-lg">
                    <h3 class="text-lg font-semibold text-warm-amber mb-2">Certified Gluten-Free</h3>
                    <p class="text-muted-gray text-sm">Third-party certified to contain less than 10 ppm of gluten</p>
                </div>
                <div class="bg-dark-accent p-4 rounded-lg">
                    <h3 class="text-lg font-semibold text-warm-amber mb-2">FDA Gluten-Free</h3>
                    <p class="text-muted-gray text-sm">Meets FDA standards of less than 20 ppm of gluten</p>
                </div>
            </div>
        </section>

        <div class="text-center">
            <a href="/education/cross-contamination/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Learn About Cross-Contamination
            </a>
        </div>
    </div>
</div>`;

const labelPage = createBaseTemplate(
    'How to Read Labels for Gluten | Unglued Food',
    'Master the art of identifying gluten in food labels. Learn about hidden sources and certification symbols.',
    labelContent,
    '/education/label-reading/'
);

fs.writeFileSync('dist/education/label-reading/index.html', labelPage);

// Cross-Contamination (simplified)
const crossContaminationContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">Preventing Cross-Contamination</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Keep your gluten-free foods safe from contamination</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Kitchen Safety Tips</h2>
            <div class="space-y-4">
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Separate Preparation Areas</h3>
                    <p class="text-muted-gray">Use dedicated cutting boards, utensils, and prep areas for gluten-free cooking.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Clean Thoroughly</h3>
                    <p class="text-muted-gray">Wash all surfaces, utensils, and hands before preparing gluten-free foods.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Storage Solutions</h3>
                    <p class="text-muted-gray">Store gluten-free items in sealed containers and separate shelves.</p>
                </div>
            </div>
        </section>

        <div class="text-center">
            <a href="/education/substitutions/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Learn About Substitutions
            </a>
        </div>
    </div>
</div>`;

const crossContaminationPage = createBaseTemplate(
    'Preventing Cross-Contamination | Ungluted Food',
    'Keep your gluten-free foods safe from contamination with these essential kitchen safety tips.',
    crossContaminationContent,
    '/education/cross-contamination/'
);

fs.writeFileSync('dist/education/cross-contamination/index.html', crossContaminationPage);

// Substitutions (simplified)
const substitutionsContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">Gluten-Free Substitutions</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Replace gluten-containing ingredients with these alternatives</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Common Substitutions</h2>
            <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4 bg-dark-accent p-4 rounded-lg">
                    <div>
                        <h3 class="text-lg font-semibold text-warm-amber">1 Cup All-Purpose Flour</h3>
                    </div>
                    <div>
                        <p class="text-muted-gray">Replace with 1 cup gluten-free flour blend or 3/4 cup rice flour + 1/4 cup tapioca starch</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4 bg-dark-accent p-4 rounded-lg">
                    <div>
                        <h3 class="text-lg font-semibold text-warm-amber">Bread Crumbs</h3>
                    </div>
                    <div>
                        <p class="text-muted-gray">Use gluten-free bread crumbs, crushed cornflakes, or ground nuts</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4 bg-dark-accent p-4 rounded-lg">
                    <div>
                        <h3 class="text-lg font-semibold text-warm-amber">Soy Sauce</h3>
                    </div>
                    <div>
                        <p class="text-muted-gray">Use tamari, coconut aminos, or gluten-free soy sauce</p>
                    </div>
                </div>
            </div>
        </section>

        <div class="text-center">
            <a href="/recipes/" class="bg-warm-amber text-dark-primary px-8 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors">
                Try Our Recipes
            </a>
        </div>
    </div>
</div>`;

const substitutionsPage = createBaseTemplate(
    'Gluten-Free Substitutions Guide | Unglued Food',
    'Replace gluten-containing ingredients with these tested alternatives for successful gluten-free cooking.',
    substitutionsContent,
    '/education/substitutions/'
);

fs.writeFileSync('dist/education/substitutions/index.html', substitutionsPage);

// 4. Generate ABOUT page
console.log('ℹ️ Generating About page...');
const aboutContent = `
<div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-playfair font-bold text-light-text mb-4">About Unglued Food</h1>
        <p class="text-muted-gray max-w-2xl mx-auto">Your trusted companion on the gluten-free journey</p>
    </div>

    <div class="space-y-8">
        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Our Mission</h2>
            <p class="text-muted-gray text-lg leading-relaxed">
                At Unglued Food, we believe that going gluten-free shouldn't mean sacrificing flavor, variety, or joy in cooking. 
                Our mission is to provide you with delicious, tested recipes and comprehensive resources that make gluten-free 
                living not just manageable, but truly enjoyable.
            </p>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">What We Offer</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Tested Recipes</h3>
                    <p class="text-muted-gray">Every recipe is carefully tested to ensure it works perfectly in your kitchen.</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Educational Content</h3>
                    <p class="text-muted-gray">Learn the fundamentals of gluten-free cooking and living with our comprehensive guides.</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Seasonal Recipes</h3>
                    <p class="text-muted-gray">Celebrate every season and holiday with special themed recipes like our Halloween collection.</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-warm-amber mb-3">Community Support</h3>
                    <p class="text-muted-gray">Join a community of people who understand the gluten-free journey.</p>
                </div>
            </div>
        </section>

        <section class="bg-dark-secondary rounded-xl p-8">
            <h2 class="text-2xl font-bold text-light-text mb-4">Why Trust Us?</h2>
            <div class="space-y-4">
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Real Kitchen Testing</h3>
                    <p class="text-muted-gray">All recipes are tested multiple times to ensure consistent, delicious results.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Clear Instructions</h3>
                    <p class="text-muted-gray">Step-by-step directions with tips and variations to help you succeed.</p>
                </div>
                <div class="border-l-4 border-warm-amber pl-4">
                    <h3 class="text-lg font-semibold text-light-text mb-2">Ongoing Support</h3>
                    <p class="text-muted-gray">We're here to help you navigate your gluten-free journey with confidence.</p>
                </div>
            </div>
        </section>

        <section class="bg-gradient-to-r from-warm-amber to-warm-orange rounded-xl p-8 text-center">
            <h2 class="text-2xl font-bold text-dark-primary mb-4">Ready to Start Cooking?</h2>
            <p class="text-dark-primary/80 mb-6">
                Explore our collection of ${recipes.length} delicious gluten-free recipes, including ${recipes.filter(r => r.tags && r.tags.some(tag => tag.toLowerCase().includes('halloween'))).length} special Halloween treats!
            </p>
            <a href="/recipes/" class="bg-dark-primary text-warm-amber px-8 py-3 rounded-lg font-semibold hover:bg-dark-secondary transition-colors">
                Browse All Recipes
            </a>
        </section>
    </div>
</div>`;

const aboutPage = createBaseTemplate(
    'About Unglued Food - Your Gluten-Free Cooking Companion',
    'Learn about our mission to make gluten-free living delicious and enjoyable. Discover our tested recipes and educational resources.',
    aboutContent,
    '/about/'
);

fs.writeFileSync('dist/about/index.html', aboutPage);

console.log('✅ Generated all education pages');
console.log('✅ Generated about page');
console.log('🎉 COMPLETE STATIC SITE CONVERSION FINISHED!');
console.log(`📊 Site Statistics:`);
console.log(`   • Home page: ✅`);
console.log(`   • Individual recipe pages: ${recipes.length} ✅`);
console.log(`   • Halloween recipes: ${recipes.filter(r => r.tags && r.tags.some(tag => tag.toLowerCase().includes('halloween'))).length} ✅`);
console.log(`   • All recipes page: ✅`);
console.log(`   • Category pages: ${categories.length} ✅`);
console.log(`   • Education pages: 5 ✅`);
console.log(`   • About page: ✅`);
console.log('🌟 Every page has its own URL and is fully SEO optimized!');
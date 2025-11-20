import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import type { Recipe } from '@shared/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateRecipeHTML(recipe: Recipe): string {
  const metaTitle = `${recipe.title} | Unglued Food`;
  const metaDescription = recipe.description;
  const imageUrl = recipe.image?.startsWith('http') 
    ? recipe.image 
    : `https://ungluedfood.com${recipe.image}`;
  
  const recipeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Unglued Food"
    },
    "datePublished": recipe.createdAt,
    "prepTime": `PT${recipe.prepTime}M`,
    "cookTime": `PT${recipe.cookTime}M`,
    "totalTime": `PT${recipe.totalTime || (recipe.prepTime + recipe.cookTime)}M`,
    "recipeYield": `${recipe.servings} servings`,
    "recipeCategory": recipe.category,
    "recipeCuisine": "Gluten-Free",
    "keywords": recipe.tags.join(', '),
    ...(recipe.nutrition ? {
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": `${recipe.nutrition.calories} calories`,
        "proteinContent": `${recipe.nutrition.protein}g`,
        "carbohydrateContent": `${recipe.nutrition.carbs}g`,
        "fatContent": `${recipe.nutrition.fat}g`,
        "fiberContent": `${recipe.nutrition.fiber}g`
      }
    } : {}),
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": instruction
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating || "5.0",
      "reviewCount": "1"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metaTitle}</title>
  <meta name="description" content="${metaDescription}">
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${metaTitle}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="https://ungluedfood.com/recipe/${recipe.slug}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Unglued Food">
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaTitle}">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://ungluedfood.com/recipe/${recipe.slug}">
  
  <!-- Recipe Structured Data -->
  <script type="application/ld+json">
    ${JSON.stringify(recipeStructuredData, null, 2)}
  </script>
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/index.css">
  
  <script type="module" crossorigin src="/assets/index.js" defer></script>
</head>
<body>
  <div id="root" data-recipe-slug="${recipe.slug}">
    <!-- Static content for SEO -->
    <div class="min-h-screen bg-dark-primary text-light-text">
      <div class="container mx-auto px-4 py-8 pt-24">
        <article>
          <h1 class="text-4xl font-bold mb-4">${recipe.title}</h1>
          <img src="${imageUrl}" alt="${recipe.title}" class="w-full h-96 object-cover rounded-lg mb-6" />
          <p class="text-lg text-gray-300 mb-6">${recipe.longDescription || recipe.description}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 class="text-2xl font-bold mb-4">Ingredients</h2>
              <ul class="list-disc pl-6 space-y-2">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('\n                ')}
              </ul>
            </div>
            
            <div>
              <h3 class="text-xl font-bold mb-3">Recipe Info</h3>
              <ul class="space-y-2">
                <li>⏱️ Prep: ${recipe.prepTime} mins</li>
                <li>🔥 Cook: ${recipe.cookTime} mins</li>
                <li>👥 Servings: ${recipe.servings}</li>
                <li>📊 Difficulty: ${recipe.difficulty}</li>
                <li>⭐ Rating: ${recipe.rating}</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Instructions</h2>
            <ol class="list-decimal pl-6 space-y-3">
              ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('\n              ')}
            </ol>
          </div>
          
          ${recipe.nutrition ? `
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-3">Nutrition (per serving)</h3>
            <ul class="space-y-1">
              <li>Calories: ${recipe.nutrition.calories}</li>
              <li>Protein: ${recipe.nutrition.protein}g</li>
              <li>Carbs: ${recipe.nutrition.carbs}g</li>
              <li>Fat: ${recipe.nutrition.fat}g</li>
              <li>Fiber: ${recipe.nutrition.fiber}g</li>
            </ul>
          </div>
          ` : ''}
          
          ${recipe.tips ? `
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-3">Tips</h3>
            <p class="text-gray-300">${recipe.tips}</p>
          </div>
          ` : ''}
          
          ${recipe.variations ? `
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-3">Variations</h3>
            <p class="text-gray-300">${recipe.variations}</p>
          </div>
          ` : ''}
        </article>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function generateRecipePages(recipes: Recipe[], outputDir: string) {
  console.log(`\nGenerating static HTML for ${recipes.length} recipes...`);
  
  const recipeOutputDir = join(outputDir, 'recipe');
  await fs.mkdir(recipeOutputDir, { recursive: true });
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    try {
      const html = generateRecipeHTML(recipe);
      const recipePath = join(recipeOutputDir, recipe.slug);
      await fs.mkdir(recipePath, { recursive: true });
      await fs.writeFile(join(recipePath, 'index.html'), html, 'utf-8');
      
      successCount++;
      
      if ((i + 1) % 50 === 0 || (i + 1) === recipes.length) {
        console.log(`  ✓ Generated ${i + 1}/${recipes.length} pages (${successCount} successful, ${errorCount} errors)`);
      }
    } catch (error) {
      errorCount++;
      console.error(`  ✗ Error generating ${recipe.slug}:`, error);
    }
  }
  
  console.log(`\n✅ Static generation complete!`);
  console.log(`  Success: ${successCount} pages`);
  console.log(`  Errors: ${errorCount} pages`);
  
  return { successCount, errorCount };
}

export async function generateHomePage(outputDir: string) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unglued Food - Delicious Gluten-Free Recipes</title>
  <meta name="description" content="Discover 791+ delicious gluten-free recipes including desserts, breads, entrees, and more. Your ultimate guide to gluten-free cooking and baking.">
  
  <meta property="og:title" content="Unglued Food - Delicious Gluten-Free Recipes">
  <meta property="og:description" content="Discover 791+ delicious gluten-free recipes including desserts, breads, entrees, and more.">
  <meta property="og:url" content="https://ungluedfood.com">
  <meta property="og:type" content="website">
  
  <link rel="canonical" href="https://ungluedfood.com">
  <link rel="stylesheet" href="/assets/index.css">
  <script type="module" crossorigin src="/assets/index.js" defer></script>
</head>
<body>
  <div id="root" data-page="home">
    <div class="min-h-screen bg-dark-primary text-light-text">
      <h1 class="sr-only">Unglued Food - Gluten-Free Recipes</h1>
      <p class="sr-only">Browse our collection of 791+ gluten-free recipes for every meal and occasion.</p>
    </div>
  </div>
</body>
</html>`;
  
  await fs.writeFile(join(outputDir, 'index.html'), html, 'utf-8');
  console.log('  ✓ Generated homepage');
}

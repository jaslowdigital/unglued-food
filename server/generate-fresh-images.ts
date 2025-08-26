import { generateRecipeImage } from './openai';
import * as fs from 'fs';
import glutenFreeRecipes100 from './gluten-free-recipes-100';

// Generate fresh images for the most important recipes (first page that users see)
const recipesToUpdate = [
  "fluffy-blueberry-pancakes",
  "mediterranean-chickpea-power-bowl", 
  "thai-coconut-curry-shrimp",
  "decadent-chocolate-lava-cake",
  "savory-spinach-and-feta-quiche",
  "crispy-parmesan-zucchini-chips",
  "herb-crusted-salmon-with-lemon-butter",
  "new-york-style-cheesecake",
  "asian-lettuce-wraps",
  "overnight-chia-pudding-parfait",
  "stuffed-bell-peppers",
  "flourless-peanut-butter-cookies"
];

console.log(`\n🎨 Generating fresh AI images for ${recipesToUpdate.length} key recipes...`);
console.log(`These images will have new URLs that won't expire for 2 hours.\n`);

async function generateFreshImages() {
  const freshImages: Record<string, string> = {};
  let successCount = 0;
  
  for (const slug of recipesToUpdate) {
    const recipe = glutenFreeRecipes100.find(r => r.slug === slug);
    if (!recipe) {
      console.log(`❌ Recipe not found: ${slug}`);
      continue;
    }
    
    try {
      console.log(`[${successCount + 1}/${recipesToUpdate.length}] Generating: ${recipe.title}`);
      
      const description = `${recipe.category} dish: ${recipe.description}. Professional food photography, appetizing presentation, natural lighting, vibrant colors, high quality`;
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        freshImages[slug] = imageUrl;
        successCount++;
        console.log(`✅ Success! Fresh image generated`);
        console.log(`   URL (valid for 2 hours): ${imageUrl.substring(0, 60)}...\n`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`❌ Error generating image for ${recipe.title}:`, error);
      
      // If rate limited, wait longer
      if (error instanceof Error && error.message.includes('rate')) {
        console.log('⏳ Rate limit detected, waiting 30 seconds...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }
  
  console.log(`\n✅ Generated ${successCount} fresh images`);
  
  // Update the recipes file with fresh images
  const updatedRecipes = glutenFreeRecipes100.map(recipe => {
    if (freshImages[recipe.slug]) {
      return {
        ...recipe,
        image: freshImages[recipe.slug]
      };
    }
    return recipe;
  });
  
  // Save updated recipes
  const tsContent = `// Auto-generated file with fresh AI images
// Generated at: ${new Date().toISOString()}
import type { InsertRecipe } from '../shared/schema';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const glutenFreeRecipes100Updated: InsertRecipe[] = ${JSON.stringify(updatedRecipes, null, 2)};

export function getRecipeBySlug(slug: string): InsertRecipe | undefined {
  return glutenFreeRecipes100Updated.find(recipe => recipe.slug === slug);
}

export default glutenFreeRecipes100Updated;
`;
  
  fs.writeFileSync('gluten-free-recipes-100-fresh.ts', tsContent);
  console.log('📁 Fresh recipes saved to gluten-free-recipes-100-fresh.ts');
  
  // Also save the fresh images for reference
  fs.writeFileSync('fresh-images.json', JSON.stringify({
    generated: freshImages,
    count: successCount,
    timestamp: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  }, null, 2));
  
  return freshImages;
}

// Execute
generateFreshImages()
  .then((images) => {
    console.log(`\n✨ Fresh images generated for ${Object.keys(images).length} recipes`);
    console.log('⏰ These URLs will be valid for the next 2 hours');
    console.log('\n💡 To use these images, copy gluten-free-recipes-100-fresh.ts to gluten-free-recipes-100.ts');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
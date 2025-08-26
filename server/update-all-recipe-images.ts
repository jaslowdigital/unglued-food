import * as fs from 'fs';
import glutenFreeRecipes100 from './gluten-free-recipes-100';

// Collect all generated images from various progress files
const allGeneratedImages: Record<string, string> = {};

// Read all progress files to compile complete list of images
const progressFiles = fs.readdirSync('.').filter(f => 
  f.includes('progress') || f.includes('complete') || f.includes('COMPLETE')
).filter(f => f.endsWith('.json'));

console.log(`Found ${progressFiles.length} progress files to process\n`);

for (const file of progressFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Handle different data structures
    if (data.generated) {
      Object.assign(allGeneratedImages, data.generated);
    }
    if (data.generatedImages) {
      Object.assign(allGeneratedImages, data.generatedImages);
    }
    if (data.generatedInThisBatch) {
      Object.assign(allGeneratedImages, data.generatedInThisBatch);
    }
    if (data.newlyGenerated) {
      Object.assign(allGeneratedImages, data.newlyGenerated);
    }
    if (data.lastBatchGenerated) {
      Object.assign(allGeneratedImages, data.lastBatchGenerated);
    }
    if (data.finalBatchImages) {
      Object.assign(allGeneratedImages, data.finalBatchImages);
    }
    
    console.log(`✅ Processed ${file}: Found images for recipes`);
  } catch (error) {
    console.log(`⚠️ Could not process ${file}`);
  }
}

console.log(`\n📊 Total unique images collected: ${Object.keys(allGeneratedImages).length}`);

// Get all recipes and update with images
const recipes = glutenFreeRecipes100;
let updatedCount = 0;
let alreadyHadImage = 0;
let noImageFound = 0;

// Track which images we've successfully mapped
const imageMapping: Record<string, { title: string, image: string }> = {};

for (const recipe of recipes) {
  if (allGeneratedImages[recipe.slug]) {
    if (!recipe.image || recipe.image.startsWith('/images/')) {
      recipe.image = allGeneratedImages[recipe.slug];
      updatedCount++;
      imageMapping[recipe.slug] = {
        title: recipe.title,
        image: recipe.image
      };
    } else {
      alreadyHadImage++;
    }
  } else if (!recipe.image || recipe.image.startsWith('/images/')) {
    noImageFound++;
    console.log(`⚠️ No image found for: ${recipe.title} (${recipe.slug})`);
  }
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('📊 UPDATE SUMMARY');
console.log('='.repeat(70));
console.log(`✅ Recipes updated with new images: ${updatedCount}`);
console.log(`📸 Recipes that already had AI images: ${alreadyHadImage}`);
console.log(`❓ Recipes without images: ${noImageFound}`);
console.log(`📊 Total recipes with AI images: ${updatedCount + alreadyHadImage}/100`);

// Save the complete mapping
fs.writeFileSync('complete-recipe-images-mapping.json', JSON.stringify({
  totalRecipesWithImages: updatedCount + alreadyHadImage,
  imageMapping,
  summary: {
    updated: updatedCount,
    alreadyHad: alreadyHadImage,
    missing: noImageFound,
    completionRate: ((updatedCount + alreadyHadImage) / 100 * 100).toFixed(1) + '%'
  },
  timestamp: new Date().toISOString()
}, null, 2));

console.log('\n📁 Complete image mapping saved to complete-recipe-images-mapping.json');

// Export the updated recipes for use in the application
export function getAllRecipesWithAIImages() {
  return recipes;
}

// Also save to a TypeScript file that can be imported
const tsContent = `// Auto-generated file with all 100 recipes and their AI images
import type { Recipe } from '../shared/schema';

export const allRecipesWithAIImages: Recipe[] = ${JSON.stringify(recipes, null, 2)};

export function getAllRecipesWithAIImages(): Recipe[] {
  return allRecipesWithAIImages;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipesWithAIImages.find(r => r.slug === slug);
}
`;

fs.writeFileSync('all-100-recipes-with-ai-images.ts', tsContent);
console.log('📁 TypeScript file saved: all-100-recipes-with-ai-images.ts');
console.log('\n✨ All recipes have been updated with AI-generated images!');
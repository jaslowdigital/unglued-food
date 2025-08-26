import { generateRecipeImage } from './openai';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';
import { additionalRecipes, generateRemainingRecipes } from './additional-recipes';
import * as fs from 'fs';

// Combine all recipes to get to 100
const existingCount = glutenFreeRecipes100.length;
const additionalCount = additionalRecipes.length;
const remainingNeeded = 100 - existingCount - additionalCount;

console.log(`Existing recipes: ${existingCount}`);
console.log(`Additional recipes: ${additionalCount}`);
console.log(`Remaining needed: ${remainingNeeded}`);

// Combine all recipes
const allRecipes = [
  ...glutenFreeRecipes100,
  ...additionalRecipes,
  ...(remainingNeeded > 0 ? generateRemainingRecipes().slice(0, remainingNeeded) : [])
];

console.log(`Total recipes to process: ${allRecipes.length}`);

// Track which recipes already have generated images
const existingImages = new Set([
  "fluffy-blueberry-pancakes",
  "chicken-zucchini-pasta",
  "quinoa-chocolate-chip-cookies",
  "lentil-vegetable-curry",
  "coconut-flour-banana-bread",
  "mediterranean-chickpea-salad",
  "almond-crusted-salmon",
  "spinach-feta-quiche",
  "chocolate-chip-muffins",
  "asian-lettuce-wraps",
  "stuffed-bell-peppers",
  "flourless-peanut-butter-cookies",
  "mexican-quinoa-salad",
  "sweet-potato-hummus",
  "chicken-pad-thai",
  "veggie-packed-frittata",
  "almond-flour-brownies",
  "vietnamese-spring-rolls",
  "beef-and-broccoli-stir-fry",
  "baked-coconut-shrimp",
  "gluten-free-beef-wellington",
  "ultimate-gluten-free-mac-and-cheese",
  "classic-gluten-free-gingerbread-cookies"
]);

async function generateBatchImages(recipes: any[], batchName: string) {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  console.log(`\n=== Starting Batch: ${batchName} ===`);
  console.log(`Processing ${recipes.length} recipes...\n`);
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // Skip if already has an image
    if (existingImages.has(recipe.slug)) {
      console.log(`⏭️  Skipping (already has image): ${recipe.title}`);
      skipCount++;
      continue;
    }
    
    try {
      const ingredientsArray = Array.isArray(recipe.ingredients) 
        ? recipe.ingredients 
        : ["fresh ingredients", "herbs", "spices"];
        
      const imageDescription = `${recipe.category} dish: ${recipe.description}. Professional food photography, appetizing presentation`;
      
      console.log(`[${i+1}/${recipes.length}] Generating: ${recipe.title}`);
      const imageUrl = await generateRecipeImage(recipe.title, imageDescription);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ Success! URL: ${imageUrl.substring(0, 50)}...`);
      } else {
        errorCount++;
        console.log(`❌ Failed to generate image`);
      }
      
      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Log progress every 5 images
      if ((i + 1) % 5 === 0) {
        console.log(`\n--- Progress: ${successCount} generated, ${skipCount} skipped, ${errorCount} errors ---\n`);
      }
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error for ${recipe.title}:`, error);
      
      // If we hit rate limit, wait longer
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage && errorMessage.includes('rate')) {
        console.log('Rate limit detected, waiting 30 seconds...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }
  
  console.log(`\n=== Batch Complete: ${batchName} ===`);
  console.log(`✅ Generated: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`Total processed: ${recipes.length}\n`);
  
  return generatedImages;
}

async function generateAllImages() {
  const allGeneratedImages: Record<string, string> = {};
  const batchSize = 10;
  const startFrom = 23; // We've already done 0-23
  
  console.log(`\n🚀 Starting image generation for recipes ${startFrom} to ${allRecipes.length}`);
  console.log(`Batch size: ${batchSize}`);
  console.log(`Already generated: ${existingImages.size} images\n`);
  
  // Process in batches
  for (let i = startFrom; i < allRecipes.length; i += batchSize) {
    const batch = allRecipes.slice(i, Math.min(i + batchSize, allRecipes.length));
    const batchName = `Recipes ${i + 1}-${Math.min(i + batchSize, allRecipes.length)}`;
    
    const batchImages = await generateBatchImages(batch, batchName);
    Object.assign(allGeneratedImages, batchImages);
    
    // Save progress after each batch
    const progressFile = `generated-images-progress-${Date.now()}.json`;
    fs.writeFileSync(progressFile, JSON.stringify(allGeneratedImages, null, 2));
    console.log(`💾 Progress saved to ${progressFile}`);
    
    // Wait between batches to avoid rate limits
    if (i + batchSize < allRecipes.length) {
      console.log('\n⏳ Waiting 10 seconds before next batch...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 IMAGE GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`Total new images generated: ${Object.keys(allGeneratedImages).length}`);
  console.log(`Previously generated: ${existingImages.size}`);
  console.log(`Grand total: ${Object.keys(allGeneratedImages).length + existingImages.size}`);
  
  // Save final results
  const finalFile = 'all-generated-images.json';
  fs.writeFileSync(finalFile, JSON.stringify(allGeneratedImages, null, 2));
  console.log(`\n📁 All generated images saved to ${finalFile}`);
  
  return allGeneratedImages;
}

// Run the generation
generateAllImages()
  .then(() => {
    console.log('\n✨ All done! Images generated successfully.');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
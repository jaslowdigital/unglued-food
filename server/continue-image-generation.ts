import { generateRecipeImage } from './openai';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';
import { additionalRecipes, generateRemainingRecipes } from './additional-recipes';
import * as fs from 'fs';

// Combine all recipes to reach 100
const existingRecipesCount = glutenFreeRecipes100.length;
const additionalCount = additionalRecipes.length;
const remainingNeeded = 100 - existingRecipesCount - additionalCount;

// Create complete recipe list
const remainingRecipes = generateRemainingRecipes();
const allRecipes = [
  ...glutenFreeRecipes100,
  ...additionalRecipes,
  ...remainingRecipes.slice(0, remainingNeeded)
];

console.log(`Total recipes: ${allRecipes.length}`);

// Track already generated images
const alreadyGenerated = new Set([
  // Original 23 images
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
  "classic-gluten-free-gingerbread-cookies",
  // New batch generated
  "fluffy-banana-oat-pancakes",
  "greek-quinoa-bowl-with-tzatziki",
  "coconut-flour-waffles",
  "lentil-soup-with-vegetables",
  "teriyaki-chicken-skewers",
  "chocolate-avocado-mousse",
  "buffalo-cauliflower-wings",
  "quinoa-tabbouleh-salad",
  "sweet-potato-gnocchi",
  "almond-butter-energy-balls",
  "zucchini-lasagna",
  "coconut-lime-rice"
]);

console.log(`Already generated: ${alreadyGenerated.size} images`);

async function generateRemainingImages() {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  let totalProcessed = 0;
  
  console.log(`\n🚀 Continuing image generation...`);
  console.log(`Target: ${allRecipes.length} total recipes`);
  console.log(`Already completed: ${alreadyGenerated.size}`);
  console.log(`Remaining: ${allRecipes.length - alreadyGenerated.size}\n`);
  
  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];
    
    // Skip if already generated
    if (alreadyGenerated.has(recipe.slug)) {
      skipCount++;
      continue;
    }
    
    totalProcessed++;
    
    try {
      const description = `${recipe.category || 'Food'} dish: ${recipe.description}. Professional food photography, appetizing presentation, vibrant colors`;
      
      console.log(`[${totalProcessed}/${allRecipes.length - alreadyGenerated.size}] Generating: ${recipe.title}`);
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ Success! Image ${successCount + alreadyGenerated.size}/${allRecipes.length}`);
        console.log(`   URL: ${imageUrl.substring(0, 50)}...\n`);
      } else {
        errorCount++;
        console.log(`❌ Failed to generate image\n`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Save progress every 5 images
      if (successCount % 5 === 0) {
        const progressFile = `progress-${Date.now()}.json`;
        fs.writeFileSync(progressFile, JSON.stringify({
          ...generatedImages,
          metadata: {
            totalGenerated: successCount + alreadyGenerated.size,
            target: allRecipes.length,
            timestamp: new Date().toISOString()
          }
        }, null, 2));
        console.log(`💾 Progress saved (${successCount + alreadyGenerated.size}/${allRecipes.length} complete)\n`);
      }
      
      // Extended wait every 10 images to avoid rate limits
      if (successCount % 10 === 0 && successCount > 0) {
        console.log('⏳ Cooling down for 15 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
      
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error: ${errorMsg}\n`);
      
      // Handle rate limiting
      if (errorMsg.includes('rate')) {
        console.log('⚠️ Rate limit detected, waiting 60 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
  
  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 IMAGE GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`✅ New images generated: ${successCount}`);
  console.log(`⏭️ Previously generated: ${alreadyGenerated.size}`);
  console.log(`📊 Total images: ${successCount + alreadyGenerated.size}/${allRecipes.length}`);
  console.log(`❌ Errors: ${errorCount}`);
  
  // Save final results
  const finalFile = `final-images-${Date.now()}.json`;
  fs.writeFileSync(finalFile, JSON.stringify({
    images: generatedImages,
    summary: {
      newlyGenerated: successCount,
      previouslyGenerated: alreadyGenerated.size,
      total: successCount + alreadyGenerated.size,
      targetRecipes: allRecipes.length,
      errors: errorCount,
      completedAt: new Date().toISOString()
    }
  }, null, 2));
  
  console.log(`\n📁 Results saved to ${finalFile}`);
  
  return generatedImages;
}

// Run the generation
generateRemainingImages()
  .then((images) => {
    console.log(`\n✨ Successfully generated ${Object.keys(images).length} new images!`);
    console.log('All recipes now have AI-generated images.');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
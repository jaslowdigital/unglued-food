import { generateRecipeImage } from './openai';
import * as fs from 'fs';

// The FINAL 5 recipes to complete our 100 recipe goal (96-100)
const final5Recipes = [
  { title: "Pumpkin Spice Muffins", slug: "pumpkin-spice-muffins", description: "Moist fall muffins with cinnamon sugar topping and pumpkin puree", category: "Breakfast" },
  { title: "Thai Green Curry", slug: "thai-green-curry", description: "Fragrant coconut curry with vegetables, basil and lime", category: "Dinner" },
  { title: "Chocolate Chip Scones", slug: "chocolate-chip-scones", description: "British-style scones with dark chocolate chunks and clotted cream", category: "Breakfast" },
  { title: "Ratatouille", slug: "ratatouille", description: "Classic French Provençal vegetable stew with eggplant, zucchini and tomatoes", category: "Dinner" },
  { title: "Mango Sticky Rice", slug: "mango-sticky-rice", description: "Thai dessert with sweet coconut sticky rice and fresh ripe mango slices", category: "Desserts" }
];

console.log(`\n🏆 THE FINAL COUNTDOWN: Generating images for recipes 96-100`);
console.log(`Just 5 more recipes to complete our 100 recipe goal!\n`);

async function completeFinal5() {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let errorCount = 0;
  const startingNumber = 95; // We've completed 95 already
  
  console.log('Starting final batch...\n');
  
  for (let i = 0; i < final5Recipes.length; i++) {
    const recipe = final5Recipes[i];
    const recipeNumber = startingNumber + i + 1;
    
    try {
      const description = `${recipe.category}: ${recipe.description}. Professional food photography, appetizing presentation, natural lighting, vibrant colors, high quality, magazine style`;
      
      console.log(`[${recipeNumber}/100] Generating: ${recipe.title}`);
      console.log(`   Category: ${recipe.category}`);
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ SUCCESS! Recipe #${recipeNumber} of 100 complete`);
        console.log(`   URL: ${imageUrl}`);
        
        // Countdown excitement
        const remaining = 100 - recipeNumber;
        if (remaining > 0) {
          console.log(`   🎯 Only ${remaining} more to go!\n`);
        }
        
        // THE BIG MOMENT
        if (recipeNumber === 100) {
          console.log('\n' + '🎊'.repeat(30));
          console.log(' '.repeat(10) + '🏆 100 RECIPES COMPLETE! 🏆');
          console.log('🎊'.repeat(30));
          console.log('\n🎉 CONGRATULATIONS! ALL 100 GLUTEN-FREE RECIPES NOW HAVE AI-GENERATED IMAGES! 🎉\n');
        }
      } else {
        errorCount++;
        console.log(`❌ Failed to generate image for recipe #${recipeNumber}\n`);
      }
      
      // Rate limiting - 3 seconds between each request
      if (i < final5Recipes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error on recipe #${recipeNumber}: ${errorMsg}\n`);
      
      // Handle rate limiting
      if (errorMsg.includes('rate')) {
        console.log('⚠️ Rate limit. Waiting 60 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
        // Retry
        i--;
        continue;
      }
    }
  }
  
  // Final celebration
  const totalCompleted = startingNumber + successCount;
  
  console.log('\n' + '='.repeat(80));
  console.log(' '.repeat(20) + '🏆 PROJECT COMPLETE 🏆');
  console.log('='.repeat(80));
  
  if (totalCompleted === 100) {
    console.log('\n🎊 ACHIEVEMENT UNLOCKED: 100 RECIPES WITH AI IMAGES! 🎊\n');
    console.log('📊 Final Statistics:');
    console.log(`   ✅ Total recipes with images: ${totalCompleted}/100`);
    console.log(`   🎯 Project completion: 100%`);
    console.log(`   📸 All images: Professional AI-generated food photography`);
    console.log(`   🚀 Status: Ready for deployment!\n`);
    
    console.log('🌟 Project Features Completed:');
    console.log('   • 100 unique gluten-free recipes');
    console.log('   • Individual page for each recipe with SEO-optimized URLs');
    console.log('   • Professional AI-generated DALL-E images for every recipe');
    console.log('   • Full SEO optimization with meta tags and structured data');
    console.log('   • AI training permissions enabled');
    console.log('   • Dark theme design with amber accents');
    console.log('   • Recipe filtering by category');
    console.log('   • Newsletter subscription system');
    console.log('   • Responsive mobile-first design\n');
  }
  
  // Save final completion report
  const completionReport = {
    projectName: "Unglued Food - 100 Gluten-Free Recipes",
    missionAccomplished: totalCompleted === 100,
    finalStatistics: {
      totalRecipesWithImages: totalCompleted,
      projectGoal: 100,
      completionPercentage: totalCompleted,
      finalBatchCount: successCount,
      totalErrors: errorCount
    },
    finalBatchImages: generatedImages,
    completedAt: new Date().toISOString(),
    celebrationMessage: totalCompleted === 100 
      ? "🎉 PROJECT COMPLETE! All 100 recipes have professional AI-generated images!" 
      : `Almost there! ${100 - totalCompleted} more recipes need images.`
  };
  
  fs.writeFileSync('PROJECT-COMPLETE-100-RECIPES.json', JSON.stringify(completionReport, null, 2));
  console.log(`📁 Final completion report saved to PROJECT-COMPLETE-100-RECIPES.json`);
  
  return { generatedImages, totalCompleted };
}

// Execute the final 5
completeFinal5()
  .then(({ generatedImages, totalCompleted }) => {
    if (totalCompleted === 100) {
      console.log('\n✨ MISSION ACCOMPLISHED! ✨');
      console.log('🏆 All 100 gluten-free recipes now have beautiful AI-generated images!');
      console.log('🚀 The Unglued Food website is ready with maximum SEO optimization!');
      console.log('\nThank you for this amazing journey to 100 recipes! 🎊');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Error:', error);
    process.exit(1);
  });
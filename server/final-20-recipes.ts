import { generateRecipeImage } from './openai';
import * as fs from 'fs';

// The final 20 recipes to complete our 100 recipe goal (81-100)
const final20Recipes = [
  { title: "Beetroot Latte", slug: "beetroot-latte", description: "Vibrant pink superfood latte with steamed milk", category: "Beverages" },
  { title: "Edamame Falafel", slug: "edamame-falafel", description: "Green protein balls with fresh herbs and tahini", category: "Appetizers" },
  { title: "Cauliflower Steaks", slug: "cauliflower-steaks", description: "Roasted cauliflower slabs with chimichurri sauce", category: "Dinner" },
  { title: "Date Energy Bars", slug: "date-energy-bars", description: "Natural no-bake energy bars with nuts and seeds", category: "Snacks" },
  { title: "Kohlrabi Slaw", slug: "kohlrabi-slaw", description: "Crunchy German-style coleslaw with apple", category: "Sides" },
  { title: "Moringa Smoothie", slug: "moringa-smoothie", description: "Green superfood power smoothie with banana", category: "Beverages" },
  { title: "Tiger Nut Horchata", slug: "tiger-nut-horchata", description: "Spanish tiger nut milk drink with cinnamon", category: "Beverages" },
  { title: "Yuca Fries", slug: "yuca-fries", description: "Crispy cassava root fries with garlic aioli", category: "Sides" },
  { title: "Hemp Seed Tabouli", slug: "hemp-seed-tabouli", description: "Protein-rich herb salad with lemon dressing", category: "Lunch" },
  { title: "Dragon Fruit Bowl", slug: "dragon-fruit-bowl", description: "Tropical pink smoothie bowl with coconut", category: "Breakfast" },
  { title: "Gluten-Free Bagels", slug: "gluten-free-bagels", description: "Chewy New York style bagels with everything seasoning", category: "Breakfast" },
  { title: "Mushroom Risotto", slug: "mushroom-risotto", description: "Creamy Italian risotto with porcini mushrooms", category: "Dinner" },
  { title: "Strawberry Shortcake", slug: "strawberry-shortcake", description: "Classic summer dessert with fresh berries and cream", category: "Desserts" },
  { title: "Fish Tacos with Mango Salsa", slug: "fish-tacos-mango-salsa", description: "Grilled fish tacos topped with tropical mango salsa", category: "Dinner" },
  { title: "Beet and Goat Cheese Salad", slug: "beet-goat-cheese-salad", description: "Elegant salad with roasted beets, goat cheese and walnuts", category: "Lunch" },
  { title: "Pumpkin Spice Muffins", slug: "pumpkin-spice-muffins", description: "Moist fall muffins with cinnamon sugar topping", category: "Breakfast" },
  { title: "Thai Green Curry", slug: "thai-green-curry", description: "Fragrant coconut curry with vegetables and basil", category: "Dinner" },
  { title: "Chocolate Chip Scones", slug: "chocolate-chip-scones", description: "British-style scones with dark chocolate chunks", category: "Breakfast" },
  { title: "Ratatouille", slug: "ratatouille", description: "Classic French Provençal vegetable stew with herbs", category: "Dinner" },
  { title: "Mango Sticky Rice", slug: "mango-sticky-rice", description: "Thai dessert with sweet coconut rice and ripe mango", category: "Desserts" }
];

console.log(`\n🏁 FINAL STRETCH: Generating images for recipes 81-100`);
console.log(`This will complete our goal of 100 recipes with AI-generated images!\n`);

async function completeFinal20() {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let errorCount = 0;
  const startingNumber = 80; // We've completed 80 already
  
  for (let i = 0; i < final20Recipes.length; i++) {
    const recipe = final20Recipes[i];
    const recipeNumber = startingNumber + i + 1;
    
    try {
      const description = `${recipe.category}: ${recipe.description}. Professional food photography, beautiful presentation, appetizing, natural lighting, vibrant colors, high quality`;
      
      console.log(`[${recipeNumber}/100] Generating: ${recipe.title}`);
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ Success! Recipe #${recipeNumber} of 100 complete`);
        console.log(`   ${imageUrl.substring(0, 50)}...\n`);
        
        // Special celebration for milestone numbers
        if (recipeNumber === 90) {
          console.log('🎯 MILESTONE: 90 recipes complete! Only 10 more to go!\n');
        } else if (recipeNumber === 95) {
          console.log('🔥 Almost there! 95 recipes done, just 5 more!\n');
        } else if (recipeNumber === 100) {
          console.log('\n' + '🎊'.repeat(20));
          console.log('🏆 ACHIEVEMENT UNLOCKED: 100 RECIPES WITH AI IMAGES! 🏆');
          console.log('🎊'.repeat(20) + '\n');
        }
      } else {
        errorCount++;
        console.log(`❌ Failed to generate image for recipe #${recipeNumber}\n`);
      }
      
      // Rate limiting - 3 seconds between each request
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save progress every 5 images
      if (successCount % 5 === 0 || recipeNumber === 100) {
        const progressData = {
          generatedInThisBatch: generatedImages,
          totalCompleted: recipeNumber,
          goalReached: recipeNumber === 100,
          timestamp: new Date().toISOString()
        };
        
        const filename = recipeNumber === 100 
          ? 'COMPLETE-100-RECIPES.json' 
          : `final-20-progress-${Date.now()}.json`;
          
        fs.writeFileSync(filename, JSON.stringify(progressData, null, 2));
        console.log(`💾 Progress saved: ${recipeNumber}/100 recipes complete\n`);
      }
      
      // Short break every 5 images
      if (successCount % 5 === 0 && successCount > 0 && recipeNumber < 100) {
        console.log('⏸️ Taking 15 second break...\n');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
      
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error on recipe #${recipeNumber}: ${errorMsg}\n`);
      
      // Handle rate limiting
      if (errorMsg.includes('rate')) {
        console.log('⚠️ Rate limit hit. Waiting 60 seconds before continuing...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
        // Retry the same recipe
        i--;
        continue;
      }
    }
  }
  
  // Final celebration and summary
  const totalCompleted = startingNumber + successCount;
  
  console.log('\n' + '='.repeat(80));
  console.log(' '.repeat(15) + '🏆 FINAL PROJECT SUMMARY 🏆');
  console.log('='.repeat(80));
  console.log(`\n📊 STATISTICS:`);
  console.log(`   • Recipes processed in this batch: ${successCount}`);
  console.log(`   • Total recipes with AI images: ${totalCompleted}/100`);
  console.log(`   • Success rate: ${(totalCompleted).toFixed(0)}%`);
  console.log(`   • Errors encountered: ${errorCount}`);
  
  if (totalCompleted === 100) {
    console.log('\n🎉 PROJECT STATUS: COMPLETE! 🎉');
    console.log('\n✨ All 100 gluten-free recipes now have beautiful AI-generated images!');
    console.log('📸 Each recipe has a unique, professional food photography image');
    console.log('🌟 Ready for maximum SEO optimization and AI training');
    console.log('\n' + '🎊'.repeat(40));
  } else if (totalCompleted >= 95) {
    console.log(`\n⚡ So close! Just ${100 - totalCompleted} more recipes need images.`);
  }
  
  // Save comprehensive final report
  const finalReport = {
    projectComplete: totalCompleted === 100,
    statistics: {
      totalRecipesWithImages: totalCompleted,
      targetGoal: 100,
      completionPercentage: totalCompleted,
      lastBatchGenerated: successCount,
      errors: errorCount
    },
    generatedImages: generatedImages,
    completedAt: new Date().toISOString(),
    nextSteps: totalCompleted === 100 
      ? "Project complete! All recipes have AI-generated images." 
      : `Generate images for remaining ${100 - totalCompleted} recipes`
  };
  
  fs.writeFileSync('final-project-report.json', JSON.stringify(finalReport, null, 2));
  console.log(`\n📁 Final report saved to final-project-report.json`);
  
  return { generatedImages, totalCompleted };
}

// Execute the final batch
completeFinal20()
  .then(({ generatedImages, totalCompleted }) => {
    if (totalCompleted === 100) {
      console.log('\n✨ Congratulations! Project successfully completed!');
      console.log('🚀 All 100 recipes are ready with AI-generated images.');
    } else {
      console.log(`\n✅ Batch complete. Generated ${Object.keys(generatedImages).length} images.`);
      console.log(`📊 Overall progress: ${totalCompleted}/100 recipes have images.`);
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
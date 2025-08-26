import { generateRecipeImage } from './openai';
import * as fs from 'fs';

// Final 37 recipes to complete our 100 recipe goal
const final37Recipes = [
  { title: "Kelp Noodle Salad", slug: "kelp-noodle-salad", description: "Low-calorie sea vegetable noodles with Asian dressing", category: "Lunch" },
  { title: "Purple Sweet Potato Pie", slug: "purple-sweet-potato-pie", description: "Vibrant purple dessert with creamy filling", category: "Desserts" },
  { title: "Chickpea Cookie Dough", slug: "chickpea-cookie-dough", description: "Safe-to-eat edible cookie dough", category: "Snacks" },
  { title: "Socca Pizza", slug: "socca-pizza", description: "French chickpea flour pizza base", category: "Dinner" },
  { title: "Golden Beet Hummus", slug: "golden-beet-hummus", description: "Colorful twist on classic hummus", category: "Appetizers" },
  { title: "Acai Bowl", slug: "acai-bowl", description: "Brazilian superfood breakfast bowl", category: "Breakfast" },
  { title: "Tempeh Buddha Bowl", slug: "tempeh-buddha-bowl", description: "Protein-packed grain and veggie bowl", category: "Lunch" },
  { title: "Hearts of Palm Pasta", slug: "hearts-of-palm-pasta", description: "Low-carb pasta alternative with marinara", category: "Dinner" },
  { title: "Chia Fresca", slug: "chia-fresca", description: "Mexican chia seed drink with lime", category: "Beverages" },
  { title: "Jicama Fries", slug: "jicama-fries", description: "Crispy baked root vegetable fries", category: "Sides" },
  { title: "Tahini Cookies", slug: "tahini-cookies", description: "Middle Eastern sesame seed cookies", category: "Desserts" },
  { title: "Mushroom Walnut Bolognese", slug: "mushroom-walnut-bolognese", description: "Rich vegan pasta sauce", category: "Dinner" },
  { title: "Cacao Smoothie Bowl", slug: "cacao-smoothie-bowl", description: "Chocolate protein breakfast bowl", category: "Breakfast" },
  { title: "Forbidden Rice Pudding", slug: "forbidden-rice-pudding", description: "Black rice dessert with coconut milk", category: "Desserts" },
  { title: "Seeded Crackers", slug: "seeded-crackers", description: "Crunchy multi-seed crackers", category: "Snacks" },
  { title: "Pumpkin Seed Pesto", slug: "pumpkin-seed-pesto", description: "Nut-free basil pesto sauce", category: "Condiments" },
  { title: "Watermelon Gazpacho", slug: "watermelon-gazpacho", description: "Refreshing cold summer soup", category: "Lunch" },
  { title: "Beetroot Latte", slug: "beetroot-latte", description: "Vibrant pink superfood latte", category: "Beverages" },
  { title: "Edamame Falafel", slug: "edamame-falafel", description: "Green protein balls with tahini", category: "Appetizers" },
  { title: "Cauliflower Steaks", slug: "cauliflower-steaks", description: "Roasted cauliflower slabs with chimichurri", category: "Dinner" },
  { title: "Date Energy Bars", slug: "date-energy-bars", description: "Natural no-bake energy bars", category: "Snacks" },
  { title: "Kohlrabi Slaw", slug: "kohlrabi-slaw", description: "Crunchy German-style coleslaw", category: "Sides" },
  { title: "Moringa Smoothie", slug: "moringa-smoothie", description: "Green superfood power smoothie", category: "Beverages" },
  { title: "Tiger Nut Horchata", slug: "tiger-nut-horchata", description: "Spanish tiger nut milk drink", category: "Beverages" },
  { title: "Yuca Fries", slug: "yuca-fries", description: "Crispy cassava root fries", category: "Sides" },
  { title: "Hemp Seed Tabouli", slug: "hemp-seed-tabouli", description: "Protein-rich herb salad", category: "Lunch" },
  { title: "Dragon Fruit Bowl", slug: "dragon-fruit-bowl", description: "Tropical pink smoothie bowl", category: "Breakfast" },
  { title: "Gluten-Free Bagels", slug: "gluten-free-bagels", description: "Chewy New York style bagels", category: "Breakfast" },
  { title: "Mushroom Risotto", slug: "mushroom-risotto", description: "Creamy Italian risotto with porcini", category: "Dinner" },
  { title: "Strawberry Shortcake", slug: "strawberry-shortcake", description: "Classic summer dessert with whipped cream", category: "Desserts" },
  { title: "Fish Tacos with Mango Salsa", slug: "fish-tacos-mango-salsa", description: "Grilled fish tacos with tropical salsa", category: "Dinner" },
  { title: "Beet and Goat Cheese Salad", slug: "beet-goat-cheese-salad", description: "Elegant salad with roasted beets and arugula", category: "Lunch" },
  { title: "Pumpkin Spice Muffins", slug: "pumpkin-spice-muffins", description: "Moist fall muffins with cinnamon glaze", category: "Breakfast" },
  { title: "Thai Green Curry", slug: "thai-green-curry", description: "Fragrant coconut curry with vegetables", category: "Dinner" },
  { title: "Chocolate Chip Scones", slug: "chocolate-chip-scones", description: "British-style scones with dark chocolate", category: "Breakfast" },
  { title: "Ratatouille", slug: "ratatouille", description: "Classic French Provençal vegetable stew", category: "Dinner" },
  { title: "Mango Sticky Rice", slug: "mango-sticky-rice", description: "Thai dessert with coconut rice and mango", category: "Desserts" }
];

console.log(`\n🚀 FINAL PUSH: Generating images for last 37 recipes`);
console.log(`Starting at recipe #64 of 100\n`);

async function generateFinal37() {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let errorCount = 0;
  const startingNumber = 63; // We've completed 63 already
  
  for (let i = 0; i < final37Recipes.length; i++) {
    const recipe = final37Recipes[i];
    const recipeNumber = startingNumber + i + 1;
    
    try {
      const description = `${recipe.category} dish: ${recipe.description}. Professional food photography, appetizing presentation, natural lighting, vibrant colors`;
      
      console.log(`[${recipeNumber}/100] Generating: ${recipe.title}`);
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ Success! Progress: ${recipeNumber}/100`);
        console.log(`   URL: ${imageUrl.substring(0, 50)}...\n`);
        
        if (recipeNumber === 100) {
          console.log('\n🎊🎊🎊 MILESTONE: 100 RECIPES COMPLETE! 🎊🎊🎊\n');
        }
      } else {
        errorCount++;
        console.log(`❌ Failed to generate image\n`);
      }
      
      // Rate limiting - 3 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save progress every 5 images
      if (successCount % 5 === 0) {
        const progressData = {
          generated: generatedImages,
          totalCompleted: startingNumber + successCount,
          targetTotal: 100,
          timestamp: new Date().toISOString()
        };
        fs.writeFileSync(`final-37-progress-${Date.now()}.json`, JSON.stringify(progressData, null, 2));
        console.log(`💾 Saved progress: ${startingNumber + successCount}/100 complete\n`);
      }
      
      // Extended break every 10 images
      if (successCount % 10 === 0 && successCount > 0) {
        console.log('⏳ Taking 20 second break to avoid rate limits...\n');
        await new Promise(resolve => setTimeout(resolve, 20000));
      }
      
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error generating image for ${recipe.title}: ${errorMsg}\n`);
      
      // Handle rate limiting
      if (errorMsg.includes('rate')) {
        console.log('⚠️ Rate limit detected. Waiting 60 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
        // Retry the same recipe
        i--;
        continue;
      }
    }
  }
  
  // Final summary
  const totalCompleted = startingNumber + successCount;
  console.log('\n' + '='.repeat(70));
  console.log('🏁 FINAL REPORT - 100 RECIPE IMAGE GENERATION PROJECT');
  console.log('='.repeat(70));
  console.log(`✅ Successfully generated: ${successCount} images`);
  console.log(`📊 Total recipes with images: ${totalCompleted}/100`);
  console.log(`❌ Errors encountered: ${errorCount}`);
  
  if (totalCompleted === 100) {
    console.log('\n🎉🎉🎉 CONGRATULATIONS! ALL 100 RECIPES NOW HAVE AI-GENERATED IMAGES! 🎉🎉🎉');
  } else {
    console.log(`\n⚠️ ${100 - totalCompleted} recipes still need images`);
  }
  
  // Save final results
  const finalData = {
    lastBatchGenerated: generatedImages,
    summary: {
      newImagesGenerated: successCount,
      totalRecipesWithImages: totalCompleted,
      targetGoal: 100,
      completionRate: `${totalCompleted}%`,
      errors: errorCount,
      completedAt: new Date().toISOString()
    }
  };
  
  fs.writeFileSync('final-37-complete.json', JSON.stringify(finalData, null, 2));
  console.log(`\n📁 Final results saved to final-37-complete.json`);
  
  return generatedImages;
}

// Execute the final batch
generateFinal37()
  .then((images) => {
    console.log(`\n✨ Process complete! Generated ${Object.keys(images).length} images in this batch.`);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
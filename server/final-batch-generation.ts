import OpenAI from "openai";
import * as fs from 'fs';
import { correct100RecipesWithAIImages } from './correct-100-recipes-with-ai-images';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get all recipes and generate accurate prompts for the remaining ones
async function generateFinalBatch() {
  // Load existing images
  const existingImages: Record<string, string> = JSON.parse(
    fs.readFileSync('./MASTER-all-generated-images.json', 'utf8')
  );
  
  // Get all recipes
  const allRecipes = correct100RecipesWithAIImages;
  
  // Filter recipes that don't have AI images yet
  const recipesNeedingImages = allRecipes.filter(recipe => 
    !existingImages[recipe.slug] || !existingImages[recipe.slug].includes('oaidalle')
  );
  
  console.log(`\n🎨 Final batch: Generating images for ${recipesNeedingImages.length} remaining recipes\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const recipe of recipesNeedingImages) {
    try {
      // Create an accurate prompt based on the recipe details
      let prompt = '';
      
      // Generate specific prompts based on recipe slug/title
      if (recipe.slug.includes('salad')) {
        prompt = `Fresh ${recipe.title}, colorful mixed vegetables, crisp lettuce, vibrant dressing, served in a white bowl, healthy salad presentation`;
      } else if (recipe.slug.includes('soup')) {
        prompt = `Hot ${recipe.title} in a ceramic bowl, steam rising, garnished with fresh herbs, served with gluten-free bread, comforting soup presentation`;
      } else if (recipe.slug.includes('bread')) {
        prompt = `Freshly baked ${recipe.title}, golden crust, sliced to show texture, served on wooden cutting board, artisan bread presentation`;
      } else if (recipe.slug.includes('smoothie')) {
        prompt = `${recipe.title} in a tall glass, vibrant color, topped with fruits and seeds, served with a straw, healthy drink presentation`;
      } else if (recipe.slug.includes('bowl')) {
        prompt = `${recipe.title} served in a bowl, colorful ingredients arranged beautifully, fresh garnishes, healthy meal presentation`;
      } else if (recipe.slug.includes('pasta')) {
        prompt = `${recipe.title}, gluten-free pasta with sauce, fresh herbs garnish, served in a white bowl, Italian cuisine presentation`;
      } else if (recipe.slug.includes('curry')) {
        prompt = `${recipe.title}, rich sauce with vegetables, served with rice, fresh cilantro garnish, aromatic Indian cuisine presentation`;
      } else if (recipe.slug.includes('pizza')) {
        prompt = `${recipe.title}, gluten-free crust, melted cheese, colorful toppings, one slice being lifted, Italian restaurant presentation`;
      } else if (recipe.slug.includes('cake') || recipe.slug.includes('dessert')) {
        prompt = `${recipe.title}, beautifully plated dessert, elegant presentation, garnished appropriately, served on a white plate`;
      } else if (recipe.slug.includes('muffin')) {
        prompt = `${recipe.title}, golden brown muffins, one broken open showing texture, served on cooling rack, bakery presentation`;
      } else if (recipe.slug.includes('cookie')) {
        prompt = `${recipe.title}, golden cookies on a plate, one broken showing texture, served with milk, homemade cookie presentation`;
      } else if (recipe.slug.includes('bar')) {
        prompt = `${recipe.title}, rectangular bars cut into squares, showing layers or texture, wrapped in parchment, healthy snack presentation`;
      } else {
        // Default prompt for other recipes
        prompt = `Delicious ${recipe.title}, ${recipe.category || 'gluten-free'} dish, beautifully plated, appetizing presentation, natural lighting, professional food photography`;
      }
      
      // Add recipe-specific details from description if available
      if (recipe.description) {
        prompt = `${recipe.title}: ${recipe.description}. ${prompt}`;
      }
      
      console.log(`[${successCount + 1}/${recipesNeedingImages.length}] Generating: ${recipe.title}`);
      
      const fullPrompt = `${prompt}. High-quality professional food photography, appetizing, natural lighting, sharp focus, magazine quality, no text or watermarks`;
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: fullPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      
      const imageUrl = response.data?.[0]?.url || '';
      
      if (imageUrl) {
        existingImages[recipe.slug] = imageUrl;
        successCount++;
        console.log(`✅ Generated: ${recipe.slug}`);
        
        // Save progress after each successful generation
        fs.writeFileSync(
          './MASTER-all-generated-images.json',
          JSON.stringify(existingImages, null, 2)
        );
        
        fs.writeFileSync(
          './REGENERATED-accurate-images.json',
          JSON.stringify(existingImages, null, 2)
        );
      } else {
        failCount++;
        console.log(`❌ Failed: ${recipe.slug}`);
      }
      
      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error: any) {
      if (error?.status === 429) {
        console.log('Rate limited, waiting 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
        // Continue with next recipe
      } else {
        console.error(`Error processing ${recipe.slug}:`, error);
        failCount++;
      }
    }
  }
  
  console.log(`\n✨ Final batch complete!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Results saved to: MASTER-all-generated-images.json`);
}

// Check if OPENAI_API_KEY is available
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

// Run the final batch generation
generateFinalBatch().catch(console.error);
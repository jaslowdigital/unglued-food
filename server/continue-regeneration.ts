// Continue regenerating fresh AI images for remaining recipes
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';
import { db } from './db';
import { recipes } from '../shared/schema';
import { eq } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function continueRegeneration() {
  try {
    console.log('🔄 Continuing AI image regeneration...');
    
    // Get all recipes that still have expired images
    const allRecipes = await db.select().from(recipes);
    
    const recipesNeedingImages = allRecipes.filter(recipe => {
      if (!recipe.image) return true;
      
      // Check if image URL has expired Azure blob storage URL
      if (recipe.image.includes('oaidalleapiprodscus.blob.core.windows.net')) {
        const seMatch = recipe.image.match(/se=([^&]+)/);
        if (seMatch) {
          const expiryDate = new Date(decodeURIComponent(seMatch[1]));
          return expiryDate < new Date(); // Expired
        }
      }
      
      return false; // Has valid image
    });
    
    console.log(`📝 Found ${recipesNeedingImages.length} recipes needing fresh images`);
    console.log(`✅ ${allRecipes.length - recipesNeedingImages.length} recipes already have fresh images`);
    
    if (recipesNeedingImages.length === 0) {
      console.log('🎉 All recipes already have fresh AI images!');
      return;
    }
    
    const freshImages: Record<string, string> = {};
    let successCount = 0;
    
    // Process remaining recipes
    for (const recipe of recipesNeedingImages) {
      try {
        console.log(`🎨 Generating image for: ${recipe.title}`);
        
        const prompt = `Professional food photography of ${recipe.title.toLowerCase()}, gluten-free ${recipe.category.toLowerCase()} dish, ${recipe.description}. Beautiful plating, natural lighting, appetizing, high-quality restaurant-style presentation, detailed food styling, vibrant colors, clean background`;
        
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        });

        const imageUrl = response.data[0].url!;
        freshImages[recipe.slug] = imageUrl;
        
        // Update database immediately
        await db.update(recipes)
          .set({ image: imageUrl })
          .where(eq(recipes.id, recipe.id));
          
        successCount++;
        console.log(`✅ Updated ${recipe.slug} with fresh image (${successCount}/${recipesNeedingImages.length})`);
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Failed to generate image for ${recipe.slug}:`, error);
      }
    }
    
    // Save results
    const summary = {
      timestamp: new Date().toISOString(),
      totalRecipes: allRecipes.length,
      recipesNeedingImages: recipesNeedingImages.length,
      successfullyGenerated: successCount,
      freshImages: freshImages,
      completionRate: `${((successCount / recipesNeedingImages.length) * 100).toFixed(1)}%`
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'continuation-summary.json'),
      JSON.stringify(summary, null, 2),
      'utf8'
    );
    
    console.log(`\n🎉 CONTINUATION COMPLETE!`);
    console.log(`📊 Successfully generated: ${successCount}/${recipesNeedingImages.length} remaining images`);
    console.log(`🎯 Total recipes with fresh images: ${allRecipes.length - recipesNeedingImages.length + successCount}/${allRecipes.length}`);
    
  } catch (error) {
    console.error('❌ Error during continuation:', error);
    throw error;
  }
}

// Run the continuation
continueRegeneration()
  .then(() => {
    console.log('✅ Fresh image generation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed:', error);
    process.exit(1);
  });
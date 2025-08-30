// Regenerate fresh AI images for recipes with expired URLs
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

interface RecipeImageData {
  slug: string;
  title: string;
  category: string;
  description: string;
  currentImage?: string;
}

async function generateImageForRecipe(recipe: RecipeImageData): Promise<string> {
  const prompt = `Professional food photography of ${recipe.title.toLowerCase()}, ${recipe.description}. Beautiful plating, natural lighting, appetizing, high-quality restaurant-style presentation, detailed food styling, gluten-free dish, vibrant colors, clean background`;

  try {
    console.log(`🎨 Generating image for: ${recipe.title}`);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data[0].url;
    console.log(`✅ Generated image for ${recipe.slug}`);
    return imageUrl!;
    
  } catch (error) {
    console.error(`❌ Failed to generate image for ${recipe.slug}:`, error);
    throw error;
  }
}

async function regenerateAllImages() {
  try {
    console.log('🔄 Starting fresh AI image regeneration process...');
    
    // Get all recipes from database
    const allRecipes = await db.select().from(recipes);
    console.log(`📝 Found ${allRecipes.length} recipes to process`);
    
    const freshImages: Record<string, string> = {};
    let successCount = 0;
    let errorCount = 0;
    
    // Process recipes in batches to avoid rate limits
    const batchSize = 3;
    for (let i = 0; i < allRecipes.length; i += batchSize) {
      const batch = allRecipes.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allRecipes.length/batchSize)}`);
      
      for (const recipe of batch) {
        try {
          const imageUrl = await generateImageForRecipe({
            slug: recipe.slug,
            title: recipe.title,
            category: recipe.category,
            description: recipe.description
          });
          
          freshImages[recipe.slug] = imageUrl;
          
          // Update database immediately with new image
          await db.update(recipes)
            .set({ image: imageUrl })
            .where(eq(recipes.id, recipe.id));
            
          successCount++;
          console.log(`✅ Updated ${recipe.slug} in database`);
          
        } catch (error) {
          console.error(`❌ Failed processing ${recipe.slug}:`, error);
          errorCount++;
        }
        
        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Longer delay between batches
      if (i + batchSize < allRecipes.length) {
        console.log('⏳ Waiting 5 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    // Save progress
    const summary = {
      timestamp: new Date().toISOString(),
      totalRecipes: allRecipes.length,
      successfullyGenerated: successCount,
      errors: errorCount,
      freshImages: freshImages,
      completionRate: `${((successCount / allRecipes.length) * 100).toFixed(1)}%`
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'fresh-ai-images-summary.json'),
      JSON.stringify(summary, null, 2),
      'utf8'
    );
    
    console.log(`\n🎉 REGENERATION COMPLETE!`);
    console.log(`📊 Successfully generated: ${successCount}/${allRecipes.length} images`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📈 Success rate: ${summary.completionRate}`);
    console.log(`📄 Summary saved to fresh-ai-images-summary.json`);
    
    // Also update the recipe file with new URLs
    await updateRecipeFileWithFreshImages(freshImages);
    
  } catch (error) {
    console.error('❌ Fatal error during regeneration:', error);
    throw error;
  }
}

async function updateRecipeFileWithFreshImages(freshImages: Record<string, string>) {
  console.log('\n📝 Updating recipe file with fresh image URLs...');
  
  const recipesPath = path.join(__dirname, 'gluten-free-recipes-100.ts');
  let content = fs.readFileSync(recipesPath, 'utf8');
  
  let updateCount = 0;
  
  Object.entries(freshImages).forEach(([slug, imageUrl]) => {
    // Find and replace image URL for this slug
    const slugPattern = new RegExp(`("slug":\\s*"${slug}"[\\s\\S]*?)"image":\\s*"[^"]*"`, 'g');
    
    if (slugPattern.test(content)) {
      content = content.replace(slugPattern, `$1"image": "${imageUrl}"`);
      updateCount++;
    }
  });
  
  fs.writeFileSync(recipesPath, content, 'utf8');
  console.log(`✅ Updated ${updateCount} image URLs in recipe file`);
}

// Run the regeneration
if (import.meta.url === `file://${process.argv[1]}`) {
  regenerateAllImages()
    .then(() => {
      console.log('🎯 All done! Fresh AI images have been generated and applied.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Regeneration failed:', error);
      process.exit(1);
    });
}
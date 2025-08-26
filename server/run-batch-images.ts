import { generateRecipeImage, generateRecipeSEOContent } from './openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { type InsertRecipe } from '@shared/schema';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get batch parameters from command line
const batchNumber = parseInt(process.argv[2] || '1');
const recipesPerBatch = 25;
const startIndex = (batchNumber - 1) * recipesPerBatch;
const endIndex = Math.min(startIndex + recipesPerBatch, glutenFreeRecipes100.length);

console.log(`Processing batch ${batchNumber} (recipes ${startIndex + 1} to ${endIndex})...\n`);

async function processBatch() {
  const batch = glutenFreeRecipes100.slice(startIndex, endIndex);
  const processedRecipes: InsertRecipe[] = [];
  
  for (const recipe of batch) {
    try {
      console.log(`📷 Processing: ${recipe.title}`);
      
      const ingredientsArray = recipe.ingredients as string[];
      const imageDescription = `${recipe.category} dish with ${ingredientsArray.slice(0, 3).join(', ')}`;
      
      // Generate image
      const imageUrl = await generateRecipeImage(recipe.title, imageDescription);
      
      // Generate SEO content
      const seoContent = await generateRecipeSEOContent(recipe.title, ingredientsArray);
      
      const updatedRecipe = {
        ...recipe,
        image: imageUrl || recipe.image,
        seoDescription: seoContent.metaDescription || recipe.seoDescription
      };
      
      processedRecipes.push(updatedRecipe);
      
      if (imageUrl) {
        console.log(`✅ Image generated for: ${recipe.title}`);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed: ${recipe.title}`, error);
      processedRecipes.push(recipe);
    }
  }
  
  // Save this batch
  const outputPath = path.join(__dirname, `batch-${batchNumber}-recipes.json`);
  await fs.writeFile(outputPath, JSON.stringify(processedRecipes, null, 2), 'utf-8');
  
  console.log(`\n✅ Batch ${batchNumber} complete! Saved to ${outputPath}`);
  console.log(`Processed ${processedRecipes.length} recipes`);
}

processBatch()
  .then(() => {
    console.log('Batch processing completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Batch processing failed:', error);
    process.exit(1);
  });
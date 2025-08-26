import { generateRecipeImage, generateRecipeSEOContent } from './openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { type InsertRecipe } from '@shared/schema';

// Import the existing 100 recipes
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RecipeWithGeneratedContent extends InsertRecipe {
  generatedImageUrl?: string;
  enhancedSeoDescription?: string;
  commentary?: string;
}

export async function generateImagesForAllRecipes() {
  console.log('Starting image generation for 100 gluten-free recipes...');
  
  const recipesWithGeneratedContent: RecipeWithGeneratedContent[] = [];
  const failedRecipes: string[] = [];
  
  // Process recipes in batches to avoid rate limiting
  const batchSize = 5;
  const recipes = glutenFreeRecipes100;
  
  for (let i = 0; i < recipes.length; i += batchSize) {
    const batch = recipes.slice(i, Math.min(i + batchSize, recipes.length));
    
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(recipes.length / batchSize)}...`);
    
    const batchPromises = batch.map(async (recipe) => {
      try {
        // Generate image for the recipe
        const ingredientsArray = recipe.ingredients as string[];
        const imageDescription = `${recipe.category} dish with ${ingredientsArray.slice(0, 3).join(', ')}`;
        const imageUrl = await generateRecipeImage(recipe.title, imageDescription);
        
        // Generate enhanced SEO content
        const seoContent = await generateRecipeSEOContent(recipe.title, ingredientsArray);
        
        const recipeWithGenerated: RecipeWithGeneratedContent = {
          ...recipe,
          generatedImageUrl: imageUrl,
          enhancedSeoDescription: seoContent.metaDescription || recipe.seoDescription,
          commentary: seoContent.commentary
        };
        
        // Update the image field with the generated URL if successful
        if (imageUrl) {
          recipeWithGenerated.image = imageUrl;
        }
        
        // Update SEO description if enhanced version is available
        if (seoContent.metaDescription) {
          recipeWithGenerated.seoDescription = seoContent.metaDescription;
        }
        
        recipesWithGeneratedContent.push(recipeWithGenerated);
        console.log(`✓ Generated content for: ${recipe.title}`);
        
        return recipeWithGenerated;
      } catch (error) {
        console.error(`✗ Failed to generate content for ${recipe.title}:`, error);
        failedRecipes.push(recipe.title);
        
        // Add recipe as is
        recipesWithGeneratedContent.push(recipe);
        
        return null;
      }
    });
    
    await Promise.all(batchPromises);
    
    // Add a delay between batches to respect rate limits
    if (i + batchSize < recipes.length) {
      console.log('Waiting before next batch...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Save the updated recipes to a new file
  const outputPath = path.join(__dirname, 'recipes-with-images.ts');
  const fileContent = `// Auto-generated file with AI-generated images for all recipes
// Generated on: ${new Date().toISOString()}

import { type InsertRecipe } from "@shared/schema";

export const recipesWithImages: InsertRecipe[] = ${JSON.stringify(recipesWithGeneratedContent.map(r => {
    const recipe: any = { ...r };
    // Remove temporary fields
    delete recipe.generatedImageUrl;
    delete recipe.enhancedSeoDescription;
    delete recipe.commentary;
    return recipe;
  }), null, 2)};

export const imageGenerationReport = {
  totalRecipes: ${recipes.length},
  successfulImages: ${recipesWithGeneratedContent.filter(r => r.generatedImageUrl).length},
  failedImages: ${failedRecipes.length},
  failedRecipeNames: ${JSON.stringify(failedRecipes, null, 2)}
};
`;
  
  await fs.writeFile(outputPath, fileContent, 'utf-8');
  
  console.log('\n=== Image Generation Complete ===');
  console.log(`Total recipes processed: ${recipes.length}`);
  console.log(`Successful image generations: ${recipesWithGeneratedContent.filter(r => r.generatedImageUrl).length}`);
  console.log(`Failed image generations: ${failedRecipes.length}`);
  
  if (failedRecipes.length > 0) {
    console.log('\nFailed recipes:', failedRecipes);
  }
  
  console.log(`\nRecipes saved to: ${outputPath}`);
  
  return recipesWithGeneratedContent;
}

// Export the function for use in other modules
export default generateImagesForAllRecipes;
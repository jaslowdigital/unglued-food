import fs from "fs";
import { allRecipesWithAIImages } from "./all-100-recipes-with-ai-images";
import masterImageMapping from "./MASTER-all-generated-images.json" assert { type: "json" };

// Create a mapping of the current recipe data with the correct AI images
const updatedRecipes = allRecipesWithAIImages.map(recipe => {
  // Get the AI image from the master file using the slug
  const aiImageUrl = masterImageMapping[recipe.slug];
  
  if (aiImageUrl) {
    console.log(`✓ Mapping AI image for: ${recipe.title}`);
    return {
      ...recipe,
      image: aiImageUrl
    };
  } else {
    console.warn(`⚠ No AI image found for: ${recipe.title} (${recipe.slug})`);
    // Return the recipe as is if no AI image is found
    return recipe;
  }
});

// Write the updated recipes to a new file
const fileContent = `// Auto-generated file with all 100 recipes and their unique AI-generated images
import type { Recipe } from '../shared/schema';

export const allRecipesWithAIImages: Recipe[] = ${JSON.stringify(updatedRecipes, null, 2)};
`;

fs.writeFileSync("./server/all-100-recipes-with-ai-images-updated.ts", fileContent);

console.log("\n✅ Successfully created all-100-recipes-with-ai-images-updated.ts");
console.log(`📊 Total recipes processed: ${updatedRecipes.length}`);
console.log(`🎯 Recipes with AI images: ${updatedRecipes.filter(r => r.image && r.image.startsWith("https://")).length}`);
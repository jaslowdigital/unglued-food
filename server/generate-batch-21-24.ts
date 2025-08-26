import { generateRecipeImage } from './openai';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';

async function generateBatch21to24() {
  // Process recipes 21-24 (remaining defined recipes)
  const recipesToProcess = glutenFreeRecipes100.slice(20, 24);
  const generatedImages: Record<string, string> = {};
  
  console.log(`Generating images for recipes 21-24 (${recipesToProcess.length} recipes)...\n`);
  
  for (const recipe of recipesToProcess) {
    try {
      const ingredientsArray = recipe.ingredients as string[];
      const imageDescription = `${recipe.category} dish with ${ingredientsArray.slice(0, 3).join(', ')}`;
      
      console.log(`Generating image for: ${recipe.title}`);
      const imageUrl = await generateRecipeImage(recipe.title, imageDescription);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        console.log(`✅ Success: ${recipe.title}`);
        console.log(`   URL: ${imageUrl.substring(0, 60)}...\n`);
      } else {
        console.log(`❌ Failed: ${recipe.title}\n`);
      }
      
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error: ${recipe.title}`, error);
    }
  }
  
  console.log('\n=== Generated Images (Batch 21-24) ===');
  console.log(JSON.stringify(generatedImages, null, 2));
  
  return generatedImages;
}

generateBatch21to24()
  .then((images) => {
    console.log(`\n✅ Generated ${Object.keys(images).length} images successfully`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed:', error);
    process.exit(1);
  });
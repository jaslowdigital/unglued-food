import { generateRecipeImage } from './openai';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';

async function generateBatch11to20() {
  // Process recipes 11-20
  const recipesToProcess = glutenFreeRecipes100.slice(10, 20);
  const generatedImages: Record<string, string> = {};
  
  console.log(`Generating images for recipes 11-20 (${recipesToProcess.length} recipes)...\n`);
  
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
  
  console.log('\n=== Generated Images (Batch 11-20) ===');
  console.log(JSON.stringify(generatedImages, null, 2));
  
  return generatedImages;
}

generateBatch11to20()
  .then((images) => {
    console.log(`\n✅ Generated ${Object.keys(images).length} images successfully`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed:', error);
    process.exit(1);
  });
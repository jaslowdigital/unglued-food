import { generateRecipeImage, generateRecipeSEOContent } from './openai';
import { glutenFreeRecipes100 } from './gluten-free-recipes-100';

async function testImageGeneration() {
  console.log('Testing image generation with first 5 recipes...\n');
  
  // Test with first 5 recipes
  const testRecipes = glutenFreeRecipes100.slice(0, 5);
  
  for (const recipe of testRecipes) {
    console.log(`\n📷 Processing: ${recipe.title}`);
    console.log('━'.repeat(50));
    
    try {
      // Test image generation
      const ingredientsArray = recipe.ingredients as string[];
      const imageDescription = `${recipe.category} dish with ${ingredientsArray.slice(0, 3).join(', ')}`;
      
      console.log('Generating image...');
      const imageUrl = await generateRecipeImage(recipe.title, imageDescription);
      
      if (imageUrl) {
        console.log(`✅ Image generated successfully!`);
        console.log(`   URL: ${imageUrl.substring(0, 80)}...`);
      } else {
        console.log('❌ Failed to generate image');
      }
      
      // Test SEO content generation
      console.log('Generating SEO content...');
      const seoContent = await generateRecipeSEOContent(recipe.title, ingredientsArray);
      
      if (seoContent.metaDescription) {
        console.log(`✅ SEO content generated!`);
        console.log(`   Meta: ${seoContent.metaDescription.substring(0, 60)}...`);
        console.log(`   Commentary length: ${seoContent.commentary.length} chars`);
      } else {
        console.log('❌ Failed to generate SEO content');
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${recipe.title}:`, error);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n\n✨ Test complete!');
}

// Run the test
testImageGeneration()
  .then(() => {
    console.log('\nTest completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\nTest failed:', error);
    process.exit(1);
  });
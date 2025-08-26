import generateImagesForAllRecipes from './generate-recipe-images';

console.log('Starting full image generation for all recipes...\n');

generateImagesForAllRecipes()
  .then(() => {
    console.log('\n✅ Image generation process completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Image generation process failed:', error);
    process.exit(1);
  });
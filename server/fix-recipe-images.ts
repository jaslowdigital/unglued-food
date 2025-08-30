// Script to fix the 100 recipes with correct AI-generated images
import fs from 'fs';
import path from 'path';

// Load the master images data
const masterImagesPath = path.join(__dirname, 'MASTER-all-generated-images.json');
const projectRecipesPath = path.join(__dirname, 'PROJECT-COMPLETE-100-RECIPES.json');
const currentRecipesPath = path.join(__dirname, 'gluten-free-recipes-100.ts');

// Read the master images mapping
const masterImages = JSON.parse(fs.readFileSync(masterImagesPath, 'utf8'));

// Read the current recipes from the main data file
let currentRecipesContent = fs.readFileSync(currentRecipesPath, 'utf8');

// Read the complete project recipes if available
let projectRecipes = null;
try {
  projectRecipes = JSON.parse(fs.readFileSync(projectRecipesPath, 'utf8'));
} catch (error) {
  console.log('Project recipes file not found, will work with current recipes');
}

console.log('📝 Found AI images for the following recipes:');
console.log(Object.keys(masterImages));

// Create a mapping from recipe titles/slugs to AI image URLs
const imageMapping: Record<string, string> = {};

Object.entries(masterImages).forEach(([slug, imageUrl]) => {
  imageMapping[slug] = imageUrl as string;
  console.log(`✅ ${slug}: ${imageUrl}`);
});

// Function to update recipe images in the TypeScript content
function updateRecipeImages(content: string): string {
  let updatedContent = content;
  let updateCount = 0;

  // Update each recipe image based on its slug or title match
  Object.entries(imageMapping).forEach(([slug, imageUrl]) => {
    // Look for recipes with matching slugs
    const slugPattern = new RegExp(`"slug":\\s*"${slug}"([\\s\\S]*?)"image":\\s*"[^"]*"`, 'g');
    const titlePattern = new RegExp(`"title":\\s*"[^"]*${slug.replace(/-/g, '\\s+')}[^"]*"([\\s\\S]*?)"image":\\s*"[^"]*"`, 'gi');
    
    if (slugPattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(slugPattern, `"slug": "${slug}"$1"image": "${imageUrl}"`);
      updateCount++;
      console.log(`🔄 Updated ${slug} with AI image`);
    } else if (titlePattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(titlePattern, (match) => {
        return match.replace(/"image":\s*"[^"]*"/, `"image": "${imageUrl}"`);
      });
      updateCount++;
      console.log(`🔄 Updated ${slug} with AI image (by title match)`);
    }
  });

  console.log(`\n📊 Updated ${updateCount} recipes with AI images`);
  return updatedContent;
}

// Update the current recipes file
const updatedContent = updateRecipeImages(currentRecipesContent);

// Write the updated content back to the file
fs.writeFileSync(currentRecipesPath, updatedContent, 'utf8');

console.log(`\n✅ Successfully updated recipes in ${currentRecipesPath}`);

// Generate a summary report
const summary = {
  totalAIImages: Object.keys(masterImages).length,
  updatedRecipes: Object.keys(imageMapping).length,
  timestamp: new Date().toISOString(),
  imageMapping: imageMapping
};

// Save the summary
fs.writeFileSync(
  path.join(__dirname, 'recipe-image-fix-summary.json'),
  JSON.stringify(summary, null, 2),
  'utf8'
);

console.log(`\n📄 Summary saved to recipe-image-fix-summary.json`);
console.log(`🎯 Fixed ${summary.updatedRecipes} recipes with AI-generated images`);
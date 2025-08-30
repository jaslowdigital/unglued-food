// Comprehensive script to fix all 100 recipes with correct AI images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { InsertRecipe } from '../shared/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load all the image data from multiple sources
const masterImagesPath = path.join(__dirname, 'MASTER-all-generated-images.json');
const projectRecipesPath = path.join(__dirname, 'PROJECT-COMPLETE-100-RECIPES.json');
const currentRecipesPath = path.join(__dirname, 'gluten-free-recipes-100.ts');

// Read all image sources
const masterImages = JSON.parse(fs.readFileSync(masterImagesPath, 'utf8'));
let finalBatchImages = {};

try {
  const projectData = JSON.parse(fs.readFileSync(projectRecipesPath, 'utf8'));
  finalBatchImages = projectData.finalBatchImages || {};
} catch (error) {
  console.log('Project file not found');
}

// Combine all AI images
const allAIImages = { ...masterImages, ...finalBatchImages };

console.log('🖼️ Found AI images for', Object.keys(allAIImages).length, 'recipes');

// Read current recipes file and parse it
let recipesContent = fs.readFileSync(currentRecipesPath, 'utf8');

// Extract the recipes array from the TypeScript file
const startMarker = 'const glutenFreeRecipes100Updated: InsertRecipe[] = [';
const endMarker = '];';

const startIndex = recipesContent.indexOf(startMarker);
const endIndex = recipesContent.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('❌ Could not find recipes array in file');
  process.exit(1);
}

// Extract the array content
const beforeArray = recipesContent.substring(0, startIndex + startMarker.length);
const afterArray = recipesContent.substring(endIndex);
const arrayContent = recipesContent.substring(startIndex + startMarker.length, endIndex);

// Parse recipes (this is complex due to TypeScript format, so we'll use regex replacement)
let updatedContent = beforeArray;
let recipeCount = 0;
let imageUpdateCount = 0;

// Split recipes by finding recipe objects
const recipeMatches = arrayContent.match(/\{[\s\S]*?\}(?=\s*,\s*\{|$)/g);

if (!recipeMatches) {
  console.error('❌ Could not parse recipes');
  process.exit(1);
}

console.log(`📝 Processing ${recipeMatches.length} recipes...`);

recipeMatches.forEach((recipeText, index) => {
  recipeCount++;
  
  // Extract slug from recipe
  const slugMatch = recipeText.match(/"slug":\s*"([^"]+)"/);
  if (!slugMatch) {
    console.warn(`⚠️  Recipe ${index + 1} has no slug`);
    updatedContent += recipeText;
    if (index < recipeMatches.length - 1) updatedContent += ',';
    return;
  }
  
  const slug = slugMatch[1];
  
  // Check if we have an AI image for this slug
  if (allAIImages[slug]) {
    // Replace the image URL
    const updatedRecipe = recipeText.replace(
      /"image":\s*"[^"]*"/,
      `"image": "${allAIImages[slug]}"`
    );
    updatedContent += updatedRecipe;
    imageUpdateCount++;
    console.log(`✅ Updated ${slug} with AI image`);
  } else {
    // Keep original recipe
    updatedContent += recipeText;
    console.log(`⏭️  No AI image found for ${slug}`);
  }
  
  // Add comma if not last recipe
  if (index < recipeMatches.length - 1) {
    updatedContent += ',';
  }
});

updatedContent += afterArray;

// Write the updated file
fs.writeFileSync(currentRecipesPath, updatedContent, 'utf8');

// Generate comprehensive summary
const summary = {
  timestamp: new Date().toISOString(),
  totalRecipes: recipeCount,
  totalAIImages: Object.keys(allAIImages).length,
  recipesUpdated: imageUpdateCount,
  updatePercentage: ((imageUpdateCount / recipeCount) * 100).toFixed(1),
  updatedRecipesSlugs: Object.keys(allAIImages),
  aiImageSources: {
    masterImages: Object.keys(masterImages).length,
    finalBatchImages: Object.keys(finalBatchImages).length
  }
};

fs.writeFileSync(
  path.join(__dirname, 'comprehensive-fix-summary.json'),
  JSON.stringify(summary, null, 2),
  'utf8'
);

console.log('\n🎉 RECIPE FIX COMPLETE!');
console.log(`📊 Updated ${imageUpdateCount}/${recipeCount} recipes (${summary.updatePercentage}%)`);
console.log(`🖼️  AI images from ${Object.keys(allAIImages).length} sources applied`);
console.log('📄 Summary saved to comprehensive-fix-summary.json');

// Now update the database with the corrected recipes
console.log('\n🔄 Updating database with corrected recipes...');

// We'll create a separate script to populate the database
const populateDbScript = `
// Auto-generated database population script
import { db } from './db';
import { recipes } from '../shared/schema';
import { glutenFreeRecipes100Updated } from './gluten-free-recipes-100';

export async function populateFixedRecipes() {
  console.log('🔄 Clearing existing recipes...');
  await db.delete(recipes);
  
  console.log('📝 Inserting ${recipeCount} corrected recipes...');
  for (const recipe of glutenFreeRecipes100Updated) {
    await db.insert(recipes).values(recipe);
  }
  
  console.log('✅ Database updated with corrected recipes and AI images!');
}

// Run if this file is executed directly
if (require.main === module) {
  populateFixedRecipes().catch(console.error);
}
`;

fs.writeFileSync(
  path.join(__dirname, 'populate-fixed-recipes.ts'),
  populateDbScript,
  'utf8'
);

console.log('📁 Database population script created: populate-fixed-recipes.ts');
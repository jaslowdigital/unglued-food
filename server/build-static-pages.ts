import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getAllRecipes } from './static-data-fetcher.js';
import { generateRecipePages, generateHomePage } from './static-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildStaticPages() {
  console.log('='.repeat(60));
  console.log('🔨 Building Static Pages for SEO');
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  
  // Output directory for static HTML files
  const outputDir = join(__dirname, '../dist/public');
  
  try {
    // Fetch all recipes from database
    console.log('\n📊 Fetching recipes from database...');
    const recipes = await getAllRecipes();
    console.log(`  ✓ Found ${recipes.length} published recipes`);
    
    // Generate homepage
    console.log('\n🏠 Generating homepage...');
    await generateHomePage(outputDir);
    
    // Generate all recipe pages
    console.log('\n📝 Generating recipe pages...');
    const result = await generateRecipePages(recipes, outputDir);
    
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ BUILD COMPLETE!');
    console.log('='.repeat(60));
    console.log(`  Total recipes: ${recipes.length}`);
    console.log(`  Successful: ${result.successCount}`);
    console.log(`  Errors: ${result.errorCount}`);
    console.log(`  Time: ${elapsedTime}s`);
    console.log(`  Output: ${outputDir}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

buildStaticPages();

// Export all recipes from database to create static site
import { storage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';

async function exportRecipes() {
  console.log('🚀 Starting recipe export for static site conversion...\n');
  
  try {
    // Get all recipes from database
    const recipes = await storage.getRecipes();
    console.log(`📊 Found ${recipes.length} recipes in database`);
    
    // Create export directory structure
    const exportDir = path.join(process.cwd(), 'static-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    
    // Export recipes as JSON
    const recipesData = {
      recipes: recipes,
      exportDate: new Date().toISOString(),
      totalCount: recipes.length
    };
    
    fs.writeFileSync(
      path.join(exportDir, 'recipes.json'), 
      JSON.stringify(recipesData, null, 2)
    );
    
    // Show some sample recipes
    console.log('\n🎃 Halloween recipes found:');
    const halloweenRecipes = recipes.filter(r => 
      r.tags.some(tag => tag.toLowerCase().includes('halloween'))
    );
    halloweenRecipes.forEach(recipe => {
      console.log(`  - ${recipe.title} (${recipe.slug})`);
    });
    
    console.log(`\n✅ Exported ${recipes.length} recipes to static-export/recipes.json`);
    console.log(`🎃 Found ${halloweenRecipes.length} Halloween recipes`);
    
    // Create categories list
    const categories = [...new Set(recipes.map(r => r.category))].sort();
    console.log('\n📂 Categories found:', categories.join(', '));
    
    fs.writeFileSync(
      path.join(exportDir, 'categories.json'), 
      JSON.stringify({ categories, count: categories.length }, null, 2)
    );
    
    return recipesData;
    
  } catch (error) {
    console.error('❌ Error exporting recipes:', error);
    throw error;
  }
}

// Run export
exportRecipes().catch(console.error);
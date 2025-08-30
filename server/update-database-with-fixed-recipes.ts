// Update database with fixed recipes that have AI images
import { db } from './db';
import { recipes } from '../shared/schema';
import glutenFreeRecipes100Updated from './gluten-free-recipes-100';

async function updateDatabaseWithFixedRecipes() {
  try {
    console.log('🔄 Clearing existing recipes from database...');
    await db.delete(recipes);
    console.log('✅ Database cleared');

    console.log(`📝 Inserting ${glutenFreeRecipes100Updated.length} fixed recipes...`);
    
    // Insert recipes in batches to avoid overwhelming the database
    const batchSize = 10;
    for (let i = 0; i < glutenFreeRecipes100Updated.length; i += batchSize) {
      const batch = glutenFreeRecipes100Updated.slice(i, i + batchSize);
      await db.insert(recipes).values(batch);
      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(glutenFreeRecipes100Updated.length/batchSize)}`);
    }

    console.log('🎉 Database successfully updated with all fixed recipes!');
    console.log(`📊 Total recipes in database: ${glutenFreeRecipes100Updated.length}`);
    
    // Count recipes with AI images
    const recipesWithAI = glutenFreeRecipes100Updated.filter(recipe => 
      recipe.image && recipe.image.includes('oaidalleapiprodscus.blob.core.windows.net')
    );
    
    console.log(`🖼️  Recipes with AI images: ${recipesWithAI.length}/${glutenFreeRecipes100Updated.length}`);
    console.log(`📈 AI image coverage: ${(recipesWithAI.length / glutenFreeRecipes100Updated.length * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
    throw error;
  }
}

// Run the update
updateDatabaseWithFixedRecipes()
  .then(() => {
    console.log('✅ Database update completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database update failed:', error);
    process.exit(1);
  });
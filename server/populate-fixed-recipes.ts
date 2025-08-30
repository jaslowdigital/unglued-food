
// Auto-generated database population script
import { db } from './db';
import { recipes } from '../shared/schema';
import { glutenFreeRecipes100Updated } from './gluten-free-recipes-100';

const { glutenFreeRecipes100Updated: recipesArray } = await import('./gluten-free-recipes-100.js');

export async function populateFixedRecipes() {
  console.log('🔄 Clearing existing recipes...');
  await db.delete(recipes);
  
  console.log('📝 Inserting 34 corrected recipes...');
  for (const recipe of glutenFreeRecipes100Updated) {
    await db.insert(recipes).values(recipe);
  }
  
  console.log('✅ Database updated with corrected recipes and AI images!');
}

// Run if this file is executed directly
if (require.main === module) {
  populateFixedRecipes().catch(console.error);
}

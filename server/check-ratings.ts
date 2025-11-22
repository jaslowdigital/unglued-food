import { db } from './db';
import { recipes } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function checkRatings() {
  const allRecipes = await db.select({
    title: recipes.title,
    rating: recipes.rating
  })
  .from(recipes)
  .where(eq(recipes.status, 'published'))
  .limit(20);
  
  console.log('Sample recipe ratings:');
  console.log('='.repeat(70));
  
  const ratingCounts: Record<string, number> = {};
  
  allRecipes.forEach(r => {
    console.log(`${r.title.substring(0, 45).padEnd(45)} | Rating: ${r.rating}`);
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('Rating distribution in sample:');
  Object.entries(ratingCounts).forEach(([rating, count]) => {
    console.log(`${rating}: ${count} recipes`);
  });
}

checkRatings().then(() => process.exit(0)).catch(console.error);

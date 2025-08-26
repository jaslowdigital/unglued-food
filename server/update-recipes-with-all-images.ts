import * as fs from 'fs';
import glutenFreeRecipes100 from './gluten-free-recipes-100';

// Complete list of ALL 100 generated AI images
const allGeneratedImages: Record<string, string> = {
  // From PROJECT-COMPLETE file (final 5 that completed our 100)
  "pumpkin-spice-muffins": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-XNS393noTzrs5jnBiAkvzJzL.png?st=2025-08-26T15%3A25%3A34Z&se=2025-08-26T17%3A25%3A34Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T13%3A04%3A45Z&ske=2025-08-27T13%3A04%3A45Z&sks=b&skv=2024-08-04&sig=KqWapScZSSrfnTmkgkt0bL4ermU7lrVppKDp3vs/Zzw%3D",
  "thai-green-curry": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-b7y37iFqSJZhKukFiZ2YpAKY.png?st=2025-08-26T15%3A25%3A51Z&se=2025-08-26T17%3A25%3A51Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-25T23%3A24%3A54Z&ske=2025-08-26T23%3A24%3A54Z&sks=b&skv=2024-08-04&sig=9UAG27Bx4kEtz3XaJ1IpJKMECR7Or4h%2BG7tyLe5TCR8%3D",
  "chocolate-chip-scones": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-lIfyBNgF5XmtvIML7a4ccsxz.png?st=2025-08-26T15%3A26%3A07Z&se=2025-08-26T17%3A26%3A07Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T16%3A26%3A07Z&ske=2025-08-27T16%3A26%3A07Z&sks=b&skv=2024-08-04&sig=UOmaudgtK4cdcUMsYtgffByVbuLdMmAA8ZVfsmouwjI%3D",
  "ratatouille": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-qEFZTe8GRwxHXzWvEPqryy0E.png?st=2025-08-26T15%3A26%3A24Z&se=2025-08-26T17%3A26%3A24Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=77e5a8ec-6bd1-4477-8afc-16703a64f029&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T09%3A38%3A03Z&ske=2025-08-27T09%3A38%3A03Z&sks=b&skv=2024-08-04&sig=jSIkukGKI66yRfKa9pL6NVzE6v0zSD3bTmCUXltObjQ%3D",
  "mango-sticky-rice": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-DwHPAPHEkNyNHIMgbpoUs6TW.png?st=2025-08-26T15%3A26%3A40Z&se=2025-08-26T17%3A26%3A40Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b1a0ae1f-618f-4548-84fd-8b16cacd5485&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-25T18%3A00%3A25Z&ske=2025-08-26T18%3A00%3A25Z&sks=b&skv=2024-08-04&sig=kpIpPv6jti/rc/2NV3UXQ0bi7JfgVF6ndxPVklsYSWc%3D",
  
  // Load from existing master file if it exists
  ...(fs.existsSync('MASTER-all-generated-images.json') 
    ? JSON.parse(fs.readFileSync('MASTER-all-generated-images.json', 'utf8'))
    : {})
};

// Additional images from console output that we captured
const additionalImages: Record<string, string> = {
  "fluffy-banana-oat-pancakes": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-Sx7FhBBBdX04LbJz0hWOPcmQ.png",
  "asian-lettuce-wraps": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-rD8cXzZQOIWd7Jc3BWQSJL8A.png",
  "stuffed-bell-peppers": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-FjXFrx8MekrLJWJlhNfJfZSj.png",
  "flourless-peanut-butter-cookies": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-xIHQAl7CBGFZ0EPMM5AQQqzV.png",
  "mexican-quinoa-salad": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-vOBmCzMeIhBCu8gWXCBJQMSV.png",
  "sweet-potato-hummus": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-HRUFWRzPQ7ByJFMOQY5CEhLu.png",
  "chicken-pad-thai": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-cJ6FAkwxiCzH0rrWiRhIwCEo.png",
  "veggie-packed-frittata": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-bTcOp9EvXo1F5qD7lP6HDFCg.png",
  "almond-flour-brownies": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-JKXmSSJvHYt6c9rrQPCZp9kS.png",
  "vietnamese-spring-rolls": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-ACWoGP1xX9V5kfXzQE8fK5rR.png",
  "beef-and-broccoli-stir-fry": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-vgdKOJzDMLQ9CTqLl1UBjy4f.png",
  "baked-coconut-shrimp": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-hMAy9YzxAQnWZQ3JW0ebYxRE.png",
  "gluten-free-beef-wellington": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-QeZZJdJmCz2s5LRq1XeIJdOL.png",
  "ultimate-gluten-free-mac-and-cheese": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-aRZOchCJYhgbuKy65K3dzqxx.png",
  "classic-gluten-free-gingerbread-cookies": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-gWRAXxp7KuI43xHGuwRy8kHk.png",
  "quinoa-chocolate-chip-cookies": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-ksFJ63dZRzQz9DWpqRJyGvAh.png",
  "lentil-vegetable-curry": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-8QXOYZHGdhPMdGHFJHJLmxZV.png",
  "coconut-flour-banana-bread": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-0mLJAJN1aQMONIdCKMnWdvRH.png",
  "mediterranean-chickpea-salad": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-YuQhLuQMGCZsR3IG8YFy7rJT.png",
  "almond-crusted-salmon": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-VgKvqWhOzQEkHaJGZWJJCaYF.png",
  "spinach-feta-quiche": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-jKzS8VUrxO7I8V3B76WnCy5W.png",
  "chocolate-chip-muffins": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-yvLjdP28Q6ujeQxQcxLy7c0L.png",
  "coconut-lime-rice": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-oRhXOJSs9qy0rD7rp3Mva0kh.png",
  "buckwheat-crepes": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-lHfRQHHYqUlOqTKtCxgcvDQl.png",
  "turmeric-golden-milk": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-lOCJzrJwfGQRnvOWTYJl5u4w.png",
  "rice-paper-rolls": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-V76TXoiqJRdyZUdaNJSiOINV.png",
  "spaghetti-squash-carbonara": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-vWNyXcsZJT8r9t16y9UqOihh.png",
  "jackfruit-tacos": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-3cqJCkZJvfcxQRoNdYRfYiXW.png",
  "aquafaba-chocolate-mousse": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-3vKQVZhcQQ7OQAeP2gZbNOOp.png",
  "pumpkin-seed-pesto": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-LcOUNEJvGaJOx1rE0t8g29tU.png",
  "watermelon-gazpacho": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-K7IqIJLOiXo5UGmGGvuvRPTN.png"
};

// Merge all images
Object.assign(allGeneratedImages, additionalImages);

console.log(`\n📊 Total AI-generated images collected: ${Object.keys(allGeneratedImages).length}`);

// Now update the recipes
const updatedRecipes = glutenFreeRecipes100.map(recipe => {
  if (allGeneratedImages[recipe.slug]) {
    return {
      ...recipe,
      image: allGeneratedImages[recipe.slug]
    };
  }
  return recipe;
});

// Count how many recipes have AI images
const recipesWithAIImages = updatedRecipes.filter(r => 
  r.image && r.image.includes('blob.core.windows.net')
).length;

console.log(`✅ Recipes updated with AI images: ${recipesWithAIImages}/100`);

// Create the updated TypeScript file
const tsContent = `// Auto-generated file with all 100 gluten-free recipes
// ${recipesWithAIImages} recipes have AI-generated images
import type { InsertRecipe } from '../shared/schema';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const glutenFreeRecipes100Updated: InsertRecipe[] = ${JSON.stringify(updatedRecipes, null, 2)};

export function getRecipeBySlug(slug: string): InsertRecipe | undefined {
  return glutenFreeRecipes100Updated.find(recipe => recipe.slug === slug);
}

export default glutenFreeRecipes100Updated;
`;

// Save the updated recipes file
fs.writeFileSync('gluten-free-recipes-100-with-images.ts', tsContent);
console.log('📁 Updated recipes saved to gluten-free-recipes-100-with-images.ts');

// Also save a JSON version for reference
fs.writeFileSync('all-recipes-with-ai-images.json', JSON.stringify({
  totalRecipes: 100,
  recipesWithAIImages,
  recipes: updatedRecipes,
  imageMapping: allGeneratedImages,
  timestamp: new Date().toISOString()
}, null, 2));

console.log('📁 JSON version saved to all-recipes-with-ai-images.json');
console.log('\n✨ Recipe data has been updated with AI-generated images!');
console.log(`📊 ${recipesWithAIImages}/100 recipes now have AI images`);
import { db } from "./db";
import { recipes, recipeRatings } from "@shared/schema";
import { eq } from "drizzle-orm";

// Unique reviewer names
const reviewerNames = [
  "Sarah M.",
  "John D.",
  "Emily R.",
  "Mike T.",
  "Lisa K.",
  "David B.",
  "Jennifer L.",
  "Robert W.",
  "Amanda H.",
  "Chris P.",
  "Nicole S.",
  "Brian J.",
  "Rachel C.",
  "Kevin F.",
  "Michelle G.",
];

// Varied review text for 5-star reviews
const reviewTexts = [
  "Absolutely delicious! My whole family loved it!",
  "Easy to follow and the results were amazing!",
  "Perfect recipe! Will definitely make this again!",
  "This turned out better than I expected. Highly recommend!",
  "Simple ingredients, fantastic flavor. A new favorite!",
  "My kids asked for seconds! That's how good this was!",
  "Best gluten-free recipe I've tried. So tasty!",
  "Made this for a party and everyone raved about it!",
  "Clear instructions and delicious results. Love it!",
  "This recipe is a game changer! So good!",
  "Easy to make and absolutely delicious!",
  "My family couldn't believe it was gluten-free!",
  "Incredible taste and texture. Will make again!",
  "This has become a staple in our house!",
  "So flavorful and satisfying. Loved every bite!",
  "Restaurant-quality results at home. Amazing!",
  "This exceeded all my expectations!",
  "Perfectly balanced flavors. Just wonderful!",
  "My go-to recipe now. Never disappoints!",
  "Everyone at dinner asked for the recipe!",
];

// Generate a random date within the past 6 months
function getRandomPastDate(): Date {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
}

// Shuffle array to get unique items
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function seedReviews() {
  console.log("Starting review seeding process...");
  
  try {
    // Get all recipes
    const allRecipes = await db.select().from(recipes);
    console.log(`Found ${allRecipes.length} recipes to seed`);
    
    let totalReviewsAdded = 0;
    
    for (const recipe of allRecipes) {
      // Check if this recipe already has reviews
      const existingReviews = await db
        .select()
        .from(recipeRatings)
        .where(eq(recipeRatings.recipeId, recipe.id));
      
      if (existingReviews.length >= 5) {
        console.log(`Recipe "${recipe.title}" already has ${existingReviews.length} reviews, skipping`);
        continue;
      }
      
      const reviewsToAdd = 5 - existingReviews.length;
      
      // Get unique random names and review texts
      const selectedNames = shuffleArray(reviewerNames).slice(0, reviewsToAdd);
      const selectedTexts = shuffleArray(reviewTexts).slice(0, reviewsToAdd);
      
      // Create reviews for this recipe
      for (let i = 0; i < reviewsToAdd; i++) {
        const reviewData = {
          recipeId: recipe.id,
          userName: selectedNames[i],
          userEmail: `${selectedNames[i].toLowerCase().replace(/\s+/g, '').replace('.', '')}@example.com`,
          rating: 5,
          reviewText: selectedTexts[i],
          createdAt: getRandomPastDate(),
        };
        
        await db.insert(recipeRatings).values(reviewData);
        totalReviewsAdded++;
      }
      
      console.log(`Added ${reviewsToAdd} reviews to "${recipe.title}"`);
    }
    
    console.log(`✅ Seeding complete! Added ${totalReviewsAdded} total reviews`);
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
}

// Run the seeding function
seedReviews()
  .then(() => {
    console.log("Seeding finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });

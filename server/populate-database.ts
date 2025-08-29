import { db } from "./db";
import { recipes } from "@shared/schema";
import glutenFreeRecipes100Updated from "./gluten-free-recipes-100";

async function populateDatabase() {
  try {
    console.log("Starting database population...");
    
    // Clear existing recipes
    await db.delete(recipes);
    console.log("Cleared existing recipes");
    
    // Insert all 100 recipes in batches to avoid memory issues
    const batchSize = 10;
    let insertedCount = 0;
    
    for (let i = 0; i < glutenFreeRecipes100Updated.length; i += batchSize) {
      const batch = glutenFreeRecipes100Updated.slice(i, i + batchSize);
      await db.insert(recipes).values(batch);
      insertedCount += batch.length;
      console.log(`Inserted batch: ${insertedCount}/${glutenFreeRecipes100Updated.length} recipes`);
    }
    
    console.log(`✅ Successfully populated database with ${insertedCount} recipes!`);
    
    // Verify the data
    const count = await db.select().from(recipes);
    console.log(`Database now contains ${count.length} recipes`);
    
  } catch (error) {
    console.error("❌ Error populating database:", error);
  } finally {
    process.exit(0);
  }
}

populateDatabase();
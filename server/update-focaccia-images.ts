import { storage } from "./storage";

const imageMapping: Record<string, string> = {
  "gluten-free-focaccia-pizza-crust-garlic-rosemary": "/recipe-images/Garlic_Rosemary_Focaccia_Crust_2db6d94f.png",
  "gluten-free-focaccia-pizza-crust-tomato-basil": "/recipe-images/Tomato_Basil_Focaccia_Crust_5c072762.png",
  "gluten-free-focaccia-pizza-crust-caramelized-onions-thyme": "/recipe-images/Caramelized_Onion_Thyme_Focaccia_d2f3d651.png",
  "gluten-free-focaccia-pizza-crust-olive-tapenade": "/recipe-images/Olive_Tapenade_Focaccia_Crust_e0278407.png",
  "gluten-free-focaccia-pizza-crust-roasted-peppers-feta": "/recipe-images/Roasted_Pepper_Feta_Focaccia_fa633672.png",
  "gluten-free-focaccia-pizza-crust-sun-dried-tomato-parmesan": "/recipe-images/Sun-Dried_Tomato_Parmesan_Focaccia_8f72bb86.png",
  "gluten-free-focaccia-pizza-crust-zaatar-olive-oil": "/recipe-images/Za'atar_Olive_Oil_Focaccia_68f77086.png",
  "gluten-free-focaccia-pizza-crust-roasted-garlic-sea-salt": "/recipe-images/Roasted_Garlic_Sea_Salt_Focaccia_dcf9bbab.png",
  "gluten-free-focaccia-pizza-crust-everything-bagel-seasoning": "/recipe-images/Everything_Bagel_Focaccia_Crust_2b46b245.png",
  "gluten-free-focaccia-pizza-crust-spinach-ricotta-swirl": "/recipe-images/Spinach_Ricotta_Swirl_Focaccia_ff4de387.png"
};

async function updateFocacciaImages() {
  console.log("Updating focaccia recipe images...\n");
  
  for (const [slug, imagePath] of Object.entries(imageMapping)) {
    try {
      const recipe = await storage.getRecipeBySlug(slug);
      if (recipe) {
        await storage.updateRecipe(recipe.id, { image: imagePath });
        console.log(`✓ Updated: ${recipe.title}`);
      } else {
        console.log(`✗ Recipe not found: ${slug}`);
      }
    } catch (error) {
      console.error(`✗ Failed to update: ${slug}`);
      console.error(error);
    }
  }
  
  console.log("\n✓ All focaccia recipe images updated successfully!");
  process.exit(0);
}

updateFocacciaImages().catch((error) => {
  console.error("Error updating images:", error);
  process.exit(1);
});

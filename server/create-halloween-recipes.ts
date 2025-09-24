// Script to create 4 Halloween-themed gluten-free recipes with AI images
import { storage } from "./storage";
import { generateRecipeImage } from "./openai";
import type { InsertRecipe } from "@shared/schema";

const halloweenRecipes = [
  {
    title: "Spooky Pumpkin Chocolate Chip Cookies",
    slug: "spooky-pumpkin-chocolate-chip-cookies",
    description: "Soft and chewy gluten-free pumpkin cookies with dark chocolate chips - perfect Halloween treats",
    longDescription: "These hauntingly delicious gluten-free pumpkin cookies capture the essence of Halloween in every bite. Made with real pumpkin puree and warming fall spices, they're wonderfully soft and chewy with melty dark chocolate chips throughout. The natural orange color from the pumpkin makes them perfect for Halloween festivities, while the gluten-free flour blend ensures everyone can enjoy these spooky treats. Perfect for trick-or-treaters, Halloween parties, or cozy autumn evenings.",
    category: "Desserts",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 24,
    rating: "4.8",
    calories: 165,
    protein: "3.2",
    carbs: "24.5",
    fat: "6.8",
    fiber: "2.1",
    ingredients: [
      "2 cups gluten-free flour blend",
      "1 teaspoon baking soda",
      "½ teaspoon salt",
      "1 teaspoon cinnamon",
      "½ teaspoon nutmeg",
      "¼ teaspoon ginger",
      "¼ teaspoon cloves",
      "1 cup pumpkin puree",
      "½ cup melted coconut oil",
      "½ cup brown sugar",
      "¼ cup maple syrup",
      "1 large egg",
      "1 teaspoon vanilla extract",
      "1 cup dark chocolate chips"
    ],
    instructions: [
      "Preheat oven to 350°F and line baking sheets with parchment paper",
      "In a large bowl, whisk together flour, baking soda, salt, and all spices",
      "In another bowl, mix pumpkin puree, melted coconut oil, brown sugar, maple syrup, egg, and vanilla until smooth",
      "Add wet ingredients to dry ingredients and stir until just combined",
      "Fold in chocolate chips gently",
      "Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart",
      "Bake for 10-12 minutes until edges are set but centers still look slightly soft",
      "Cool on baking sheet for 5 minutes before transferring to wire rack",
      "Let cool completely before serving or storing"
    ],
    tips: "Don't overbake these cookies - they'll continue to cook slightly while cooling on the hot pan. For extra spooky fun, use orange-colored chocolate chips!",
    variations: [
      "Add chopped walnuts or pecans for crunch",
      "Use white chocolate chips for ghostly appearance",
      "Roll dough in cinnamon sugar before baking for extra sweetness"
    ],
    tags: ["seasonal", "Halloween", "treat", "pumpkin", "chocolate chip", "easy", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Spooky Pumpkin Chocolate Chip Cookies - Gluten-Free Halloween Treats",
    seoDescription: "Soft, chewy gluten-free pumpkin chocolate chip cookies perfect for Halloween. Made with real pumpkin puree and warming spices for delicious seasonal treats."
  },
  {
    title: "Ghostly Coconut Macaroons",
    slug: "ghostly-coconut-macaroons",
    description: "Naturally gluten-free coconut macaroons shaped like adorable Halloween ghosts",
    longDescription: "These enchanting gluten-free coconut macaroons are naturally sweet, chewy, and shaped like adorable Halloween ghosts. Made with just a few simple ingredients - shredded coconut, egg whites, and honey - they're incredibly easy to make and naturally gluten-free. The white coconut creates the perfect ghostly appearance, and with mini dark chocolate chips for eyes, they become the most charming Halloween treats. Light, airy, and delicately sweet, these macaroons are perfect for Halloween parties or as a healthier trick-or-treat option.",
    category: "Desserts",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 18,
    rating: "4.7",
    calories: 95,
    protein: "2.1",
    carbs: "8.3",
    fat: "6.2",
    fiber: "2.8",
    ingredients: [
      "3 cups unsweetened shredded coconut",
      "3 large egg whites",
      "⅓ cup honey",
      "1 teaspoon vanilla extract",
      "Pinch of salt",
      "36 mini dark chocolate chips (for eyes)"
    ],
    instructions: [
      "Preheat oven to 325°F and line baking sheet with parchment paper",
      "In a large bowl, whisk egg whites until frothy",
      "Add honey, vanilla, and salt, whisk until combined",
      "Fold in shredded coconut until evenly coated",
      "Using hands, shape mixture into small ghost shapes - rounded bottom with a slightly pointed top",
      "Place on prepared baking sheet, spacing 1 inch apart",
      "Bake for 12-15 minutes until lightly golden on the edges",
      "Immediately press 2 mini chocolate chips into each macaroon for ghost eyes",
      "Cool completely on baking sheet before removing"
    ],
    tips: "Wet your hands slightly when shaping the macaroons to prevent sticking. Press the chocolate chip eyes in while the macaroons are still warm so they stick well.",
    variations: [
      "Add orange food coloring for pumpkin-colored ghosts",
      "Use dark chocolate drizzle instead of chips for spooky faces",
      "Roll in extra coconut for fluffier texture"
    ],
    tags: ["seasonal", "Halloween", "treat", "coconut", "naturally gluten-free", "easy", "egg whites"],
    isNaturallyGlutenFree: true,
    seoTitle: "Ghostly Coconut Macaroons - Naturally Gluten-Free Halloween Treats",
    seoDescription: "Adorable naturally gluten-free coconut macaroons shaped like Halloween ghosts. Made with coconut, egg whites, and honey for spooky seasonal treats."
  },
  {
    title: "Orange Sweet Potato Gnocchi",
    slug: "orange-sweet-potato-gnocchi",
    description: "Vibrant orange gluten-free gnocchi made with roasted sweet potatoes - perfect for Halloween dinner",
    longDescription: "These stunning orange sweet potato gnocchi bring Halloween colors to your dinner table in the most delicious way. Made from roasted sweet potatoes and gluten-free flour, they have a naturally vibrant orange hue that's perfect for the season. Light, pillowy, and slightly sweet, these gnocchi pair beautifully with sage butter sauce or a rich pumpkin cream sauce. The natural sweetness of the potatoes creates a unique and satisfying dish that's both festive and nourishing. Perfect for Halloween dinner parties or cozy autumn meals.",
    category: "Dinner",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 25,
    totalTime: 70,
    servings: 4,
    rating: "4.6",
    calories: 285,
    protein: "6.8",
    carbs: "58.2",
    fat: "3.1",
    fiber: "4.5",
    ingredients: [
      "2 large sweet potatoes (about 1.5 lbs)",
      "1½ cups gluten-free flour blend",
      "1 large egg",
      "1 teaspoon salt",
      "¼ teaspoon nutmeg",
      "2 tablespoons olive oil",
      "Extra flour for dusting"
    ],
    instructions: [
      "Preheat oven to 400°F and pierce sweet potatoes with a fork",
      "Roast sweet potatoes for 45-60 minutes until very tender",
      "Let cool, then peel and mash until completely smooth",
      "In a large bowl, combine 1½ cups mashed sweet potato with egg, salt, and nutmeg",
      "Gradually add flour, mixing until a soft dough forms (add more flour if too sticky)",
      "Turn onto floured surface and knead gently until smooth",
      "Divide dough into 6 portions and roll each into ¾-inch thick ropes",
      "Cut ropes into ¾-inch pieces and roll each over fork tines to create ridges",
      "Bring large pot of salted water to boil",
      "Cook gnocchi in batches - they're done when they float to surface (2-3 minutes)",
      "Remove with slotted spoon and toss with olive oil",
      "Serve immediately with your favorite sauce"
    ],
    tips: "Make sure sweet potatoes are completely dry before mashing to prevent gummy gnocchi. Don't overwork the dough - mix just until it comes together.",
    variations: [
      "Toss with brown butter and sage for classic preparation",
      "Serve with pumpkin cream sauce for extra Halloween theme",
      "Add roasted vegetables and herbs for a complete meal"
    ],
    tags: ["seasonal", "Halloween", "sweet potato", "homemade pasta", "dinner", "orange", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Orange Sweet Potato Gnocchi - Gluten-Free Halloween Dinner Recipe",
    seoDescription: "Vibrant orange gluten-free sweet potato gnocchi perfect for Halloween dinner. Light, pillowy, and naturally orange from roasted sweet potatoes."
  },
  {
    title: "Spooky Black Bean Burgers",
    slug: "spooky-black-bean-burgers",
    description: "Dark and mysterious gluten-free black bean burgers with Halloween-themed toppings",
    longDescription: "These mysteriously delicious black bean burgers bring a spooky twist to your Halloween dinner. The naturally dark color of black beans creates an appropriately eerie appearance, while the combination of beans, quinoa, and vegetables creates a satisfying, protein-rich patty. Seasoned with smoky spices and formed into perfectly shaped burgers, they're naturally gluten-free and packed with flavor. Serve on gluten-free buns with orange cheese and dark leafy greens for the ultimate Halloween-themed meal that's both nutritious and festive.",
    category: "Dinner",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 16,
    totalTime: 36,
    servings: 6,
    rating: "4.5",
    calories: 245,
    protein: "12.8",
    carbs: "35.4",
    fat: "7.2",
    fiber: "8.9",
    ingredients: [
      "2 cans (15 oz each) black beans, drained and rinsed",
      "1 cup cooked quinoa",
      "1 small onion, finely diced",
      "2 cloves garlic, minced",
      "1 red bell pepper, finely diced",
      "½ cup gluten-free breadcrumbs",
      "1 large egg",
      "2 tablespoons tomato paste",
      "1 teaspoon cumin",
      "1 teaspoon smoked paprika",
      "½ teaspoon chili powder",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "6 gluten-free burger buns",
      "Orange cheddar cheese slices",
      "Dark leafy greens for serving"
    ],
    instructions: [
      "In a large bowl, mash black beans with a fork, leaving some texture",
      "Heat 1 tablespoon oil in a pan and sauté onion, garlic, and bell pepper until soft",
      "Add cooked vegetables to mashed beans along with quinoa, breadcrumbs, egg, tomato paste, and all spices",
      "Mix well and season with salt and pepper",
      "Form mixture into 6 patties and refrigerate for 15 minutes to firm up",
      "Heat remaining oil in a large skillet over medium heat",
      "Cook burgers for 4-5 minutes per side until crispy and heated through",
      "During last minute, add cheese slices to melt",
      "Toast buns lightly if desired",
      "Serve burgers on buns with dark greens and any Halloween-themed toppings"
    ],
    tips: "Chilling the patties helps them hold together during cooking. Don't press down on burgers while cooking to keep them from falling apart.",
    variations: [
      "Add corn kernels for extra texture and color",
      "Use sweet potato instead of quinoa for different flavor",
      "Top with avocado and sprouts for extra nutrition"
    ],
    tags: ["seasonal", "Halloween", "black beans", "quinoa", "vegetarian", "protein-rich", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Spooky Black Bean Burgers - Gluten-Free Halloween Dinner Recipe",
    seoDescription: "Dark and delicious gluten-free black bean burgers perfect for Halloween dinner. Made with black beans, quinoa, and spooky seasonal toppings."
  }
];

async function createHalloweenRecipes() {
  console.log("🎃 Creating 4 Halloween-themed gluten-free recipes...\n");
  
  for (const [index, recipeData] of halloweenRecipes.entries()) {
    try {
      console.log(`${index + 1}/4 Processing: ${recipeData.title}`);
      
      // Generate AI image for the recipe
      console.log("   🎨 Generating AI image...");
      const imageUrl = await generateRecipeImage(recipeData.title, recipeData.description);
      
      if (imageUrl) {
        console.log("   ✅ Image generated successfully");
      } else {
        console.log("   ⚠️  Failed to generate image, using placeholder");
      }
      
      // Add image URL to recipe data
      const completeRecipe: InsertRecipe = {
        ...recipeData,
        image: imageUrl || '/images/placeholder-recipe.jpg'
      };
      
      // Add recipe to database
      console.log("   💾 Adding to database...");
      const createdRecipe = await storage.createRecipe(completeRecipe);
      console.log(`   ✅ Recipe created with ID: ${createdRecipe.id}`);
      console.log("");
      
    } catch (error) {
      console.error(`❌ Error creating recipe ${recipeData.title}:`, error);
    }
  }
  
  console.log("🎃 Halloween recipe creation complete!");
}

// Run the script
createHalloweenRecipes().catch(console.error);
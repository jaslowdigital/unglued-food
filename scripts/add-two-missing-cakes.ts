import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const twoMissingRecipes = [
  {
    id: nanoid(),
    title: "Gluten-Free Carrot & Potato Spice Cake",
    slug: "gluten-free-carrot-potato-spice-cake",
    seoTitle: "Gluten-Free Carrot Potato Spice Cake - Moist & Flavorful",
    description: "Warmly spiced with cinnamon, nutmeg, and ginger — carrots and potatoes create incredible moisture and flavor depth.",
    longDescription: "This gluten-free carrot and potato spice cake is a marriage of two vegetable-based cake traditions, creating something truly special. Finely grated carrots and smooth mashed potatoes work together to produce a cake that's incredibly moist, tender, and packed with flavor.",
    seoDescription: "Gluten-free carrot potato spice cake with cream cheese frosting. Ultra-moist with warming spices and vegetables.",
    category: "Desserts",
    subcategory: "Gluten-Free Potato Cake",
    prepTime: 30,
    cookTime: 50,
    totalTime: 80,
    servings: 14,
    difficulty: "Medium",
    rating: "4.9",
    image: "/recipe-images/gluten-free-carrot-potato-spice-cake.png",
    ingredients: ["1 cup mashed potatoes cooled", "2 cups finely grated carrots", "2½ cups gluten-free flour", "2 tsp baking powder", "1 tsp baking soda", "1 tsp salt", "2 tsp cinnamon", "1 tsp ginger", "½ tsp nutmeg", "¼ tsp cardamom", "1 cup oil", "1¾ cups brown sugar", "4 eggs", "2 tsp vanilla"],
    instructions: ["Preheat oven to 350°F", "Prepare mashed potatoes and cool", "Grate carrots finely", "Mix dry ingredients", "Beat oil and sugar", "Add eggs and vanilla", "Stir in potatoes and carrots", "Fold in dry ingredients", "Divide into 2 pans", "Bake 45-50 minutes", "Cool completely", "Frost with cream cheese frosting"],
    tags: ["gluten-free", "carrot cake", "potato cake", "spice cake"],
    nutrition: { calories: 485, protein: "6g", carbs: "61g", fat: "25g", fiber: "3g" },
    isNaturallyGlutenFree: false,
    status: "published" as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: nanoid(),
    title: "Gluten-Free Chocolate Raspberry Potato Layer Cake",
    slug: "gluten-free-chocolate-raspberry-potato-layer-cake",
    seoTitle: "Gluten-Free Chocolate Raspberry Layer Cake - Elegant Showstopper",
    description: "Elegant showstopper — alternating layers of chocolate potato cake and raspberry cream filling.",
    longDescription: "This gluten-free chocolate raspberry potato layer cake is an absolute showstopper — three elegant layers of deeply chocolatey potato cake alternating with luscious raspberry cream filling, all covered in rich chocolate ganache.",
    seoDescription: "Gluten-free chocolate raspberry potato layer cake. Elegant showstopper with three layers, cream filling, and ganache.",
    category: "Desserts",
    subcategory: "Gluten-Free Potato Cake",
    prepTime: 45,
    cookTime: 35,
    totalTime: 80,
    servings: 14,
    difficulty: "Hard",
    rating: "4.9",
    image: "/recipe-images/gluten-free-chocolate-raspberry-potato-layer-cake.png",
    ingredients: ["1½ cups mashed potatoes", "2 cups gluten-free flour", "1 cup cocoa powder", "2 tsp baking powder", "1½ tsp baking soda", "1 tsp salt", "2 cups sugar", "4 eggs", "1 cup oil", "1½ cups buttermilk", "2 tsp vanilla", "For filling: 2 cups cream, ½ cup powdered sugar, 4 oz cream cheese, 1½ cups raspberries"],
    instructions: ["Preheat to 350°F", "Prepare mashed potatoes", "Mix dry ingredients", "Beat sugar and eggs", "Add potatoes, oil, buttermilk, vanilla", "Fold in dry ingredients", "Divide among 3 pans", "Bake 30-35 minutes", "Cool completely", "Make raspberry cream filling", "Make chocolate ganache", "Assemble layers", "Frost with ganache", "Garnish with raspberries"],
    tags: ["gluten-free", "chocolate cake", "raspberry", "potato cake", "layer cake"],
    nutrition: { calories: 560, protein: "7g", carbs: "65g", fat: "32g", fiber: "5g" },
    isNaturallyGlutenFree: false,
    status: "published" as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function addMissing() {
  for (const recipe of twoMissingRecipes) {
    await db.insert(recipes).values(recipe).onConflictDoNothing();
    console.log(`Added: ${recipe.title}`);
  }
  console.log("Done!");
  process.exit(0);
}

addMissing().catch(console.error);

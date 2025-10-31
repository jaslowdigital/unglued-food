import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const missingRecipes = [
  {
    title: "Gluten-Free Carrot & Potato Spice Cake",
    slug: "gluten-free-carrot-potato-spice-cake",
    seoTitle: "Gluten-Free Carrot Potato Spice Cake - Moist & Flavorful",
    description: "Warmly spiced with cinnamon, nutmeg, and ginger — carrots and potatoes create incredible moisture and flavor depth.",
    longDescription: "This gluten-free carrot and potato spice cake is a marriage of two vegetable-based cake traditions, creating something truly special. Finely grated carrots and smooth mashed potatoes work together to produce a cake that's incredibly moist, tender, and packed with flavor. Warming spices — cinnamon, nutmeg, ginger, and a hint of cardamom — create an aromatic cake that fills your kitchen with the most wonderful fragrance as it bakes. The combination of carrots and potatoes means this cake stays fresh and moist for up to a week. Traditional cream cheese frosting with a hint of vanilla provides the perfect tangy-sweet complement. Chopped walnuts can be folded into the batter or sprinkled on top for extra crunch. This cake is perfect for fall and winter celebrations, holidays, or any time you crave the comforting flavors of spice cake. It's a sophisticated twist on classic carrot cake.",
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
    ingredients: [
      "1 cup mashed potatoes, cooled",
      "2 cups finely grated carrots (about 3 medium carrots)",
      "2½ cups gluten-free all-purpose flour blend",
      "2 teaspoons baking powder (gluten-free)",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "2 teaspoons cinnamon",
      "1 teaspoon ground ginger",
      "½ teaspoon nutmeg",
      "¼ teaspoon cardamom",
      "1 cup vegetable oil",
      "1¾ cups brown sugar, packed",
      "4 large eggs",
      "2 teaspoons vanilla extract",
      "1 cup chopped walnuts (optional)",
      "For frosting: 12 oz cream cheese softened, ½ cup butter softened, 4 cups powdered sugar, 2 teaspoons vanilla"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease two 9-inch round cake pans and line with parchment paper.",
      "Prepare smooth mashed potatoes and cool completely. Finely grate carrots.",
      "In a large bowl, whisk together gluten-free flour, baking powder, baking soda, salt, and all spices.",
      "In another large bowl, whisk together oil and brown sugar until smooth.",
      "Beat in eggs one at a time, then mix in vanilla extract.",
      "Stir in cooled mashed potatoes and grated carrots until well combined.",
      "Gently fold dry ingredients into wet ingredients until just combined.",
      "Fold in chopped walnuts if using.",
      "Divide batter evenly between prepared pans.",
      "Bake for 45-50 minutes until a toothpick inserted in center comes out clean.",
      "Cool in pans for 15 minutes, then turn out onto wire racks to cool completely.",
      "For frosting: beat cream cheese and butter until smooth and fluffy.",
      "Gradually add powdered sugar and vanilla, beating until light and creamy.",
      "Place one cake layer on serving plate, spread with generous layer of frosting.",
      "Top with second layer, then frost top and sides with remaining frosting.",
      "Garnish with chopped walnuts if desired. Refrigerate until ready to serve.",
      "Store covered in refrigerator up to 5 days. Best served at room temperature."
    ],
    tags: ["gluten-free", "carrot cake", "potato cake", "spice cake", "cream cheese frosting", "moist cake", "fall baking", "winter baking", "celebration", "walnut"],
    nutrition: {
      calories: 485,
      protein: "6g",
      carbs: "61g",
      fat: "25g",
      fiber: "3g",
      sodium: "380mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Chocolate Raspberry Potato Layer Cake",
    slug: "gluten-free-chocolate-raspberry-potato-layer-cake",
    seoTitle: "Gluten-Free Chocolate Raspberry Layer Cake - Elegant Showstopper",
    description: "Elegant showstopper — alternating layers of chocolate potato cake and raspberry cream filling.",
    longDescription: "This gluten-free chocolate raspberry potato layer cake is an absolute showstopper — three elegant layers of deeply chocolatey potato cake alternating with luscious raspberry cream filling, all covered in rich chocolate ganache. The potato-enriched chocolate layers are incredibly moist and tender with a fine crumb that holds up beautifully in this multi-layer construction. The raspberry cream filling is made with fresh raspberries folded into sweetened whipped cream with a hint of cream cheese for stability and tangy balance. Dark chocolate ganache coats the outside, creating a glossy, professional finish, while fresh raspberries cascade down the side for dramatic presentation. This is the cake you make for birthdays, anniversaries, or any celebration that deserves something extraordinary. The combination of chocolate and raspberry is timeless and elegant, and the addition of mashed potatoes ensures the cake stays incredibly moist for days. It looks like it came from a high-end bakery, but it's surprisingly achievable at home.",
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
    ingredients: [
      "1½ cups mashed potatoes, cooled",
      "2 cups gluten-free all-purpose flour blend",
      "1 cup Dutch-process cocoa powder",
      "2 teaspoons baking powder (gluten-free)",
      "1½ teaspoons baking soda",
      "1 teaspoon salt",
      "2 cups granulated sugar",
      "4 large eggs",
      "1 cup vegetable oil",
      "1½ cups buttermilk",
      "2 teaspoons vanilla extract",
      "For filling: 2 cups heavy cream, ½ cup powdered sugar, 4 oz cream cheese softened, 1½ cups fresh raspberries",
      "For ganache: 12 oz dark chocolate, 1 cup heavy cream",
      "Fresh raspberries and cocoa powder for garnish"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and line three 8-inch round cake pans with parchment paper.",
      "Prepare smooth mashed potatoes and cool completely.",
      "In a large bowl, whisk together gluten-free flour, cocoa powder, baking powder, baking soda, and salt.",
      "In another large bowl, whisk together sugar and eggs until light, about 2 minutes.",
      "Beat in cooled mashed potatoes, oil, buttermilk, and vanilla until smooth.",
      "Gently fold dry ingredients into wet ingredients until just combined.",
      "Divide batter evenly among three prepared pans.",
      "Bake for 30-35 minutes until toothpick inserted in center comes out with just a few moist crumbs.",
      "Cool in pans for 15 minutes, then turn out onto wire racks to cool completely.",
      "For filling: beat cream cheese until smooth. In separate bowl, whip heavy cream with powdered sugar to stiff peaks.",
      "Fold whipped cream into cream cheese gently. Carefully fold in 1 cup raspberries (reserve ½ cup for garnish).",
      "For ganache: heat cream until just simmering, pour over chocolate, let sit 2 minutes, then stir until smooth. Cool to spreadable consistency.",
      "To assemble: place one cake layer on serving plate, spread with half the raspberry cream.",
      "Top with second cake layer, spread with remaining raspberry cream.",
      "Top with third cake layer. Cover entire cake with chocolate ganache, smoothing with offset spatula.",
      "Arrange fresh raspberries on top and cascading down one side. Dust with cocoa powder.",
      "Refrigerate at least 1 hour before serving to set ganache. Store refrigerated up to 4 days."
    ],
    tags: ["gluten-free", "chocolate cake", "raspberry", "potato cake", "layer cake", "showstopper", "celebration", "birthday", "elegant", "special occasion"],
    nutrition: {
      calories: 560,
      protein: "7g",
      carbs: "65g",
      fat: "32g",
      fiber: "5g",
      sodium: "420mg"
    },
    isNaturallyGlutenFree: false
  }
];

async function addMissingRecipes() {
  try {
    console.log("🍰 Adding 2 missing potato cake recipes...\n");

    for (const recipe of missingRecipes) {
      const recipeData = {
        id: nanoid(),
        ...recipe,
        status: "published" as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.insert(recipes).values(recipeData);
      console.log(`✅ Added: ${recipe.title}`);
    }

    console.log("\n🎉 Successfully added 2 missing potato cake recipes!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding recipes:", error);
    process.exit(1);
  }
}

addMissingRecipes();

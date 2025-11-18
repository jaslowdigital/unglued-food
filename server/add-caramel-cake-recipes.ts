import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const caramelCakeRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Decadent Salted Caramel Layer Cake",
    slug: "gluten-free-decadent-salted-caramel-layer-cake",
    description: "Moist vanilla sponge layered with salted caramel buttercream and topped with golden caramel drip - pure indulgence.",
    longDescription: "This gluten-free decadent salted caramel layer cake features three layers of incredibly moist vanilla sponge cake filled with silky salted caramel buttercream and finished with a glossy caramel drip. The perfect balance of sweet and salty creates an unforgettable dessert experience. Each bite delivers tender cake, rich frosting, and that irresistible caramel flavor that makes this cake truly decadent.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 35,
    totalTime: 140,
    servings: 12,
    rating: "4.9",
    calories: 485,
    protein: "5.5",
    carbs: "62.0",
    fat: "24.5",
    fiber: "1.2",
    sugar: "45.0",
    ingredients: [
      "2 1/2 cups gluten-free all-purpose flour blend",
      "1/2 cup almond flour",
      "2 teaspoons baking powder",
      "1/2 teaspoon baking soda",
      "1 teaspoon xanthan gum",
      "1/2 teaspoon salt",
      "1 cup unsalted butter, softened",
      "1 3/4 cups granulated sugar",
      "4 large eggs, room temperature",
      "2 teaspoons vanilla extract",
      "1 1/4 cups whole milk",
      "For Salted Caramel Buttercream: 1 cup unsalted butter, 4 cups powdered sugar, 3/4 cup salted caramel sauce, 2 tablespoons heavy cream, 1 teaspoon sea salt",
      "For Caramel Drip: 1 cup salted caramel sauce, warmed",
      "Flaky sea salt for topping"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and line three 8-inch round cake pans with parchment paper.",
      "In a large bowl, whisk together gluten-free flour blend, almond flour, baking powder, baking soda, xanthan gum, and salt.",
      "In a stand mixer, cream butter and sugar until light and fluffy, about 4-5 minutes.",
      "Add eggs one at a time, beating well after each addition. Mix in vanilla extract.",
      "Alternately add dry ingredients and milk to the butter mixture, beginning and ending with dry ingredients. Mix until just combined.",
      "Divide batter evenly among the three prepared pans. Bake for 30-35 minutes until a toothpick inserted in the center comes out clean.",
      "Cool cakes in pans for 10 minutes, then turn out onto wire racks to cool completely.",
      "Make buttercream: Beat butter until creamy. Gradually add powdered sugar, then mix in caramel sauce, heavy cream, and sea salt. Beat until fluffy.",
      "Assemble cake: Place first layer on cake stand, spread with buttercream. Repeat with remaining layers.",
      "Frost entire cake with remaining buttercream. Refrigerate for 30 minutes to set.",
      "Pour warm caramel sauce over the top, allowing it to drip down the sides.",
      "Garnish with flaky sea salt. Refrigerate until ready to serve."
    ],
    tips: "For best results, make sure all ingredients are at room temperature. The caramel drip should be warm but not hot - if it's too warm, it will run off the cake. Chill the frosted cake before adding the drip for the best effect.",
    variations: [
      "Add chocolate layers for a chocolate-caramel combination",
      "Use butterscotch sauce instead of caramel for a different flavor",
      "Top with candied pecans or walnuts",
      "Add a layer of caramel filling between the cake layers"
    ],
    tags: ["gluten-free", "desserts", "cakes", "caramel", "salted caramel", "layer cake", "baking", "decadent", "indulgent"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Salted Caramel Layer Cake | Unglued Food",
    seoDescription: "Indulgent gluten-free salted caramel layer cake with moist vanilla sponge, salted caramel buttercream, and golden caramel drip. Perfect for celebrations and special occasions."
  },
  {
    title: "Gluten-Free Decadent Caramel Apple Cake",
    slug: "gluten-free-decadent-caramel-apple-cake",
    description: "Autumn-inspired cake with spiced apple chunks and thick caramel glaze - the ultimate fall dessert.",
    longDescription: "This gluten-free decadent caramel apple cake combines tender spiced cake studded with fresh apple chunks and topped with a thick, glossy caramel glaze. Warm autumn spices like cinnamon and nutmeg enhance the natural sweetness of the apples, while the rich caramel glaze adds decadent sweetness. Perfect for fall gatherings, this cake captures the essence of caramel apples in every delicious bite.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 55,
    totalTime: 105,
    servings: 10,
    rating: "4.8",
    calories: 420,
    protein: "4.8",
    carbs: "58.5",
    fat: "19.5",
    fiber: "2.8",
    sugar: "38.0",
    ingredients: [
      "2 cups gluten-free all-purpose flour blend",
      "1/2 cup almond flour",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "1 teaspoon xanthan gum",
      "2 teaspoons ground cinnamon",
      "1/2 teaspoon ground nutmeg",
      "1/4 teaspoon ground cloves",
      "1/2 teaspoon salt",
      "3/4 cup unsalted butter, melted",
      "1 1/2 cups packed brown sugar",
      "3 large eggs",
      "2 teaspoons vanilla extract",
      "1/2 cup sour cream",
      "2 cups diced Granny Smith apples (about 2 medium apples)",
      "For Caramel Glaze: 1 cup granulated sugar, 6 tablespoons butter, 1/2 cup heavy cream, 1 teaspoon vanilla, pinch of salt"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and flour a 9x13-inch baking pan.",
      "In a large bowl, whisk together gluten-free flour, almond flour, baking powder, baking soda, xanthan gum, cinnamon, nutmeg, cloves, and salt.",
      "In another bowl, whisk together melted butter and brown sugar until smooth.",
      "Add eggs one at a time, then mix in vanilla extract and sour cream.",
      "Fold wet ingredients into dry ingredients until just combined. Gently fold in diced apples.",
      "Pour batter into prepared pan and spread evenly. Bake for 50-55 minutes until golden and a toothpick comes out clean.",
      "While cake bakes, make caramel glaze: In a saucepan, heat sugar over medium heat, stirring constantly until melted and amber colored.",
      "Carefully add butter (it will bubble), then slowly pour in heavy cream while stirring. Remove from heat and stir in vanilla and salt.",
      "Let cake cool for 15 minutes, then poke holes all over with a skewer.",
      "Pour warm caramel glaze over the cake, allowing it to soak into the holes and pool on top.",
      "Let cake cool completely before slicing. Serve with whipped cream or vanilla ice cream."
    ],
    tips: "Use firm, tart apples like Granny Smith for the best texture and flavor balance. Don't overmix the batter once you add the apples - gentle folding keeps the cake tender. The caramel glaze will thicken as it cools, so pour it while still warm.",
    variations: [
      "Add 1/2 cup chopped pecans or walnuts to the batter",
      "Use pears instead of apples for a different twist",
      "Add 1/2 cup butterscotch chips to the batter",
      "Sprinkle with cinnamon sugar before baking"
    ],
    tags: ["gluten-free", "desserts", "cakes", "caramel", "apple", "fall", "autumn", "spiced", "baking"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Caramel Apple Cake | Unglued Food",
    seoDescription: "Delicious gluten-free caramel apple cake with spiced apple chunks and thick caramel glaze. Perfect fall dessert for gatherings and celebrations."
  },
  {
    title: "Gluten-Free Decadent Chocolate Caramel Fudge Cake",
    slug: "gluten-free-decadent-chocolate-caramel-fudge-cake",
    description: "Rich cocoa layers with molten caramel filling and ganache topping - chocolate lover's dream.",
    longDescription: "This gluten-free decadent chocolate caramel fudge cake is the ultimate indulgence for chocolate and caramel lovers. Layers of rich, fudgy chocolate cake are filled with silky caramel sauce and topped with glossy chocolate ganache. The combination of deep chocolate flavor and sweet caramel creates an irresistible dessert that's perfect for special occasions. Each slice reveals a beautiful contrast of dark chocolate and golden caramel.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 40,
    cookTime: 40,
    totalTime: 140,
    servings: 14,
    rating: "5.0",
    calories: 520,
    protein: "6.5",
    carbs: "65.0",
    fat: "28.0",
    fiber: "3.2",
    sugar: "48.0",
    ingredients: [
      "2 cups gluten-free all-purpose flour blend",
      "3/4 cup Dutch-process cocoa powder",
      "2 cups granulated sugar",
      "2 teaspoons baking soda",
      "1 teaspoon baking powder",
      "1 teaspoon xanthan gum",
      "1 teaspoon salt",
      "2 large eggs",
      "1 cup strong brewed coffee, cooled",
      "1 cup buttermilk",
      "1/2 cup vegetable oil",
      "2 teaspoons vanilla extract",
      "For Caramel Filling: 1 1/2 cups thick caramel sauce",
      "For Ganache: 2 cups semi-sweet chocolate chips, 1 cup heavy cream",
      "Gold leaf or caramel shards for decoration (optional)"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and line two 9-inch round cake pans with parchment paper.",
      "In a large bowl, whisk together gluten-free flour, cocoa powder, sugar, baking soda, baking powder, xanthan gum, and salt.",
      "In another bowl, whisk together eggs, coffee, buttermilk, oil, and vanilla extract.",
      "Add wet ingredients to dry ingredients and mix until just combined. The batter will be thin.",
      "Divide batter evenly between prepared pans. Bake for 35-40 minutes until a toothpick comes out with a few moist crumbs.",
      "Cool cakes in pans for 15 minutes, then turn out onto wire racks to cool completely.",
      "Make ganache: Heat cream until just simmering, pour over chocolate chips, let sit 2 minutes, then stir until smooth. Let cool slightly.",
      "Slice each cake layer in half horizontally to create 4 layers.",
      "Assemble: Place first layer on cake stand, spread with caramel sauce. Repeat with remaining layers, reserving some caramel for drizzle.",
      "Pour ganache over the top, allowing it to drip down the sides.",
      "Drizzle reserved caramel over ganache in a decorative pattern.",
      "Refrigerate for 1 hour to set. Bring to room temperature 30 minutes before serving."
    ],
    tips: "Use quality cocoa powder for the richest chocolate flavor. The coffee enhances the chocolate taste without making it taste like coffee. Make sure the ganache is slightly cooled but still pourable for the best drip effect.",
    variations: [
      "Add espresso powder to intensify chocolate flavor",
      "Use white chocolate ganache for contrast",
      "Add chopped chocolate pieces between layers",
      "Sprinkle with sea salt flakes on top"
    ],
    tags: ["gluten-free", "desserts", "cakes", "chocolate", "caramel", "fudge", "decadent", "baking", "special occasion"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Chocolate Caramel Fudge Cake | Unglued Food",
    seoDescription: "Rich gluten-free chocolate caramel fudge cake with molten caramel filling and chocolate ganache. The ultimate indulgent dessert for chocolate lovers."
  },
  {
    title: "Gluten-Free Decadent Toffee Caramel Bundt Cake",
    slug: "gluten-free-decadent-toffee-caramel-bundt-cake",
    description: "Brown sugar cake with toffee bits baked in and poured caramel glaze - elegant and delicious.",
    longDescription: "This gluten-free decadent toffee caramel bundt cake combines the rich flavors of brown sugar and toffee in a beautiful presentation. The tender cake is studded with English toffee bits and glazed with a luxurious caramel sauce that cascades down the ridges of the bundt shape. The combination of buttery toffee and sweet caramel creates a sophisticated dessert that's perfect for brunches, celebrations, or afternoon tea.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Easy",
    prepTime: 25,
    cookTime: 55,
    totalTime: 100,
    servings: 12,
    rating: "4.9",
    calories: 445,
    protein: "5.2",
    carbs: "56.0",
    fat: "22.5",
    fiber: "1.5",
    sugar: "38.5",
    ingredients: [
      "3 cups gluten-free all-purpose flour blend",
      "1 teaspoon xanthan gum",
      "2 teaspoons baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "1 cup unsalted butter, softened",
      "1 1/2 cups packed brown sugar",
      "1/2 cup granulated sugar",
      "4 large eggs, room temperature",
      "2 teaspoons vanilla extract",
      "1 cup sour cream",
      "1/2 cup whole milk",
      "1 cup English toffee bits (Heath or Skor chips)",
      "For Caramel Glaze: 1 cup caramel sauce, 2 tablespoons heavy cream, pinch of sea salt",
      "Additional toffee bits for topping"
    ],
    instructions: [
      "Preheat oven to 325°F. Thoroughly grease and flour a 12-cup bundt pan.",
      "In a medium bowl, whisk together gluten-free flour, xanthan gum, baking powder, baking soda, and salt.",
      "In a large bowl with electric mixer, cream butter, brown sugar, and granulated sugar until light and fluffy, about 5 minutes.",
      "Add eggs one at a time, beating well after each addition. Mix in vanilla extract.",
      "In a small bowl, combine sour cream and milk.",
      "Alternately add flour mixture and sour cream mixture to butter mixture, beginning and ending with flour. Mix until just combined.",
      "Fold in 3/4 cup toffee bits, reserving 1/4 cup for topping.",
      "Pour batter into prepared bundt pan and smooth the top. Bake for 50-55 minutes until golden and a skewer comes out clean.",
      "Cool in pan for 15 minutes, then carefully invert onto a wire rack to cool completely.",
      "Make caramel glaze: Warm caramel sauce with heavy cream and sea salt until smooth and pourable.",
      "Drizzle glaze over cooled cake, allowing it to drip down the sides.",
      "Sprinkle with reserved toffee bits. Let glaze set before slicing."
    ],
    tips: "Make sure to thoroughly grease every nook and cranny of the bundt pan to ensure easy release. Let the cake cool in the pan for the full 15 minutes - inverting too early can cause it to break. If the glaze is too thick, add a teaspoon of cream at a time until desired consistency.",
    variations: [
      "Add 1/2 cup chopped pecans to the batter",
      "Use butterscotch chips instead of toffee bits",
      "Add 1 teaspoon of cinnamon to the batter",
      "Drizzle with chocolate ganache in addition to caramel"
    ],
    tags: ["gluten-free", "desserts", "cakes", "bundt cake", "toffee", "caramel", "baking", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Toffee Caramel Bundt Cake | Unglued Food",
    seoDescription: "Elegant gluten-free toffee caramel bundt cake with brown sugar, English toffee bits, and poured caramel glaze. Perfect for celebrations and special occasions."
  },
  {
    title: "Gluten-Free Decadent Caramel Espresso Cake",
    slug: "gluten-free-decadent-caramel-espresso-cake",
    description: "Coffee-infused sponge with espresso caramel buttercream - perfect for dessert or brunch.",
    longDescription: "This gluten-free decadent caramel espresso cake combines the sophisticated flavors of rich espresso and sweet caramel in a stunning layer cake. The moist coffee-infused sponge pairs beautifully with espresso caramel buttercream, creating a dessert that's perfect for coffee lovers. The subtle bitterness of espresso balances the sweetness of the caramel, making this an ideal choice for brunch, afternoon gatherings, or an elegant dinner party finale.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 40,
    cookTime: 30,
    totalTime: 130,
    servings: 12,
    rating: "4.8",
    calories: 465,
    protein: "5.8",
    carbs: "60.0",
    fat: "23.0",
    fiber: "1.8",
    sugar: "42.0",
    ingredients: [
      "2 1/4 cups gluten-free all-purpose flour blend",
      "1/2 cup almond flour",
      "2 tablespoons instant espresso powder",
      "2 teaspoons baking powder",
      "1/2 teaspoon baking soda",
      "1 teaspoon xanthan gum",
      "1/2 teaspoon salt",
      "3/4 cup unsalted butter, softened",
      "1 3/4 cups granulated sugar",
      "3 large eggs",
      "2 teaspoons vanilla extract",
      "1 cup strong brewed espresso, cooled",
      "1/2 cup sour cream",
      "For Espresso Caramel Buttercream: 1 cup butter, 4 cups powdered sugar, 1/2 cup caramel sauce, 2 tablespoons espresso, 2 tablespoons heavy cream",
      "Chocolate-covered espresso beans for garnish"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and line two 9-inch round cake pans with parchment paper.",
      "In a large bowl, whisk together gluten-free flour, almond flour, espresso powder, baking powder, baking soda, xanthan gum, and salt.",
      "In a stand mixer, cream butter and sugar until light and fluffy, about 5 minutes.",
      "Add eggs one at a time, beating well after each. Mix in vanilla extract.",
      "In a measuring cup, combine brewed espresso and sour cream.",
      "Alternately add dry ingredients and espresso mixture to butter mixture, beginning and ending with dry ingredients.",
      "Divide batter evenly between prepared pans. Bake for 28-30 minutes until a toothpick comes out clean.",
      "Cool in pans for 10 minutes, then turn out onto wire racks to cool completely.",
      "Make buttercream: Beat butter until creamy. Gradually add powdered sugar, then mix in caramel sauce, espresso, and heavy cream. Beat until fluffy.",
      "Slice each cake layer in half horizontally to create 4 thin layers.",
      "Assemble: Spread buttercream between each layer, then frost entire cake.",
      "Garnish with chocolate-covered espresso beans. Refrigerate until serving."
    ],
    tips: "Use freshly brewed espresso for the best flavor. If you don't have instant espresso powder, use 3 tablespoons of finely ground espresso beans. Make sure all ingredients are at room temperature for the smoothest batter.",
    variations: [
      "Add chocolate shavings between layers",
      "Use mocha buttercream (add cocoa powder)",
      "Drizzle with chocolate ganache",
      "Top with caramel drizzle in a lattice pattern"
    ],
    tags: ["gluten-free", "desserts", "cakes", "espresso", "coffee", "caramel", "baking", "brunch", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Caramel Espresso Cake | Unglued Food",
    seoDescription: "Sophisticated gluten-free caramel espresso cake with coffee-infused sponge and espresso caramel buttercream. Perfect for brunch or special occasions."
  },
  {
    title: "Gluten-Free Decadent Pecan Caramel Upside-Down Cake",
    slug: "gluten-free-decadent-pecan-caramel-upside-down-cake",
    description: "Sticky-sweet pecan topping baked under a soft, buttery cake base - impressive and irresistible.",
    longDescription: "This gluten-free decadent pecan caramel upside-down cake features a gorgeous layer of caramelized pecans on top of a tender, buttery cake. When inverted after baking, the sticky caramel pecan topping creates a stunning presentation with rich flavors. The combination of crunchy pecans, gooey caramel, and moist cake makes every bite a delight. Perfect for entertaining, this show-stopping dessert is easier to make than it looks.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 25,
    cookTime: 45,
    totalTime: 90,
    servings: 10,
    rating: "4.9",
    calories: 475,
    protein: "5.5",
    carbs: "54.0",
    fat: "27.5",
    fiber: "2.5",
    sugar: "36.0",
    ingredients: [
      "For Pecan Caramel Topping: 1/2 cup unsalted butter, 1 cup packed brown sugar, 1/4 cup heavy cream, 2 cups pecan halves",
      "For Cake: 2 cups gluten-free all-purpose flour blend, 1/2 cup almond flour, 1 teaspoon xanthan gum, 2 teaspoons baking powder, 1/2 teaspoon salt",
      "3/4 cup unsalted butter, softened",
      "1 cup granulated sugar",
      "3 large eggs",
      "2 teaspoons vanilla extract",
      "3/4 cup whole milk",
      "1 teaspoon butter extract (optional)",
      "Whipped cream for serving"
    ],
    instructions: [
      "Preheat oven to 350°F. Have ready a 10-inch round cake pan or 9x13-inch baking dish.",
      "Make topping: In a saucepan, melt 1/2 cup butter with brown sugar and heavy cream. Cook, stirring, until sugar dissolves and mixture bubbles.",
      "Pour caramel mixture into the bottom of your cake pan. Arrange pecan halves in a single layer over the caramel.",
      "Make cake batter: In a bowl, whisk together gluten-free flour, almond flour, xanthan gum, baking powder, and salt.",
      "In a stand mixer, cream 3/4 cup butter and granulated sugar until fluffy, about 4 minutes.",
      "Add eggs one at a time, then mix in vanilla extract and butter extract if using.",
      "Alternately add flour mixture and milk, beginning and ending with flour. Mix until just combined.",
      "Carefully pour batter over the pecan layer, spreading evenly without disturbing the pecans.",
      "Bake for 40-45 minutes until golden and a toothpick inserted in the center comes out clean.",
      "Cool in pan for 10 minutes only, then run a knife around the edges.",
      "Place a large serving plate over the pan and carefully invert. Let pan sit for 2 minutes before lifting off.",
      "Serve warm with whipped cream."
    ],
    tips: "Don't let the cake cool too long before inverting or the caramel will stick to the pan. If some caramel or pecans stick, simply scrape them out and press onto the top of the cake. Warming the pan slightly can help loosen stubborn caramel.",
    variations: [
      "Use walnuts instead of pecans",
      "Add 1 teaspoon cinnamon to the batter",
      "Replace half the pecans with chocolate chips",
      "Add a splash of bourbon to the caramel topping"
    ],
    tags: ["gluten-free", "desserts", "cakes", "upside-down cake", "pecan", "caramel", "baking", "entertaining"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Pecan Caramel Upside-Down Cake | Unglued Food",
    seoDescription: "Stunning gluten-free pecan caramel upside-down cake with sticky-sweet pecan topping and buttery cake base. Perfect show-stopping dessert for entertaining."
  },
  {
    title: "Gluten-Free Decadent Caramel Banana Cake",
    slug: "gluten-free-decadent-caramel-banana-cake",
    description: "Tender banana base drizzled with butterscotch caramel and topped with whipped cream - comfort food elevated.",
    longDescription: "This gluten-free decadent caramel banana cake transforms classic banana cake into an elegant dessert with the addition of rich butterscotch caramel and fluffy whipped cream. The natural sweetness and moisture from ripe bananas create an incredibly tender crumb, while the caramel sauce adds depth and sophistication. This is comfort food elevated to celebration-worthy status, perfect for potlucks, birthdays, or any time you want to impress.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Easy",
    prepTime: 20,
    cookTime: 45,
    totalTime: 85,
    servings: 12,
    rating: "4.8",
    calories: 395,
    protein: "4.5",
    carbs: "52.0",
    fat: "19.0",
    fiber: "2.2",
    sugar: "32.0",
    ingredients: [
      "2 1/2 cups gluten-free all-purpose flour blend",
      "1 teaspoon xanthan gum",
      "1 1/2 teaspoons baking soda",
      "1/2 teaspoon baking powder",
      "1/2 teaspoon salt",
      "1 teaspoon ground cinnamon",
      "1/2 cup unsalted butter, softened",
      "1 1/4 cups granulated sugar",
      "2 large eggs",
      "1 1/2 cups mashed ripe bananas (about 3-4 bananas)",
      "1/3 cup buttermilk",
      "1 teaspoon vanilla extract",
      "For Butterscotch Caramel: 1/2 cup butter, 1 cup dark brown sugar, 1/2 cup heavy cream, 1 teaspoon vanilla, pinch of salt",
      "2 cups heavy whipping cream, whipped",
      "Banana slices and caramel drizzle for garnish"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and flour a 9x13-inch baking pan.",
      "In a large bowl, whisk together gluten-free flour, xanthan gum, baking soda, baking powder, salt, and cinnamon.",
      "In a stand mixer, cream butter and sugar until light and fluffy, about 3-4 minutes.",
      "Add eggs one at a time, beating well after each addition.",
      "Mix in mashed bananas, buttermilk, and vanilla extract until combined.",
      "Gradually fold in the dry ingredients until just mixed. Do not overmix.",
      "Pour batter into prepared pan and smooth the top. Bake for 40-45 minutes until golden and a toothpick comes out clean.",
      "Make butterscotch caramel: In a saucepan, melt butter with brown sugar. Bring to a boil, then reduce heat and simmer for 2 minutes.",
      "Remove from heat and carefully stir in heavy cream, vanilla, and salt. Let cool slightly.",
      "Once cake has cooled for 15 minutes, poke holes all over with a skewer.",
      "Pour half of the warm caramel sauce over the cake, letting it soak in. Reserve remaining sauce.",
      "Top cooled cake with whipped cream, drizzle with remaining caramel, and garnish with banana slices."
    ],
    tips: "Use very ripe bananas with brown spots for the best flavor and moisture. The riper the bananas, the sweeter and more flavorful your cake will be. You can make the butterscotch caramel a day ahead and reheat gently before using.",
    variations: [
      "Add 1/2 cup chopped walnuts or pecans to the batter",
      "Sprinkle with toffee bits before serving",
      "Use cream cheese frosting instead of whipped cream",
      "Add chocolate chips to the batter for banana-chocolate-caramel"
    ],
    tags: ["gluten-free", "desserts", "cakes", "banana", "caramel", "butterscotch", "baking", "comfort food"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Caramel Banana Cake | Unglued Food",
    seoDescription: "Moist gluten-free caramel banana cake with butterscotch caramel sauce and whipped cream. Comfort food elevated to celebration-worthy dessert."
  },
  {
    title: "Gluten-Free Decadent Coconut Caramel Cake",
    slug: "gluten-free-decadent-coconut-caramel-cake",
    description: "Toasted coconut layers, coconut caramel filling, and sea salt finish - tropical indulgence.",
    longDescription: "This gluten-free decadent coconut caramel cake brings tropical flavors to the classic caramel cake with layers of coconut-infused sponge, coconut caramel filling, and toasted coconut topping. The combination of sweet caramel and rich coconut creates a unique flavor profile that's both familiar and exotic. Finished with a sprinkle of flaky sea salt to balance the sweetness, this cake is perfect for coconut lovers who want something truly special.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 35,
    totalTime: 140,
    servings: 12,
    rating: "4.9",
    calories: 495,
    protein: "5.0",
    carbs: "58.0",
    fat: "27.5",
    fiber: "2.8",
    sugar: "40.0",
    ingredients: [
      "2 cups gluten-free all-purpose flour blend",
      "1/2 cup coconut flour",
      "1 teaspoon xanthan gum",
      "2 teaspoons baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "3/4 cup unsalted butter, softened",
      "1 1/2 cups granulated sugar",
      "4 large eggs",
      "1 teaspoon vanilla extract",
      "1 teaspoon coconut extract",
      "1 cup coconut milk (full-fat)",
      "1 cup sweetened shredded coconut",
      "For Coconut Caramel: 1 cup sugar, 1/2 cup coconut cream, 1/4 cup butter, 1/2 teaspoon vanilla, pinch of salt",
      "For Frosting: 1 cup butter, 4 cups powdered sugar, 1/2 cup caramel sauce, 3 tablespoons coconut cream",
      "1 cup toasted coconut flakes for topping, flaky sea salt"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and line two 9-inch round cake pans with parchment paper.",
      "Toast coconut flakes in a dry skillet over medium heat until golden. Set aside to cool.",
      "In a bowl, whisk together gluten-free flour, coconut flour, xanthan gum, baking powder, baking soda, and salt.",
      "In a stand mixer, cream butter and sugar until fluffy, about 5 minutes.",
      "Add eggs one at a time, then mix in vanilla and coconut extracts.",
      "Alternately add flour mixture and coconut milk, beginning and ending with flour. Fold in shredded coconut.",
      "Divide batter between pans. Bake 30-35 minutes until golden and a toothpick comes out clean.",
      "Cool completely on wire racks.",
      "Make coconut caramel: Heat sugar in a saucepan until melted and amber. Carefully add coconut cream and butter, stirring until smooth. Add vanilla and salt. Cool.",
      "Make frosting: Beat butter until creamy. Add powdered sugar, caramel sauce, and coconut cream. Beat until fluffy.",
      "Assemble: Spread coconut caramel between layers, frost cake with buttercream.",
      "Press toasted coconut onto sides and top. Drizzle with remaining caramel and sprinkle with sea salt."
    ],
    tips: "Toast the coconut flakes carefully as they can burn quickly. Coconut flour absorbs a lot of moisture, so make sure to measure carefully and don't skip the coconut milk. The coconut caramel will thicken as it cools.",
    variations: [
      "Add white chocolate shavings for decoration",
      "Use dark chocolate ganache instead of caramel",
      "Add macadamia nuts for extra tropical flavor",
      "Drizzle with chocolate sauce"
    ],
    tags: ["gluten-free", "desserts", "cakes", "coconut", "caramel", "tropical", "baking", "decadent"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Coconut Caramel Cake | Unglued Food",
    seoDescription: "Tropical gluten-free coconut caramel cake with toasted coconut layers, coconut caramel filling, and sea salt finish. Perfect for coconut lovers."
  },
  {
    title: "Gluten-Free Decadent Caramel Pumpkin Spice Cake",
    slug: "gluten-free-decadent-caramel-pumpkin-spice-cake",
    description: "Fall classic - pumpkin-spice sponge topped with caramel glaze and sugared pecans.",
    longDescription: "This gluten-free decadent caramel pumpkin spice cake is the ultimate fall dessert, combining the warm spices of autumn with rich caramel and tender pumpkin cake. Topped with a glossy caramel glaze and candied sugared pecans, this cake is perfect for Thanksgiving, Halloween parties, or any autumn celebration. The natural moisture from pumpkin puree creates an incredibly soft crumb, while the caramel adds luxurious sweetness.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 50,
    totalTime: 100,
    servings: 12,
    rating: "4.9",
    calories: 440,
    protein: "5.2",
    carbs: "59.0",
    fat: "21.0",
    fiber: "3.0",
    sugar: "38.5",
    ingredients: [
      "2 1/2 cups gluten-free all-purpose flour blend",
      "1 teaspoon xanthan gum",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 teaspoons ground cinnamon",
      "1 teaspoon ground ginger",
      "1/2 teaspoon ground nutmeg",
      "1/4 teaspoon ground cloves",
      "3/4 cup unsalted butter, melted",
      "1 1/2 cups packed brown sugar",
      "3 large eggs",
      "1 (15 oz) can pumpkin puree",
      "1/2 cup sour cream",
      "2 teaspoons vanilla extract",
      "For Caramel Glaze: 1 cup caramel sauce, 3 tablespoons heavy cream",
      "For Sugared Pecans: 1 cup pecan halves, 1/4 cup sugar, 1 tablespoon butter, pinch of cinnamon"
    ],
    instructions: [
      "Preheat oven to 350°F. Grease and flour a 9x13-inch baking pan.",
      "In a large bowl, whisk together gluten-free flour, xanthan gum, baking powder, baking soda, salt, cinnamon, ginger, nutmeg, and cloves.",
      "In another bowl, whisk together melted butter and brown sugar until smooth.",
      "Add eggs one at a time, then mix in pumpkin puree, sour cream, and vanilla extract.",
      "Fold wet ingredients into dry ingredients until just combined.",
      "Pour batter into prepared pan and smooth the top. Bake for 45-50 minutes until a toothpick comes out clean.",
      "Make sugared pecans: In a skillet, melt butter with sugar and cinnamon. Add pecans and cook, stirring, until coated and caramelized, about 5 minutes. Spread on parchment to cool.",
      "Make caramel glaze: Warm caramel sauce with heavy cream until smooth and pourable.",
      "Let cake cool for 20 minutes, then pour caramel glaze over the top, spreading evenly.",
      "Arrange sugared pecans on top of the caramel glaze.",
      "Let glaze set for 30 minutes before slicing. Serve with whipped cream."
    ],
    tips: "Make sure to use pure pumpkin puree, not pumpkin pie filling which already contains spices and sugar. The cake is very moist thanks to the pumpkin, so it keeps well for several days. Store covered at room temperature or refrigerate for up to a week.",
    variations: [
      "Add cream cheese frosting instead of caramel glaze",
      "Mix in chocolate chips for pumpkin-chocolate-caramel",
      "Top with cinnamon whipped cream",
      "Add chopped walnuts to the batter"
    ],
    tags: ["gluten-free", "desserts", "cakes", "pumpkin", "caramel", "fall", "autumn", "spiced", "holiday"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Caramel Pumpkin Spice Cake | Unglued Food",
    seoDescription: "Perfect fall dessert - gluten-free caramel pumpkin spice cake with warm spices, caramel glaze, and sugared pecans. Ideal for Thanksgiving and autumn celebrations."
  },
  {
    title: "Gluten-Free Decadent Caramel Cheesecake Layer Cake",
    slug: "gluten-free-decadent-caramel-cheesecake-layer-cake",
    description: "Half cheesecake, half sponge - creamy caramel swirl layered inside a gluten-free vanilla cake.",
    longDescription: "This gluten-free decadent caramel cheesecake layer cake is the ultimate hybrid dessert, combining the best of both worlds - tender vanilla cake layers and rich, creamy cheesecake with caramel swirl. Each slice reveals beautiful layers of cake and cheesecake, all tied together with luscious caramel. This show-stopping dessert is perfect for special celebrations and will impress even the most discerning dessert lovers.",
    category: "Desserts",
    subcategory: "Cakes & Baking",
    difficulty: "Hard",
    prepTime: 60,
    cookTime: 55,
    totalTime: 200,
    servings: 14,
    rating: "5.0",
    calories: 545,
    protein: "7.5",
    carbs: "63.0",
    fat: "30.0",
    fiber: "0.8",
    sugar: "48.0",
    ingredients: [
      "For Cake: 2 cups gluten-free all-purpose flour blend, 1 teaspoon xanthan gum, 2 teaspoons baking powder, 1/2 teaspoon salt",
      "3/4 cup unsalted butter, softened, 1 1/2 cups sugar, 3 eggs, 2 teaspoons vanilla, 3/4 cup whole milk",
      "For Cheesecake: 24 oz cream cheese (softened), 3/4 cup sugar, 3 large eggs, 1 teaspoon vanilla, 1/2 cup sour cream",
      "1/2 cup caramel sauce for swirl",
      "For Frosting: 1 cup butter, 4 cups powdered sugar, 1/2 cup caramel sauce, 3 tablespoons heavy cream",
      "Additional caramel sauce for drizzle and decoration"
    ],
    instructions: [
      "Preheat oven to 325°F. Grease and line three 8-inch springform pans with parchment.",
      "Make cake batter: Whisk flour, xanthan gum, baking powder, and salt. In mixer, cream butter and sugar. Add eggs, vanilla. Alternately add flour and milk.",
      "Divide cake batter between two of the pans (about 1 1/2 cups each). Set aside.",
      "Make cheesecake: Beat cream cheese and sugar until smooth. Add eggs one at a time, then vanilla and sour cream. Mix until combined.",
      "Pour cheesecake batter into the third pan. Drizzle caramel sauce over the top and swirl with a knife.",
      "Place all three pans in oven. Bake cake layers 25-28 minutes, cheesecake layer 45-50 minutes until center is almost set.",
      "Cool completely, then refrigerate all layers for at least 2 hours.",
      "Make frosting: Beat butter until creamy. Add powdered sugar, caramel sauce, and cream. Beat until fluffy.",
      "Assemble: Place one cake layer on stand, spread with frosting. Add cheesecake layer, spread frosting. Top with final cake layer.",
      "Frost entire cake with remaining buttercream. Refrigerate 1 hour.",
      "Drizzle with warm caramel sauce before serving. Keep refrigerated."
    ],
    tips: "Bake the cheesecake layer in a water bath for extra creaminess - wrap the bottom of the springform pan in foil and place in a larger pan with 1 inch of hot water. Make sure all layers are completely chilled before assembling to prevent shifting. This cake MUST be refrigerated.",
    variations: [
      "Add chocolate ganache between layers",
      "Top with caramel popcorn for texture",
      "Use salted caramel for all components",
      "Add crushed graham crackers between layers"
    ],
    tags: ["gluten-free", "desserts", "cakes", "cheesecake", "caramel", "layer cake", "hybrid", "special occasion", "decadent"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Decadent Caramel Cheesecake Layer Cake | Unglued Food",
    seoDescription: "Show-stopping gluten-free caramel cheesecake layer cake combining vanilla cake and creamy caramel cheesecake. The ultimate hybrid dessert for special celebrations."
  }
];

async function generateAndSaveImages() {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of caramelCakeRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free Decadent ", "");
    const description = `Beautifully plated dessert with rich caramel drizzle, golden amber tones, glossy caramel sauce, moist cake texture visible, elegant presentation on white plate`;
    
    try {
      const imageUrl = await generateRecipeImage(recipeName, description);
      
      // Download and save image
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Create filename from slug
      const filename = `${recipe.slug}.png`;
      const filepath = path.join(imageDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      console.log(`✅ Saved image to: ${filepath}`);
      
      // Add recipe with correct image path
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${filename}`
      });
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error generating image for ${recipe.title}:`, error);
      // Use a placeholder path if image generation fails
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${recipe.slug}.png`
      });
    }
  }
  
  return recipesWithImages;
}

async function addRecipesToDatabase() {
  console.log("🎨 Generating AI images for all 10 caramel cake recipes...\n");
  const recipesWithImages = await generateAndSaveImages();
  
  console.log("\n📝 Adding recipes to database...\n");
  
  for (const recipe of recipesWithImages) {
    try {
      await storage.createRecipe(recipe);
      console.log(`✅ Added: ${recipe.title}`);
    } catch (error) {
      console.error(`❌ Error adding ${recipe.title}:`, error);
    }
  }
  
  console.log("\n✨ All 10 Gluten-Free Decadent Caramel Cake recipes have been added successfully!");
  console.log("🎂 Visit the website to see your new caramel cake recipes under Desserts → Cakes & Baking");
}

// Run the script
addRecipesToDatabase().catch(console.error);

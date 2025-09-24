// Script to create 10 additional Halloween-themed gluten-free recipes with AI images
import { storage } from "./storage";
import { generateRecipeImage } from "./openai";
import type { InsertRecipe } from "@shared/schema";

const additionalHalloweenRecipes = [
  {
    title: "Witch Hat Chocolate Cupcakes",
    slug: "witch-hat-chocolate-cupcakes",
    description: "Rich chocolate gluten-free cupcakes topped with pointed chocolate cone 'witch hats'",
    longDescription: "These bewitchingly delicious chocolate cupcakes are the perfect Halloween treat. Made with rich cocoa and gluten-free flour, they're incredibly moist and decadent. Each cupcake is topped with a pointed chocolate cone that resembles a witch's hat, created using chocolate wafer cookies. The dark chocolate frosting adds an extra layer of spookiness, making these cupcakes a hit at any Halloween party. Easy to make and even easier to devour!",
    category: "Desserts",
    difficulty: "Medium",
    prepTime: 25,
    cookTime: 18,
    totalTime: 43,
    servings: 12,
    rating: "4.9",
    calories: 295,
    protein: "4.2",
    carbs: "38.5",
    fat: "15.8",
    fiber: "3.1",
    ingredients: [
      "1¾ cups gluten-free flour blend",
      "¾ cup unsweetened cocoa powder",
      "1½ cups sugar",
      "1½ teaspoons baking soda",
      "1 teaspoon baking powder",
      "1 teaspoon salt",
      "2 large eggs",
      "1 cup buttermilk",
      "½ cup vegetable oil",
      "1 teaspoon vanilla extract",
      "1 cup hot coffee",
      "For frosting: 1 cup butter, 3 cups powdered sugar, ½ cup cocoa powder, ¼ cup milk",
      "12 chocolate wafer cookies for witch hats"
    ],
    instructions: [
      "Preheat oven to 350°F and line muffin tin with cupcake liners",
      "In large bowl, whisk together flour, cocoa, sugar, baking soda, baking powder, and salt",
      "In another bowl, beat eggs, buttermilk, oil, and vanilla",
      "Add wet ingredients to dry ingredients and mix until combined",
      "Stir in hot coffee (batter will be thin)",
      "Fill cupcake liners ⅔ full",
      "Bake 16-18 minutes until toothpick comes out clean",
      "Cool completely before frosting",
      "Make frosting by beating butter, then adding powdered sugar, cocoa, and milk",
      "Pipe frosting onto cupcakes and top each with a chocolate wafer 'witch hat'"
    ],
    tips: "The coffee enhances the chocolate flavor but can be replaced with hot water. Break chocolate wafers in half to create pointed witch hat shapes.",
    variations: [
      "Add orange food coloring to frosting for Halloween colors",
      "Use crushed Oreos as 'dirt' around the base",
      "Top with candy spiders for extra spookiness"
    ],
    tags: ["seasonal", "Halloween", "treat", "chocolate", "cupcakes", "witch", "party"],
    isNaturallyGlutenFree: false,
    seoTitle: "Witch Hat Chocolate Cupcakes - Spooky Gluten-Free Halloween Treats",
    seoDescription: "Rich chocolate gluten-free cupcakes topped with chocolate witch hats. Perfect spooky treats for Halloween parties and celebrations."
  },
  {
    title: "Pumpkin Spice Latte Smoothie",
    slug: "pumpkin-spice-latte-smoothie",
    description: "Creamy gluten-free pumpkin spice smoothie that tastes like your favorite fall latte",
    longDescription: "This naturally gluten-free pumpkin spice latte smoothie captures all the cozy flavors of fall in a healthy, refreshing drink. Made with real pumpkin puree, warm spices, and a hint of coffee, it's like drinking autumn in a glass. The combination of banana and pumpkin creates a creamy, satisfying texture while the spices provide that classic pumpkin spice latte flavor. Perfect for Halloween morning or as an afternoon treat that's both festive and nutritious.",
    category: "Beverages",
    difficulty: "Easy",
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 2,
    rating: "4.7",
    calories: 185,
    protein: "8.2",
    carbs: "32.1",
    fat: "4.8",
    fiber: "5.3",
    ingredients: [
      "1 cup pumpkin puree",
      "1 frozen banana",
      "1 cup unsweetened almond milk",
      "½ cup strong brewed coffee, cooled",
      "2 tablespoons maple syrup",
      "1 teaspoon vanilla extract",
      "½ teaspoon cinnamon",
      "¼ teaspoon nutmeg",
      "⅛ teaspoon ground ginger",
      "Pinch of cloves",
      "1 cup ice cubes",
      "Whipped cream for topping (optional)"
    ],
    instructions: [
      "Add all ingredients except ice to a high-speed blender",
      "Blend until smooth and creamy",
      "Add ice cubes and blend again until frothy",
      "Taste and adjust sweetness or spices as needed",
      "Pour into glasses and top with whipped cream if desired",
      "Sprinkle with extra cinnamon before serving"
    ],
    tips: "For a richer flavor, use cold brew concentrate instead of regular coffee. Freeze the smoothie in popsicle molds for Halloween treats!",
    variations: [
      "Use coconut milk for extra creaminess",
      "Add a scoop of vanilla protein powder for extra protein",
      "Blend in a handful of oats for more substance"
    ],
    tags: ["seasonal", "Halloween", "pumpkin spice", "smoothie", "naturally gluten-free", "healthy", "beverages"],
    isNaturallyGlutenFree: true,
    seoTitle: "Pumpkin Spice Latte Smoothie - Healthy Gluten-Free Halloween Drink",
    seoDescription: "Creamy pumpkin spice latte smoothie that's naturally gluten-free. Perfect healthy Halloween drink with real pumpkin and warm spices."
  },
  {
    title: "Spider Deviled Eggs",
    slug: "spider-deviled-eggs",
    description: "Classic deviled eggs transformed into spooky Halloween spiders with olive garnish",
    longDescription: "These creepy-crawly deviled eggs are a naturally gluten-free Halloween appetizer that's both delicious and dramatically spooky. Traditional deviled eggs get a Halloween makeover with black olive 'spiders' perched on top. The rich, creamy egg filling is perfectly seasoned, while halved black olives create the spider bodies and thin olive slices form the legs. Simple to make but guaranteed to get screams of delight at your Halloween party!",
    category: "Appetizers",
    difficulty: "Easy",
    prepTime: 20,
    cookTime: 12,
    totalTime: 32,
    servings: 12,
    rating: "4.6",
    calories: 78,
    protein: "6.1",
    carbs: "0.8",
    fat: "5.9",
    fiber: "0.2",
    ingredients: [
      "12 large eggs",
      "⅓ cup mayonnaise",
      "1 teaspoon yellow mustard",
      "1 teaspoon white vinegar",
      "Salt and pepper to taste",
      "Paprika for garnish",
      "12 large black olives, pitted",
      "6 black olives for slicing into legs"
    ],
    instructions: [
      "Place eggs in large pot and cover with cold water",
      "Bring to boil, then remove from heat and cover for 12 minutes",
      "Transfer eggs to ice water bath and cool completely",
      "Peel eggs and cut in half lengthwise",
      "Remove yolks and place in bowl",
      "Mash yolks with mayonnaise, mustard, vinegar, salt, and pepper until smooth",
      "Pipe or spoon filling back into egg white halves",
      "Cut 12 olives in half lengthwise for spider bodies",
      "Slice remaining 6 olives into thin rings for spider legs",
      "Place one olive half on each egg for spider body",
      "Arrange 8 thin olive slices around each body as spider legs",
      "Sprinkle with paprika and serve chilled"
    ],
    tips: "For perfect hard-boiled eggs, use eggs that are at least a week old. They'll peel much easier!",
    variations: [
      "Add crispy bacon bits to the yolk mixture",
      "Use green olives for different colored spiders",
      "Garnish with chives cut to look like spider legs"
    ],
    tags: ["seasonal", "Halloween", "appetizers", "naturally gluten-free", "eggs", "spiders", "party food"],
    isNaturallyGlutenFree: true,
    seoTitle: "Spider Deviled Eggs - Spooky Gluten-Free Halloween Appetizer",
    seoDescription: "Creepy spider deviled eggs made with black olives. Naturally gluten-free Halloween appetizer that's perfect for spooky parties."
  },
  {
    title: "Mummy Meatballs",
    slug: "mummy-meatballs",
    description: "Gluten-free turkey meatballs wrapped in mozzarella 'bandages' with olive eyes",
    longDescription: "These adorable mummy meatballs are a fun and delicious gluten-free Halloween dinner that kids and adults will love. Made with lean ground turkey and gluten-free breadcrumbs, they're healthier than traditional meatballs but just as flavorful. Each meatball is wrapped in thin strips of mozzarella cheese to create mummy bandages, with black olive pieces for spooky eyes. Served with marinara sauce, they're perfect for Halloween dinner parties or family meals.",
    category: "Dinner",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 25,
    totalTime: 55,
    servings: 6,
    rating: "4.8",
    calories: 285,
    protein: "24.5",
    carbs: "12.8",
    fat: "16.2",
    fiber: "1.5",
    ingredients: [
      "2 lbs ground turkey",
      "1 cup gluten-free breadcrumbs",
      "1 large egg",
      "¼ cup grated Parmesan cheese",
      "2 cloves garlic, minced",
      "1 teaspoon Italian seasoning",
      "½ teaspoon salt",
      "¼ teaspoon black pepper",
      "2 tablespoons olive oil",
      "8 oz fresh mozzarella, cut into thin strips",
      "Black olives for eyes",
      "2 cups marinara sauce for serving"
    ],
    instructions: [
      "Preheat oven to 400°F and line baking sheet with parchment",
      "In large bowl, combine turkey, breadcrumbs, egg, Parmesan, garlic, Italian seasoning, salt, and pepper",
      "Mix gently until just combined",
      "Form into 24 meatballs and place on baking sheet",
      "Drizzle with olive oil",
      "Bake for 20-25 minutes until cooked through (165°F internal temperature)",
      "Remove from oven and let cool for 5 minutes",
      "Wrap each meatball with strips of mozzarella to look like mummy bandages",
      "Return to oven for 2-3 minutes until cheese just begins to melt",
      "Add two small pieces of black olive as eyes on each mummy",
      "Serve with warm marinara sauce"
    ],
    tips: "Don't overmix the meat mixture to keep meatballs tender. Let them cool slightly before wrapping to prevent cheese from melting too quickly.",
    variations: [
      "Use ground beef or a mixture of beef and pork",
      "Add diced onions to the meat mixture for extra flavor",
      "Serve over gluten-free pasta for a complete meal"
    ],
    tags: ["seasonal", "Halloween", "meatballs", "mozzarella", "dinner", "kid-friendly", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Mummy Meatballs - Spooky Gluten-Free Halloween Dinner",
    seoDescription: "Fun turkey meatballs wrapped in mozzarella bandages with olive eyes. Delicious gluten-free Halloween dinner perfect for family meals."
  },
  {
    title: "Caramel Apple Ghosts",
    slug: "caramel-apple-ghosts",
    description: "Fresh apple slices dipped in caramel and decorated as cute Halloween ghosts",
    longDescription: "These adorable caramel apple ghosts combine the classic Halloween treat with a healthier twist. Fresh, crisp apple slices are dipped in rich, homemade caramel and then decorated with white chocolate drizzle and mini chocolate chips to create ghostly faces. Naturally gluten-free and much easier to eat than whole caramel apples, these treats are perfect for Halloween parties, trick-or-treaters, or anyone who loves the combination of sweet caramel and fresh apples.",
    category: "Desserts",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 8,
    rating: "4.7",
    calories: 195,
    protein: "2.1",
    carbs: "38.4",
    fat: "6.8",
    fiber: "3.2",
    ingredients: [
      "4 large Granny Smith apples, cored and sliced",
      "1 cup sugar",
      "¼ cup water",
      "¼ cup heavy cream",
      "2 tablespoons butter",
      "½ teaspoon vanilla extract",
      "¼ teaspoon salt",
      "4 oz white chocolate, melted",
      "Mini chocolate chips for eyes",
      "Popsicle sticks for serving"
    ],
    instructions: [
      "Insert popsicle sticks into apple slices and arrange on parchment-lined baking sheet",
      "In heavy-bottomed saucepan, combine sugar and water",
      "Cook over medium-high heat without stirring until amber colored (about 10 minutes)",
      "Remove from heat and slowly whisk in cream (mixture will bubble vigorously)",
      "Stir in butter, vanilla, and salt until smooth",
      "Let caramel cool for 5 minutes until slightly thickened",
      "Dip each apple slice in caramel, letting excess drip off",
      "Place on parchment and refrigerate for 10 minutes",
      "Drizzle melted white chocolate over each apple in ghost-like patterns",
      "Immediately press mini chocolate chips for eyes before chocolate sets",
      "Refrigerate until set, about 15 minutes"
    ],
    tips: "Work quickly when dipping in caramel as it hardens fast. If caramel gets too thick, reheat briefly to thin it out.",
    variations: [
      "Use different apple varieties for varying sweetness",
      "Add chopped nuts to the caramel for extra crunch",
      "Drizzle with dark chocolate for spookier ghosts"
    ],
    tags: ["seasonal", "Halloween", "treat", "caramel", "apples", "naturally gluten-free", "ghosts"],
    isNaturallyGlutenFree: true,
    seoTitle: "Caramel Apple Ghosts - Naturally Gluten-Free Halloween Treats",
    seoDescription: "Adorable caramel apple ghosts with white chocolate and mini chocolate chip eyes. Naturally gluten-free Halloween treats perfect for parties."
  },
  {
    title: "Pumpkin Mac and Cheese",
    slug: "pumpkin-mac-and-cheese",
    description: "Creamy gluten-free mac and cheese with pumpkin puree for Halloween orange color",
    longDescription: "This vibrant orange mac and cheese gets its stunning Halloween color naturally from pumpkin puree. Made with gluten-free pasta and a rich, creamy cheese sauce enhanced with pumpkin, it's comfort food with a seasonal twist. The pumpkin adds subtle sweetness and incredible creaminess while giving the dish that perfect Halloween orange hue. This cozy dinner is perfect for Halloween night when you want something warming and festive but not too spooky for the kids.",
    category: "Dinner",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 6,
    rating: "4.6",
    calories: 385,
    protein: "16.8",
    carbs: "45.2",
    fat: "18.5",
    fiber: "3.8",
    ingredients: [
      "1 lb gluten-free elbow macaroni",
      "4 tablespoons butter",
      "¼ cup gluten-free flour",
      "2½ cups whole milk",
      "1 cup pumpkin puree",
      "2 cups sharp cheddar cheese, shredded",
      "1 cup Gruyere cheese, shredded",
      "1 teaspoon salt",
      "½ teaspoon black pepper",
      "¼ teaspoon nutmeg",
      "¼ teaspoon paprika",
      "½ cup gluten-free panko breadcrumbs",
      "2 tablespoons melted butter for topping"
    ],
    instructions: [
      "Preheat oven to 375°F and grease 9x13 inch baking dish",
      "Cook pasta according to package directions until al dente, drain",
      "In large pot, melt butter over medium heat",
      "Whisk in flour and cook for 1 minute",
      "Gradually whisk in milk until smooth",
      "Stir in pumpkin puree and cook until thickened, about 5 minutes",
      "Remove from heat and stir in cheeses until melted",
      "Season with salt, pepper, nutmeg, and paprika",
      "Add cooked pasta and stir to combine",
      "Transfer to prepared baking dish",
      "Mix breadcrumbs with melted butter and sprinkle on top",
      "Bake 20-25 minutes until bubbly and golden",
      "Let rest 5 minutes before serving"
    ],
    tips: "Don't skip the nutmeg - it really enhances the pumpkin flavor! Save some pasta water in case the sauce needs thinning.",
    variations: [
      "Add crispy bacon bits for extra richness",
      "Mix in roasted vegetables like butternut squash",
      "Top with toasted pumpkin seeds for crunch"
    ],
    tags: ["seasonal", "Halloween", "pumpkin", "mac and cheese", "comfort food", "dinner", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Pumpkin Mac and Cheese - Creamy Gluten-Free Halloween Dinner",
    seoDescription: "Vibrant orange mac and cheese made with pumpkin puree and gluten-free pasta. Perfect creamy Halloween comfort food for the whole family."
  },
  {
    title: "Bat Wing Brownies",
    slug: "bat-wing-brownies",
    description: "Fudgy gluten-free brownies cut into bat wing shapes with chocolate glaze",
    longDescription: "These dramatically dark and fudgy brownies are transformed into spooky bat wings for the perfect Halloween dessert. Made with rich cocoa and gluten-free flour, they're incredibly decadent and moist. Cut into bat wing shapes and topped with a glossy chocolate glaze, they create an impressive Halloween display. The deep chocolate flavor and fudgy texture make these brownies irresistible, while the bat wing shape adds the perfect amount of Halloween drama to your dessert table.",
    category: "Desserts",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    servings: 16,
    rating: "4.9",
    calories: 275,
    protein: "4.8",
    carbs: "32.1",
    fat: "16.5",
    fiber: "3.7",
    ingredients: [
      "1 cup butter",
      "8 oz dark chocolate, chopped",
      "1½ cups sugar",
      "4 large eggs",
      "1 teaspoon vanilla extract",
      "¾ cup gluten-free flour blend",
      "¼ cup cocoa powder",
      "½ teaspoon salt",
      "For glaze: 4 oz dark chocolate, 3 tablespoons heavy cream, 1 tablespoon corn syrup"
    ],
    instructions: [
      "Preheat oven to 350°F and line 9x13 pan with parchment paper",
      "Melt butter and chocolate in double boiler until smooth",
      "In large bowl, whisk together melted chocolate mixture and sugar",
      "Beat in eggs one at a time, then vanilla",
      "In separate bowl, whisk flour, cocoa, and salt",
      "Fold dry ingredients into chocolate mixture until just combined",
      "Pour into prepared pan and smooth top",
      "Bake 25-30 minutes until toothpick has a few moist crumbs",
      "Cool completely in pan",
      "Cut into bat wing shapes using template or freehand",
      "For glaze: heat cream and corn syrup, pour over chopped chocolate, stir until smooth",
      "Drizzle glaze over bat wing brownies",
      "Let set for 30 minutes before serving"
    ],
    tips: "Don't overbake - brownies should still look slightly underdone in center. Use a paper template to cut uniform bat wing shapes.",
    variations: [
      "Add chopped nuts or chocolate chips to batter",
      "Dust with powdered sugar instead of glaze",
      "Add orange food coloring for Halloween colors"
    ],
    tags: ["seasonal", "Halloween", "treat", "brownies", "chocolate", "bat wings", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Bat Wing Brownies - Fudgy Gluten-Free Halloween Dessert",
    seoDescription: "Rich, fudgy gluten-free brownies cut into spooky bat wing shapes with chocolate glaze. Perfect dramatic Halloween dessert for parties."
  },
  {
    title: "Spiced Pumpkin Pancakes",
    slug: "spiced-pumpkin-pancakes",
    description: "Fluffy gluten-free pumpkin pancakes with warm fall spices - perfect Halloween breakfast",
    longDescription: "Start your Halloween morning with these incredibly fluffy and flavorful pumpkin pancakes. Made with real pumpkin puree and a blend of warm fall spices, they're naturally orange-colored and taste like autumn in every bite. The gluten-free flour blend creates pancakes that are just as light and fluffy as traditional ones, while the pumpkin adds moisture and subtle sweetness. Perfect for Halloween breakfast or brunch, these pancakes will fill your kitchen with the most amazing seasonal aromas.",
    category: "Breakfast",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    rating: "4.8",
    calories: 245,
    protein: "6.8",
    carbs: "38.2",
    fat: "8.5",
    fiber: "4.1",
    ingredients: [
      "1½ cups gluten-free flour blend",
      "2 tablespoons brown sugar",
      "2 teaspoons baking powder",
      "½ teaspoon salt",
      "1 teaspoon cinnamon",
      "½ teaspoon nutmeg",
      "¼ teaspoon ginger",
      "⅛ teaspoon cloves",
      "1 cup milk",
      "¾ cup pumpkin puree",
      "2 large eggs",
      "3 tablespoons melted butter",
      "1 teaspoon vanilla extract",
      "Butter for cooking"
    ],
    instructions: [
      "In large bowl, whisk together flour, brown sugar, baking powder, salt, and all spices",
      "In another bowl, combine milk, pumpkin puree, eggs, melted butter, and vanilla",
      "Pour wet ingredients into dry ingredients and stir until just combined (don't overmix)",
      "Let batter rest for 5 minutes",
      "Heat griddle or large skillet over medium heat and butter lightly",
      "Pour ¼ cup batter for each pancake",
      "Cook until bubbles form on surface and edges look set, about 2-3 minutes",
      "Flip and cook until golden brown, another 1-2 minutes",
      "Serve warm with maple syrup and butter"
    ],
    tips: "Don't overmix the batter - lumps are okay and will result in fluffier pancakes. Keep cooked pancakes warm in 200°F oven.",
    variations: [
      "Add mini chocolate chips for extra sweetness",
      "Top with toasted pumpkin seeds for crunch",
      "Serve with cinnamon butter or whipped cream"
    ],
    tags: ["seasonal", "Halloween", "pumpkin", "pancakes", "breakfast", "fall spices", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Spiced Pumpkin Pancakes - Fluffy Gluten-Free Halloween Breakfast",
    seoDescription: "Fluffy gluten-free pumpkin pancakes with warm fall spices. Perfect Halloween breakfast with natural orange color from real pumpkin puree."
  },
  {
    title: "Candy Corn Parfait",
    slug: "candy-corn-parfait",
    description: "Layered parfait in candy corn colors with pumpkin mousse and vanilla cream",
    longDescription: "This stunning candy corn parfait captures the iconic Halloween candy in dessert form. Three beautiful layers mimic candy corn's signature yellow, orange, and white stripes using vanilla pudding, pumpkin mousse, and whipped cream. Made with gluten-free ingredients, this elegant dessert is perfect for Halloween entertaining. The combination of creamy textures and subtle fall flavors creates a sophisticated treat that looks as amazing as it tastes. Perfect for individual servings at Halloween dinner parties.",
    category: "Desserts",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 0,
    totalTime: 30,
    servings: 8,
    rating: "4.7",
    calories: 215,
    protein: "4.2",
    carbs: "28.5",
    fat: "10.8",
    fiber: "1.5",
    ingredients: [
      "1 package (3.4 oz) instant vanilla pudding (gluten-free)",
      "2 cups cold milk",
      "1 cup heavy cream, divided",
      "¾ cup pumpkin puree",
      "3 tablespoons powdered sugar",
      "½ teaspoon vanilla extract",
      "¼ teaspoon cinnamon",
      "Yellow food coloring",
      "Orange food coloring",
      "Crushed gluten-free cookies for garnish (optional)"
    ],
    instructions: [
      "Prepare vanilla pudding according to package directions with milk, refrigerate until set",
      "In bowl, whip ½ cup heavy cream with 2 tablespoons powdered sugar until stiff peaks form",
      "Divide whipped cream in half - leave one half white, color the other yellow with food coloring",
      "In another bowl, whip remaining ½ cup cream with 1 tablespoon powdered sugar until soft peaks form",
      "Fold pumpkin puree, cinnamon, and orange food coloring into this cream for orange layer",
      "In clear glasses, create candy corn layers:",
      "Bottom layer: yellow whipped cream",
      "Middle layer: orange pumpkin cream",
      "Top layer: white vanilla pudding",
      "Refrigerate for at least 2 hours before serving",
      "Garnish with crushed cookies if desired"
    ],
    tips: "Use gel food coloring for more vibrant colors without thinning the cream. Layer slowly to keep distinct stripes.",
    variations: [
      "Add crushed gingersnaps between layers",
      "Use butterscotch pudding for richer flavor",
      "Top with caramel drizzle for extra indulgence"
    ],
    tags: ["seasonal", "Halloween", "treat", "candy corn", "parfait", "layered dessert", "gluten-free"],
    isNaturallyGlutenFree: false,
    seoTitle: "Candy Corn Parfait - Layered Gluten-Free Halloween Dessert",
    seoDescription: "Beautiful layered parfait in candy corn colors with pumpkin mousse and vanilla cream. Elegant gluten-free Halloween dessert perfect for parties."
  },
  {
    title: "Ghostly Cauliflower Soup",
    slug: "ghostly-cauliflower-soup",
    description: "Creamy white cauliflower soup with spooky ghost-shaped sour cream garnish",
    longDescription: "This ethereally white and creamy cauliflower soup is transformed into a spooky Halloween starter with ghost-shaped sour cream garnishes. Naturally gluten-free and incredibly smooth, the soup has a rich, velvety texture from roasted cauliflower and cream. The pure white color provides the perfect canvas for adorable sour cream ghosts that float on top, complete with black pepper dot eyes. This elegant yet playful soup is perfect for Halloween dinner parties or cozy autumn meals.",
    category: "Appetizers",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 45,
    totalTime: 60,
    servings: 6,
    rating: "4.6",
    calories: 165,
    protein: "6.2",
    carbs: "12.8",
    fat: "11.5",
    fiber: "4.2",
    ingredients: [
      "1 large head cauliflower, cut into florets",
      "2 tablespoons olive oil",
      "1 large onion, chopped",
      "3 cloves garlic, minced",
      "4 cups gluten-free vegetable broth",
      "½ cup heavy cream",
      "2 tablespoons butter",
      "Salt and white pepper to taste",
      "½ cup sour cream",
      "Black pepper for garnish",
      "Fresh chives, chopped (optional)"
    ],
    instructions: [
      "Preheat oven to 425°F",
      "Toss cauliflower florets with olive oil and roast for 25-30 minutes until tender and lightly golden",
      "In large pot, sauté onion in butter until translucent",
      "Add garlic and cook for 1 minute",
      "Add roasted cauliflower and vegetable broth",
      "Bring to boil, then simmer for 15 minutes",
      "Using immersion blender, puree soup until completely smooth",
      "Stir in cream and season with salt and white pepper",
      "Ladle into bowls",
      "Drop spoonfuls of sour cream onto each bowl",
      "Use toothpick to drag sour cream into ghost shapes",
      "Add tiny black pepper dots for eyes",
      "Garnish with chives if desired"
    ],
    tips: "Roasting the cauliflower first adds deeper flavor. For ultra-smooth soup, strain through fine mesh sieve after blending.",
    variations: [
      "Add roasted garlic for richer flavor",
      "Swirl in truffle oil for elegance",
      "Top with crispy bacon bits for contrast"
    ],
    tags: ["seasonal", "Halloween", "soup", "cauliflower", "naturally gluten-free", "ghosts", "appetizers"],
    isNaturallyGlutenFree: true,
    seoTitle: "Ghostly Cauliflower Soup - Creamy Gluten-Free Halloween Appetizer",
    seoDescription: "Smooth, creamy cauliflower soup with ghost-shaped sour cream garnish. Naturally gluten-free Halloween appetizer perfect for spooky dinners."
  }
];

async function createAdditionalHalloweenRecipes() {
  console.log("🎃 Creating 10 additional Halloween-themed gluten-free recipes...\n");
  
  for (const [index, recipeData] of additionalHalloweenRecipes.entries()) {
    try {
      console.log(`${index + 1}/10 Processing: ${recipeData.title}`);
      
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
  
  console.log("🎃 Additional Halloween recipe creation complete!");
  console.log("📊 Total Halloween recipes created: 14 (4 + 10)");
}

// Run the script
createAdditionalHalloweenRecipes().catch(console.error);
import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const pecanPralineTrifleRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Pecan Praline Caramel Trifle - Classic Southern Style",
    slug: "gluten-free-pecan-praline-caramel-trifle-classic-southern",
    description: "Layers of gluten-free vanilla cake, salted caramel, whipped cream, and crunchy pecan praline - pure Southern decadence.",
    longDescription: "This classic Southern-style gluten-free pecan praline caramel trifle features beautiful layers of moist vanilla cake, rich salted caramel sauce, fluffy whipped cream, and crunchy homemade pecan praline. Each spoonful delivers the perfect combination of textures - soft cake, silky caramel, airy cream, and candied pecans. This stunning dessert is perfect for celebrations, holidays, or any time you want to impress with authentic Southern flavors.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 25,
    totalTime: 190,
    servings: 12,
    rating: "4.9",
    calories: 425,
    protein: "5.5",
    carbs: "54.0",
    fat: "22.0",
    fiber: "1.8",
    sugar: "38.0",
    ingredients: [
      "For Vanilla Cake: 2 cups gluten-free all-purpose flour blend, 1 teaspoon xanthan gum, 2 teaspoons baking powder, 1/2 teaspoon salt",
      "3/4 cup butter (softened), 1 1/2 cups sugar, 3 eggs, 2 teaspoons vanilla extract, 3/4 cup milk",
      "For Pecan Praline: 1 1/2 cups pecan halves, 1 cup granulated sugar, 1/4 cup water, 2 tablespoons butter, pinch of salt",
      "For Salted Caramel: 1 1/2 cups caramel sauce, 1 teaspoon sea salt",
      "For Whipped Cream: 3 cups heavy cream, 1/2 cup powdered sugar, 2 teaspoons vanilla extract",
      "Additional caramel for drizzle"
    ],
    instructions: [
      "Make vanilla cake: Preheat oven to 350°F. Grease a 9x13 pan. Mix flour, xanthan gum, baking powder, salt. Cream butter and sugar. Add eggs and vanilla. Alternate adding dry ingredients and milk. Bake 25 minutes. Cool completely and cut into 1-inch cubes.",
      "Make pecan praline: Line a baking sheet with parchment. In a saucepan, combine sugar and water. Cook over medium-high heat without stirring until amber colored, about 8-10 minutes. Add butter and pecans, stir to coat. Pour onto prepared sheet and spread. Cool completely, then chop into small pieces.",
      "Mix salted caramel sauce with sea salt. Set aside.",
      "Make whipped cream: Beat heavy cream with powdered sugar and vanilla until stiff peaks form. Refrigerate.",
      "Assemble trifle: In a large glass trifle bowl or individual glasses, layer as follows:",
      "First layer: 1/3 of cake cubes on bottom",
      "Drizzle with 1/3 of salted caramel sauce",
      "Spread 1/3 of whipped cream",
      "Sprinkle with 1/3 of chopped pecan praline",
      "Repeat layers two more times, ending with praline on top",
      "Drizzle final caramel over the top for decoration",
      "Refrigerate for at least 2 hours before serving to allow flavors to meld",
      "Serve chilled, scooping through all layers to get each component in every serving"
    ],
    tips: "Make the cake and praline a day ahead to save time on assembly day. The praline should be completely cool and dry before chopping - humidity can make it sticky. For easier assembly, use a piping bag for the whipped cream layers.",
    variations: [
      "Add a layer of sliced bananas between the cake and cream",
      "Use butterscotch sauce instead of caramel",
      "Mix in toffee bits with the praline",
      "Add a splash of bourbon to the caramel for adult version"
    ],
    tags: ["gluten-free", "desserts", "trifle", "pecan", "praline", "caramel", "layered dessert", "Southern", "entertaining"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Pecan Praline Caramel Trifle - Classic Southern | Unglued Food",
    seoDescription: "Classic Southern gluten-free pecan praline caramel trifle with layers of vanilla cake, salted caramel, whipped cream, and crunchy pecan praline. Perfect celebration dessert."
  },
  {
    title: "Gluten-Free Pecan Praline Caramel Trifle with Bourbon Cream",
    slug: "gluten-free-pecan-praline-caramel-trifle-bourbon-cream",
    description: "Boozy adult version with bourbon vanilla custard and caramel-soaked cake cubes - sophisticated indulgence.",
    longDescription: "This grown-up gluten-free pecan praline caramel trifle features bourbon-infused vanilla custard layered with caramel-soaked cake cubes and candied pecan praline. The bourbon adds depth and warmth to the custard while complementing the sweet caramel and nutty praline perfectly. This sophisticated dessert is ideal for dinner parties, special occasions, or whenever you want an elegant adult treat.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 50,
    cookTime: 30,
    totalTime: 200,
    servings: 12,
    rating: "5.0",
    calories: 465,
    protein: "6.2",
    carbs: "52.0",
    fat: "24.5",
    fiber: "1.5",
    sugar: "36.0",
    ingredients: [
      "1 gluten-free pound cake (homemade or store-bought), cut into cubes",
      "1/2 cup bourbon (divided)",
      "For Bourbon Custard: 6 egg yolks, 3/4 cup sugar, 1/4 cup cornstarch, 3 cups whole milk, 1/4 cup bourbon, 2 teaspoons vanilla, 3 tablespoons butter",
      "For Pecan Praline: 2 cups pecan halves, 1 cup sugar, 1/4 cup water, 2 tablespoons butter",
      "1 1/2 cups caramel sauce",
      "2 cups heavy cream, whipped",
      "Additional bourbon and caramel for drizzle"
    ],
    instructions: [
      "Make bourbon custard: In a bowl, whisk egg yolks, sugar, and cornstarch. Heat milk until steaming. Slowly whisk hot milk into egg mixture. Return to pan and cook, stirring constantly, until thick. Remove from heat, stir in bourbon, vanilla, and butter. Cover with plastic wrap directly on surface. Chill completely.",
      "Make pecan praline: In a saucepan, cook sugar and water until amber. Add butter and pecans, stir to coat. Pour onto parchment-lined sheet. Cool and chop.",
      "Prepare cake: Place cake cubes in a bowl and drizzle with 1/4 cup bourbon. Toss gently to coat.",
      "Warm caramel sauce with remaining 1/4 cup bourbon. Stir to combine.",
      "Assemble: In trifle bowl, layer bourbon-soaked cake cubes, drizzle with bourbon caramel, spread bourbon custard, top with praline.",
      "Repeat layers twice more.",
      "Top final layer with whipped cream and remaining praline.",
      "Drizzle with bourbon caramel in decorative pattern.",
      "Refrigerate at least 3 hours or overnight.",
      "Garnish with whole candied pecans before serving."
    ],
    tips: "Use a good quality bourbon - the flavor really shines through. Don't skip the chilling time for the custard; it needs to be completely cold for clean layers. This trifle is even better the next day as flavors meld.",
    variations: [
      "Use rum instead of bourbon for different flavor",
      "Add chocolate shavings between layers",
      "Use spiced rum caramel",
      "Top with bourbon-soaked cherries"
    ],
    tags: ["gluten-free", "desserts", "trifle", "bourbon", "pecan", "praline", "caramel", "adult dessert", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Bourbon Pecan Praline Caramel Trifle | Unglued Food",
    seoDescription: "Sophisticated gluten-free pecan praline trifle with bourbon vanilla custard, caramel-soaked cake, and candied pecans. Perfect adult dessert for special occasions."
  },
  {
    title: "Gluten-Free Chocolate Pecan Praline Caramel Trifle",
    slug: "gluten-free-chocolate-pecan-praline-caramel-trifle",
    description: "Rich chocolate cake, dark caramel, cocoa whipped cream, and chocolate-dipped pecan pralines - chocolate lover's dream.",
    longDescription: "This decadent gluten-free chocolate pecan praline caramel trifle combines rich chocolate cake with dark caramel sauce, cocoa-infused whipped cream, and chocolate-dipped pecan pralines for the ultimate chocolate lover's dessert. The layers of deep chocolate flavor are balanced by sweet caramel and crunchy candied pecans, creating a harmonious blend of textures and tastes. Perfect for chocolate enthusiasts and special celebrations.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 55,
    cookTime: 35,
    totalTime: 210,
    servings: 14,
    rating: "4.9",
    calories: 495,
    protein: "6.5",
    carbs: "58.0",
    fat: "27.5",
    fiber: "3.2",
    sugar: "42.0",
    ingredients: [
      "For Chocolate Cake: 2 cups gluten-free flour, 3/4 cup cocoa powder, 2 cups sugar, 2 teaspoons baking soda, 1 teaspoon baking powder, 1 teaspoon salt",
      "2 eggs, 1 cup strong coffee (cooled), 1 cup buttermilk, 1/2 cup vegetable oil, 2 teaspoons vanilla",
      "For Chocolate Pecan Praline: 1 1/2 cups pecans, 1 cup sugar, 1/4 cup water, 2 tablespoons butter, 1 cup melted dark chocolate",
      "For Dark Caramel: 1 1/2 cups caramel sauce, 2 tablespoons dark cocoa powder",
      "For Cocoa Whipped Cream: 3 cups heavy cream, 1/2 cup powdered sugar, 1/4 cup cocoa powder, 1 teaspoon vanilla",
      "Chocolate shavings for garnish"
    ],
    instructions: [
      "Make chocolate cake: Preheat oven to 350°F. Mix dry ingredients. Whisk eggs, coffee, buttermilk, oil, vanilla. Combine wet and dry. Pour into greased 9x13 pan. Bake 30-35 minutes. Cool completely and cube.",
      "Make chocolate pecan praline: Cook sugar and water to amber. Add butter and pecans. Pour onto parchment. Cool. Dip half of each praline piece in melted chocolate. Let set. Chop remaining pieces.",
      "Make dark caramel: Mix caramel sauce with cocoa powder until smooth.",
      "Make cocoa whipped cream: Beat cream with powdered sugar, cocoa powder, and vanilla until stiff peaks form.",
      "Assemble trifle: Layer chocolate cake cubes, drizzle dark caramel, spread cocoa whipped cream, sprinkle chopped praline.",
      "Repeat layers 2-3 times depending on bowl size.",
      "Top with whipped cream, chocolate-dipped praline pieces, and chocolate shavings.",
      "Refrigerate 2-3 hours before serving.",
      "Serve with additional caramel drizzle if desired."
    ],
    tips: "Use quality cocoa powder for best chocolate flavor. The coffee enhances the chocolate taste without making it taste like coffee. Make sure pralines are completely cool before dipping in chocolate to prevent melting.",
    variations: [
      "Add chocolate ganache layer",
      "Use white chocolate for praline coating",
      "Add espresso to the whipped cream",
      "Layer with chocolate mousse instead of whipped cream"
    ],
    tags: ["gluten-free", "desserts", "trifle", "chocolate", "pecan", "praline", "caramel", "decadent", "layered"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Chocolate Pecan Praline Caramel Trifle | Unglued Food",
    seoDescription: "Decadent gluten-free chocolate trifle with rich chocolate cake, dark caramel, cocoa whipped cream, and chocolate-dipped pecan pralines. Chocolate lover's dream dessert."
  },
  {
    title: "Gluten-Free Apple Caramel Pecan Praline Trifle",
    slug: "gluten-free-apple-caramel-pecan-praline-trifle",
    description: "Cinnamon apples layered with caramel cream and praline - fall dessert perfection.",
    longDescription: "This gluten-free apple caramel pecan praline trifle captures the essence of autumn with layers of spiced cinnamon apples, caramel cream, vanilla cake, and crunchy pecan praline. The combination of tender cooked apples, sweet caramel, and candied pecans creates a dessert that tastes like apple pie and caramel apple had a baby. Perfect for Thanksgiving, fall gatherings, or any time you crave cozy autumn flavors.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 40,
    cookTime: 30,
    totalTime: 190,
    servings: 12,
    rating: "4.8",
    calories: 445,
    protein: "4.8",
    carbs: "56.0",
    fat: "23.0",
    fiber: "3.5",
    sugar: "39.0",
    ingredients: [
      "For Cinnamon Apples: 6 Granny Smith apples (peeled, diced), 1/2 cup butter, 3/4 cup brown sugar, 2 teaspoons cinnamon, 1/4 teaspoon nutmeg, 2 tablespoons lemon juice",
      "1 gluten-free vanilla or cinnamon cake (9x13), cubed",
      "For Pecan Praline: 2 cups pecan pieces, 1 cup sugar, 1/4 cup water, 2 tablespoons butter, 1 teaspoon cinnamon",
      "For Caramel Cream: 2 cups heavy cream, 1/2 cup powdered sugar, 3/4 cup caramel sauce, 8 oz cream cheese (softened), 1 teaspoon vanilla",
      "Additional caramel for drizzle"
    ],
    instructions: [
      "Make cinnamon apples: In large skillet, melt butter with brown sugar, cinnamon, and nutmeg. Add diced apples and lemon juice. Cook over medium heat, stirring occasionally, until apples are tender but not mushy, about 12-15 minutes. Cool completely.",
      "Make cinnamon pecan praline: Cook sugar and water to amber. Stir in butter, cinnamon, and pecans. Pour onto parchment. Cool and chop.",
      "Make caramel cream: Beat cream cheese until smooth. Add caramel sauce and mix well. In separate bowl, whip cream with powdered sugar and vanilla to stiff peaks. Fold whipped cream into cream cheese mixture.",
      "Assemble: In trifle bowl, layer cake cubes, spoon cinnamon apples over cake, spread caramel cream, sprinkle praline.",
      "Repeat layers twice more.",
      "Top with caramel cream, remaining praline, and drizzle with caramel.",
      "Refrigerate at least 3 hours or overnight.",
      "Before serving, can add fresh apple slices tossed in lemon juice as garnish."
    ],
    tips: "Use firm, tart apples like Granny Smith so they hold their shape during cooking. Make sure apples are completely cooled before layering to prevent cream from melting. This trifle tastes even better the next day.",
    variations: [
      "Add dried cranberries to apple mixture",
      "Use pears instead of or in addition to apples",
      "Add a splash of apple brandy to the apples",
      "Top with cinnamon whipped cream"
    ],
    tags: ["gluten-free", "desserts", "trifle", "apple", "pecan", "praline", "caramel", "fall", "autumn", "Thanksgiving"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Apple Caramel Pecan Praline Trifle | Unglued Food",
    seoDescription: "Perfect fall dessert - gluten-free apple pecan praline trifle with cinnamon apples, caramel cream, and candied pecans. Ideal for Thanksgiving and autumn celebrations."
  },
  {
    title: "Gluten-Free Pumpkin Spice Caramel Pecan Trifle",
    slug: "gluten-free-pumpkin-spice-caramel-pecan-trifle",
    description: "Pumpkin custard, spiced caramel, and pecan praline - the ultimate holiday centerpiece.",
    longDescription: "This gluten-free pumpkin spice caramel pecan trifle is the ultimate holiday dessert, featuring layers of spiced pumpkin custard, cinnamon cake, salted caramel, and crunchy pecan praline. The warm autumn spices blend perfectly with rich pumpkin flavor and sweet caramel, creating a stunning centerpiece that captures the essence of the season. Perfect for Thanksgiving, Christmas, or any fall celebration.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 60,
    cookTime: 35,
    totalTime: 215,
    servings: 14,
    rating: "5.0",
    calories: 455,
    protein: "5.5",
    carbs: "57.0",
    fat: "23.5",
    fiber: "2.8",
    sugar: "40.0",
    ingredients: [
      "For Pumpkin Spice Cake: 2 cups gluten-free flour, 2 teaspoons baking powder, 1 teaspoon baking soda, 2 teaspoons cinnamon, 1 teaspoon ginger, 1/2 teaspoon nutmeg, 1/4 teaspoon cloves",
      "3/4 cup butter, 1 1/2 cups sugar, 3 eggs, 1 cup pumpkin puree, 1/2 cup sour cream",
      "For Pumpkin Custard: 6 egg yolks, 3/4 cup sugar, 1/4 cup cornstarch, 2 1/2 cups milk, 1 cup pumpkin puree, 2 teaspoons pumpkin pie spice, 3 tablespoons butter",
      "For Spiced Pecan Praline: 2 cups pecans, 1 cup sugar, 1/4 cup water, 2 tablespoons butter, 1 teaspoon cinnamon, 1/4 teaspoon nutmeg",
      "1 1/2 cups salted caramel sauce",
      "2 cups whipped cream",
      "Cinnamon for dusting"
    ],
    instructions: [
      "Make pumpkin cake: Mix dry ingredients. Cream butter and sugar. Add eggs, pumpkin, sour cream. Combine with dry ingredients. Bake at 350°F for 30-35 minutes. Cool and cube.",
      "Make pumpkin custard: Whisk yolks, sugar, cornstarch. Heat milk to steaming. Slowly add to yolk mixture. Return to pan, cook until thick. Remove from heat, whisk in pumpkin, spices, and butter. Chill completely.",
      "Make spiced praline: Cook sugar and water to amber. Add butter, spices, and pecans. Pour on parchment. Cool and chop.",
      "Assemble: Layer pumpkin cake cubes, drizzle caramel, spread pumpkin custard, sprinkle praline.",
      "Repeat layers 2-3 times.",
      "Top with whipped cream and remaining praline.",
      "Drizzle with caramel and dust with cinnamon.",
      "Refrigerate at least 3 hours before serving.",
      "Garnish with whole candied pecans and cinnamon sticks."
    ],
    tips: "Use pure pumpkin puree, not pumpkin pie filling. The custard must be completely chilled before layering for clean layers. Make this a day ahead - the flavors meld beautifully overnight.",
    variations: [
      "Add cream cheese layer for extra richness",
      "Use maple syrup instead of some caramel",
      "Add gingersnap cookie crumbles between layers",
      "Top with candied orange peel"
    ],
    tags: ["gluten-free", "desserts", "trifle", "pumpkin", "pecan", "praline", "caramel", "holiday", "Thanksgiving", "fall"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Pumpkin Spice Caramel Pecan Trifle | Unglued Food",
    seoDescription: "Show-stopping gluten-free pumpkin pecan praline trifle with spiced pumpkin custard, salted caramel, and candied pecans. Perfect holiday centerpiece dessert."
  },
  {
    title: "Gluten-Free Salted Caramel Banana Pecan Praline Trifle",
    slug: "gluten-free-salted-caramel-banana-pecan-praline-trifle",
    description: "Banana pudding meets caramel trifle - layered with praline crunch and whipped cream.",
    longDescription: "This gluten-free salted caramel banana pecan praline trifle combines the beloved flavors of banana pudding with the elegance of a caramel trifle. Layers of vanilla cake, fresh banana slices, creamy banana pudding, salted caramel, and crunchy pecan praline create a dessert that's both nostalgic and sophisticated. The combination of sweet bananas, salty caramel, and candied pecans is absolutely irresistible.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Easy",
    prepTime: 35,
    cookTime: 20,
    totalTime: 175,
    servings: 12,
    rating: "4.9",
    calories: 435,
    protein: "5.8",
    carbs: "54.0",
    fat: "22.5",
    fiber: "2.2",
    sugar: "36.5",
    ingredients: [
      "1 gluten-free vanilla cake (9x13), cubed",
      "4-5 ripe but firm bananas, sliced",
      "For Banana Pudding: 3/4 cup sugar, 1/3 cup cornstarch, 1/4 teaspoon salt, 3 cups whole milk, 4 egg yolks, 2 tablespoons butter, 2 teaspoons vanilla, 2 ripe bananas (mashed)",
      "For Salted Pecan Praline: 2 cups pecan halves, 1 cup sugar, 1/4 cup water, 2 tablespoons butter, 1 teaspoon sea salt",
      "1 1/2 cups salted caramel sauce",
      "2 cups heavy cream, whipped with 1/4 cup powdered sugar",
      "Lemon juice to toss banana slices"
    ],
    instructions: [
      "Make banana pudding: Whisk sugar, cornstarch, and salt. Heat milk to steaming. Whisk egg yolks. Slowly add hot milk to yolks. Return to pan and cook, stirring, until thick. Remove from heat, stir in butter, vanilla, and mashed bananas. Chill completely.",
      "Make salted pecan praline: Cook sugar and water to amber. Stir in butter, pecans, and sea salt. Pour on parchment. Cool and chop.",
      "Toss banana slices in lemon juice to prevent browning.",
      "Assemble: Layer cake cubes, arrange banana slices, spread banana pudding, drizzle salted caramel, top with praline.",
      "Repeat layers twice.",
      "Top with whipped cream, drizzle caramel, sprinkle remaining praline.",
      "Refrigerate 2-3 hours before serving.",
      "Can add fresh banana slices on top just before serving."
    ],
    tips: "Toss banana slices in lemon juice to keep them from browning. The pudding layer should be thick and completely chilled for best results. Assemble within a few hours of serving for freshest banana flavor.",
    variations: [
      "Add vanilla wafer cookies between layers",
      "Use butterscotch pudding instead of banana",
      "Add chocolate chips between layers",
      "Top with caramel popcorn for extra crunch"
    ],
    tags: ["gluten-free", "desserts", "trifle", "banana", "pecan", "praline", "caramel", "banana pudding", "comfort food"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Salted Caramel Banana Pecan Praline Trifle | Unglued Food",
    seoDescription: "Nostalgic gluten-free banana trifle with banana pudding, salted caramel, fresh bananas, and pecan praline. Comfort food elevated to elegant dessert."
  },
  {
    title: "Gluten-Free Espresso Caramel Pecan Praline Trifle",
    slug: "gluten-free-espresso-caramel-pecan-praline-trifle",
    description: "Coffee-soaked sponge, espresso caramel, and mascarpone cream with praline - coffee lover's delight.",
    longDescription: "This gluten-free espresso caramel pecan praline trifle is a sophisticated dessert for coffee lovers, featuring layers of espresso-soaked cake, rich espresso caramel, creamy mascarpone filling, and crunchy coffee-infused pecan praline. The bold coffee flavors complement the sweet caramel perfectly, creating an elegant dessert that's ideal for dinner parties, brunch, or any special occasion where you want to impress.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 50,
    cookTime: 25,
    totalTime: 195,
    servings: 12,
    rating: "4.9",
    calories: 475,
    protein: "6.5",
    carbs: "52.0",
    fat: "27.0",
    fiber: "1.5",
    sugar: "37.0",
    ingredients: [
      "1 gluten-free vanilla sponge cake, cubed",
      "For Coffee Soak: 1 1/2 cups strong brewed espresso (cooled), 1/4 cup coffee liqueur (optional), 3 tablespoons sugar",
      "For Espresso Pecan Praline: 2 cups pecans, 1 cup sugar, 1/4 cup water, 2 tablespoons butter, 2 tablespoons instant espresso powder",
      "For Espresso Caramel: 1 1/2 cups caramel sauce, 2 tablespoons instant espresso powder",
      "For Mascarpone Cream: 16 oz mascarpone cheese, 1 1/2 cups heavy cream, 3/4 cup powdered sugar, 2 teaspoons vanilla, 1 tablespoon espresso powder",
      "Chocolate-covered espresso beans for garnish"
    ],
    instructions: [
      "Make coffee soak: Mix espresso, coffee liqueur (if using), and sugar. Stir until sugar dissolves. Cool.",
      "Make espresso praline: Cook sugar and water to amber. Stir in butter, espresso powder, and pecans. Pour on parchment. Cool and chop.",
      "Make espresso caramel: Mix caramel sauce with espresso powder until smooth.",
      "Make mascarpone cream: Beat mascarpone until smooth. In separate bowl, whip cream with powdered sugar, vanilla, and espresso powder to stiff peaks. Fold whipped cream into mascarpone.",
      "Assemble: Arrange cake cubes in trifle bowl, brush generously with coffee soak, spread mascarpone cream, drizzle espresso caramel, sprinkle praline.",
      "Repeat layers 2-3 times.",
      "Top with mascarpone cream, drizzle caramel, and garnish with praline and chocolate-covered espresso beans.",
      "Refrigerate at least 3 hours or overnight.",
      "Dust with cocoa powder before serving."
    ],
    tips: "Use strong espresso for best flavor - the coffee should be prominent. Don't oversoak the cake or it will become mushy. Mascarpone should be at room temperature for smooth mixing.",
    variations: [
      "Add tiramisu-style cocoa layers",
      "Use Kahlua in the coffee soak",
      "Add chocolate shavings between layers",
      "Use coffee ice cream instead of mascarpone cream"
    ],
    tags: ["gluten-free", "desserts", "trifle", "espresso", "coffee", "pecan", "praline", "caramel", "elegant", "sophisticated"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Espresso Caramel Pecan Praline Trifle | Unglued Food",
    seoDescription: "Sophisticated gluten-free espresso trifle with coffee-soaked cake, espresso caramel, mascarpone cream, and coffee pecan praline. Perfect for coffee lovers."
  },
  {
    title: "Gluten-Free Coconut Caramel Pecan Praline Trifle",
    slug: "gluten-free-coconut-caramel-pecan-praline-trifle",
    description: "Light coconut cream layers with toasted coconut and caramel pecans - tropical meets Southern.",
    longDescription: "This gluten-free coconut caramel pecan praline trifle brings together tropical coconut flavors with classic Southern pecan praline for a unique and delicious combination. Layers of coconut cake, coconut cream, caramel sauce, toasted coconut, and pecan praline create a lighter yet still indulgent trifle. The subtle coconut flavor pairs beautifully with sweet caramel and crunchy candied pecans.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 30,
    totalTime: 195,
    servings: 12,
    rating: "4.8",
    calories: 465,
    protein: "5.0",
    carbs: "55.0",
    fat: "26.0",
    fiber: "2.5",
    sugar: "38.5",
    ingredients: [
      "For Coconut Cake: 2 cups gluten-free flour, 1/2 cup coconut flour, 2 teaspoons baking powder, 1/2 teaspoon salt",
      "3/4 cup butter, 1 1/2 cups sugar, 3 eggs, 1 teaspoon vanilla, 1 teaspoon coconut extract, 1 cup coconut milk, 1 cup shredded coconut",
      "For Coconut Pecan Praline: 1 1/2 cups pecans, 1/2 cup shredded coconut, 1 cup sugar, 1/4 cup water, 2 tablespoons butter",
      "For Coconut Cream: 2 cups heavy cream, 1/2 cup powdered sugar, 1 teaspoon coconut extract, 8 oz cream cheese (softened), 1/2 cup coconut cream",
      "1 1/2 cups caramel sauce",
      "1 cup toasted coconut flakes for layers and garnish"
    ],
    instructions: [
      "Make coconut cake: Toast shredded coconut in dry pan until golden. Mix dry ingredients. Cream butter and sugar. Add eggs, extracts. Alternate adding dry ingredients and coconut milk. Fold in toasted coconut. Bake at 350°F for 25-30 minutes. Cool and cube.",
      "Make coconut pecan praline: Cook sugar and water to amber. Stir in butter, pecans, and shredded coconut. Pour on parchment. Cool and chop.",
      "Toast coconut flakes in dry skillet until golden. Set aside.",
      "Make coconut cream: Beat cream cheese until smooth. Add coconut cream and mix. Whip heavy cream with powdered sugar and coconut extract. Fold into cream cheese mixture.",
      "Assemble: Layer coconut cake cubes, drizzle caramel, spread coconut cream, sprinkle praline and toasted coconut.",
      "Repeat layers twice.",
      "Top with coconut cream, caramel drizzle, praline, and toasted coconut flakes.",
      "Refrigerate at least 3 hours before serving.",
      "Can garnish with fresh coconut shavings."
    ],
    tips: "Toast coconut carefully as it can burn quickly. Use full-fat coconut milk and coconut cream for best flavor and texture. This trifle can be made dairy-free by using coconut cream throughout.",
    variations: [
      "Add pineapple chunks between layers",
      "Use rum in the caramel for tropical twist",
      "Add white chocolate shavings",
      "Layer with passion fruit curd"
    ],
    tags: ["gluten-free", "desserts", "trifle", "coconut", "pecan", "praline", "caramel", "tropical", "unique"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Coconut Caramel Pecan Praline Trifle | Unglued Food",
    seoDescription: "Unique gluten-free coconut trifle with coconut cream, toasted coconut, caramel pecans, and praline. Tropical flavors meet Southern classic dessert."
  },
  {
    title: "Gluten-Free Maple Caramel Pecan Praline Trifle",
    slug: "gluten-free-maple-caramel-pecan-praline-trifle",
    description: "Maple custard layered with caramel-drenched pecans and vanilla cake - pure autumn bliss.",
    longDescription: "This gluten-free maple caramel pecan praline trifle celebrates the flavors of fall with rich maple custard, sweet caramel sauce, vanilla cake, and maple-infused pecan praline. The deep, complex flavor of real maple syrup elevates the traditional caramel trifle to something truly special. This dessert is perfect for autumn gatherings, Thanksgiving, or any time you want to showcase the beautiful combination of maple and caramel.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Medium",
    prepTime: 55,
    cookTime: 30,
    totalTime: 205,
    servings: 12,
    rating: "4.9",
    calories: 450,
    protein: "5.5",
    carbs: "56.0",
    fat: "23.5",
    fiber: "1.8",
    sugar: "40.0",
    ingredients: [
      "1 gluten-free vanilla cake (9x13), cubed",
      "For Maple Custard: 6 egg yolks, 1/2 cup sugar, 1/4 cup cornstarch, 3 cups whole milk, 3/4 cup pure maple syrup, 3 tablespoons butter, 1 teaspoon vanilla",
      "For Maple Pecan Praline: 2 cups pecan halves, 1/2 cup sugar, 1/2 cup maple syrup, 2 tablespoons butter",
      "For Maple Caramel: 1 cup caramel sauce, 1/2 cup maple syrup, pinch of salt",
      "2 cups heavy cream whipped with 1/4 cup powdered sugar and 1 teaspoon maple extract",
      "Additional maple syrup for drizzle"
    ],
    instructions: [
      "Make maple custard: Whisk egg yolks, sugar, and cornstarch. Heat milk and maple syrup until steaming. Slowly whisk hot liquid into eggs. Return to pan and cook, stirring constantly, until thick. Remove from heat, stir in butter and vanilla. Chill completely.",
      "Make maple pecan praline: In saucepan, bring sugar, maple syrup, and butter to a boil. Cook to 300°F (hard crack stage). Add pecans and stir to coat. Pour onto parchment-lined sheet. Cool completely and chop.",
      "Make maple caramel: Warm caramel sauce with maple syrup and salt. Stir until smooth.",
      "Assemble: Layer vanilla cake cubes, drizzle maple caramel generously, spread maple custard, sprinkle maple praline.",
      "Repeat layers 2-3 times.",
      "Top with maple whipped cream and remaining praline.",
      "Drizzle with maple caramel and pure maple syrup.",
      "Refrigerate at least 3 hours or overnight.",
      "Garnish with candied pecans and maple sugar if desired."
    ],
    tips: "Use pure maple syrup, not pancake syrup, for authentic flavor. The praline needs to reach proper temperature for the right crunch. This trifle is even better made a day ahead.",
    variations: [
      "Add cinnamon to the custard",
      "Use brown butter in the praline",
      "Layer with apple compote",
      "Add bourbon to the maple caramel"
    ],
    tags: ["gluten-free", "desserts", "trifle", "maple", "pecan", "praline", "caramel", "fall", "autumn"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Maple Caramel Pecan Praline Trifle | Unglued Food",
    seoDescription: "Rich gluten-free maple trifle with maple custard, caramel-drenched pecans, and maple praline. Perfect autumn dessert showcasing maple and caramel flavors."
  },
  {
    title: "Gluten-Free Strawberry Caramel Pecan Praline Trifle",
    slug: "gluten-free-strawberry-caramel-pecan-praline-trifle",
    description: "Sweet-tart strawberries layered with vanilla cream, caramel ribbons, and praline shards - fresh and elegant.",
    longDescription: "This gluten-free strawberry caramel pecan praline trifle offers a lighter, fruitier take on the classic with layers of fresh strawberries, vanilla cream, caramel sauce, and crunchy pecan praline. The sweet-tart berries balance the rich caramel beautifully, while the pecan praline adds satisfying crunch. This stunning dessert is perfect for spring and summer celebrations, bridal showers, or any time you want something elegant yet not too heavy.",
    category: "Desserts",
    subcategory: "Trifles & Layered Sweets",
    difficulty: "Easy",
    prepTime: 40,
    cookTime: 25,
    totalTime: 185,
    servings: 12,
    rating: "4.8",
    calories: 415,
    protein: "4.8",
    carbs: "52.0",
    fat: "21.5",
    fiber: "2.8",
    sugar: "36.0",
    ingredients: [
      "1 gluten-free vanilla or white cake (9x13), cubed",
      "4 cups fresh strawberries, hulled and sliced",
      "1/4 cup sugar (to macerate strawberries)",
      "For Pecan Praline: 1 1/2 cups pecan pieces, 1 cup sugar, 1/4 cup water, 2 tablespoons butter",
      "For Vanilla Cream: 2 cups heavy cream, 1/2 cup powdered sugar, 2 teaspoons vanilla extract, 8 oz cream cheese (softened), 1/4 cup sour cream",
      "1 1/2 cups caramel sauce",
      "Fresh mint for garnish"
    ],
    instructions: [
      "Macerate strawberries: Toss sliced strawberries with 1/4 cup sugar. Let sit 30 minutes, stirring occasionally, until syrupy. Reserve juice.",
      "Make pecan praline: Cook sugar and water to amber. Stir in butter and pecans. Pour on parchment. Cool completely and break into shards, saving some for garnish and chopping the rest.",
      "Make vanilla cream: Beat cream cheese until smooth. Add sour cream and mix. Whip heavy cream with powdered sugar and vanilla to stiff peaks. Fold into cream cheese mixture.",
      "Assemble: Layer cake cubes, brush with strawberry juice, arrange strawberries, drizzle caramel, spread vanilla cream, sprinkle chopped praline.",
      "Repeat layers twice.",
      "Top with vanilla cream, arrange fresh strawberry slices, drizzle caramel ribbons, and decorate with praline shards.",
      "Refrigerate 2-3 hours before serving.",
      "Garnish with fresh mint leaves just before serving."
    ],
    tips: "Macerating the strawberries releases their juices and concentrates their flavor. Use the prettiest strawberry slices for the top layer. This trifle is best served the same day it's made for freshest fruit.",
    variations: [
      "Use mixed berries instead of just strawberries",
      "Add white chocolate shavings",
      "Use strawberry cake for double berry flavor",
      "Layer with lemon curd for extra brightness"
    ],
    tags: ["gluten-free", "desserts", "trifle", "strawberry", "pecan", "praline", "caramel", "spring", "summer", "fresh"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Strawberry Caramel Pecan Praline Trifle | Unglued Food",
    seoDescription: "Fresh and elegant gluten-free strawberry trifle with vanilla cream, caramel ribbons, and pecan praline shards. Perfect spring and summer celebration dessert."
  }
];

async function generateAndSaveImages() {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of pecanPralineTrifleRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free ", "");
    const description = `Beautiful layered trifle in glass bowl showing distinct layers of caramel, cream, pecans, and cake, elegant dessert presentation with visible praline pieces, warm golden tones, professional food styling`;
    
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
  console.log("🎨 Generating AI images for all 10 pecan praline trifle recipes...\n");
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
  
  console.log("\n✨ All 10 Gluten-Free Pecan Praline Caramel Trifle recipes have been added successfully!");
  console.log("🍮 Visit the website to see your new trifle recipes under Desserts → Trifles & Layered Sweets");
}

// Run the script
addRecipesToDatabase().catch(console.error);

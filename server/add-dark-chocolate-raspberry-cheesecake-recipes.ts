import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const darkChocolateRaspberryCheesecakeRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake – Classic Ganache",
    slug: "gluten-free-dark-chocolate-raspberry-cheesecake-classic-ganache",
    description: "Luxurious dark chocolate cheesecake with silky ganache and fresh raspberries.",
    longDescription: "This gluten-free dark chocolate raspberry cheesecake is pure elegance on a plate. A rich dark chocolate cheesecake sits on a chocolate cookie crust, crowned with glossy dark chocolate ganache and vibrant fresh raspberries. Every bite delivers creamy, decadent chocolate balanced by the sweet-tart pop of raspberries. Perfect for special occasions and celebrations.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 65,
    totalTime: 395,
    servings: 12,
    rating: "5.0",
    calories: 485,
    protein: "8.0",
    carbs: "42.0",
    fat: "34.0",
    fiber: "3.0",
    sugar: "28.0",
    ingredients: [
      "Crust: 2 cups gluten-free chocolate cookie crumbs",
      "1/4 cup granulated sugar",
      "6 tablespoons unsalted butter, melted",
      "Filling: 24 oz cream cheese, softened",
      "1 cup granulated sugar",
      "3 large eggs, room temperature",
      "1 cup sour cream",
      "8 oz dark chocolate (70% cacao), melted and cooled",
      "1/4 cup unsweetened cocoa powder",
      "1 teaspoon vanilla extract",
      "1/4 teaspoon salt",
      "Ganache: 6 oz dark chocolate, chopped",
      "1/2 cup heavy cream",
      "Topping: 1 cup fresh raspberries",
      "Powdered sugar for dusting"
    ],
    instructions: [
      "Preheat oven to 325°F. Line a 9-inch springform pan with parchment paper and wrap exterior with aluminum foil.",
      "Mix chocolate cookie crumbs, 1/4 cup sugar, and melted butter. Press firmly into bottom of prepared pan. Bake 10 minutes, then cool.",
      "Beat cream cheese and 1 cup sugar until smooth and fluffy, about 3 minutes. Add eggs one at a time, beating well after each addition.",
      "Mix in sour cream, melted chocolate, cocoa powder, vanilla, and salt until completely smooth.",
      "Pour filling over crust. Place springform pan in a larger roasting pan and add hot water to come halfway up sides.",
      "Bake 55-65 minutes until edges are set but center still jiggles slightly. Turn off oven and leave cheesecake inside with door cracked for 1 hour.",
      "Remove from water bath and cool to room temperature. Refrigerate at least 4 hours or overnight.",
      "For ganache: Heat cream until just simmering. Pour over chopped chocolate and let sit 2 minutes. Stir until smooth and glossy.",
      "Pour ganache over chilled cheesecake, spreading to edges. Top with fresh raspberries.",
      "Refrigerate 30 minutes to set ganache. Dust with powdered sugar before serving."
    ],
    tips: "Use room temperature ingredients for smoothest texture. Water bath prevents cracking. Cool slowly to avoid cracks. Can make ganache ahead and reheat gently. Use high-quality dark chocolate for best flavor.",
    variations: [
      "Add 1 tablespoon raspberry liqueur to filling for extra flavor",
      "Use white chocolate ganache for color contrast",
      "Top with chocolate curls instead of fresh raspberries",
      "Swirl raspberry purée through filling before baking"
    ],
    tags: ["gluten-free", "cheesecake", "dark chocolate", "raspberry", "ganache", "elegant dessert", "special occasion"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Cheesecake with Ganache | Unglued Food",
    seoDescription: "Indulgent gluten-free dark chocolate cheesecake topped with silky ganache and fresh raspberries. Rich, creamy, and perfect for special occasions."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Swirl Cheesecake",
    slug: "gluten-free-dark-chocolate-raspberry-swirl-cheesecake",
    description: "Stunning marble-effect cheesecake with raspberry purée swirled through dark chocolate.",
    longDescription: "This gluten-free dark chocolate raspberry swirl cheesecake is a showstopper. Rich dark chocolate cheesecake is beautifully marbled with vibrant raspberry purée, creating a stunning visual effect when sliced. The sweet-tart raspberry perfectly balances the deep cocoa flavors. Each slice reveals gorgeous swirls of pink and chocolate brown—as beautiful as it is delicious.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Medium",
    prepTime: 35,
    cookTime: 70,
    totalTime: 405,
    servings: 12,
    rating: "5.0",
    calories: 465,
    protein: "7.0",
    carbs: "45.0",
    fat: "31.0",
    fiber: "2.0",
    sugar: "32.0",
    ingredients: [
      "Crust: 2 cups gluten-free graham cracker crumbs",
      "1/4 cup granulated sugar",
      "6 tablespoons unsalted butter, melted",
      "Raspberry Swirl: 1 1/2 cups fresh raspberries",
      "1/3 cup granulated sugar",
      "1 tablespoon lemon juice",
      "1 tablespoon cornstarch",
      "Filling: 24 oz cream cheese, softened",
      "1 cup granulated sugar",
      "3 large eggs",
      "1 cup sour cream",
      "6 oz dark chocolate, melted",
      "2 tablespoons unsweetened cocoa powder",
      "1 teaspoon vanilla extract",
      "Fresh raspberries for garnish"
    ],
    instructions: [
      "Preheat oven to 325°F. Prepare 9-inch springform pan with parchment and foil wrap.",
      "Make crust: Combine crumbs, sugar, and butter. Press into pan bottom. Bake 10 minutes, cool.",
      "Make raspberry swirl: Cook raspberries, sugar, lemon juice, and cornstarch over medium heat until thickened, about 8 minutes. Strain to remove seeds. Cool completely.",
      "Beat cream cheese and sugar until fluffy. Add eggs one at a time, then sour cream, melted chocolate, cocoa, and vanilla.",
      "Pour chocolate filling over crust. Drop spoonfuls of raspberry purée on top.",
      "Use a knife or skewer to create swirl patterns by drawing through the raspberry and chocolate layers.",
      "Place in water bath. Bake 65-70 minutes until edges set but center jiggles.",
      "Turn off oven, crack door, and let cool 1 hour. Remove and cool completely.",
      "Refrigerate at least 4 hours or overnight.",
      "Garnish with fresh raspberries before serving."
    ],
    tips: "Don't over-swirl or colors will muddy. Cool raspberry mixture completely before adding to prevent sinking. Swirl gently for best visual effect. Strain raspberry purée for smooth texture without seeds.",
    variations: [
      "Use blackberries instead of raspberries",
      "Add white chocolate swirl for triple marble effect",
      "Use vanilla bean paste in filling",
      "Top with chocolate ganache and more swirls"
    ],
    tags: ["gluten-free", "cheesecake", "dark chocolate", "raspberry swirl", "marble effect", "beautiful presentation"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Swirl Cheesecake | Unglued Food",
    seoDescription: "Gorgeous marble-effect gluten-free cheesecake with raspberry purée swirled through rich dark chocolate. Stunning presentation, incredible flavor."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Truffle Cheesecake",
    slug: "gluten-free-dark-chocolate-raspberry-truffle-cheesecake",
    description: "Ultra-rich truffle-like chocolate cheesecake with raspberry reduction.",
    longDescription: "This gluten-free dark chocolate raspberry truffle cheesecake is decadence defined. With an ultra-rich, truffle-like chocolate interior, intense dark chocolate flavor, and vibrant raspberry reduction, this is not your average cheesecake. It's deeply chocolatey, luxuriously dense, and topped with cocoa-dusted chocolate truffles. For serious chocolate lovers only.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Hard",
    prepTime: 40,
    cookTime: 75,
    totalTime: 415,
    servings: 14,
    rating: "5.0",
    calories: 520,
    protein: "8.0",
    carbs: "38.0",
    fat: "39.0",
    fiber: "3.0",
    sugar: "26.0",
    ingredients: [
      "Crust: 2 cups gluten-free chocolate wafer crumbs",
      "1/3 cup granulated sugar",
      "7 tablespoons unsalted butter, melted",
      "Filling: 32 oz cream cheese, softened",
      "1 1/4 cups granulated sugar",
      "4 large eggs",
      "1 1/4 cups sour cream",
      "12 oz dark chocolate (72% cacao), melted",
      "1/2 cup heavy cream",
      "1/4 cup unsweetened cocoa powder",
      "1 tablespoon espresso powder",
      "Raspberry Reduction: 2 cups fresh raspberries",
      "1/2 cup granulated sugar",
      "2 tablespoons lemon juice",
      "Topping: Dark chocolate truffles, cocoa powder"
    ],
    instructions: [
      "Preheat oven to 325°F. Line 9-inch springform pan with parchment and wrap with foil.",
      "Mix chocolate crumbs, sugar, and butter. Press firmly into pan. Bake 12 minutes, cool.",
      "Beat cream cheese and sugar until very smooth, 4-5 minutes. Add eggs one at a time.",
      "Mix in sour cream, melted chocolate, heavy cream, cocoa powder, and espresso powder until silky.",
      "Pour over crust. Place in water bath. Bake 70-75 minutes until just set with slight jiggle.",
      "Cool in oven with door ajar for 1 hour. Remove and cool completely. Refrigerate overnight.",
      "Make reduction: Simmer raspberries, sugar, and lemon juice until thick and syrupy, about 15 minutes. Strain and cool.",
      "Drizzle raspberry reduction over cheesecake in decorative pattern.",
      "Top with chocolate truffles dusted in cocoa powder.",
      "Chill 1 hour before serving. Slice with hot knife for clean cuts."
    ],
    tips: "High-quality chocolate is essential for truffle texture. Don't overbake—center should barely jiggle. Use boiling water for bath. Let come to room temp before serving for best texture. Espresso powder enhances chocolate flavor without adding coffee taste.",
    variations: [
      "Add 2 tablespoons cognac to filling",
      "Use chambord in raspberry reduction",
      "Top with gold leaf for extra elegance",
      "Add dark chocolate shavings around edges"
    ],
    tags: ["gluten-free", "cheesecake", "dark chocolate", "truffle", "raspberry reduction", "decadent", "gourmet"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Truffle Cheesecake | Unglued Food",
    seoDescription: "Decadent gluten-free truffle cheesecake with intense dark chocolate and raspberry reduction. Ultra-rich, gourmet dessert for chocolate lovers."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake Bars",
    slug: "gluten-free-dark-chocolate-raspberry-cheesecake-bars",
    description: "Easy bar-style dark chocolate cheesecake with raspberry layer.",
    longDescription: "These gluten-free dark chocolate raspberry cheesecake bars are perfect for parties and gatherings. With a chocolate cookie crust, a vibrant raspberry layer, and rich dark chocolate cheesecake on top, they're portable, easy to serve, and beautifully layered when sliced. Much easier than a traditional round cheesecake but just as delicious.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Easy",
    prepTime: 25,
    cookTime: 45,
    totalTime: 310,
    servings: 16,
    rating: "5.0",
    calories: 385,
    protein: "6.0",
    carbs: "36.0",
    fat: "26.0",
    fiber: "2.0",
    sugar: "24.0",
    ingredients: [
      "Crust: 2 1/2 cups gluten-free chocolate cookie crumbs",
      "1/3 cup granulated sugar",
      "8 tablespoons unsalted butter, melted",
      "Raspberry Layer: 2 cups fresh raspberries",
      "1/4 cup granulated sugar",
      "2 tablespoons cornstarch",
      "Filling: 16 oz cream cheese, softened",
      "2/3 cup granulated sugar",
      "2 large eggs",
      "2/3 cup sour cream",
      "6 oz dark chocolate, melted",
      "3 tablespoons unsweetened cocoa powder",
      "1 teaspoon vanilla extract",
      "Topping: Chocolate shavings, fresh raspberries"
    ],
    instructions: [
      "Preheat oven to 325°F. Line 9x13-inch baking pan with parchment paper, leaving overhang on sides.",
      "Mix cookie crumbs, sugar, and butter. Press firmly into bottom of pan. Bake 10 minutes, cool.",
      "Make raspberry layer: Mash raspberries with sugar and cornstarch. Spread evenly over cooled crust.",
      "Beat cream cheese and sugar until smooth. Add eggs, then sour cream, melted chocolate, cocoa, and vanilla.",
      "Pour chocolate filling over raspberry layer, spreading to edges.",
      "Bake 40-45 minutes until edges are set but center jiggles slightly.",
      "Cool completely in pan on wire rack, then refrigerate at least 4 hours.",
      "Use parchment overhang to lift from pan. Cut into 16 bars with sharp knife.",
      "Top each bar with chocolate shavings and a fresh raspberry.",
      "Serve chilled. Store covered in refrigerator."
    ],
    tips: "Use parchment sling for easy removal. Chill thoroughly before cutting. Wipe knife between cuts for clean edges. Raspberry layer adds beautiful color when sliced. Can make a day ahead.",
    variations: [
      "Use strawberries or blackberries instead of raspberries",
      "Add white chocolate drizzle on top",
      "Make mini bars by using 8x8 pan and cutting smaller",
      "Top with whipped cream rosettes"
    ],
    tags: ["gluten-free", "cheesecake bars", "dark chocolate", "raspberry", "easy recipe", "party dessert"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Cheesecake Bars | Unglued Food",
    seoDescription: "Easy gluten-free chocolate raspberry cheesecake bars with beautiful layers. Perfect for parties, portable, and deliciously rich."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Mousse Cheesecake",
    slug: "gluten-free-dark-chocolate-raspberry-mousse-cheesecake",
    description: "Ethereal hybrid of cheesecake and mousse with raspberry gelée.",
    longDescription: "This gluten-free dark chocolate raspberry mousse cheesecake is wonderfully airy and light. It combines the richness of cheesecake with the ethereal texture of chocolate mousse, topped with a shimmering raspberry gelée layer. The result is elegantly decadent yet somehow delicate—perfect for special occasions when you want to impress.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Hard",
    prepTime: 45,
    cookTime: 60,
    totalTime: 425,
    servings: 12,
    rating: "5.0",
    calories: 495,
    protein: "7.0",
    carbs: "40.0",
    fat: "36.0",
    fiber: "3.0",
    sugar: "29.0",
    ingredients: [
      "Crust: 2 cups gluten-free chocolate cookie crumbs",
      "1/4 cup sugar",
      "6 tablespoons butter, melted",
      "Mousse Filling: 16 oz cream cheese, softened",
      "3/4 cup sugar",
      "2 large eggs",
      "8 oz dark chocolate, melted",
      "1 cup heavy cream, whipped to stiff peaks",
      "1 teaspoon vanilla extract",
      "Raspberry Gelée: 2 cups fresh raspberries",
      "1/2 cup sugar",
      "2 tablespoons lemon juice",
      "1 packet unflavored gelatin",
      "1/4 cup cold water",
      "Fresh raspberries and mint for garnish"
    ],
    instructions: [
      "Preheat oven to 325°F. Prepare 9-inch springform pan with parchment and foil.",
      "Make crust: Mix crumbs, sugar, and butter. Press into pan. Bake 10 minutes, cool.",
      "Beat cream cheese and sugar until fluffy. Add eggs, then fold in melted chocolate and vanilla.",
      "Gently fold whipped cream into chocolate mixture in three additions until no streaks remain.",
      "Pour mousse filling over crust. Bake in water bath 55-60 minutes until just set.",
      "Cool in oven 1 hour with door ajar. Remove and cool completely. Refrigerate 4 hours.",
      "Make gelée: Cook raspberries, sugar, and lemon juice until berries break down, 10 minutes. Strain.",
      "Bloom gelatin in cold water 5 minutes. Add to warm raspberry mixture and stir until dissolved. Cool to room temperature.",
      "Pour raspberry gelée over chilled cheesecake. Refrigerate 2 hours until set.",
      "Garnish with fresh raspberries and mint leaves. Serve chilled."
    ],
    tips: "Fold whipped cream gently to maintain airiness. Don't overbake—mousse should be just set. Gelée should be cool but still liquid when poured. Use best quality chocolate for best flavor.",
    variations: [
      "Add chambord to gelée for extra flavor",
      "Use white chocolate mousse layer",
      "Top with chocolate curls and gold dust",
      "Make individual portions in glasses"
    ],
    tags: ["gluten-free", "cheesecake", "mousse", "dark chocolate", "raspberry gelée", "elegant", "airy texture"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Mousse Cheesecake | Unglued Food",
    seoDescription: "Ethereal gluten-free chocolate mousse cheesecake with shimmering raspberry gelée. Light, airy, and beautifully elegant dessert."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake with Almond Flour Crust",
    slug: "gluten-free-dark-chocolate-raspberry-cheesecake-almond-crust",
    description: "Nutty almond flour crust with dark chocolate cheesecake and raspberry compote.",
    longDescription: "This gluten-free dark chocolate raspberry cheesecake features a naturally gluten-free almond flour crust that's both delicious and nutritious. The nutty crust complements the rich dark chocolate filling perfectly, while layers of fresh raspberry compote add fruity brightness. It's a sophisticated dessert that happens to be naturally gluten-free.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 65,
    totalTime: 395,
    servings: 12,
    rating: "5.0",
    calories: 445,
    protein: "9.0",
    carbs: "35.0",
    fat: "33.0",
    fiber: "4.0",
    sugar: "25.0",
    ingredients: [
      "Almond Crust: 2 cups almond flour",
      "1/4 cup cocoa powder",
      "1/4 cup granulated sugar",
      "1/4 cup coconut oil, melted",
      "1 large egg white",
      "Filling: 24 oz cream cheese, softened",
      "1 cup granulated sugar",
      "3 large eggs",
      "1 cup sour cream",
      "8 oz dark chocolate, melted",
      "2 tablespoons cocoa powder",
      "1 teaspoon almond extract",
      "Raspberry Compote: 2 cups fresh raspberries",
      "1/3 cup sugar",
      "2 tablespoons lemon juice",
      "Topping: Sliced almonds, fresh raspberries"
    ],
    instructions: [
      "Preheat oven to 325°F. Line 9-inch springform pan with parchment and wrap exterior with foil.",
      "Mix almond flour, cocoa powder, sugar, coconut oil, and egg white until combined. Press into pan bottom.",
      "Bake almond crust 12 minutes until set. Cool completely.",
      "Beat cream cheese and sugar until smooth. Add eggs one at a time, beating well.",
      "Mix in sour cream, melted chocolate, cocoa powder, and almond extract until silky.",
      "Pour half the filling over crust. Make compote: simmer raspberries, sugar, and lemon juice 8 minutes until thick. Cool slightly.",
      "Spoon raspberry compote over chocolate layer. Top with remaining filling.",
      "Bake in water bath 60-65 minutes until edges set, center jiggles slightly.",
      "Cool in oven 1 hour with door cracked. Remove and cool completely. Refrigerate overnight.",
      "Top with toasted sliced almonds and fresh raspberries before serving."
    ],
    tips: "Almond crust is delicate—press firmly and bake until set. Toast almonds for garnish for extra flavor. Almond extract complements chocolate beautifully. Coconut oil makes crust naturally gluten-free.",
    variations: [
      "Use hazelnut flour instead of almond",
      "Add amaretto to filling for extra almond flavor",
      "Top with chocolate ganache and almonds",
      "Use pistachio flour for green tint"
    ],
    tags: ["gluten-free", "cheesecake", "almond crust", "dark chocolate", "raspberry compote", "naturally gluten-free"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Cheesecake - Almond Crust | Unglued Food",
    seoDescription: "Nutty almond flour crust with rich dark chocolate cheesecake and raspberry compote. Naturally gluten-free, dairy-rich, and absolutely delicious."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake Tart",
    slug: "gluten-free-dark-chocolate-raspberry-cheesecake-tart",
    description: "Elegant tart with thin chocolate crust and raspberry coulis.",
    longDescription: "This gluten-free dark chocolate raspberry cheesecake tart is French-inspired elegance. A thin, crisp chocolate tart shell holds creamy dark chocolate cheesecake filling, all topped with glossy raspberry coulis. The presentation is stunning, the portions are perfect, and the flavor combination is absolutely divine. Perfect for dinner parties.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Medium",
    prepTime: 35,
    cookTime: 40,
    totalTime: 375,
    servings: 10,
    rating: "5.0",
    calories: 425,
    protein: "7.0",
    carbs: "38.0",
    fat: "29.0",
    fiber: "3.0",
    sugar: "26.0",
    ingredients: [
      "Chocolate Tart Crust: 1 1/2 cups gluten-free all-purpose flour",
      "1/3 cup cocoa powder",
      "1/4 cup powdered sugar",
      "1/2 cup cold butter, cubed",
      "1 large egg yolk",
      "2-3 tablespoons ice water",
      "Filling: 16 oz cream cheese, softened",
      "2/3 cup sugar",
      "2 large eggs",
      "4 oz dark chocolate, melted",
      "1/2 cup sour cream",
      "1 teaspoon vanilla extract",
      "Raspberry Coulis: 2 cups fresh raspberries",
      "1/2 cup sugar",
      "2 tablespoons lemon juice",
      "1 tablespoon cornstarch",
      "Fresh raspberries and chocolate curls for garnish"
    ],
    instructions: [
      "Preheat oven to 350°F. Prepare 9-inch tart pan with removable bottom.",
      "Make crust: Pulse flour, cocoa, and powdered sugar in food processor. Add butter and pulse until crumbly.",
      "Add egg yolk and water, pulsing until dough forms. Press evenly into tart pan bottom and up sides.",
      "Prick bottom with fork. Freeze 15 minutes, then bake 15 minutes. Cool. Reduce oven to 325°F.",
      "Beat cream cheese and sugar until smooth. Add eggs, melted chocolate, sour cream, and vanilla.",
      "Pour filling into cooled tart shell. Bake 35-40 minutes until just set.",
      "Cool completely, then refrigerate at least 4 hours.",
      "Make coulis: Cook raspberries, sugar, lemon juice, and cornstarch until thick and glossy, 10 minutes. Strain and cool.",
      "Remove tart from pan and place on serving plate.",
      "Top with raspberry coulis, fresh raspberries, and chocolate curls. Serve chilled."
    ],
    tips: "Chill tart dough before baking for crisp crust. Don't overbake—tart should be just set. Coulis can be made ahead and refrigerated. Strain for smooth texture without seeds. Use tart pan with removable bottom for easy unmolding.",
    variations: [
      "Use white chocolate in filling for contrast",
      "Add fresh mint garnish for color",
      "Drizzle with melted chocolate before coulis",
      "Top with edible flowers for elegance"
    ],
    tags: ["gluten-free", "cheesecake tart", "dark chocolate", "raspberry coulis", "elegant", "French-inspired"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Cheesecake Tart | Unglued Food",
    seoDescription: "Elegant gluten-free chocolate cheesecake tart with raspberry coulis. Thin crisp crust, creamy filling, stunning presentation."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Layered Cheesecake",
    slug: "gluten-free-dark-chocolate-raspberry-layered-cheesecake",
    description: "Stunning two-layer cheesecake with raspberry and chocolate layers.",
    longDescription: "This gluten-free dark chocolate raspberry layered cheesecake is a true showstopper. Two distinct layers—vibrant raspberry cheesecake and rich dark chocolate cheesecake—create a beautiful visual contrast when sliced. The flavor combination is heavenly, and the presentation is guaranteed to impress. Perfect for celebrations and special occasions.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Hard",
    prepTime: 40,
    cookTime: 75,
    totalTime: 415,
    servings: 14,
    rating: "5.0",
    calories: 475,
    protein: "8.0",
    carbs: "44.0",
    fat: "32.0",
    fiber: "2.0",
    sugar: "31.0",
    ingredients: [
      "Crust: 2 cups gluten-free graham cracker crumbs",
      "1/4 cup sugar",
      "6 tablespoons butter, melted",
      "Raspberry Layer: 16 oz cream cheese, softened",
      "2/3 cup sugar",
      "2 large eggs",
      "1/2 cup sour cream",
      "1 cup fresh raspberries, puréed and strained",
      "1 teaspoon vanilla extract",
      "Pink food coloring (optional)",
      "Dark Chocolate Layer: 16 oz cream cheese, softened",
      "2/3 cup sugar",
      "2 large eggs",
      "1/2 cup sour cream",
      "8 oz dark chocolate, melted",
      "3 tablespoons cocoa powder",
      "Topping: Fresh raspberries, chocolate shavings"
    ],
    instructions: [
      "Preheat oven to 325°F. Line 9-inch springform pan with parchment and wrap with foil.",
      "Mix graham cracker crumbs, sugar, and butter. Press into pan. Bake 10 minutes, cool.",
      "Make raspberry layer: Beat 16 oz cream cheese and 2/3 cup sugar. Add 2 eggs, sour cream, raspberry purée, and vanilla. Add food coloring if desired for vibrant pink.",
      "Pour raspberry filling over crust. Bake 30 minutes. Remove and cool 15 minutes. Keep oven on.",
      "Make chocolate layer: Beat remaining cream cheese and sugar. Add eggs, sour cream, melted chocolate, and cocoa.",
      "Carefully pour chocolate filling over partially baked raspberry layer.",
      "Return to water bath. Bake 45 minutes until edges set, center jiggles.",
      "Cool in oven 1 hour with door ajar. Remove and cool completely.",
      "Refrigerate overnight for layers to set completely.",
      "Top with fresh raspberries and chocolate shavings. Slice to reveal beautiful layers."
    ],
    tips: "Let raspberry layer cool slightly before adding chocolate to prevent mixing. Overnight chilling is essential for clean slices. Use hot knife for best cuts. Don't skip the partial bake of first layer—it prevents layers from mixing.",
    variations: [
      "Reverse layers for chocolate on bottom",
      "Add white chocolate third layer for triple effect",
      "Use strawberries in pink layer",
      "Top with ganache instead of fresh berries"
    ],
    tags: ["gluten-free", "layered cheesecake", "dark chocolate", "raspberry", "two-layer", "stunning presentation"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Layered Cheesecake | Unglued Food",
    seoDescription: "Gorgeous two-layer gluten-free cheesecake with raspberry and dark chocolate. Stunning visual contrast, incredible flavor combination."
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry No-Bake Cheesecake",
    slug: "gluten-free-dark-chocolate-raspberry-no-bake-cheesecake",
    description: "Easy no-bake cheesecake with whipped filling and raspberry swirl.",
    longDescription: "This gluten-free dark chocolate raspberry no-bake cheesecake is perfect for summer or when you want to avoid turning on the oven. The cold-set whipped filling is light and airy, the dark chocolate is rich but not heavy, and the raspberry swirl adds beautiful color and fresh flavor. Easy to make and absolutely delicious.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 0,
    totalTime: 270,
    servings: 10,
    rating: "5.0",
    calories: 425,
    protein: "6.0",
    carbs: "38.0",
    fat: "30.0",
    fiber: "2.0",
    sugar: "28.0",
    ingredients: [
      "Crust: 2 cups gluten-free chocolate cookie crumbs",
      "1/4 cup sugar",
      "6 tablespoons butter, melted",
      "Filling: 16 oz cream cheese, softened",
      "1 cup powdered sugar",
      "6 oz dark chocolate, melted and cooled",
      "1 teaspoon vanilla extract",
      "1 1/2 cups heavy cream, whipped to stiff peaks",
      "Raspberry Swirl: 1 cup fresh raspberries",
      "1/4 cup sugar",
      "1 tablespoon lemon juice",
      "Topping: Whipped cream, fresh raspberries, chocolate shavings"
    ],
    instructions: [
      "Mix cookie crumbs, sugar, and melted butter. Press firmly into 9-inch springform pan bottom. Refrigerate while making filling.",
      "Make raspberry swirl: Cook raspberries, sugar, and lemon juice over medium heat until thick, 8 minutes. Strain to remove seeds. Cool completely.",
      "Beat cream cheese and powdered sugar until fluffy, about 3 minutes.",
      "Fold in melted chocolate and vanilla until smooth.",
      "Gently fold whipped cream into chocolate mixture in three additions until no streaks remain.",
      "Pour filling over chilled crust, spreading evenly.",
      "Drop spoonfuls of raspberry mixture on top. Use knife to create swirl patterns.",
      "Cover and refrigerate at least 4 hours or overnight until firm and set.",
      "Before serving, top with whipped cream rosettes, fresh raspberries, and chocolate shavings.",
      "Run hot knife under water before each slice for clean cuts."
    ],
    tips: "Make sure chocolate is cooled but still pourable. Fold whipped cream gently to keep airy texture. Chill thoroughly before serving—overnight is best. No water bath needed for no-bake version.",
    variations: [
      "Add 2 tablespoons chambord to filling",
      "Use Oreo-style gluten-free cookies for crust",
      "Top with chocolate ganache instead of whipped cream",
      "Add more raspberry swirl for stronger flavor"
    ],
    tags: ["gluten-free", "no-bake cheesecake", "dark chocolate", "raspberry swirl", "easy", "summer dessert"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry No-Bake Cheesecake | Unglued Food",
    seoDescription: "Easy no-bake gluten-free chocolate raspberry cheesecake. Light, creamy, perfect for summer. No oven needed!"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Mini Cheesecakes",
    slug: "gluten-free-dark-chocolate-raspberry-mini-cheesecakes",
    description: "Individual cheesecakes with chocolate crumble and raspberry centers.",
    longDescription: "These gluten-free dark chocolate raspberry mini cheesecakes are absolutely adorable and perfectly portioned. Baked in muffin tins with chocolate crumble topping and raspberry jam centers, they're easy to serve at parties and gatherings. Kids and adults alike love these individual treats that deliver all the flavor of a full cheesecake in a cute, portable package.",
    category: "Desserts",
    subcategory: "Cheesecakes",
    difficulty: "Easy",
    prepTime: 25,
    cookTime: 20,
    totalTime: 285,
    servings: 12,
    rating: "5.0",
    calories: 340,
    protein: "5.0",
    carbs: "32.0",
    fat: "23.0",
    fiber: "2.0",
    sugar: "22.0",
    ingredients: [
      "Crust: 1 1/2 cups gluten-free chocolate cookie crumbs",
      "3 tablespoons sugar",
      "4 tablespoons butter, melted",
      "Filling: 16 oz cream cheese, softened",
      "2/3 cup sugar",
      "2 large eggs",
      "1/2 cup sour cream",
      "4 oz dark chocolate, melted",
      "2 tablespoons cocoa powder",
      "1 teaspoon vanilla extract",
      "Raspberry Centers: 1/2 cup seedless raspberry jam",
      "Chocolate Crumble: 1/4 cup gluten-free flour",
      "2 tablespoons cocoa powder",
      "2 tablespoons sugar",
      "2 tablespoons cold butter",
      "Fresh raspberries for topping"
    ],
    instructions: [
      "Preheat oven to 325°F. Line 12-cup muffin tin with paper liners.",
      "Mix cookie crumbs, sugar, and melted butter. Press about 1 tablespoon into bottom of each liner.",
      "Make crumble: Mix flour, cocoa, and sugar. Cut in cold butter until crumbly. Set aside.",
      "Beat cream cheese and sugar until smooth. Add eggs, sour cream, melted chocolate, cocoa, and vanilla.",
      "Fill each liner about 2/3 full with chocolate filling.",
      "Drop 1 teaspoon raspberry jam into center of each. Use toothpick to swirl slightly.",
      "Sprinkle chocolate crumble over tops.",
      "Bake 18-20 minutes until tops are set but centers still jiggle slightly.",
      "Cool in pan 30 minutes, then refrigerate at least 4 hours.",
      "Top each with a fresh raspberry before serving. Remove paper liners if desired."
    ],
    tips: "Don't overfill liners or they'll overflow. Jam should be at room temperature for easy swirling. Paper liners make serving easy. Can be made day ahead for parties.",
    variations: [
      "Use fresh raspberry purée instead of jam",
      "Add white chocolate chips to crumble",
      "Make in mini muffin tins for bite-sized treats",
      "Top with whipped cream and chocolate drizzle"
    ],
    tags: ["gluten-free", "mini cheesecakes", "dark chocolate", "raspberry", "individual portions", "party dessert"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Dark Chocolate Raspberry Mini Cheesecakes | Unglued Food",
    seoDescription: "Adorable individual gluten-free chocolate raspberry cheesecakes with crumble topping. Perfect portions, easy to serve, great for parties."
  }
];

async function generateAndSaveImages(): Promise<InsertRecipe[]> {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of darkChocolateRaspberryCheesecakeRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free ", "");
    const description = `Elegant dark chocolate cheesecake with rich, glossy chocolate ganache or batter, fresh vibrant red raspberries arranged on top or swirled throughout. Perfect slice revealing creamy layers, gluten-free crust visible at bottom. Dark chocolate drizzle or shavings add elegance. Raspberries look fresh, ruby-red, and glistening. Soft natural lighting creates upscale dessert presentation. High-end bakery quality, restaurant-style plating on white or dark plate. Macro details showing chocolate shine, raspberry texture, and creamy cheesecake consistency. Elegant and decadent aesthetic.`;
    
    try {
      const imageUrl = await generateRecipeImage(recipeName, description);
      
      // Download and save image
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const filename = `${recipe.slug}.png`;
      const filepath = path.join(imageDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      console.log(`✅ Saved image to: ${filepath}`);
      
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${filename}`
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error generating image for ${recipe.title}:`, error);
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${recipe.slug}.png`
      });
    }
  }
  
  return recipesWithImages;
}

async function addRecipesToDatabase() {
  console.log("🍫 Generating AI images for all 10 Dark Chocolate Raspberry Cheesecake recipes...\n");
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
  
  console.log("\n✨ All 10 Gluten-Free Dark Chocolate Raspberry Cheesecake recipes have been added successfully!");
  console.log("🍫 Visit the website to see your new Dark Chocolate Raspberry Cheesecake recipes under Desserts → Cheesecakes");
}

addRecipesToDatabase().catch(console.error);

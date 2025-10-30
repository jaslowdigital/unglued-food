import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const frittataAffogatoRecipes = [
  {
    title: "Gluten-Free Italian Sausage Frittata Affogato",
    slug: "gluten-free-italian-sausage-frittata-affogato",
    seoTitle: "Gluten-Free Italian Sausage Frittata Affogato - Hearty Breakfast",
    description: "Hearty Italian sausage frittata with bell peppers, onions, and melted cheese — savory, protein-packed brunch perfection.",
    longDescription: "This gluten-free Italian sausage frittata affogato is the ultimate savory breakfast, combining the rich flavors of Italian sausage with colorful bell peppers, onions, and melted cheese in a perfectly custardy egg base. The sausage is browned first to render its fat and develop flavor, then the eggs are poured over and the whole dish is finished in the oven until golden and puffed. The result is a hearty, protein-packed meal that's perfect for breakfast, brunch, or even dinner. The 'affogato' style means it's drowning in delicious ingredients, making every bite full of flavor and texture. Serve warm or at room temperature for the perfect make-ahead brunch dish.",
    seoDescription: "Gluten-free Italian sausage frittata affogato with peppers and cheese. Hearty, protein-packed breakfast perfect for brunch gatherings.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-italian-sausage-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "12 oz gluten-free Italian sausage, casings removed",
      "1 red bell pepper, diced",
      "1 green bell pepper, diced",
      "1 onion, diced",
      "1 cup shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "1/4 cup milk or cream",
      "2 tablespoons olive oil",
      "1 teaspoon dried Italian herbs",
      "Salt and pepper to taste",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet over medium heat. Add sausage and cook, breaking it up, until browned, about 5-6 minutes.",
      "Add bell peppers and onion. Cook for 5 minutes until softened.",
      "In a bowl, whisk together eggs, milk, Italian herbs, salt, and pepper.",
      "Pour egg mixture over the sausage and vegetables in the skillet.",
      "Sprinkle mozzarella and Parmesan over the top.",
      "Cook on stovetop for 2-3 minutes until edges start to set.",
      "Transfer skillet to oven and bake for 15-18 minutes until golden and puffed.",
      "Let cool for 5 minutes before slicing.",
      "Garnish with fresh basil and serve warm or at room temperature."
    ],
    tags: ["gluten-free", "frittata", "Italian sausage", "breakfast", "brunch", "eggs", "protein-rich", "Italian", "make-ahead", "affogato"],
    nutrition: {
      calories: 380,
      protein: "26g",
      carbs: "8g",
      fat: "28g",
      fiber: "1g",
      sodium: "680mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Roasted Pepper & Mozzarella Frittata Affogato",
    slug: "gluten-free-roasted-pepper-mozzarella-frittata-affogato",
    seoTitle: "Gluten-Free Roasted Pepper & Mozzarella Frittata - Vegetarian Delight",
    description: "Colorful roasted peppers and creamy fresh mozzarella in custardy eggs — vibrant vegetarian Italian breakfast.",
    longDescription: "This gluten-free roasted pepper and mozzarella frittata affogato showcases the beautiful colors and flavors of Italian cuisine with vibrant roasted bell peppers and creamy fresh mozzarella. The peppers are roasted until charred and sweet, then combined with eggs and fresh mozzarella for a dish that's both visually stunning and delicious. The affogato style means the frittata is loaded with these premium ingredients, creating a rich, satisfying meal. Fresh basil adds aromatic brightness, while the mozzarella melts into creamy pockets throughout. This is perfect for a special brunch or when you want to impress guests with minimal effort.",
    seoDescription: "Gluten-free roasted pepper and mozzarella frittata affogato. Colorful vegetarian breakfast with sweet roasted peppers and fresh cheese.",
    category: "Breakfast",
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-roasted-pepper-mozzarella-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "2 red bell peppers, roasted and sliced",
      "2 yellow bell peppers, roasted and sliced",
      "8 oz fresh mozzarella, torn into pieces",
      "1/4 cup fresh basil leaves",
      "1/4 cup heavy cream",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1/4 cup grated Parmesan",
      "Salt and pepper to taste",
      "Balsamic glaze for drizzling (optional)"
    ],
    instructions: [
      "Preheat oven to 375°F. To roast peppers, char over flame or under broiler until blackened, then peel, seed, and slice.",
      "Heat olive oil in a 10-inch oven-safe skillet. Add garlic and cook for 1 minute.",
      "Whisk together eggs, cream, Parmesan, salt, and pepper.",
      "Arrange roasted pepper slices in the skillet.",
      "Pour egg mixture over peppers.",
      "Scatter torn mozzarella and basil leaves over the top.",
      "Cook on stovetop for 2-3 minutes until edges start to set.",
      "Transfer to oven and bake for 18-20 minutes until golden and set.",
      "Cool for 5 minutes, then drizzle with balsamic glaze if desired.",
      "Slice and serve warm."
    ],
    tags: ["gluten-free", "frittata", "roasted peppers", "mozzarella", "vegetarian", "breakfast", "brunch", "Italian", "colorful", "affogato"],
    nutrition: {
      calories: 320,
      protein: "18g",
      carbs: "9g",
      fat: "24g",
      fiber: "2g",
      sodium: "480mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Caprese Frittata Affogato",
    slug: "gluten-free-caprese-frittata-affogato",
    seoTitle: "Gluten-Free Caprese Frittata Affogato - Italian Breakfast Classic",
    description: "Fresh tomatoes, creamy mozzarella, and fragrant basil in classic Caprese style — Italian flag colors in every bite.",
    longDescription: "This gluten-free Caprese frittata affogato brings the beloved Italian Caprese salad into breakfast form with fresh tomatoes, creamy mozzarella, and fragrant basil baked into custardy eggs. The classic combination of red tomatoes, white mozzarella, and green basil creates a dish that's as beautiful as it is delicious, featuring the colors of the Italian flag. A drizzle of balsamic glaze adds sweet-tangy depth, while high-quality ingredients shine through the simple preparation. This is summer on a plate — light, fresh, and full of bright Mediterranean flavors. Perfect for brunch entertaining or a leisurely weekend breakfast.",
    seoDescription: "Gluten-free Caprese frittata affogato with tomatoes, mozzarella, and basil. Classic Italian flavors in a beautiful breakfast dish.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-caprese-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "2 cups cherry tomatoes, halved",
      "8 oz fresh mozzarella, sliced or torn",
      "1/2 cup fresh basil leaves, plus extra for garnish",
      "1/4 cup heavy cream",
      "1/3 cup grated Parmesan",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Balsamic glaze for drizzling"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet. Add garlic and cook for 1 minute.",
      "Add cherry tomatoes and cook for 3-4 minutes until slightly softened.",
      "Whisk together eggs, cream, Parmesan, salt, and pepper.",
      "Pour egg mixture over tomatoes in the skillet.",
      "Arrange mozzarella slices on top and scatter basil leaves.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Transfer to oven and bake for 18-20 minutes until golden and puffed.",
      "Cool for 5 minutes, then drizzle with balsamic glaze.",
      "Garnish with fresh basil and serve."
    ],
    tags: ["gluten-free", "frittata", "Caprese", "tomatoes", "mozzarella", "basil", "Italian", "vegetarian", "breakfast", "affogato"],
    nutrition: {
      calories: 310,
      protein: "19g",
      carbs: "7g",
      fat: "23g",
      fiber: "1g",
      sodium: "520mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Spinach & Sausage Frittata Affogato",
    slug: "gluten-free-spinach-sausage-frittata-affogato",
    seoTitle: "Gluten-Free Spinach & Sausage Frittata - Hearty & Nutritious",
    description: "Savory Italian sausage and nutrient-rich spinach with melted cheese — hearty, balanced breakfast perfection.",
    longDescription: "This gluten-free spinach and sausage frittata affogato combines the heartiness of Italian sausage with the nutritional benefits of fresh spinach for a perfectly balanced breakfast. The sausage provides rich, savory flavor while the spinach adds color, nutrients, and a slight earthiness. Melted cheese brings everything together in a custardy egg base that's both satisfying and nourishing. This is the kind of breakfast that keeps you fueled for hours — high in protein, packed with greens, and deeply flavorful. It's perfect for meal prep, as it reheats beautifully and tastes great at room temperature too.",
    seoDescription: "Gluten-free spinach and sausage frittata affogato with cheese. Hearty, protein-rich breakfast with greens and Italian flavors.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-spinach-sausage-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "10 oz gluten-free Italian sausage",
      "4 cups fresh spinach",
      "1 cup shredded mozzarella",
      "1/2 cup ricotta cheese",
      "1/4 cup grated Parmesan",
      "1/4 cup milk",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1/4 teaspoon nutmeg",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet. Cook sausage until browned, breaking it up. Remove and set aside.",
      "In the same skillet, add garlic and spinach. Cook until spinach wilts, about 2 minutes.",
      "Whisk together eggs, milk, Parmesan, nutmeg, salt, and pepper.",
      "Return sausage to skillet and spread evenly with spinach.",
      "Pour egg mixture over everything.",
      "Drop spoonfuls of ricotta across the top, then sprinkle with mozzarella.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Bake for 18-20 minutes until golden and puffed.",
      "Cool 5 minutes before slicing and serving."
    ],
    tags: ["gluten-free", "frittata", "spinach", "sausage", "breakfast", "brunch", "protein-rich", "Italian", "nutritious", "affogato"],
    nutrition: {
      calories: 370,
      protein: "25g",
      carbs: "6g",
      fat: "28g",
      fiber: "1g",
      sodium: "640mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Veggie Garden Frittata Affogato",
    slug: "gluten-free-veggie-garden-frittata-affogato",
    seoTitle: "Gluten-Free Veggie Garden Frittata - Rainbow Breakfast",
    description: "Colorful medley of zucchini, tomatoes, bell peppers, and mushrooms — vibrant vegetarian breakfast packed with vegetables.",
    longDescription: "This gluten-free veggie garden frittata affogato is a celebration of fresh vegetables, featuring a rainbow of zucchini, tomatoes, bell peppers, mushrooms, and herbs in a fluffy egg base. It's like having a vegetable garden on your plate — colorful, nutritious, and bursting with fresh flavors. The variety of vegetables provides different textures and tastes in every bite, while cheese and herbs tie everything together. This is perfect for using up farmers market bounty or cleaning out your vegetable drawer. It's a great way to eat your vegetables for breakfast, and kids love the colorful presentation too.",
    seoDescription: "Gluten-free veggie garden frittata affogato with zucchini, peppers, and tomatoes. Colorful, nutrient-packed vegetarian breakfast.",
    category: "Breakfast",
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-veggie-garden-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "1 zucchini, sliced",
      "1 cup cherry tomatoes, halved",
      "1 bell pepper, diced",
      "1 cup mushrooms, sliced",
      "1/2 red onion, diced",
      "1 cup shredded cheese (cheddar or mozzarella)",
      "1/4 cup milk",
      "3 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Fresh herbs (basil, parsley, thyme)",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet. Add onion and cook for 3 minutes.",
      "Add zucchini, bell pepper, and mushrooms. Cook for 5-6 minutes until softened.",
      "Add garlic and tomatoes. Cook for 2 minutes.",
      "Whisk together eggs, milk, salt, pepper, and half the fresh herbs.",
      "Pour egg mixture over vegetables.",
      "Sprinkle cheese and remaining herbs on top.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Transfer to oven and bake for 18-20 minutes until golden.",
      "Cool 5 minutes, then slice and serve."
    ],
    tags: ["gluten-free", "frittata", "vegetarian", "vegetables", "breakfast", "brunch", "colorful", "healthy", "garden fresh", "affogato"],
    nutrition: {
      calories: 260,
      protein: "16g",
      carbs: "10g",
      fat: "18g",
      fiber: "3g",
      sodium: "420mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Lasagna-Inspired Frittata Affogato",
    slug: "gluten-free-lasagna-inspired-frittata-affogato",
    seoTitle: "Gluten-Free Lasagna-Inspired Frittata - Italian Comfort Breakfast",
    description: "Layers of marinara, ricotta, Italian sausage, and mozzarella — all the lasagna flavors in breakfast form.",
    longDescription: "This gluten-free lasagna-inspired frittata affogato brings all the beloved flavors of Italian lasagna into an easy breakfast format. Marinara sauce, creamy ricotta, Italian sausage, and melted mozzarella are layered with eggs to create a dish that tastes remarkably like lasagna but comes together in a fraction of the time. The marinara adds tangy sweetness, the ricotta brings creaminess, and the sausage provides savory depth. Fresh basil and Parmesan complete the Italian flavor profile. This is comfort food for breakfast — indulgent, satisfying, and perfect for when you want something special.",
    seoDescription: "Gluten-free lasagna-inspired frittata affogato with marinara and ricotta. Italian comfort food flavors in breakfast form.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 28,
    totalTime: 43,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-lasagna-inspired-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "8 oz gluten-free Italian sausage",
      "1 cup marinara sauce (gluten-free)",
      "1 cup ricotta cheese",
      "1 cup shredded mozzarella",
      "1/2 cup grated Parmesan",
      "1/4 cup milk",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Fresh basil leaves",
      "Italian seasoning",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet. Cook sausage until browned, breaking it up. Remove and set aside.",
      "Add garlic to skillet and cook for 1 minute.",
      "Whisk together eggs, milk, Parmesan, Italian seasoning, salt, and pepper.",
      "Return sausage to skillet and spread evenly.",
      "Pour half the marinara sauce over sausage.",
      "Drop spoonfuls of ricotta over the sauce.",
      "Pour egg mixture over everything.",
      "Top with remaining marinara, mozzarella, and basil.",
      "Cook on stovetop for 2-3 minutes, then bake for 22-25 minutes until golden.",
      "Cool 5 minutes before serving."
    ],
    tags: ["gluten-free", "frittata", "lasagna-inspired", "Italian", "marinara", "ricotta", "sausage", "breakfast", "comfort food", "affogato"],
    nutrition: {
      calories: 420,
      protein: "27g",
      carbs: "12g",
      fat: "30g",
      fiber: "2g",
      sodium: "780mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Savory Herb Frittata Affogato",
    slug: "gluten-free-savory-herb-frittata-affogato",
    seoTitle: "Gluten-Free Savory Herb Frittata - Elegant French-Italian Fusion",
    description: "Fresh rosemary, thyme, and parsley with goat cheese and caramelized onions — elegant, aromatic breakfast.",
    longDescription: "This gluten-free savory herb frittata affogato is an elegant, aromatic dish that showcases the beauty of fresh herbs. Rosemary, thyme, and parsley infuse the eggs with incredible fragrance, while tangy goat cheese adds creaminess and depth. Caramelized onions bring natural sweetness that balances the herbs perfectly. This is a sophisticated breakfast that feels special enough for entertaining yet is simple enough for a weekend morning. The combination of herbs creates layers of flavor that make each bite interesting and delicious. Serve with a simple green salad for a light but satisfying meal.",
    seoDescription: "Gluten-free savory herb frittata affogato with goat cheese and caramelized onions. Elegant, aromatic breakfast with fresh herbs.",
    category: "Breakfast",
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-savory-herb-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "2 large onions, thinly sliced",
      "4 oz goat cheese, crumbled",
      "2 tablespoons fresh rosemary, chopped",
      "2 tablespoons fresh thyme leaves",
      "1/4 cup fresh parsley, chopped",
      "1/4 cup milk",
      "1/4 cup grated Parmesan",
      "3 tablespoons olive oil",
      "1 tablespoon butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat butter and 1 tablespoon olive oil in a 10-inch oven-safe skillet over medium-low heat. Add onions and cook slowly for 15-20 minutes until caramelized, stirring occasionally. Remove and set aside.",
      "Preheat oven to 375°F.",
      "Whisk together eggs, milk, rosemary, thyme, half the parsley, Parmesan, salt, and pepper.",
      "Heat remaining olive oil in the same skillet over medium heat.",
      "Spread caramelized onions in the skillet.",
      "Pour egg mixture over onions.",
      "Scatter goat cheese crumbles on top.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Transfer to oven and bake for 18-20 minutes until golden and puffed.",
      "Garnish with remaining fresh parsley and serve."
    ],
    tags: ["gluten-free", "frittata", "herbs", "goat cheese", "caramelized onions", "breakfast", "elegant", "vegetarian", "aromatic", "affogato"],
    nutrition: {
      calories: 280,
      protein: "15g",
      carbs: "12g",
      fat: "20g",
      fiber: "2g",
      sodium: "380mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Sweet Ricotta & Honey Frittata Affogato",
    slug: "gluten-free-sweet-ricotta-honey-frittata-affogato",
    seoTitle: "Gluten-Free Sweet Ricotta & Honey Frittata - Breakfast Dessert",
    description: "Creamy ricotta, golden honey, and fresh berries — sweet-savory breakfast that feels like dessert.",
    longDescription: "This gluten-free sweet ricotta and honey frittata affogato is a unique sweet-savory creation that blurs the line between breakfast and dessert. Creamy ricotta cheese is dolloped throughout the eggs, while honey adds natural sweetness. Fresh berries provide bursts of tartness, and a dusting of powdered sugar makes it feel special. The eggs are only lightly sweetened, creating a balanced dish that's not too sweet but feels indulgent. This is perfect for a special brunch, Mother's Day breakfast, or anytime you want something different. Serve with a side of crispy bacon for the ultimate sweet-savory combination.",
    seoDescription: "Gluten-free sweet ricotta and honey frittata affogato with fresh berries. Unique sweet-savory breakfast that feels like dessert.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-sweet-ricotta-honey-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "1 cup ricotta cheese",
      "1/4 cup honey, plus extra for drizzling",
      "1/4 cup milk",
      "1 cup mixed fresh berries (strawberries, blueberries, raspberries)",
      "2 tablespoons butter",
      "1 teaspoon vanilla extract",
      "1/4 teaspoon cinnamon",
      "Pinch of salt",
      "Powdered sugar for dusting",
      "Fresh mint for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Whisk together eggs, milk, 1/4 cup honey, vanilla, cinnamon, and salt.",
      "Melt butter in a 10-inch oven-safe skillet over medium heat.",
      "Pour egg mixture into skillet.",
      "Drop spoonfuls of ricotta across the top.",
      "Scatter fresh berries over everything.",
      "Cook on stovetop for 2-3 minutes until edges start to set.",
      "Transfer to oven and bake for 18-20 minutes until golden and puffed.",
      "Cool for 5 minutes, then dust with powdered sugar.",
      "Drizzle with extra honey, garnish with mint, and serve."
    ],
    tags: ["gluten-free", "frittata", "sweet", "ricotta", "honey", "berries", "breakfast", "brunch", "dessert-like", "affogato"],
    nutrition: {
      calories: 260,
      protein: "14g",
      carbs: "20g",
      fat: "14g",
      fiber: "1g",
      sodium: "240mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Prosciutto & Arugula Frittata Affogato",
    slug: "gluten-free-prosciutto-arugula-frittata-affogato",
    seoTitle: "Gluten-Free Prosciutto & Arugula Frittata - Sophisticated Italian",
    description: "Delicate prosciutto, peppery arugula, and shaved Parmesan — sophisticated, elegant Italian breakfast.",
    longDescription: "This gluten-free prosciutto and arugula frittata affogato is an sophisticated dish inspired by Italian cafes. Thin slices of prosciutto are crisped slightly, then layered into the frittata for salty, savory flavor. Fresh peppery arugula is added after baking to maintain its vibrant color and crisp texture. Shaved Parmesan and a drizzle of balsamic glaze add finishing touches that make this feel restaurant-quality. The combination of salty prosciutto, peppery greens, and nutty cheese is classic Italian, while the custardy eggs tie everything together beautifully. This is perfect for an elegant brunch or when you want to impress guests.",
    seoDescription: "Gluten-free prosciutto and arugula frittata affogato with Parmesan. Sophisticated Italian breakfast with elegant flavors.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-prosciutto-arugula-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "4 oz prosciutto, torn into pieces",
      "2 cups fresh arugula",
      "1/2 cup grated Parmesan, plus shaved Parmesan for topping",
      "1/4 cup heavy cream",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Balsamic glaze for drizzling",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat 1 tablespoon olive oil in a 10-inch oven-safe skillet. Add prosciutto and cook until slightly crispy, about 2 minutes. Remove and set aside.",
      "Add remaining olive oil and garlic to skillet. Cook for 1 minute.",
      "Whisk together eggs, cream, grated Parmesan, salt, and pepper.",
      "Pour egg mixture into skillet.",
      "Scatter half the prosciutto over the eggs.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Transfer to oven and bake for 18-20 minutes until golden.",
      "Top with fresh arugula, remaining prosciutto, and shaved Parmesan immediately after removing from oven.",
      "Drizzle with balsamic glaze and serve with lemon wedges."
    ],
    tags: ["gluten-free", "frittata", "prosciutto", "arugula", "Italian", "breakfast", "brunch", "sophisticated", "elegant", "affogato"],
    nutrition: {
      calories: 290,
      protein: "20g",
      carbs: "4g",
      fat: "22g",
      fiber: "0g",
      sodium: "720mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Mediterranean Olives & Feta Frittata Affogato",
    slug: "gluten-free-mediterranean-olives-feta-frittata-affogato",
    seoTitle: "Gluten-Free Mediterranean Frittata - Greek-Italian Fusion",
    description: "Kalamata olives, tangy feta, sun-dried tomatoes, and oregano — Mediterranean flavors in every savory bite.",
    longDescription: "This gluten-free Mediterranean olives and feta frittata affogato brings together the best flavors of the Mediterranean in one stunning dish. Briny kalamata olives, tangy feta cheese, sweet sun-dried tomatoes, and aromatic oregano create a flavor profile that's both bold and balanced. The combination is inspired by Greek cuisine but presented in Italian frittata form, creating a beautiful fusion. The salty olives and cheese are balanced by the eggs' richness, while the sun-dried tomatoes add concentrated sweetness. This is perfect for olive and feta lovers who want a savory, intensely flavored breakfast that transports them to the Mediterranean coast.",
    seoDescription: "Gluten-free Mediterranean frittata affogato with olives, feta, and sun-dried tomatoes. Bold Greek-Italian fusion breakfast.",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-mediterranean-olives-feta-frittata-affogato.png",
    ingredients: [
      "8 large eggs",
      "1 cup kalamata olives, pitted and halved",
      "1 cup crumbled feta cheese",
      "1/2 cup sun-dried tomatoes in oil, chopped",
      "1/4 cup milk",
      "2 tablespoons olive oil (from sun-dried tomatoes)",
      "1 small red onion, thinly sliced",
      "2 cloves garlic, minced",
      "1 tablespoon fresh oregano (or 1 teaspoon dried)",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat olive oil in a 10-inch oven-safe skillet. Add onion and cook for 4-5 minutes until softened.",
      "Add garlic and cook for 1 minute.",
      "Whisk together eggs, milk, oregano, salt, and pepper.",
      "Spread sun-dried tomatoes and olives in the skillet.",
      "Pour egg mixture over vegetables.",
      "Sprinkle feta cheese on top.",
      "Cook on stovetop for 2-3 minutes until edges set.",
      "Transfer to oven and bake for 18-20 minutes until golden.",
      "Cool for 5 minutes, garnish with fresh parsley, and serve."
    ],
    tags: ["gluten-free", "frittata", "Mediterranean", "olives", "feta", "Greek", "Italian fusion", "breakfast", "savory", "affogato"],
    nutrition: {
      calories: 300,
      protein: "16g",
      carbs: "8g",
      fat: "24g",
      fiber: "2g",
      sodium: "820mg"
    },
    isNaturallyGlutenFree: true
  }
];

async function addRecipes() {
  console.log("Adding 10 Gluten-Free Frittata Affogato recipes...");
  
  for (const recipe of frittataAffogatoRecipes) {
    try {
      await db.insert(recipes).values({
        id: nanoid(),
        ...recipe,
        rating: "4.8",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✓ Added: ${recipe.title}`);
    } catch (error) {
      console.error(`✗ Error adding ${recipe.title}:`, error);
    }
  }
  
  console.log("\n✅ All recipes added successfully!");
  process.exit(0);
}

addRecipes();

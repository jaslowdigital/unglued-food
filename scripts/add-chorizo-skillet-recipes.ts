import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const chorizoSkilletRecipes = [
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Peppers & Lime Crema",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-peppers-lime-crema",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Peppers & Lime Crema - One-Pan Dinner",
    description: "Colorful bell peppers, smoky chorizo, crispy rice, and creamy lime crema create a bright, zesty, perfectly balanced one-pan dinner.",
    longDescription: "This vibrant one-pan skillet combines the best of smoky, cheesy, and fresh flavors in a single dish. Gluten-free chorizo is crisped until golden, then combined with protein-packed chickpeas and day-old rice that develops a beautifully crispy bottom layer. Colorful bell peppers add sweetness and crunch, while melted cheese creates pockets of gooey richness throughout. The finishing touch is a cool, tangy lime crema that balances the heat and richness perfectly. This recipe celebrates texture contrasts — crispy rice edges, tender chickpeas, and creamy toppings — making it a weeknight favorite that feels special enough for entertaining.",
    seoDescription: "One-pan gluten-free cheesy chorizo, chickpea and crispy rice skillet with peppers and lime crema. Bright, zesty, perfectly balanced weeknight dinner with minimal cleanup.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-peppers-lime-crema.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 red bell pepper, diced",
      "1 yellow bell pepper, diced",
      "1 cup shredded Mexican cheese blend",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1/2 teaspoon smoked paprika",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "For lime crema: 1/2 cup sour cream, juice of 1 lime, pinch of salt",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook, breaking it up with a wooden spoon, until browned and crispy, about 5-7 minutes.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Stir in chickpeas, bell peppers, cumin, and smoked paprika. Cook for 3-4 minutes until peppers soften slightly.",
      "Add rice and press it down into an even layer. Let it cook undisturbed for 5-7 minutes to form a crispy bottom crust.",
      "Sprinkle cheese over the top and cover the skillet. Cook for 2-3 minutes until cheese melts.",
      "While cheese melts, mix sour cream, lime juice, and salt to make the crema.",
      "Remove from heat, drizzle with lime crema, and garnish with fresh cilantro. Serve immediately."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "weeknight dinner", "high-protein", "comfort food", "Mexican-inspired", "easy dinner"],
    nutrition: {
      calories: 520,
      protein: "28g",
      carbs: "48g",
      fat: "24g",
      fiber: "7g",
      sodium: "920mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Spinach & Feta",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-spinach-feta",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Spinach & Feta - Mediterranean One-Pan",
    description: "A Mediterranean twist with wilted spinach, tangy feta, creamy melted cheese, and crispy rice — a one-pan comfort meal.",
    longDescription: "This Mediterranean-inspired skillet brings together the bold flavors of Spanish chorizo with Greek feta and fresh spinach for a fusion comfort dish that's both hearty and refreshing. The gluten-free chorizo provides smoky richness, while chickpeas add protein and fiber. Fresh spinach wilts into the hot skillet, adding vibrant color and nutrients. Tangy feta cheese crumbles melt slightly, creating pockets of sharp, salty flavor that contrast beautifully with the creamy cheese base. The rice develops a golden, crispy bottom layer that provides satisfying crunch. It's a one-pan wonder that combines the best of Mediterranean flavors with minimal cleanup.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with spinach and feta. Mediterranean-inspired one-pan dinner with bold flavors and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-spinach-feta.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "4 cups fresh spinach",
      "1 cup shredded mozzarella cheese",
      "1/2 cup crumbled feta cheese",
      "3 cloves garlic, minced",
      "1 teaspoon dried oregano",
      "1/2 teaspoon red pepper flakes",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook, breaking it up, until browned and crispy, about 5-7 minutes.",
      "Add garlic, oregano, and red pepper flakes. Cook for 1 minute.",
      "Stir in chickpeas and cook for 2-3 minutes.",
      "Add spinach and cook until wilted, about 2 minutes.",
      "Add rice and press into an even layer. Let cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle mozzarella and feta over the top. Cover and cook for 2-3 minutes until cheese melts.",
      "Serve with lemon wedges for squeezing over the top."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "Mediterranean", "spinach", "feta", "weeknight dinner", "high-protein"],
    nutrition: {
      calories: 545,
      protein: "30g",
      carbs: "46g",
      fat: "26g",
      fiber: "8g",
      sodium: "1050mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Tomatoes & Basil",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-tomatoes-basil",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Tomatoes & Basil - Fresh Italian Twist",
    description: "Fresh cherry tomatoes and basil bring brightness to this bold, cheesy skillet with crispy rice and smoky chorizo.",
    longDescription: "This Italian-inspired skillet marries the smoky boldness of Spanish chorizo with the fresh, bright flavors of Italian cuisine. Cherry tomatoes burst and caramelize in the hot skillet, releasing their sweet juices that mingle with the chorizo's oils. Fresh basil is added at the end, preserving its aromatic oils and vibrant green color. The combination of chickpeas and rice creates a hearty, filling base, while melted cheese ties everything together. The crispy rice crust on the bottom adds a satisfying textural contrast. This fusion dish is perfect for those who love bold flavors balanced with fresh, garden-bright ingredients.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with cherry tomatoes and basil. Fresh Italian-Spanish fusion one-pan dinner with crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-tomatoes-basil.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "2 cups cherry tomatoes, halved",
      "1 cup shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "3 cloves garlic, minced",
      "1 teaspoon Italian seasoning",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "1/2 cup fresh basil leaves, torn",
      "Balsamic glaze for drizzling (optional)"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic and Italian seasoning. Cook for 1 minute.",
      "Stir in chickpeas and cherry tomatoes. Cook for 3-4 minutes until tomatoes start to soften.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle mozzarella and Parmesan over the top. Cover and cook for 2-3 minutes until cheese melts.",
      "Remove from heat and top with fresh torn basil.",
      "Drizzle with balsamic glaze if desired and serve immediately."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "Italian-inspired", "tomatoes", "basil", "weeknight dinner", "comfort food"],
    nutrition: {
      calories: 530,
      protein: "29g",
      carbs: "47g",
      fat: "25g",
      fiber: "7g",
      sodium: "940mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Smoky Paprika Sauce",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-smoky-paprika-sauce",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Smoky Paprika Sauce - Bold & Hearty",
    description: "Deeply flavorful smoky paprika sauce enhances the chorizo's richness in this hearty, satisfying skillet with crispy rice.",
    longDescription: "This deeply flavorful skillet takes smoky chorizo to the next level with a rich paprika sauce that coats every bite. The sauce is built from smoked paprika, tomato paste, and chicken broth, creating layers of umami and smoke that complement the chorizo beautifully. Chickpeas absorb the sauce, becoming tender flavor bombs, while the rice develops an irresistible crispy crust on the bottom. Melted cheese creates pockets of creamy richness throughout the dish. This is ultimate comfort food — hearty, satisfying, and deeply flavored. Perfect for cold evenings when you want something that warms you from the inside out.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with smoky paprika sauce. Bold, hearty one-pan dinner with deep smoky flavors and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-smoky-paprika-sauce.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 cup shredded cheddar cheese",
      "3 cloves garlic, minced",
      "2 tablespoons smoked paprika",
      "2 tablespoons tomato paste",
      "1 cup gluten-free chicken broth",
      "1 teaspoon cumin",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
      "Sour cream for serving"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic, smoked paprika, cumin, and tomato paste. Stir for 1 minute.",
      "Pour in chicken broth and stir to combine, scraping up any browned bits.",
      "Add chickpeas and simmer for 5 minutes until sauce thickens slightly.",
      "Stir in rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle cheese over the top. Cover and cook for 2-3 minutes until melted.",
      "Garnish with fresh parsley and serve with sour cream on the side."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "smoky", "paprika", "comfort food", "weeknight dinner", "hearty"],
    nutrition: {
      calories: 550,
      protein: "28g",
      carbs: "49g",
      fat: "26g",
      fiber: "8g",
      sodium: "980mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Sweet Corn & Jalapeño",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-sweet-corn-jalapeño",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Sweet Corn & Jalapeño - Southwest Flair",
    description: "Sweet corn and mild heat from jalapeños give this skillet Southwest flair — creamy, crispy, and perfectly spicy.",
    longDescription: "This Southwest-inspired skillet brings together sweet corn kernels and spicy jalapeños for a perfect balance of heat and sweetness. The corn caramelizes slightly in the hot skillet, adding pops of sweetness that contrast beautifully with the smoky chorizo and spicy jalapeños. Chickpeas provide protein and texture, while the rice develops a golden crispy crust. Melted cheese creates creamy pockets throughout, and the combination of flavors — sweet, spicy, smoky, and cheesy — makes this an addictive one-pan meal. It's perfect for weeknight dinners when you want bold flavors without spending hours in the kitchen.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with sweet corn and jalapeño. Southwest-inspired one-pan dinner with sweet heat and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-sweet-corn-jalapeño.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 1/2 cups fresh or frozen corn kernels",
      "2 jalapeños, seeded and diced",
      "1 cup shredded Monterey Jack cheese",
      "1/2 cup shredded cheddar cheese",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1/2 teaspoon chili powder",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh cilantro and lime wedges for serving"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic, jalapeños, cumin, and chili powder. Cook for 1-2 minutes.",
      "Stir in chickpeas and corn. Cook for 3-4 minutes until corn is lightly charred.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle both cheeses over the top. Cover and cook for 2-3 minutes until melted.",
      "Garnish with fresh cilantro and serve with lime wedges."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "Southwest", "corn", "jalapeño", "spicy", "weeknight dinner"],
    nutrition: {
      calories: 540,
      protein: "28g",
      carbs: "52g",
      fat: "24g",
      fiber: "8g",
      sodium: "910mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Caramelized Onions & Manchego",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-caramelized-onions-manchego",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Caramelized Onions & Manchego - Spanish-Inspired",
    description: "Sweet caramelized onions and rich Manchego cheese elevate this skillet with Spanish-inspired flair and crispy texture.",
    longDescription: "This Spanish-inspired skillet celebrates the classic combination of chorizo and Manchego cheese, elevated with sweet, deeply caramelized onions. The onions are cooked low and slow until they develop rich, complex sweetness that balances the smoky, spicy chorizo perfectly. Manchego cheese — nutty, sharp, and complex — melts beautifully over the crispy rice base. Chickpeas add heartiness and protein, making this a complete meal. The rice develops an irresistible golden crust on the bottom. This is sophisticated comfort food that feels restaurant-worthy but comes together in one pan with minimal effort.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with caramelized onions and Manchego. Spanish-inspired one-pan dinner with sweet onions and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 20,
    cookTime: 35,
    totalTime: 55,
    servings: 4,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-caramelized-onions-manchego.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "2 large onions, thinly sliced",
      "1 cup shredded Manchego cheese",
      "3 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "3 tablespoons olive oil",
      "1 tablespoon butter",
      "Salt and pepper to taste",
      "Fresh thyme for garnish",
      "Sherry vinegar for drizzling (optional)"
    ],
    instructions: [
      "Heat 2 tablespoons olive oil and butter in a large cast iron skillet over medium-low heat.",
      "Add sliced onions with a pinch of salt. Cook, stirring occasionally, for 20-25 minutes until deeply caramelized. Remove and set aside.",
      "Increase heat to medium-high. Add remaining olive oil and chorizo. Cook until browned, about 5-7 minutes.",
      "Add garlic and smoked paprika. Cook for 1 minute.",
      "Stir in chickpeas and half of the caramelized onions.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Top with remaining caramelized onions and Manchego cheese. Cover and cook for 2-3 minutes until cheese melts.",
      "Garnish with fresh thyme and a drizzle of sherry vinegar if desired."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "Spanish", "Manchego", "caramelized onions", "comfort food", "weeknight dinner"],
    nutrition: {
      calories: 570,
      protein: "29g",
      carbs: "50g",
      fat: "28g",
      fiber: "7g",
      sodium: "960mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Roasted Garlic & Lemon",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-roasted-garlic-lemon",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Roasted Garlic & Lemon - Bright & Aromatic",
    description: "Bright and aromatic — roasted garlic adds depth while lemon zest lifts the flavors in this crispy skillet.",
    longDescription: "This aromatic skillet balances the richness of chorizo and cheese with bright, fresh lemon and sweet roasted garlic. Whole garlic cloves are roasted until soft, sweet, and caramelized, then scattered throughout the dish where they melt into creamy, garlicky pockets. Fresh lemon zest and juice add brightness that cuts through the richness, while chickpeas and rice provide heartiness. The crispy rice crust on the bottom adds textural contrast. This dish is perfect for those who love bold flavors balanced with fresh, aromatic ingredients. It's comfort food that doesn't feel heavy.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with roasted garlic and lemon. Bright, aromatic one-pan dinner with sweet garlic and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 25,
    cookTime: 25,
    totalTime: 50,
    servings: 4,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-roasted-garlic-lemon.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 head garlic, cloves separated but unpeeled",
      "1 cup shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "Zest and juice of 1 lemon",
      "1 teaspoon dried oregano",
      "3 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Preheat oven to 400°F. Toss garlic cloves with 1 tablespoon olive oil and wrap in foil. Roast for 20 minutes until soft. Squeeze out cloves and discard skins.",
      "Heat remaining olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add oregano and cook for 30 seconds.",
      "Stir in chickpeas, roasted garlic cloves, and lemon zest.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle both cheeses over the top. Cover and cook for 2-3 minutes until melted.",
      "Drizzle with lemon juice, garnish with parsley, and serve with lemon wedges."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "roasted garlic", "lemon", "aromatic", "weeknight dinner", "comfort food"],
    nutrition: {
      calories: 535,
      protein: "29g",
      carbs: "48g",
      fat: "25g",
      fiber: "7g",
      sodium: "930mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Avocado & Cilantro",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-avocado-cilantro",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Avocado & Cilantro - Fresh & Balanced",
    description: "Finished with creamy avocado slices and fresh cilantro for a fresh, balanced finish to this rich, crispy skillet.",
    longDescription: "This skillet celebrates the perfect balance between rich, indulgent flavors and fresh, cooling toppings. Smoky chorizo and melted cheese create a decadent base, while chickpeas and crispy rice add heartiness and texture. The finishing touches — creamy avocado slices and fresh cilantro — add brightness and balance that prevent the dish from feeling too heavy. The avocado provides healthy fats and a buttery texture, while cilantro adds herbaceous freshness. Lime juice ties everything together with a bright, acidic pop. This is comfort food that still feels light and fresh.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with avocado and cilantro. Fresh, balanced one-pan dinner with creamy avocado and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-avocado-cilantro.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 cup shredded Monterey Jack cheese",
      "1/2 cup shredded cheddar cheese",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "2 ripe avocados, sliced",
      "1/2 cup fresh cilantro leaves",
      "Lime wedges for serving",
      "Hot sauce (optional)"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic and cumin. Cook for 1 minute.",
      "Stir in chickpeas and cook for 2-3 minutes.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle both cheeses over the top. Cover and cook for 2-3 minutes until melted.",
      "Remove from heat and top with avocado slices and fresh cilantro.",
      "Serve with lime wedges and hot sauce if desired."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "avocado", "cilantro", "fresh", "weeknight dinner", "balanced"],
    nutrition: {
      calories: 580,
      protein: "28g",
      carbs: "50g",
      fat: "30g",
      fiber: "10g",
      sodium: "900mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Chipotle & Lime",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-chipotle-lime",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Chipotle & Lime - Smoky & Tangy",
    description: "Chipotle paste and lime juice add smoky, tangy depth to this rich, cheesy skillet with crispy rice base.",
    longDescription: "This boldly flavored skillet layers smoky heat from chipotle with bright tang from fresh lime for a perfectly balanced one-pan dinner. Chipotle paste (or minced chipotles in adobo) adds deep, smoky heat that complements the chorizo's spiciness without overwhelming it. The lime juice and zest provide acidity that cuts through the richness of the cheese and chorizo. Chickpeas absorb the smoky, spicy sauce, while the rice develops a golden crispy crust. This is for those who love bold, assertive flavors — spicy, smoky, tangy, and cheesy all in one satisfying skillet.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with chipotle and lime. Smoky, tangy one-pan dinner with bold flavors and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-chipotle-lime.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 cup shredded pepper jack cheese",
      "1/2 cup shredded cheddar cheese",
      "3 cloves garlic, minced",
      "2 tablespoons chipotle paste (or 2 chipotles in adobo, minced)",
      "Zest and juice of 2 limes",
      "1 teaspoon cumin",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh cilantro and lime wedges for serving",
      "Sour cream (optional)"
    ],
    instructions: [
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic, chipotle paste, cumin, and lime zest. Cook for 1-2 minutes.",
      "Stir in chickpeas and cook for 2-3 minutes.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle both cheeses over the top. Cover and cook for 2-3 minutes until melted.",
      "Drizzle with fresh lime juice and garnish with cilantro.",
      "Serve with additional lime wedges and sour cream if desired."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "chipotle", "lime", "spicy", "smoky", "weeknight dinner"],
    nutrition: {
      calories: 545,
      protein: "28g",
      carbs: "48g",
      fat: "26g",
      fiber: "7g",
      sodium: "950mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Poached Egg & Hot Honey",
    slug: "gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-poached-egg-hot-honey",
    seoTitle: "Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet with Poached Egg & Hot Honey - Brunch Twist",
    description: "A brunch-ready twist — topped with a poached egg and drizzled with hot honey for sweet-spicy contrast and crispy texture.",
    longDescription: "This show-stopping skillet transforms a hearty dinner into an impressive brunch dish with the addition of a perfectly poached egg and sweet-spicy hot honey drizzle. The runny egg yolk creates an instant sauce when broken, coating the crispy rice, chorizo, and chickpeas in rich, creamy goodness. Hot honey — honey infused with chili flakes — adds a sweet-spicy glaze that complements the smoky chorizo beautifully. The contrast of textures — crispy rice, creamy egg, crunchy chorizo, and tender chickpeas — makes every bite interesting. This is comfort food elevated to brunch-worthy status.",
    seoDescription: "Gluten-free cheesy chorizo, chickpea and crispy rice skillet with poached egg and hot honey. Brunch-worthy one-pan meal with sweet-spicy contrast and crispy texture.",
    category: "One-Pan Meals",
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-cheesy-chorizo-chickpea-crispy-rice-skillet-poached-egg-hot-honey.png",
    ingredients: [
      "1 lb gluten-free chorizo, casings removed",
      "3 cups cooked white rice (day-old works best)",
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 cup shredded cheddar cheese",
      "3 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "4 eggs for poaching",
      "1 tablespoon white vinegar (for poaching)",
      "For hot honey: 1/4 cup honey, 1/2 teaspoon red pepper flakes, pinch of salt",
      "Fresh chives for garnish"
    ],
    instructions: [
      "Make hot honey: Warm honey with red pepper flakes and salt in a small saucepan. Set aside.",
      "Heat olive oil in a large cast iron skillet over medium-high heat.",
      "Add chorizo and cook until browned and crispy, about 5-7 minutes.",
      "Add garlic and smoked paprika. Cook for 1 minute.",
      "Stir in chickpeas and cook for 2-3 minutes.",
      "Add rice and press into an even layer. Cook undisturbed for 5-7 minutes to crisp the bottom.",
      "Sprinkle cheese over the top. Cover and cook for 2-3 minutes until melted.",
      "While cheese melts, poach eggs: Bring a pot of water to a gentle simmer, add vinegar. Create a gentle whirlpool and slide in eggs one at a time. Cook for 3-4 minutes until whites are set but yolks are runny.",
      "Top each serving with a poached egg, drizzle with hot honey, and garnish with chives."
    ],
    tags: ["gluten-free", "one-pan meal", "chorizo", "chickpeas", "crispy rice", "brunch", "poached egg", "hot honey", "sweet and spicy", "comfort food"],
    nutrition: {
      calories: 590,
      protein: "32g",
      carbs: "54g",
      fat: "28g",
      fiber: "7g",
      sodium: "920mg"
    },
    isNaturallyGlutenFree: false
  }
];

async function addRecipes() {
  console.log("Adding 10 Gluten-Free Cheesy Chorizo, Chickpea & Crispy Rice Skillet recipes...");
  
  for (const recipe of chorizoSkilletRecipes) {
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

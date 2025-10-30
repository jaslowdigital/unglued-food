import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const gochujangChiliRecipes = [
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Coconut Milk",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-coconut-milk",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Coconut Milk - Dairy-Free Korean Fusion",
    description: "A rich, dairy-free creamy white chicken chili using coconut milk and gluten-free gochujang for velvety texture and bold Korean-inspired flavor.",
    seoDescription: "Dairy-free gluten-free creamy white chicken chili with coconut milk and gochujang. Velvety texture, bold Korean flavors, perfect comfort food for gluten-free and dairy-free diets.",
    category: "Soups & Stews",
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-coconut-milk.png",
    ingredients: [
      "2 lbs boneless skinless chicken breasts, diced",
      "1 tablespoon olive oil",
      "1 medium onion, diced",
      "4 cloves garlic, minced",
      "3 tablespoons gluten-free gochujang paste (Chung Jung One brand recommended)",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) white beans, drained and rinsed",
      "1 can (13.5 oz) full-fat coconut milk",
      "1 teaspoon ground cumin",
      "1/2 teaspoon smoked paprika",
      "Salt and pepper to taste",
      "Fresh cilantro for garnish",
      "Coconut cream drizzle for serving",
      "Lime wedges"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium-high heat. Add diced chicken and cook until browned, about 5-7 minutes.",
      "Add diced onion and minced garlic. Sauté until onion is translucent, about 3-4 minutes.",
      "Stir in gochujang paste, coating the chicken and vegetables evenly.",
      "Pour in chicken broth and bring to a boil. Reduce heat and simmer for 15 minutes.",
      "Add white beans, coconut milk, cumin, and smoked paprika. Stir well to combine.",
      "Simmer for an additional 10-15 minutes until chili thickens to desired consistency.",
      "Season with salt and pepper to taste.",
      "Serve hot, garnished with fresh cilantro, coconut cream drizzle, and lime wedges."
    ],
    tags: ["gluten-free", "dairy-free", "gochujang", "white chicken chili", "coconut milk", "korean fusion", "comfort food", "one-pot meal", "high-protein", "spicy", "soups & stews"],
    nutrition: {
      calories: 420,
      protein: "38g",
      carbs: "32g",
      fat: "16g",
      fiber: "8g",
      sodium: "680mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Sweet Corn & Lime",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-sweet-corn-lime",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Sweet Corn & Lime - Bright & Flavorful",
    description: "Sweet corn and tangy lime perfectly balance the spicy gochujang heat in this bright, flavorful, and comforting gluten-free white chicken chili.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with sweet corn and lime. Bright flavors balance spicy Korean heat. Perfect comfort food for gluten-free living.",
    category: "Soups & Stews",
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-sweet-corn-lime.png",
    ingredients: [
      "2 lbs boneless skinless chicken thighs, cubed",
      "1 tablespoon avocado oil",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "3 tablespoons gluten-free gochujang paste",
      "4 cups gluten-free chicken stock",
      "2 cans (15 oz each) white beans, drained",
      "1 cup heavy cream (or coconut cream for dairy-free)",
      "2 cups fresh or frozen sweet corn kernels",
      "Juice and zest of 2 limes",
      "1 teaspoon ground coriander",
      "1/2 teaspoon cayenne pepper (optional for extra heat)",
      "Salt to taste",
      "Fresh cilantro, lime wedges, and extra corn for garnish"
    ],
    instructions: [
      "In a large Dutch oven, heat avocado oil over medium-high heat. Add cubed chicken and cook until golden brown, about 6-8 minutes.",
      "Add onion and garlic, sautéing until fragrant and softened, about 4 minutes.",
      "Mix in gochujang paste, stirring to coat the chicken and vegetables.",
      "Pour in chicken stock and bring to a boil. Reduce to simmer for 15 minutes.",
      "Add white beans, cream, sweet corn, coriander, and cayenne pepper. Stir well.",
      "Simmer for 12-15 minutes until chili is thick and creamy.",
      "Stir in lime juice and zest. Season with salt to taste.",
      "Serve hot with fresh cilantro, lime wedges, and extra corn kernels on top."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "sweet corn", "lime", "korean fusion", "comfort food", "spicy", "high-protein", "soups & stews"],
    nutrition: {
      calories: 445,
      protein: "40g",
      carbs: "36g",
      fat: "18g",
      fiber: "9g",
      sodium: "720mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Kimchi Garnish",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-kimchi-garnish",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Kimchi - Korean Fusion Twist",
    description: "A fusion masterpiece — creamy gochujang white chicken chili base with spicy-tangy kimchi garnish for crunch, contrast, and bold Korean flavors.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili topped with kimchi. Korean fusion comfort food with bold, tangy, spicy flavors perfect for adventurous eaters.",
    category: "Soups & Stews",
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-kimchi-garnish.png",
    ingredients: [
      "2 lbs chicken breast, diced",
      "2 tablespoons sesame oil",
      "1 onion, chopped",
      "4 garlic cloves, minced",
      "1-inch fresh ginger, grated",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) cannellini beans",
      "1 cup heavy cream or cashew cream",
      "1 tablespoon rice vinegar",
      "1 teaspoon sesame seeds",
      "Salt and white pepper to taste",
      "1 cup gluten-free kimchi for garnish",
      "Sliced scallions",
      "Additional sesame seeds"
    ],
    instructions: [
      "Heat sesame oil in a large pot. Add chicken and cook until browned on all sides, about 7 minutes.",
      "Add onion, garlic, and ginger. Sauté until aromatic, about 3 minutes.",
      "Stir in gochujang paste, ensuring chicken is well-coated.",
      "Add chicken broth and bring to a boil. Reduce heat and simmer 15 minutes.",
      "Mix in cannellini beans, cream, rice vinegar, and sesame seeds.",
      "Simmer for 15 minutes until thickened. Season with salt and white pepper.",
      "Ladle into bowls and top generously with kimchi, scallions, and sesame seeds.",
      "Serve immediately while hot with extra kimchi on the side."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "kimchi", "korean fusion", "asian fusion", "spicy", "comfort food", "high-protein", "soups & stews"],
    nutrition: {
      calories: 435,
      protein: "42g",
      carbs: "30g",
      fat: "17g",
      fiber: "7g",
      sodium: "780mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Roasted Peppers",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-roasted-peppers",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Roasted Peppers - Smoky & Rich",
    description: "Roasted poblano and red peppers add smoky depth to this creamy gochujang white chicken chili, creating layers of flavor in every spoonful.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with roasted poblano and red peppers. Smoky, rich, and deeply flavorful Korean-Southwestern fusion comfort food.",
    category: "Soups & Stews",
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-roasted-peppers.png",
    ingredients: [
      "2 lbs chicken thighs, cubed",
      "2 poblano peppers, roasted and diced",
      "2 red bell peppers, roasted and diced",
      "1 tablespoon olive oil",
      "1 large onion, diced",
      "5 cloves garlic, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) white beans",
      "1 cup sour cream or Greek yogurt",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon cumin",
      "Salt and pepper to taste",
      "Fresh cilantro and cream drizzle for garnish"
    ],
    instructions: [
      "Roast poblano and red peppers under broiler until charred, about 8-10 minutes. Peel, seed, and dice.",
      "In a large pot, heat olive oil and brown chicken pieces, about 7 minutes.",
      "Add onion and garlic, cooking until soft, about 4 minutes.",
      "Stir in gochujang paste, coating everything evenly.",
      "Add chicken broth and bring to a boil. Reduce heat and simmer 15 minutes.",
      "Add roasted peppers, white beans, sour cream, smoked paprika, and cumin.",
      "Simmer 15-20 minutes until thick and creamy.",
      "Season with salt and pepper. Serve garnished with cilantro and cream drizzle."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "roasted peppers", "smoky", "korean fusion", "comfort food", "high-protein", "soups & stews"],
    nutrition: {
      calories: 450,
      protein: "39g",
      carbs: "34g",
      fat: "19g",
      fiber: "8g",
      sodium: "700mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Cilantro & Greek Yogurt",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-cilantro-greek-yogurt",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Greek Yogurt - Cool & Balanced",
    description: "Cool, tangy Greek yogurt and fresh cilantro create perfect balance against the rich heat of this creamy gochujang white chicken chili.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with Greek yogurt and cilantro. Cool, tangy, and balanced Korean-inspired comfort food with high protein.",
    category: "Soups & Stews",
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-cilantro-greek-yogurt.png",
    ingredients: [
      "2 lbs chicken breast, diced",
      "1 tablespoon avocado oil",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) Great Northern beans",
      "1 cup Greek yogurt (plus extra for topping)",
      "1 cup fresh cilantro, chopped (plus extra for garnish)",
      "Juice of 1 lime",
      "1 teaspoon ground cumin",
      "1/2 teaspoon coriander",
      "Salt and pepper to taste",
      "Lime wedges for serving"
    ],
    instructions: [
      "Heat avocado oil in a large pot. Cook chicken until browned, about 6-8 minutes.",
      "Add onion and garlic, sautéing until translucent, about 4 minutes.",
      "Mix in gochujang paste, stirring well to coat.",
      "Pour in chicken broth and bring to a boil. Reduce heat and simmer 15 minutes.",
      "Add beans, cumin, and coriander. Simmer 10-12 minutes.",
      "Remove from heat and stir in Greek yogurt and chopped cilantro.",
      "Add lime juice and season with salt and pepper.",
      "Serve topped with extra Greek yogurt, fresh cilantro, and lime wedges."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "greek yogurt", "cilantro", "high-protein", "korean fusion", "comfort food", "soups & stews"],
    nutrition: {
      calories: 405,
      protein: "44g",
      carbs: "31g",
      fat: "12g",
      fiber: "8g",
      sodium: "650mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Bacon & Scallions",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-bacon-scallions",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Bacon - Smoky & Rich",
    description: "Crispy bacon adds smoky saltiness to this creamy gochujang white chicken chili, topped with fresh scallions for crunch and vibrant color.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with crispy bacon and scallions. Smoky, salty, spicy Korean fusion comfort food with bold flavors.",
    category: "Soups & Stews",
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-bacon-scallions.png",
    ingredients: [
      "6 slices gluten-free bacon, chopped",
      "2 lbs chicken breast, cubed",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) cannellini beans",
      "1 cup heavy cream",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon black pepper",
      "Salt to taste",
      "4 scallions, sliced (divided)",
      "Extra bacon bits for garnish"
    ],
    instructions: [
      "In a large pot, cook chopped bacon until crispy, about 5-7 minutes. Remove and set aside, leaving bacon fat in pot.",
      "Add chicken to bacon fat and cook until browned, about 6-8 minutes.",
      "Add onion and garlic, cooking until softened, about 4 minutes.",
      "Stir in gochujang paste, coating everything well.",
      "Pour in chicken broth and bring to a boil. Reduce heat and simmer 15 minutes.",
      "Add cannellini beans, heavy cream, smoked paprika, and half the scallions.",
      "Simmer 15 minutes until thick and creamy. Season with salt and pepper.",
      "Serve topped with crispy bacon, remaining scallions, and extra bacon bits."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "bacon", "scallions", "smoky", "korean fusion", "comfort food", "high-protein", "soups & stews"],
    nutrition: {
      calories: 485,
      protein: "42g",
      carbs: "30g",
      fat: "23g",
      fiber: "7g",
      sodium: "820mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Sweet Potatoes",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-sweet-potatoes",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Sweet Potatoes - Hearty & Sweet",
    description: "Cubed sweet potatoes add natural sweetness and heartiness to this creamy gochujang white chicken chili — a perfect cold-weather comfort bowl.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with sweet potatoes. Hearty, naturally sweet, and perfectly spiced Korean fusion comfort food for cold weather.",
    category: "Soups & Stews",
    prepTime: 20,
    cookTime: 45,
    totalTime: 65,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-sweet-potatoes.png",
    ingredients: [
      "2 lbs chicken thighs, cubed",
      "2 medium sweet potatoes, peeled and cubed",
      "1 tablespoon olive oil",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) white beans",
      "1 cup coconut cream or heavy cream",
      "1 teaspoon ground cinnamon",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "Fresh cilantro and gochujang drizzle for garnish"
    ],
    instructions: [
      "Heat olive oil in a large pot. Add chicken and cook until browned, about 7 minutes.",
      "Add onion and garlic, sautéing until softened, about 4 minutes.",
      "Stir in gochujang paste, coating chicken and vegetables.",
      "Add chicken broth and cubed sweet potatoes. Bring to a boil.",
      "Reduce heat and simmer 20 minutes until sweet potatoes are tender.",
      "Add white beans, cream, cinnamon, and cumin. Stir well.",
      "Simmer 15 minutes until thick and creamy. Season with salt and pepper.",
      "Serve hot with fresh cilantro and gochujang drizzle."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "sweet potatoes", "hearty", "korean fusion", "comfort food", "high-protein", "soups & stews"],
    nutrition: {
      calories: 465,
      protein: "38g",
      carbs: "42g",
      fat: "17g",
      fiber: "10g",
      sodium: "690mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Lemongrass & Ginger",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-lemongrass-ginger",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Lemongrass - Southeast Asian Fusion",
    description: "Bright, aromatic Southeast Asian twist with lemongrass and ginger blended into this creamy gochujang white chicken chili base.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with lemongrass and ginger. Aromatic Southeast Asian fusion with bright, bold flavors and creamy texture.",
    category: "Soups & Stews",
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-lemongrass-ginger.png",
    ingredients: [
      "2 lbs chicken breast, diced",
      "2 stalks lemongrass, bruised and chopped",
      "2-inch fresh ginger, sliced",
      "2 tablespoons coconut oil",
      "1 onion, diced",
      "5 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) white beans",
      "1 can (13.5 oz) coconut milk",
      "1 tablespoon fish sauce (gluten-free)",
      "1 teaspoon turmeric",
      "Salt and pepper to taste",
      "Fresh cilantro, lime wedges, and lemongrass for garnish"
    ],
    instructions: [
      "Heat coconut oil in a large pot. Add chicken and cook until golden, about 7 minutes.",
      "Add onion, garlic, ginger, and lemongrass. Sauté until aromatic, about 5 minutes.",
      "Stir in gochujang paste, coating everything well.",
      "Pour in chicken broth and bring to a boil. Simmer 15 minutes.",
      "Add white beans, coconut milk, fish sauce, and turmeric. Stir well.",
      "Simmer 15-20 minutes. Remove lemongrass stalks and ginger slices.",
      "Season with salt and pepper.",
      "Serve garnished with cilantro, lime wedges, and fresh lemongrass."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "lemongrass", "ginger", "southeast asian", "asian fusion", "aromatic", "comfort food", "soups & stews"],
    nutrition: {
      calories: 455,
      protein: "40g",
      carbs: "33g",
      fat: "19g",
      fiber: "8g",
      sodium: "710mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Avocado & Lime Crema",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-avocado-lime-crema",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Avocado Crema - Cool & Spicy",
    description: "Smooth avocado lime crema topping perfectly cools and complements the spicy richness of this creamy gochujang white chicken chili.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with avocado lime crema. Cooling avocado balances spicy Korean heat in this fusion comfort food masterpiece.",
    category: "Soups & Stews",
    prepTime: 20,
    cookTime: 35,
    totalTime: 55,
    servings: 6,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-avocado-lime-crema.png",
    ingredients: [
      "2 lbs chicken breast, cubed",
      "1 tablespoon avocado oil",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "4 cups gluten-free chicken broth",
      "2 cans (15 oz each) white beans",
      "1 cup sour cream",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "For Avocado Lime Crema:",
      "2 ripe avocados",
      "Juice of 2 limes",
      "1/2 cup Greek yogurt",
      "2 tablespoons cilantro",
      "Salt to taste",
      "Garnish: cilantro, lime wedges, avocado slices"
    ],
    instructions: [
      "Heat avocado oil in a large pot. Cook chicken until browned, about 7 minutes.",
      "Add onion and garlic, sautéing until softened, about 4 minutes.",
      "Mix in gochujang paste, coating chicken well.",
      "Add chicken broth and bring to a boil. Reduce heat and simmer 15 minutes.",
      "Add white beans, sour cream, and cumin. Simmer 12-15 minutes until thick.",
      "Meanwhile, prepare crema: blend avocados, lime juice, Greek yogurt, cilantro, and salt until smooth.",
      "Season chili with salt and pepper.",
      "Serve topped with avocado lime crema, cilantro, lime wedges, and avocado slices."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "avocado", "lime crema", "cooling", "korean fusion", "comfort food", "high-protein", "soups & stews"],
    nutrition: {
      calories: 495,
      protein: "41g",
      carbs: "35g",
      fat: "22g",
      fiber: "11g",
      sodium: "670mg"
    },
    isNaturallyGlutenFree: false
  },
  {
    title: "Gluten-Free Creamy Gochujang White Chicken Chili with Brown Rice & Bean Blend",
    slug: "gluten-free-creamy-gochujang-white-chicken-chili-brown-rice-bean-blend",
    seoTitle: "Gluten-Free Creamy Gochujang White Chicken Chili with Brown Rice - Hearty Meal Bowl",
    description: "A heartier, meal-style chili combining tender chicken, mixed beans, and brown rice simmered in a creamy gochujang sauce — complete comfort in a bowl.",
    seoDescription: "Gluten-free creamy gochujang white chicken chili with brown rice and bean blend. Hearty, protein-packed meal bowl with Korean fusion flavors.",
    category: "Soups & Stews",
    prepTime: 15,
    cookTime: 50,
    totalTime: 65,
    servings: 8,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-creamy-gochujang-white-chicken-chili-brown-rice-bean-blend.png",
    ingredients: [
      "2 lbs chicken thighs, cubed",
      "1 cup cooked brown rice",
      "1 tablespoon olive oil",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "3 tablespoons gluten-free gochujang",
      "5 cups gluten-free chicken broth",
      "1 can (15 oz) white beans",
      "1 can (15 oz) kidney beans",
      "1 can (15 oz) pinto beans",
      "1 cup heavy cream or coconut cream",
      "1 teaspoon smoked paprika",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "Scallions and cilantro for garnish"
    ],
    instructions: [
      "Heat olive oil in a large pot. Add chicken and cook until browned, about 8 minutes.",
      "Add onion and garlic, sautéing until translucent, about 4 minutes.",
      "Stir in gochujang paste, coating chicken and vegetables.",
      "Pour in chicken broth and bring to a boil. Reduce heat and simmer 20 minutes.",
      "Add all three types of beans, cooked brown rice, cream, smoked paprika, and cumin.",
      "Simmer 20-25 minutes until thick and hearty. Stir occasionally.",
      "Season with salt and pepper to taste.",
      "Serve hot, garnished with scallions and fresh cilantro."
    ],
    tags: ["gluten-free", "gochujang", "white chicken chili", "brown rice", "beans", "hearty", "meal bowl", "high-protein", "korean fusion", "comfort food", "soups & stews"],
    nutrition: {
      calories: 520,
      protein: "42g",
      carbs: "48g",
      fat: "18g",
      fiber: "12g",
      sodium: "740mg"
    },
    isNaturallyGlutenFree: false
  }
];

async function addRecipes() {
  console.log("Adding 10 Gluten-Free Creamy Gochujang White Chicken Chili recipes...");
  
  for (const recipe of gochujangChiliRecipes) {
    try {
      await db.insert(recipes).values({
        id: nanoid(),
        ...recipe,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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

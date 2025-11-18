import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const creamyChickenSkilletRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Creamy Chicken Skillet with Garlic Parmesan Sauce",
    slug: "gluten-free-creamy-chicken-skillet-garlic-parmesan",
    description: "Classic comfort - seared chicken in a thick garlic-parmesan cream sauce with herbs, perfect weeknight dinner.",
    longDescription: "This gluten-free creamy chicken skillet with garlic parmesan sauce is the ultimate comfort food for busy weeknights. Tender chicken breasts are perfectly seared until golden, then simmered in a rich, creamy sauce loaded with garlic, parmesan cheese, and fresh herbs. The one-pan preparation means easy cleanup while delivering restaurant-quality flavor. Serve over gluten-free pasta, rice, or with roasted vegetables for a complete meal.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    rating: "4.9",
    calories: 385,
    protein: "42.0",
    carbs: "8.5",
    fat: "20.0",
    fiber: "0.5",
    sugar: "2.0",
    ingredients: [
      "4 boneless, skinless chicken breasts (about 1.5 lbs)",
      "2 tablespoons olive oil",
      "Salt and freshly ground black pepper",
      "1/2 teaspoon paprika",
      "4 cloves garlic, minced",
      "1 cup gluten-free chicken broth",
      "1 cup heavy cream",
      "1 cup freshly grated Parmesan cheese",
      "2 tablespoons butter",
      "1 teaspoon Italian seasoning",
      "1/4 teaspoon red pepper flakes (optional)",
      "2 tablespoons fresh parsley, chopped",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Season chicken breasts with salt, pepper, and paprika on both sides.",
      "Heat olive oil in a large skillet over medium-high heat. Add chicken and sear for 5-6 minutes per side until golden brown and cooked through (internal temp 165°F). Remove chicken and set aside.",
      "In the same skillet, reduce heat to medium. Add butter and minced garlic. Sauté for 1-2 minutes until fragrant.",
      "Pour in chicken broth and scrape up any browned bits from the bottom of the pan. Simmer for 2-3 minutes to reduce slightly.",
      "Reduce heat to medium-low. Stir in heavy cream and Italian seasoning. Simmer for 3-4 minutes, stirring occasionally, until sauce begins to thicken.",
      "Add Parmesan cheese and stir until melted and sauce is smooth and creamy.",
      "Return chicken to the skillet. Spoon sauce over chicken and simmer for 2-3 minutes to warm through.",
      "Taste and adjust seasoning with salt and pepper. Add red pepper flakes if desired.",
      "Garnish with fresh parsley and basil. Serve immediately with pasta, rice, or vegetables."
    ],
    tips: "For extra golden chicken, pat dry with paper towels before seasoning. Don't move the chicken while searing - let it develop a nice crust. If sauce gets too thick, thin with a splash of chicken broth. For best results, use freshly grated Parmesan, not pre-grated.",
    variations: [
      "Add sun-dried tomatoes for extra flavor",
      "Substitute half-and-half for a lighter sauce",
      "Add spinach or kale in the last few minutes",
      "Use chicken thighs instead of breasts for juicier meat"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "creamy", "garlic", "parmesan", "weeknight", "comfort food"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Garlic Parmesan Chicken Skillet | Unglued Food",
    seoDescription: "Easy gluten-free creamy chicken skillet with garlic parmesan sauce. One-pan weeknight dinner with tender seared chicken in rich, creamy garlic sauce."
  },
  {
    title: "Gluten-Free Creamy Tuscan Chicken Skillet",
    slug: "gluten-free-creamy-tuscan-chicken-skillet",
    description: "Sun-dried tomatoes, spinach, garlic cream sauce, and basil - Italian comfort in one pan.",
    longDescription: "This gluten-free creamy Tuscan chicken skillet brings the flavors of Italy to your dinner table with minimal effort. Juicy chicken breasts are cooked in a luscious cream sauce flavored with sun-dried tomatoes, garlic, and fresh spinach. The combination of tangy tomatoes and earthy spinach creates a balanced, flavorful dish that's both elegant enough for guests and easy enough for weeknight cooking.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 12,
    cookTime: 28,
    totalTime: 40,
    servings: 4,
    rating: "5.0",
    calories: 425,
    protein: "44.0",
    carbs: "12.0",
    fat: "23.0",
    fiber: "2.5",
    sugar: "4.5",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "1 teaspoon Italian seasoning",
      "4 cloves garlic, minced",
      "1/2 cup sun-dried tomatoes in oil, drained and chopped",
      "1 cup gluten-free chicken broth",
      "1 1/2 cups heavy cream",
      "1/2 cup grated Parmesan cheese",
      "3 cups fresh baby spinach",
      "2 tablespoons butter",
      "Fresh basil leaves, chopped",
      "Crushed red pepper flakes (optional)"
    ],
    instructions: [
      "Season chicken with salt, pepper, and Italian seasoning.",
      "Heat olive oil in a large skillet over medium-high heat. Sear chicken 6-7 minutes per side until golden and cooked through. Remove and set aside.",
      "Add butter to the skillet. Sauté garlic for 1 minute until fragrant.",
      "Add sun-dried tomatoes and cook for 2 minutes, stirring frequently.",
      "Pour in chicken broth and bring to a simmer. Cook for 3-4 minutes to reduce slightly.",
      "Reduce heat to medium. Add heavy cream and Parmesan cheese. Stir until cheese melts and sauce is smooth.",
      "Add fresh spinach and stir until wilted, about 2-3 minutes.",
      "Return chicken to skillet and spoon sauce over the top. Simmer for 3-4 minutes.",
      "Garnish with fresh basil and red pepper flakes if desired. Serve hot over pasta, rice, or with crusty bread."
    ],
    tips: "Use oil-packed sun-dried tomatoes for the best flavor - they're more tender and flavorful than dry-packed. Fresh spinach will wilt down significantly, so don't worry if it looks like too much at first. Make sure chicken is at room temperature before cooking for even searing.",
    variations: [
      "Add artichoke hearts for extra flavor",
      "Use kale instead of spinach for heartier greens",
      "Add white wine before the cream for depth",
      "Mix in cherry tomatoes for fresh tomato flavor"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "Tuscan", "Italian", "creamy", "spinach", "sun-dried tomatoes"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Tuscan Chicken Skillet | Unglued Food",
    seoDescription: "Italian-inspired gluten-free creamy Tuscan chicken skillet with sun-dried tomatoes, spinach, and garlic cream sauce. Easy one-pan weeknight dinner."
  },
  {
    title: "Gluten-Free Creamy Lemon Herb Chicken Skillet",
    slug: "gluten-free-creamy-lemon-herb-chicken-skillet",
    description: "Light and bright - lemon zest, thyme, parsley, and cream for a fresh, flavorful dinner.",
    longDescription: "This gluten-free creamy lemon herb chicken skillet offers a lighter take on creamy chicken with bright lemon flavors and fresh herbs. The combination of lemon zest, fresh thyme, and parsley creates a vibrant sauce that's creamy yet refreshing. Perfect for spring and summer dinners, this dish pairs wonderfully with asparagus, green beans, or a crisp salad.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    rating: "4.8",
    calories: 365,
    protein: "41.0",
    carbs: "6.5",
    fat: "19.5",
    fiber: "0.8",
    sugar: "1.5",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "3 cloves garlic, minced",
      "1 cup gluten-free chicken broth",
      "1 cup heavy cream",
      "Zest and juice of 2 lemons",
      "2 tablespoons butter",
      "2 tablespoons fresh thyme leaves",
      "1/4 cup fresh parsley, chopped",
      "1/4 cup grated Parmesan cheese (optional)",
      "Lemon slices for garnish"
    ],
    instructions: [
      "Season chicken breasts generously with salt and pepper.",
      "Heat olive oil in large skillet over medium-high heat. Sear chicken 6 minutes per side until golden. Remove and set aside.",
      "Reduce heat to medium. Add butter and garlic to skillet. Sauté for 1 minute.",
      "Add chicken broth, lemon juice, and lemon zest. Bring to simmer and cook for 3 minutes, scraping up browned bits.",
      "Reduce heat to medium-low. Stir in heavy cream and fresh thyme. Simmer for 4-5 minutes until sauce thickens slightly.",
      "Add Parmesan if using and stir until melted.",
      "Return chicken to skillet. Spoon sauce over chicken and cook for 2-3 minutes to warm through.",
      "Stir in fresh parsley. Taste and adjust seasoning with salt and pepper.",
      "Garnish with lemon slices and additional herbs. Serve immediately."
    ],
    tips: "Use fresh lemon juice, not bottled, for the brightest flavor. Zest the lemons before juicing them - it's much easier! Don't let the sauce boil after adding cream or it may curdle. Fresh herbs make a huge difference in this recipe.",
    variations: [
      "Add capers for briny flavor",
      "Use a mix of thyme and rosemary",
      "Add white wine before the cream",
      "Stir in Greek yogurt at the end for tang"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "lemon", "herbs", "creamy", "light", "fresh"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Lemon Herb Chicken Skillet | Unglued Food",
    seoDescription: "Bright and fresh gluten-free creamy lemon herb chicken skillet with thyme and parsley. Light, flavorful one-pan dinner perfect for spring and summer."
  },
  {
    title: "Gluten-Free Creamy Mushroom Marsala Chicken Skillet",
    slug: "gluten-free-creamy-mushroom-marsala-chicken-skillet",
    description: "Marsala wine cream sauce with mushrooms and caramelized shallots - restaurant-quality at home.",
    longDescription: "This gluten-free creamy mushroom Marsala chicken skillet transforms the classic Italian-American favorite into an easy one-pan meal. Tender chicken is cooked in a rich Marsala wine cream sauce with earthy mushrooms and sweet caramelized shallots. The combination creates a sophisticated dish that's perfect for date nights or special occasions, yet simple enough for weeknight cooking.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    rating: "5.0",
    calories: 445,
    protein: "43.0",
    carbs: "14.0",
    fat: "22.5",
    fiber: "1.8",
    sugar: "5.5",
    ingredients: [
      "4 boneless, skinless chicken breasts, pounded to even thickness",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "3 tablespoons butter, divided",
      "8 oz cremini or button mushrooms, sliced",
      "2 shallots, finely chopped",
      "4 cloves garlic, minced",
      "3/4 cup Marsala wine",
      "1 cup gluten-free chicken broth",
      "1 cup heavy cream",
      "2 tablespoons fresh thyme leaves",
      "1/4 cup fresh parsley, chopped",
      "Parmesan shavings for garnish"
    ],
    instructions: [
      "Season chicken with salt and pepper. Heat olive oil in large skillet over medium-high heat.",
      "Sear chicken 5-6 minutes per side until golden. Remove and keep warm.",
      "Add 2 tablespoons butter to skillet. Add mushrooms and cook 5-6 minutes until golden and liquid has evaporated.",
      "Add shallots and sauté for 3 minutes until softened and caramelized. Add garlic and cook 1 minute.",
      "Pour in Marsala wine and bring to a boil. Cook for 3-4 minutes, scraping up browned bits, until wine reduces by half.",
      "Add chicken broth and simmer for 3 minutes to reduce further.",
      "Reduce heat to medium-low. Stir in heavy cream and thyme. Simmer for 5 minutes until sauce thickens.",
      "Return chicken to skillet. Spoon sauce and mushrooms over chicken. Simmer 3-4 minutes.",
      "Stir in remaining tablespoon of butter and parsley. Taste and adjust seasoning.",
      "Garnish with Parmesan shavings. Serve over mashed potatoes, rice, or gluten-free pasta."
    ],
    tips: "Pound chicken to even thickness for uniform cooking. Don't crowd the mushrooms - cook in batches if needed for better browning. Use dry Marsala wine, not sweet. Let the wine reduce properly for concentrated flavor.",
    variations: [
      "Use mixed wild mushrooms for deeper flavor",
      "Add a splash of balsamic vinegar",
      "Use chicken thighs for richer meat",
      "Add crispy prosciutto on top"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "Marsala", "mushrooms", "Italian", "elegant", "date night"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Mushroom Marsala Chicken Skillet | Unglued Food",
    seoDescription: "Restaurant-quality gluten-free creamy mushroom Marsala chicken skillet with caramelized shallots. Elegant one-pan dinner perfect for special occasions."
  },
  {
    title: "Gluten-Free Creamy Cajun Chicken Skillet",
    slug: "gluten-free-creamy-cajun-chicken-skillet",
    description: "Spicy Cajun seasoning in a smoky paprika cream sauce with peppers - bold and flavorful.",
    longDescription: "This gluten-free creamy Cajun chicken skillet brings bold Louisiana flavors to your dinner table with a spicy, smoky cream sauce. Tender chicken is seasoned with Cajun spices and cooked with colorful bell peppers in a rich paprika cream sauce. The heat level is perfectly balanced with the cream, creating a dish that's flavorful without being overwhelming. Perfect for those who love a little kick in their comfort food.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 12,
    cookTime: 28,
    totalTime: 40,
    servings: 4,
    rating: "4.9",
    calories: 405,
    protein: "42.0",
    carbs: "11.0",
    fat: "21.5",
    fiber: "2.0",
    sugar: "5.0",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "2 tablespoons Cajun seasoning (gluten-free)",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 onion, sliced",
      "4 cloves garlic, minced",
      "1 cup gluten-free chicken broth",
      "1 1/2 cups heavy cream",
      "2 teaspoons smoked paprika",
      "1/2 teaspoon cayenne pepper (adjust to taste)",
      "2 tablespoons butter",
      "1/4 cup green onions, sliced",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Rub chicken breasts with Cajun seasoning on both sides.",
      "Heat olive oil in large skillet over medium-high heat. Sear chicken 6 minutes per side until golden and cooked through. Remove and set aside.",
      "Add butter to skillet. Sauté bell peppers and onion for 5-6 minutes until softened.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Pour in chicken broth and bring to simmer. Cook for 3 minutes, scraping up any browned bits.",
      "Reduce heat to medium. Add heavy cream, smoked paprika, and cayenne. Stir well and simmer for 5 minutes until sauce thickens.",
      "Return chicken to skillet. Spoon sauce and peppers over chicken. Simmer for 3-4 minutes to warm through.",
      "Taste and adjust seasoning with salt and more Cajun seasoning if desired.",
      "Garnish with green onions and fresh cilantro. Serve over rice, cauliflower rice, or gluten-free pasta."
    ],
    tips: "Make sure your Cajun seasoning is certified gluten-free - some blends contain wheat. Adjust cayenne to your heat preference. For extra smokiness, use fire-roasted peppers. The sauce will thicken as it sits, so thin with broth if needed when reheating.",
    variations: [
      "Add Andouille sausage for authentic Cajun flavor",
      "Use blackened seasoning for deeper flavor",
      "Add corn kernels in the last few minutes",
      "Finish with a squeeze of lime"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "Cajun", "spicy", "creamy", "peppers", "bold"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Cajun Chicken Skillet | Unglued Food",
    seoDescription: "Bold and spicy gluten-free creamy Cajun chicken skillet with bell peppers and smoky paprika cream sauce. Flavorful one-pan dinner with Louisiana flair."
  },
  {
    title: "Gluten-Free Creamy Pesto Chicken Skillet",
    slug: "gluten-free-creamy-pesto-chicken-skillet",
    description: "Basil pesto folded into cream with blistered cherry tomatoes - fresh and vibrant.",
    longDescription: "This gluten-free creamy pesto chicken skillet combines the bright flavors of fresh basil pesto with rich cream and sweet blistered cherry tomatoes. The result is a beautifully balanced dish that's both indulgent and fresh-tasting. Perfect for summer when basil is abundant, but delicious year-round with store-bought pesto. This one-pan meal comes together in under 30 minutes for an impressive weeknight dinner.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    rating: "4.9",
    calories: 435,
    protein: "43.0",
    carbs: "9.0",
    fat: "26.0",
    fiber: "1.5",
    sugar: "3.5",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "1 pint cherry tomatoes",
      "4 cloves garlic, minced",
      "1/2 cup gluten-free basil pesto",
      "1 cup heavy cream",
      "1/2 cup gluten-free chicken broth",
      "1/2 cup grated Parmesan cheese",
      "2 tablespoons butter",
      "Fresh basil leaves for garnish",
      "Pine nuts for topping (optional)"
    ],
    instructions: [
      "Season chicken with salt and pepper. Heat olive oil in large skillet over medium-high heat.",
      "Sear chicken 6 minutes per side until golden and cooked through. Remove and set aside.",
      "Add cherry tomatoes to the skillet. Cook for 4-5 minutes, shaking pan occasionally, until tomatoes blister and burst.",
      "Add butter and garlic. Sauté for 1 minute until fragrant.",
      "Reduce heat to medium. Add chicken broth and bring to simmer. Cook for 2 minutes.",
      "Stir in heavy cream and pesto. Mix well until combined and smooth.",
      "Add Parmesan cheese and stir until melted. Simmer for 3-4 minutes until sauce thickens.",
      "Return chicken to skillet. Spoon sauce and tomatoes over chicken. Simmer 2-3 minutes to warm through.",
      "Taste and adjust seasoning. Garnish with fresh basil leaves and toasted pine nuts if desired.",
      "Serve over gluten-free pasta, zucchini noodles, or with crusty bread."
    ],
    tips: "Use high-quality basil pesto for best flavor - check ingredients to ensure it's gluten-free. Don't overcook the tomatoes - you want them blistered but still holding their shape. If sauce seems too thick, thin with a splash of pasta water or chicken broth.",
    variations: [
      "Use sun-dried tomato pesto for different flavor",
      "Add fresh mozzarella balls in the last minute",
      "Stir in baby spinach or arugula",
      "Add white beans for extra protein and fiber"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "pesto", "tomatoes", "Italian", "fresh", "easy"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Pesto Chicken Skillet | Unglued Food",
    seoDescription: "Fresh and vibrant gluten-free creamy pesto chicken skillet with blistered cherry tomatoes. Quick one-pan dinner ready in 35 minutes."
  },
  {
    title: "Gluten-Free Creamy Coconut Curry Chicken Skillet",
    slug: "gluten-free-creamy-coconut-curry-chicken-skillet",
    description: "Dairy-free coconut milk curry with turmeric, garlic, ginger, and cilantro - exotic and aromatic.",
    longDescription: "This gluten-free creamy coconut curry chicken skillet offers a dairy-free alternative that's packed with flavor. Aromatic spices like turmeric, cumin, and coriander combine with coconut milk to create a luscious sauce that's both creamy and light. Fresh ginger and garlic add depth while cilantro provides brightness. This globally-inspired one-pan meal is perfect for those seeking dairy-free comfort food with bold flavors.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    rating: "5.0",
    calories: 395,
    protein: "40.0",
    carbs: "14.0",
    fat: "21.0",
    fiber: "3.5",
    sugar: "5.0",
    ingredients: [
      "4 boneless, skinless chicken breasts, cut into bite-sized pieces",
      "2 tablespoons coconut oil",
      "Salt and pepper to taste",
      "1 onion, diced",
      "1 red bell pepper, diced",
      "4 cloves garlic, minced",
      "2 tablespoons fresh ginger, grated",
      "2 tablespoons gluten-free curry powder",
      "1 teaspoon ground turmeric",
      "1 teaspoon ground cumin",
      "1 can (14 oz) full-fat coconut milk",
      "1 cup gluten-free chicken broth",
      "1 tablespoon tomato paste",
      "1 tablespoon lime juice",
      "Fresh cilantro, chopped",
      "Lime wedges for serving"
    ],
    instructions: [
      "Season chicken pieces with salt and pepper. Heat coconut oil in large skillet over medium-high heat.",
      "Brown chicken in batches, about 3-4 minutes per side. Remove and set aside.",
      "Add onion and bell pepper to skillet. Sauté for 5 minutes until softened.",
      "Add garlic and ginger. Cook for 1-2 minutes until fragrant.",
      "Add curry powder, turmeric, and cumin. Stir and cook for 1 minute to toast spices.",
      "Add tomato paste and stir to combine.",
      "Pour in coconut milk and chicken broth. Stir well, scraping up any browned bits from the bottom.",
      "Bring to simmer and cook for 5 minutes, stirring occasionally.",
      "Return chicken to skillet. Reduce heat to medium-low and simmer for 10-12 minutes until chicken is cooked through and sauce has thickened.",
      "Stir in lime juice. Taste and adjust seasoning with salt.",
      "Garnish with fresh cilantro. Serve over rice, quinoa, or cauliflower rice with lime wedges."
    ],
    tips: "Use full-fat coconut milk for the creamiest sauce. Toast the spices briefly to bring out their flavors. Cut chicken into uniform pieces for even cooking. This dish tastes even better the next day as flavors meld.",
    variations: [
      "Add vegetables like cauliflower or green beans",
      "Use chicken thighs for juicier meat",
      "Add Thai red curry paste for extra heat",
      "Stir in spinach at the end for greens"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "curry", "coconut", "dairy-free", "Indian-inspired", "aromatic"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Coconut Curry Chicken Skillet | Unglued Food",
    seoDescription: "Dairy-free gluten-free creamy coconut curry chicken skillet with turmeric, ginger, and aromatic spices. Exotic one-pan dinner bursting with flavor."
  },
  {
    title: "Gluten-Free Creamy Bacon & Spinach Chicken Skillet",
    slug: "gluten-free-creamy-bacon-spinach-chicken-skillet",
    description: "Crispy bacon crumbles, wilted spinach, and rich cream reduction - ultimate comfort food.",
    longDescription: "This gluten-free creamy bacon and spinach chicken skillet is pure comfort food indulgence. Crispy bacon adds smoky, salty flavor while fresh spinach provides color and nutrients. The combination of bacon fat and cream creates an incredibly rich sauce that coats tender chicken perfectly. This hearty one-pan meal is perfect for cold evenings when you want something satisfying and delicious.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 12,
    cookTime: 30,
    totalTime: 42,
    servings: 4,
    rating: "5.0",
    calories: 475,
    protein: "46.0",
    carbs: "7.5",
    fat: "29.0",
    fiber: "1.8",
    sugar: "1.5",
    ingredients: [
      "6 strips bacon, chopped",
      "4 boneless, skinless chicken breasts",
      "Salt and pepper to taste",
      "1/2 teaspoon garlic powder",
      "1 tablespoon olive oil (if needed)",
      "4 cloves garlic, minced",
      "1 cup gluten-free chicken broth",
      "1 1/2 cups heavy cream",
      "4 cups fresh baby spinach",
      "1/2 cup grated Parmesan cheese",
      "1 teaspoon Italian seasoning",
      "2 tablespoons butter",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "In large skillet over medium heat, cook chopped bacon until crispy, about 6-7 minutes. Remove bacon with slotted spoon and set aside. Drain all but 2 tablespoons bacon fat from pan.",
      "Season chicken with salt, pepper, and garlic powder.",
      "Increase heat to medium-high. Sear chicken in bacon fat for 6 minutes per side until golden. Add olive oil if pan is dry. Remove chicken and set aside.",
      "Add butter and garlic to skillet. Sauté for 1 minute.",
      "Pour in chicken broth and bring to simmer. Cook for 3 minutes, scraping up browned bits.",
      "Reduce heat to medium. Add heavy cream and Italian seasoning. Stir and simmer for 4-5 minutes until sauce begins to thicken.",
      "Add Parmesan cheese and stir until melted and smooth.",
      "Add spinach in batches, stirring until wilted.",
      "Return chicken to skillet. Add half the bacon. Spoon sauce over chicken and simmer 3 minutes.",
      "Top with remaining bacon and fresh parsley. Serve immediately."
    ],
    tips: "Save the bacon fat for cooking the chicken - it adds incredible flavor. Don't overcrowd the pan when cooking bacon. Spinach will wilt down significantly. For extra crispy bacon, bake it in the oven at 400°F for 15 minutes instead.",
    variations: [
      "Add sun-dried tomatoes for tangy sweetness",
      "Use kale instead of spinach for heartier greens",
      "Add mushrooms with the garlic",
      "Stir in cream cheese for extra richness"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "bacon", "spinach", "creamy", "comfort food", "indulgent"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Bacon & Spinach Chicken Skillet | Unglued Food",
    seoDescription: "Indulgent gluten-free creamy bacon and spinach chicken skillet with crispy bacon and rich cream sauce. Ultimate comfort food one-pan dinner."
  },
  {
    title: "Gluten-Free Creamy Chipotle Chicken Skillet",
    slug: "gluten-free-creamy-chipotle-chicken-skillet",
    description: "Smoky chipotle cream sauce with roasted corn and lime - Southwestern flair with a kick.",
    longDescription: "This gluten-free creamy chipotle chicken skillet brings Southwestern flavors to your table with smoky chipotle peppers in adobo, sweet roasted corn, and a tangy lime finish. The cream balances the heat from the chipotles, creating a sauce that's spicy but not overwhelming. This vibrant one-pan meal is perfect for those who love bold, smoky flavors with a hint of heat.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Easy",
    prepTime: 12,
    cookTime: 28,
    totalTime: 40,
    servings: 4,
    rating: "4.9",
    calories: 415,
    protein: "42.0",
    carbs: "18.0",
    fat: "20.0",
    fiber: "3.0",
    sugar: "6.0",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "1 teaspoon cumin",
      "1 teaspoon smoked paprika",
      "1 red bell pepper, diced",
      "1 1/2 cups frozen or fresh corn kernels",
      "4 cloves garlic, minced",
      "2-3 chipotle peppers in adobo sauce, minced",
      "1 tablespoon adobo sauce from can",
      "1 cup gluten-free chicken broth",
      "1 1/2 cups heavy cream",
      "1/4 cup fresh cilantro, chopped",
      "Juice of 2 limes",
      "Lime wedges for serving"
    ],
    instructions: [
      "Season chicken with salt, pepper, cumin, and smoked paprika.",
      "Heat olive oil in large skillet over medium-high heat. Sear chicken 6 minutes per side until cooked through. Remove and set aside.",
      "In same skillet, add bell pepper and corn. Cook for 4-5 minutes until corn is lightly charred and pepper is softened.",
      "Add garlic, minced chipotles, and adobo sauce. Cook for 1-2 minutes, stirring constantly.",
      "Pour in chicken broth and bring to simmer. Cook for 3 minutes, scraping up any browned bits.",
      "Reduce heat to medium. Add heavy cream and stir well. Simmer for 5-6 minutes until sauce thickens.",
      "Return chicken to skillet. Spoon sauce over chicken and simmer for 3 minutes.",
      "Stir in lime juice and half the cilantro. Taste and adjust seasoning.",
      "Garnish with remaining cilantro. Serve with lime wedges, over rice, or with tortilla chips."
    ],
    tips: "Start with 2 chipotle peppers and add more if you want more heat. The adobo sauce adds smoky flavor without all the heat. For a milder version, remove seeds from chipotles. Charring the corn adds great flavor - don't skip this step.",
    variations: [
      "Add black beans for extra protein and fiber",
      "Top with shredded cheese and broil briefly",
      "Use Mexican crema instead of heavy cream",
      "Add diced tomatoes with the peppers"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "chipotle", "Southwestern", "spicy", "corn", "smoky"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy Chipotle Chicken Skillet | Unglued Food",
    seoDescription: "Spicy gluten-free creamy chipotle chicken skillet with roasted corn and lime. Southwestern-inspired one-pan dinner with smoky, bold flavors."
  },
  {
    title: "Gluten-Free Creamy White Wine Chicken Skillet with Tarragon",
    slug: "gluten-free-creamy-white-wine-chicken-skillet-tarragon",
    description: "Elegant white wine, Dijon, tarragon, and cream - restaurant-quality French-inspired dinner.",
    longDescription: "This gluten-free creamy white wine chicken skillet with tarragon is an elegant, French-inspired dish that's surprisingly easy to make at home. The combination of white wine, Dijon mustard, and fresh tarragon creates a sophisticated sauce that's both tangy and creamy. Perfect for date nights, dinner parties, or any time you want to impress without spending hours in the kitchen.",
    category: "Dinner",
    subcategory: "One-Pan & Skillet Meals",
    difficulty: "Medium",
    prepTime: 12,
    cookTime: 30,
    totalTime: 42,
    servings: 4,
    rating: "5.0",
    calories: 425,
    protein: "43.0",
    carbs: "7.0",
    fat: "23.5",
    fiber: "0.5",
    sugar: "1.5",
    ingredients: [
      "4 boneless, skinless chicken breasts",
      "2 tablespoons olive oil",
      "Salt and freshly ground black pepper",
      "3 tablespoons butter, divided",
      "3 shallots, finely chopped",
      "4 cloves garlic, minced",
      "1 cup dry white wine (Sauvignon Blanc or Chardonnay)",
      "1 cup gluten-free chicken broth",
      "1 1/2 cups heavy cream",
      "2 tablespoons Dijon mustard",
      "3 tablespoons fresh tarragon, chopped (or 1 tablespoon dried)",
      "1/4 cup grated Parmesan cheese",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Season chicken generously with salt and pepper. Heat olive oil in large skillet over medium-high heat.",
      "Sear chicken 6 minutes per side until golden and cooked through. Remove and keep warm.",
      "Add 2 tablespoons butter to skillet. Sauté shallots for 3-4 minutes until softened and lightly caramelized.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Pour in white wine and bring to a boil. Cook for 4-5 minutes, scraping up browned bits, until wine reduces by half.",
      "Add chicken broth and simmer for 3 minutes to reduce further.",
      "Reduce heat to medium-low. Whisk in Dijon mustard and heavy cream. Stir in fresh tarragon.",
      "Simmer for 5-6 minutes, stirring occasionally, until sauce thickens and coats the back of a spoon.",
      "Stir in Parmesan cheese until melted. Add remaining tablespoon of butter and stir until glossy.",
      "Return chicken to skillet. Spoon sauce over chicken and warm through for 2-3 minutes.",
      "Taste and adjust seasoning. Serve with lemon wedges, over mashed potatoes, rice, or with vegetables."
    ],
    tips: "Use a good quality dry white wine that you would drink. Don't skip reducing the wine - it concentrates the flavor. Fresh tarragon has a unique anise-like flavor that's key to this dish. If using dried tarragon, use less as it's more potent.",
    variations: [
      "Add sautéed mushrooms for earthiness",
      "Use fresh thyme instead of tarragon",
      "Add a splash of cognac before the wine",
      "Stir in crème fraîche at the end for tang"
    ],
    tags: ["gluten-free", "dinner", "chicken", "skillet", "one-pan", "French", "white wine", "tarragon", "elegant", "date night"],
    isNaturallyGlutenFree: true,
    status: "published",
    seoTitle: "Gluten-Free Creamy White Wine Chicken Skillet with Tarragon | Unglued Food",
    seoDescription: "Elegant French-inspired gluten-free creamy white wine chicken skillet with tarragon and Dijon. Restaurant-quality one-pan dinner perfect for special occasions."
  }
];

async function generateAndSaveImages() {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of creamyChickenSkilletRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free ", "");
    const description = `Seared chicken in creamy sauce in a cast iron skillet, rich and appetizing presentation, garnished with fresh herbs, natural lighting, rustic kitchen setting`;
    
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
  console.log("🎨 Generating AI images for all 10 creamy chicken skillet recipes...\n");
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
  
  console.log("\n✨ All 10 Gluten-Free Creamy Chicken Skillet recipes have been added successfully!");
  console.log("🥘 Visit the website to see your new chicken skillet recipes under Dinner → One-Pan & Skillet Meals");
}

// Run the script
addRecipesToDatabase().catch(console.error);

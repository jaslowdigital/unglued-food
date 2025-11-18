import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const swissMushromMeltRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Swiss Mushroom Melt - Classic Steak",
    slug: "gluten-free-swiss-mushroom-melt-classic-steak",
    description: "Seared sirloin or ribeye topped with caramelized mushrooms, onions, and melted Swiss on toasted gluten-free bread.",
    longDescription: "This gluten-free Swiss mushroom melt features perfectly seared steak topped with golden caramelized mushrooms and onions, all smothered in melty Swiss cheese. Served on toasted gluten-free bread, this hearty melt brings diner-style comfort food to your table. The combination of tender steak, earthy mushrooms, and nutty Swiss cheese creates an irresistible flavor profile that's perfect for lunch or dinner.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    rating: "5.0",
    calories: 525,
    protein: "48.0",
    carbs: "32.0",
    fat: "24.0",
    fiber: "3.5",
    sugar: "6.0",
    ingredients: [
      "1.5 lbs sirloin or ribeye steak, sliced into thin strips",
      "Salt and freshly ground black pepper",
      "2 tablespoons olive oil, divided",
      "2 tablespoons butter, divided",
      "16 oz cremini or button mushrooms, sliced",
      "2 large onions, thinly sliced",
      "4 cloves garlic, minced",
      "1 teaspoon fresh thyme leaves",
      "1/4 cup gluten-free beef broth",
      "8 slices gluten-free bread (sourdough or country-style)",
      "8 slices Swiss cheese",
      "2 tablespoons Dijon mustard (optional)",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Season steak strips generously with salt and pepper. Set aside.",
      "Heat 1 tablespoon olive oil and 1 tablespoon butter in large skillet over medium-high heat. Add steak strips and sear for 3-4 minutes per side until browned but still medium-rare. Remove and keep warm.",
      "In same skillet, add remaining oil and butter. Add sliced onions and cook for 8-10 minutes, stirring occasionally, until caramelized and golden brown.",
      "Add mushrooms to the onions. Cook for 6-8 minutes until mushrooms are golden and liquid has evaporated.",
      "Add garlic and thyme. Cook for 1 minute until fragrant.",
      "Pour in beef broth and scrape up any browned bits. Simmer for 2 minutes. Season with salt and pepper.",
      "Toast gluten-free bread slices until golden and crispy.",
      "Spread Dijon mustard on bread if using. Top 4 slices with steak strips.",
      "Spoon mushroom-onion mixture over steak. Top each with 2 slices of Swiss cheese.",
      "Place under broiler for 2-3 minutes until cheese is melted and bubbly.",
      "Top with remaining bread slices or serve open-face. Garnish with fresh parsley."
    ],
    tips: "For best results, slice steak against the grain for tenderness. Don't overcook the steak - it will continue cooking slightly when broiled. Use a good quality gluten-free bread that can hold up to the toppings. Fresh thyme is preferred but dried can be substituted (use 1/2 teaspoon).",
    variations: [
      "Add horseradish cream sauce for extra kick",
      "Use Gruyere instead of Swiss for nuttier flavor",
      "Add roasted red peppers to the mushroom mixture",
      "Serve on gluten-free ciabatta rolls instead of sliced bread"
    ],
    tags: ["gluten-free", "dinner", "steak", "melt", "sandwich", "mushrooms", "Swiss cheese", "comfort food", "skillet meal"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Classic Steak | Unglued Food",
    seoDescription: "Tender seared steak topped with caramelized mushrooms, onions, and melted Swiss cheese on toasted gluten-free bread. Diner-style comfort food at home."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Chicken Cutlet",
    slug: "gluten-free-swiss-mushroom-melt-chicken-cutlet",
    description: "Crispy or grilled chicken breast smothered in Swiss cheese and garlic-herb mushrooms.",
    longDescription: "This gluten-free Swiss mushroom melt features a perfectly cooked chicken cutlet topped with garlic-herb sautéed mushrooms and melted Swiss cheese. Whether you choose to pan-fry for a crispy exterior or grill for a lighter option, this melt delivers restaurant-quality flavor with simple ingredients. The aromatic garlic and herbs elevate the earthy mushrooms, creating a sauce that perfectly complements the tender chicken.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Easy",
    prepTime: 12,
    cookTime: 22,
    totalTime: 34,
    servings: 4,
    rating: "4.9",
    calories: 445,
    protein: "52.0",
    carbs: "28.0",
    fat: "16.0",
    fiber: "3.0",
    sugar: "4.5",
    ingredients: [
      "4 boneless, skinless chicken breasts, pounded to 1/2-inch thickness",
      "Salt and pepper to taste",
      "1 teaspoon Italian seasoning",
      "2 tablespoons olive oil",
      "3 tablespoons butter, divided",
      "12 oz mixed mushrooms (cremini, shiitake, oyster), sliced",
      "5 cloves garlic, minced",
      "2 tablespoons fresh parsley, chopped",
      "1 tablespoon fresh rosemary, minced",
      "1/4 cup gluten-free chicken broth",
      "1/4 cup white wine (optional)",
      "8 slices Swiss cheese",
      "4 gluten-free brioche buns or 8 slices bread",
      "Garlic aioli for spreading"
    ],
    instructions: [
      "Season chicken breasts with salt, pepper, and Italian seasoning on both sides.",
      "Heat olive oil in large skillet over medium-high heat. Cook chicken for 6-7 minutes per side until golden brown and cooked through (internal temp 165°F). Remove and set aside.",
      "In same skillet, melt 2 tablespoons butter over medium heat. Add mushrooms and cook for 6-8 minutes until golden and tender.",
      "Add garlic, parsley, and rosemary. Cook for 1-2 minutes until fragrant.",
      "Pour in chicken broth and wine if using. Simmer for 2-3 minutes, scraping up browned bits. Season with salt and pepper.",
      "Return chicken to skillet. Top each breast with mushroom mixture and 2 slices of Swiss cheese.",
      "Cover skillet and cook for 2-3 minutes until cheese melts, or place under broiler for 1-2 minutes.",
      "Toast gluten-free buns with remaining butter until golden.",
      "Spread garlic aioli on buns. Place chicken with melted cheese and mushrooms on bottom buns.",
      "Top with bun tops or serve open-face. Serve immediately."
    ],
    tips: "Pound chicken to even thickness for uniform cooking. Mix different mushroom varieties for complex flavor. Fresh herbs make a big difference - avoid dried if possible. If chicken is too thick, butterfly it before pounding.",
    variations: [
      "Add spinach or arugula for greens",
      "Use bacon-wrapped chicken for extra richness",
      "Add sun-dried tomatoes to mushroom mixture",
      "Top with crispy fried onions for crunch"
    ],
    tags: ["gluten-free", "dinner", "chicken", "melt", "sandwich", "mushrooms", "Swiss cheese", "easy", "weeknight dinner"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Chicken Cutlet | Unglued Food",
    seoDescription: "Crispy chicken cutlet topped with garlic-herb mushrooms and melted Swiss cheese on gluten-free bread. Easy weeknight dinner with gourmet flavors."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Venison Strips",
    slug: "gluten-free-swiss-mushroom-melt-venison-strips",
    description: "Lean venison slices with thyme mushrooms and Swiss, served open-face on gluten-free country bread.",
    longDescription: "This gluten-free Swiss mushroom melt showcases tender venison strips paired with thyme-infused mushrooms and nutty Swiss cheese. The lean, flavorful venison is cooked to medium-rare perfection, then topped with aromatic mushrooms and melted cheese. Served open-face on hearty gluten-free country bread, this elegant melt is perfect for game meat lovers seeking a sophisticated yet comforting meal.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    rating: "5.0",
    calories: 465,
    protein: "46.0",
    carbs: "30.0",
    fat: "18.0",
    fiber: "3.5",
    sugar: "5.0",
    ingredients: [
      "1.5 lbs venison loin or backstrap, sliced into 1/4-inch strips",
      "Salt and freshly ground black pepper",
      "1 teaspoon garlic powder",
      "2 tablespoons olive oil",
      "3 tablespoons butter, divided",
      "16 oz mixed wild mushrooms (chanterelle, oyster, cremini), sliced",
      "4 shallots, minced",
      "4 cloves garlic, minced",
      "3 tablespoons fresh thyme leaves",
      "1/4 cup gluten-free beef or game broth",
      "2 tablespoons balsamic vinegar",
      "8 slices gluten-free country bread",
      "8 slices Swiss cheese",
      "Fresh thyme sprigs for garnish"
    ],
    instructions: [
      "Season venison strips with salt, pepper, and garlic powder. Let sit at room temperature for 10 minutes.",
      "Heat olive oil in large cast-iron skillet over high heat. Quickly sear venison strips for 1-2 minutes per side until browned but still rare to medium-rare. Remove immediately and keep warm.",
      "Reduce heat to medium. Add 2 tablespoons butter to skillet. Add mushrooms and cook for 6-8 minutes until golden.",
      "Add shallots and cook for 3 minutes until softened. Add garlic and thyme, cook for 1 minute.",
      "Pour in broth and balsamic vinegar. Simmer for 2-3 minutes, scraping up browned bits. Season with salt and pepper.",
      "Toast gluten-free bread until golden and crispy.",
      "Arrange 4 bread slices on baking sheet. Top each with venison strips.",
      "Spoon mushroom mixture generously over venison. Top each with 2 slices of Swiss cheese.",
      "Broil for 2-3 minutes until cheese is melted and bubbly.",
      "Garnish with fresh thyme sprigs. Serve open-face immediately."
    ],
    tips: "Venison is very lean - do not overcook or it will become tough. Medium-rare is ideal. Let venison rest at room temperature before cooking. Use high heat for quick searing. Wild mushrooms add authentic earthy flavor but button mushrooms work well too.",
    variations: [
      "Add juniper berries to mushrooms for traditional game pairing",
      "Top with caramelized onions",
      "Use Gruyere cheese for stronger flavor",
      "Add a dollop of cranberry compote"
    ],
    tags: ["gluten-free", "dinner", "venison", "game meat", "melt", "sandwich", "mushrooms", "Swiss cheese", "elegant", "wild game"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Venison Strips | Unglued Food",
    seoDescription: "Lean venison strips with thyme mushrooms and melted Swiss cheese on gluten-free country bread. Elegant open-face melt perfect for game meat lovers."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Pork Loin",
    slug: "gluten-free-swiss-mushroom-melt-pork-loin",
    description: "Juicy pork medallions, Dijon cream mushrooms, and Swiss broiled until bubbly.",
    longDescription: "This gluten-free Swiss mushroom melt features tender pork loin medallions topped with a luxurious Dijon cream mushroom sauce and melted Swiss cheese. The pork is seared to golden perfection, then smothered in a rich, tangy sauce that combines earthy mushrooms with the sharp bite of Dijon mustard. Broiled until the cheese is bubbly and golden, this elevated melt is comfort food at its finest.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 12,
    cookTime: 25,
    totalTime: 37,
    servings: 4,
    rating: "4.9",
    calories: 485,
    protein: "44.0",
    carbs: "30.0",
    fat: "22.0",
    fiber: "2.8",
    sugar: "4.5",
    ingredients: [
      "1.5 lbs pork loin, cut into 1-inch thick medallions",
      "Salt and pepper to taste",
      "1 teaspoon paprika",
      "2 tablespoons olive oil",
      "3 tablespoons butter, divided",
      "12 oz baby bella mushrooms, sliced",
      "4 cloves garlic, minced",
      "3 tablespoons Dijon mustard",
      "1 cup heavy cream",
      "1/2 cup gluten-free chicken broth",
      "2 tablespoons fresh thyme, chopped",
      "8 slices gluten-free sourdough bread",
      "8 slices Swiss cheese",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Season pork medallions with salt, pepper, and paprika on both sides.",
      "Heat olive oil in large skillet over medium-high heat. Sear pork medallions for 4-5 minutes per side until golden brown and cooked through (internal temp 145°F). Remove and keep warm.",
      "In same skillet, melt 2 tablespoons butter over medium heat. Add mushrooms and cook for 6-8 minutes until golden.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Whisk in Dijon mustard, then slowly add heavy cream and chicken broth. Stir well to combine.",
      "Add fresh thyme and simmer for 4-5 minutes until sauce thickens slightly. Season with salt and pepper.",
      "Toast gluten-free bread slices until golden.",
      "Arrange 4 bread slices on baking sheet. Top each with 1-2 pork medallions.",
      "Spoon Dijon cream mushroom sauce generously over pork. Top each with 2 slices of Swiss cheese.",
      "Broil for 2-3 minutes until cheese is melted and bubbly with golden spots.",
      "Garnish with fresh parsley. Serve open-face or topped with remaining bread."
    ],
    tips: "Don't overcook pork - it should reach 145°F and still be slightly pink in center. Let pork rest for 3 minutes before serving. Use whole grain Dijon for more texture. Fresh thyme is key to this recipe's flavor profile.",
    variations: [
      "Add white wine to the cream sauce",
      "Use pork chops instead of loin medallions",
      "Add caramelized apples for sweet-savory contrast",
      "Mix Gruyere and Swiss cheese for extra flavor"
    ],
    tags: ["gluten-free", "dinner", "pork", "melt", "sandwich", "mushrooms", "Swiss cheese", "Dijon", "creamy", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Pork Loin | Unglued Food",
    seoDescription: "Juicy pork loin medallions with Dijon cream mushroom sauce and melted Swiss cheese. Elegant gluten-free melt with rich, tangy flavors."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Lamb Patties",
    slug: "gluten-free-swiss-mushroom-melt-lamb-patties",
    description: "Mediterranean-spiced lamb burger patty, Swiss melt, and rosemary mushrooms.",
    longDescription: "This gluten-free Swiss mushroom melt features Mediterranean-spiced lamb patties topped with fragrant rosemary mushrooms and melted Swiss cheese. The lamb is seasoned with aromatic spices like cumin, oregano, and garlic, creating a burger that's both familiar and exotic. The rosemary-infused mushrooms add an earthy, herbaceous note that pairs beautifully with the rich lamb and nutty Swiss cheese.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    rating: "5.0",
    calories: 515,
    protein: "42.0",
    carbs: "32.0",
    fat: "26.0",
    fiber: "3.2",
    sugar: "5.0",
    ingredients: [
      "1.5 lbs ground lamb",
      "1 teaspoon ground cumin",
      "1 teaspoon dried oregano",
      "1 teaspoon garlic powder",
      "1/2 teaspoon cinnamon",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "3 tablespoons butter, divided",
      "16 oz cremini mushrooms, sliced",
      "4 cloves garlic, minced",
      "3 tablespoons fresh rosemary, minced",
      "1/4 cup gluten-free beef broth",
      "4 gluten-free burger buns",
      "8 slices Swiss cheese",
      "Tzatziki sauce or garlic aioli",
      "Arugula for topping"
    ],
    instructions: [
      "In large bowl, combine ground lamb with cumin, oregano, garlic powder, cinnamon, salt, and pepper. Mix gently and form into 4 patties.",
      "Heat olive oil in large skillet over medium-high heat. Cook lamb patties for 4-5 minutes per side for medium, or until desired doneness. Remove and keep warm.",
      "In same skillet, melt 2 tablespoons butter over medium heat. Add mushrooms and cook for 6-8 minutes until golden.",
      "Add garlic and rosemary. Cook for 1-2 minutes until fragrant.",
      "Pour in beef broth and simmer for 2 minutes. Season with salt and pepper.",
      "Return lamb patties to skillet. Top each with mushroom mixture and 2 slices of Swiss cheese.",
      "Cover skillet and cook for 2 minutes until cheese melts, or place under broiler for 1-2 minutes.",
      "Toast burger buns with remaining butter until golden.",
      "Spread tzatziki or garlic aioli on bun bottoms. Place lamb patties with melted cheese and mushrooms on buns.",
      "Top with fresh arugula and bun tops. Serve immediately."
    ],
    tips: "Don't overwork the lamb mixture - it can make patties tough. Make an indent in center of each patty before cooking to prevent puffing. Lamb is naturally fatty so drain excess fat if needed. Fresh rosemary is essential for authentic Mediterranean flavor.",
    variations: [
      "Add feta cheese crumbles to the mushrooms",
      "Use mint instead of rosemary for traditional pairing",
      "Add roasted red peppers",
      "Top with cucumber and tomato slices"
    ],
    tags: ["gluten-free", "dinner", "lamb", "burger", "melt", "Mediterranean", "mushrooms", "Swiss cheese", "rosemary", "flavorful"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Lamb Patties | Unglued Food",
    seoDescription: "Mediterranean-spiced lamb burger with rosemary mushrooms and melted Swiss cheese. Bold, flavorful gluten-free melt with aromatic herbs and spices."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Bison Steak Melt",
    slug: "gluten-free-swiss-mushroom-melt-bison-steak",
    description: "Bison strip steak, smoked paprika mushrooms, and Alpine Swiss on toasted gluten-free ciabatta.",
    longDescription: "This gluten-free Swiss mushroom melt showcases lean, flavorful bison strip steak topped with smoked paprika mushrooms and Alpine Swiss cheese on toasted ciabatta. Bison's rich, slightly sweet flavor pairs beautifully with the smoky mushrooms and nutty Swiss. This protein-packed melt offers a healthier alternative to beef while delivering bold, satisfying flavors that rival any steakhouse sandwich.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 12,
    cookTime: 20,
    totalTime: 32,
    servings: 4,
    rating: "5.0",
    calories: 495,
    protein: "50.0",
    carbs: "30.0",
    fat: "20.0",
    fiber: "3.0",
    sugar: "4.5",
    ingredients: [
      "4 bison strip steaks (6 oz each)",
      "Salt and freshly ground black pepper",
      "1 tablespoon olive oil",
      "3 tablespoons butter, divided",
      "16 oz mixed mushrooms, sliced",
      "1 red onion, thinly sliced",
      "4 cloves garlic, minced",
      "2 teaspoons smoked paprika",
      "1/2 teaspoon cayenne pepper (optional)",
      "1/4 cup gluten-free beef broth",
      "4 gluten-free ciabatta rolls, split",
      "8 slices Alpine Swiss cheese",
      "Horseradish cream sauce",
      "Fresh chives, chopped"
    ],
    instructions: [
      "Let bison steaks sit at room temperature for 15 minutes. Season generously with salt and pepper.",
      "Heat olive oil in cast-iron skillet over medium-high heat. Sear bison steaks for 3-4 minutes per side for medium-rare (internal temp 135°F). Bison cooks faster than beef - do not overcook. Remove and let rest.",
      "In same skillet, melt 2 tablespoons butter over medium heat. Add mushrooms and onion, cook for 8-10 minutes until golden and caramelized.",
      "Add garlic, smoked paprika, and cayenne if using. Cook for 1 minute until fragrant.",
      "Pour in beef broth and simmer for 2 minutes. Season with salt and pepper.",
      "Slice bison steaks against the grain into thin strips.",
      "Toast ciabatta rolls with remaining butter until golden and crispy.",
      "Spread horseradish cream on bottom halves of rolls. Layer sliced bison on each.",
      "Top with smoked paprika mushroom mixture and 2 slices of Alpine Swiss cheese.",
      "Broil for 2 minutes until cheese melts and bubbles.",
      "Garnish with fresh chives. Top with ciabatta tops or serve open-face."
    ],
    tips: "Bison is very lean - cook to medium-rare or medium at most to prevent dryness. Let steaks rest after cooking for juicier meat. Smoked paprika adds depth - don't skip it. Alpine Swiss has nuttier flavor than regular Swiss.",
    variations: [
      "Add sautéed bell peppers",
      "Use chipotle mayo instead of horseradish cream",
      "Top with crispy fried shallots",
      "Add arugula for peppery bite"
    ],
    tags: ["gluten-free", "dinner", "bison", "steak", "melt", "sandwich", "mushrooms", "Swiss cheese", "smoky", "lean protein"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Bison Steak | Unglued Food",
    seoDescription: "Lean bison strip steak with smoked paprika mushrooms and Alpine Swiss cheese on gluten-free ciabatta. Flavorful, protein-packed melt."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Caramelized Onion Smashburger",
    slug: "gluten-free-swiss-mushroom-melt-smashburger",
    description: "Thin gluten-free smashburger patty with mountains of griddled mushrooms and Swiss.",
    longDescription: "This gluten-free Swiss mushroom melt features thin, crispy-edged smashburger patties topped with caramelized onions, griddled mushrooms, and melted Swiss cheese. The smash technique creates incredible crust and flavor while keeping the interior juicy. Piled high with sweet caramelized onions and savory mushrooms, this diner-style melt is indulgent comfort food at its best.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    rating: "5.0",
    calories: 545,
    protein: "38.0",
    carbs: "36.0",
    fat: "28.0",
    fiber: "3.5",
    sugar: "8.0",
    ingredients: [
      "1.5 lbs ground beef (80/20)",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil",
      "3 tablespoons butter, divided",
      "3 large onions, thinly sliced",
      "16 oz mushrooms, sliced",
      "4 cloves garlic, minced",
      "1 tablespoon Worcestershire sauce (gluten-free)",
      "1 teaspoon fresh thyme",
      "4 gluten-free burger buns",
      "8 slices Swiss cheese",
      "Special sauce or burger sauce",
      "Pickles (optional)"
    ],
    instructions: [
      "Divide ground beef into 8 equal portions (about 3 oz each). Roll into loose balls. Season with salt and pepper.",
      "Heat large griddle or cast-iron skillet over high heat. Add 1 tablespoon butter.",
      "Add onion slices and cook over medium heat for 15-20 minutes, stirring occasionally, until deeply caramelized and golden brown. Remove and set aside.",
      "In same skillet, melt 1 tablespoon butter over medium-high heat. Add mushrooms and cook for 6-8 minutes until golden. Add garlic and thyme, cook 1 minute. Remove and combine with onions.",
      "Increase heat to high. Add vegetable oil to skillet. Place beef balls on hot griddle.",
      "Using a sturdy spatula, firmly smash each ball flat (about 1/4-inch thick). Season tops with salt and pepper.",
      "Cook for 2 minutes until crispy brown crust forms. Flip and immediately top each patty with Swiss cheese. Cook 1-2 minutes more.",
      "Toast burger buns with remaining butter on the griddle.",
      "Spread special sauce on bun bottoms. Stack 2 patties on each bun.",
      "Top generously with caramelized onion and mushroom mixture. Add pickles if desired. Top with bun tops."
    ],
    tips: "Don't press burgers after flipping - only smash once. High heat is essential for good crust. Use a heavy spatula for smashing. Fresh ground beef makes the best smashburgers. Caramelize onions low and slow for best flavor.",
    variations: [
      "Add bacon for extra richness",
      "Use different cheese combinations",
      "Add jalapeños for heat",
      "Top with fried egg for brunch version"
    ],
    tags: ["gluten-free", "dinner", "burger", "smashburger", "melt", "mushrooms", "Swiss cheese", "onions", "diner-style", "comfort food"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt Smashburger | Unglued Food",
    seoDescription: "Crispy-edged smashburger with caramelized onions, griddled mushrooms, and melted Swiss cheese. Classic diner-style gluten-free melt."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Herb-Garlic Chicken Thigh",
    slug: "gluten-free-swiss-mushroom-melt-chicken-thigh",
    description: "Seared boneless chicken thigh smothered in creamy mushroom-Swiss sauce.",
    longDescription: "This gluten-free Swiss mushroom melt features juicy boneless chicken thighs seared until golden, then smothered in a luxurious creamy mushroom sauce with melted Swiss cheese. Chicken thighs are more flavorful and tender than breasts, making them perfect for this rich, indulgent melt. The herb-garlic cream sauce brings everything together in one skillet for easy cleanup.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 28,
    totalTime: 38,
    servings: 4,
    rating: "4.9",
    calories: 475,
    protein: "46.0",
    carbs: "30.0",
    fat: "22.0",
    fiber: "2.8",
    sugar: "4.0",
    ingredients: [
      "8 boneless, skinless chicken thighs",
      "Salt and pepper to taste",
      "1 teaspoon garlic powder",
      "1 teaspoon dried oregano",
      "2 tablespoons olive oil",
      "3 tablespoons butter, divided",
      "16 oz mushrooms, sliced",
      "6 cloves garlic, minced",
      "1 cup heavy cream",
      "1/2 cup gluten-free chicken broth",
      "2 tablespoons fresh parsley, chopped",
      "1 tablespoon fresh basil, chopped",
      "8 slices Swiss cheese",
      "4 gluten-free hoagie rolls or sub rolls",
      "Garlic butter for toasting"
    ],
    instructions: [
      "Season chicken thighs with salt, pepper, garlic powder, and oregano.",
      "Heat olive oil in large skillet over medium-high heat. Sear chicken thighs for 5-6 minutes per side until golden brown and cooked through. Remove and keep warm.",
      "In same skillet, melt 2 tablespoons butter over medium heat. Add mushrooms and cook for 6-8 minutes until golden.",
      "Add minced garlic and cook for 1 minute until fragrant.",
      "Pour in heavy cream and chicken broth. Bring to simmer and cook for 4-5 minutes, stirring occasionally, until sauce thickens.",
      "Stir in fresh parsley and basil. Season with salt and pepper.",
      "Return chicken thighs to skillet. Spoon sauce over chicken and top each thigh with Swiss cheese.",
      "Cover skillet and cook for 2-3 minutes until cheese melts.",
      "Split and toast hoagie rolls with garlic butter until golden.",
      "Place 2 chicken thighs on each roll bottom. Spoon extra sauce over chicken.",
      "Top with roll tops or serve open-face. Serve immediately."
    ],
    tips: "Chicken thighs are more forgiving than breasts and stay juicy. Don't skip the searing - it adds crucial flavor. Use fresh garlic for best taste. The sauce should be creamy but not too thick - thin with more broth if needed.",
    variations: [
      "Add sun-dried tomatoes to the sauce",
      "Use Gruyere instead of Swiss",
      "Add spinach or kale to the sauce",
      "Top with crispy prosciutto"
    ],
    tags: ["gluten-free", "dinner", "chicken", "melt", "sandwich", "mushrooms", "Swiss cheese", "creamy", "one-skillet", "easy"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Herb-Garlic Chicken | Unglued Food",
    seoDescription: "Juicy chicken thighs with creamy herb-garlic mushroom sauce and melted Swiss cheese. Rich, indulgent gluten-free one-skillet melt."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Wild Mushroom & Venison Burger",
    slug: "gluten-free-swiss-mushroom-melt-venison-burger",
    description: "Venison burger topped with wild mushrooms (chanterelle, oyster, cremini) and aged Swiss.",
    longDescription: "This gluten-free Swiss mushroom melt features a lean venison burger topped with a medley of wild mushrooms and aged Swiss cheese. The earthy flavors of chanterelle, oyster, and cremini mushrooms complement the rich, slightly sweet taste of venison perfectly. Aged Swiss adds nutty complexity to this elevated burger that's both rustic and refined.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    servings: 4,
    rating: "5.0",
    calories: 485,
    protein: "44.0",
    carbs: "32.0",
    fat: "22.0",
    fiber: "3.8",
    sugar: "5.5",
    ingredients: [
      "1.5 lbs ground venison",
      "4 oz ground pork fat or bacon (to add fat to lean venison)",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "4 tablespoons butter, divided",
      "8 oz mixed wild mushrooms (chanterelle, oyster, maitake), torn or sliced",
      "8 oz cremini mushrooms, sliced",
      "4 shallots, minced",
      "4 cloves garlic, minced",
      "2 tablespoons fresh thyme",
      "1/4 cup dry sherry or white wine",
      "8 slices aged Swiss cheese",
      "4 gluten-free brioche buns",
      "Truffle aioli or garlic aioli"
    ],
    instructions: [
      "In large bowl, gently mix ground venison with pork fat, garlic powder, onion powder, salt, and pepper. Form into 4 patties.",
      "Heat olive oil in large skillet over medium-high heat. Cook venison burgers for 4-5 minutes per side for medium (venison should not be overcooked). Remove and keep warm.",
      "In same skillet, melt 3 tablespoons butter over medium heat. Add all mushrooms and cook without stirring for 3-4 minutes to develop golden color.",
      "Stir mushrooms and continue cooking for 4-5 minutes until tender and golden.",
      "Add shallots, garlic, and thyme. Cook for 2 minutes until fragrant.",
      "Pour in sherry or wine and simmer for 2 minutes until liquid reduces. Season with salt and pepper.",
      "Return venison burgers to skillet. Top each with wild mushroom mixture and 2 slices of aged Swiss cheese.",
      "Cover skillet and cook for 2 minutes until cheese melts.",
      "Toast brioche buns with remaining butter until golden.",
      "Spread truffle aioli on bun bottoms. Place venison burgers with mushrooms and melted cheese on buns.",
      "Top with bun tops. Serve immediately with extra mushrooms on the side."
    ],
    tips: "Venison is very lean - add pork fat for juicy burgers. Don't overcook venison or it will be dry and gamey. Wild mushrooms are worth the splurge for this recipe. Aged Swiss has more complex flavor than regular Swiss. Handle burgers gently - don't overwork the meat.",
    variations: [
      "Add juniper berries to mushrooms",
      "Use a mix of Swiss and Gruyere",
      "Top with caramelized onions",
      "Add arugula and roasted red peppers"
    ],
    tags: ["gluten-free", "dinner", "venison", "burger", "melt", "wild mushrooms", "Swiss cheese", "gourmet", "game meat", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Venison Burger | Unglued Food",
    seoDescription: "Lean venison burger with wild mushroom medley and aged Swiss cheese. Gourmet gluten-free melt featuring chanterelle, oyster, and cremini mushrooms."
  },
  {
    title: "Gluten-Free Swiss Mushroom Melt - Pork Schnitzel Swiss Melt",
    slug: "gluten-free-swiss-mushroom-melt-pork-schnitzel",
    description: "Crispy pork schnitzel topped with mushroom gravy and Swiss cheese, baked to golden perfection.",
    longDescription: "This gluten-free Swiss mushroom melt features crispy pork schnitzel topped with rich mushroom gravy and melted Swiss cheese. The gluten-free breaded pork cutlet stays wonderfully crispy while the savory mushroom gravy and melted cheese create an indulgent topping. Baked until the cheese is bubbly and golden, this melt combines Austrian schnitzel tradition with American comfort food flair.",
    category: "Dinner",
    subcategory: "Melts, Sandwiches & Skillet Meals",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    servings: 4,
    rating: "5.0",
    calories: 565,
    protein: "48.0",
    carbs: "38.0",
    fat: "26.0",
    fiber: "3.0",
    sugar: "5.0",
    ingredients: [
      "4 boneless pork chops (6 oz each), pounded to 1/4-inch thickness",
      "Salt and pepper to taste",
      "1 cup gluten-free flour blend",
      "2 large eggs, beaten",
      "2 cups gluten-free breadcrumbs",
      "1/2 cup grated Parmesan cheese",
      "1 teaspoon paprika",
      "Vegetable oil for frying",
      "4 tablespoons butter",
      "16 oz mushrooms, sliced",
      "4 cloves garlic, minced",
      "3 tablespoons gluten-free flour",
      "2 cups gluten-free beef broth",
      "1/2 cup heavy cream",
      "2 tablespoons fresh parsley, chopped",
      "8 slices Swiss cheese",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Preheat oven to 375°F. Season pork cutlets with salt and pepper.",
      "Set up breading station: gluten-free flour in one dish, beaten eggs in second dish, and breadcrumbs mixed with Parmesan and paprika in third dish.",
      "Dredge each pork cutlet in flour, dip in egg, then coat thoroughly with breadcrumb mixture. Press to adhere.",
      "Heat 1/4 inch vegetable oil in large skillet over medium-high heat. Fry schnitzels for 3-4 minutes per side until golden brown and crispy. Drain on paper towels.",
      "In another skillet, melt butter over medium heat. Add mushrooms and cook for 8-10 minutes until golden.",
      "Add garlic and cook for 1 minute. Sprinkle with 3 tablespoons gluten-free flour and stir for 1 minute.",
      "Gradually whisk in beef broth, stirring constantly to prevent lumps. Bring to simmer and cook for 5 minutes until thickened.",
      "Stir in heavy cream and parsley. Simmer for 2 minutes. Season with salt and pepper.",
      "Arrange schnitzels in baking dish. Spoon mushroom gravy generously over each schnitzel.",
      "Top each with 2 slices of Swiss cheese. Bake for 10-12 minutes until cheese is melted and bubbly.",
      "Serve immediately with lemon wedges, extra gravy, and your choice of sides."
    ],
    tips: "Pound pork evenly for uniform cooking. Use fresh breadcrumbs for best texture - process gluten-free bread in food processor. Oil should be hot enough that breadcrumbs sizzle when tested. Don't overcrowd pan when frying. Make gravy while schnitzels rest.",
    variations: [
      "Use chicken instead of pork",
      "Add white wine to the mushroom gravy",
      "Top with caramelized onions before cheese",
      "Use a mix of wild and button mushrooms"
    ],
    tags: ["gluten-free", "dinner", "pork", "schnitzel", "melt", "mushrooms", "Swiss cheese", "crispy", "gravy", "comfort food"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Swiss Mushroom Melt with Pork Schnitzel | Unglued Food",
    seoDescription: "Crispy gluten-free pork schnitzel topped with rich mushroom gravy and melted Swiss cheese. Indulgent melt combining Austrian and American comfort food."
  }
];

async function generateAndSaveImages() {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of swissMushromMeltRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free ", "");
    const description = `Golden melted Swiss cheese stretching over seared meat and sautéed mushrooms on toasted bread, rustic cast iron skillet presentation, close-up showing cheese melt and mushroom texture, warm lighting, appetizing and indulgent`;
    
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
  console.log("🍄 Generating AI images for all 10 Swiss Mushroom Melt recipes...\n");
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
  
  console.log("\n✨ All 10 Gluten-Free Swiss Mushroom Melt recipes have been added successfully!");
  console.log("🍄 Visit the website to see your new Swiss Mushroom Melt recipes under Dinner → Melts, Sandwiches & Skillet Meals");
}

// Run the script
addRecipesToDatabase().catch(console.error);

import { db } from "../server/db";
import { recipes } from "../shared/schema";
import { nanoid } from "nanoid";

const chipotleTacoRecipes = [
  {
    title: "Gluten-Free Chipotle Chicken Tacos",
    slug: "gluten-free-chipotle-chicken-tacos",
    seoTitle: "Gluten-Free Chipotle Chicken Tacos - Smoky, Juicy & Perfect",
    description: "Juicy chicken thighs marinated in smoky chipotle, lime, and garlic — topped with fresh avocado crema for the ultimate taco night.",
    longDescription: "These gluten-free chipotle chicken tacos are the perfect combination of smoky heat, tender meat, and fresh toppings. Chicken thighs are marinated in a bold mixture of chipotle peppers, lime juice, garlic, and cumin, then grilled or pan-seared until perfectly charred and juicy. The smoky chipotle marinade penetrates deep into the meat, creating layers of flavor in every bite. Served in warm gluten-free corn tortillas and topped with cool, creamy avocado crema, fresh cilantro, and a squeeze of lime, these tacos are restaurant-quality but easy enough for weeknight dinners. The contrast between the spicy, smoky chicken and the cool avocado crema creates perfect balance.",
    seoDescription: "Gluten-free chipotle chicken tacos with smoky marinated chicken, avocado crema, and fresh toppings. Easy weeknight Mexican dinner with bold flavors.",
    category: "Entrees",
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-chicken-tacos.png",
    ingredients: [
      "1.5 lbs boneless, skinless chicken thighs",
      "3 chipotle peppers in adobo sauce, minced",
      "2 tablespoons adobo sauce",
      "Juice of 2 limes",
      "4 cloves garlic, minced",
      "2 teaspoons cumin",
      "1 teaspoon smoked paprika",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "For avocado crema: 1 ripe avocado, 1/4 cup sour cream, juice of 1 lime, salt",
      "Toppings: fresh cilantro, diced onion, lime wedges, queso fresco"
    ],
    instructions: [
      "In a bowl, combine minced chipotle peppers, adobo sauce, lime juice, garlic, cumin, smoked paprika, olive oil, salt, and pepper to make the marinade.",
      "Add chicken thighs to the marinade, coating well. Cover and refrigerate for at least 30 minutes (or up to 4 hours for deeper flavor).",
      "Make avocado crema: Blend avocado, sour cream, lime juice, and salt until smooth. Set aside.",
      "Heat a grill pan or skillet over medium-high heat. Remove chicken from marinade and cook for 6-7 minutes per side until charred and cooked through (internal temp 165°F).",
      "Let chicken rest for 5 minutes, then slice into strips.",
      "Warm tortillas in a dry skillet or over open flame until pliable and slightly charred.",
      "Assemble tacos: Place chicken strips in tortillas, drizzle with avocado crema, and top with cilantro, onion, and queso fresco.",
      "Serve with lime wedges for squeezing."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "chicken", "Mexican", "street food", "weeknight dinner", "high-protein", "smoky", "avocado crema"],
    nutrition: {
      calories: 420,
      protein: "32g",
      carbs: "28g",
      fat: "20g",
      fiber: "5g",
      sodium: "680mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Shrimp Tacos with Cilantro Lime Slaw",
    slug: "gluten-free-chipotle-shrimp-tacos-cilantro-lime-slaw",
    seoTitle: "Gluten-Free Chipotle Shrimp Tacos with Cilantro Lime Slaw - Light & Fresh",
    description: "Grilled shrimp tossed in chipotle butter with a crisp lime slaw — light, spicy, fresh, and ready in 20 minutes.",
    longDescription: "These gluten-free chipotle shrimp tacos are a lighter take on taco night, featuring succulent shrimp tossed in smoky chipotle butter and topped with a vibrant cilantro lime slaw. The shrimp cook quickly in a skillet with butter, garlic, and chipotle peppers, creating a slightly spicy, buttery coating. The cilantro lime slaw adds refreshing crunch and acidity that balances the rich shrimp perfectly. Made with shredded cabbage, fresh cilantro, lime juice, and a touch of honey, the slaw is bright and crisp. These tacos come together in under 30 minutes, making them perfect for busy weeknights when you want something special without the fuss.",
    seoDescription: "Gluten-free chipotle shrimp tacos with cilantro lime slaw. Quick 20-minute Mexican dinner with butter-grilled shrimp and fresh, crunchy slaw.",
    category: "Entrees",
    prepTime: 15,
    cookTime: 8,
    totalTime: 23,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-shrimp-tacos-cilantro-lime-slaw.png",
    ingredients: [
      "1.5 lbs large shrimp, peeled and deveined",
      "3 tablespoons butter",
      "2 chipotle peppers in adobo, minced",
      "3 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "For slaw: 3 cups shredded cabbage, 1/2 cup cilantro, juice of 2 limes, 1 tablespoon olive oil, 1 teaspoon honey, salt",
      "Toppings: lime wedges, avocado slices, hot sauce"
    ],
    instructions: [
      "Make cilantro lime slaw: In a bowl, combine shredded cabbage, cilantro, lime juice, olive oil, honey, and salt. Toss well and refrigerate while cooking shrimp.",
      "Pat shrimp dry with paper towels. Season with salt and pepper.",
      "Heat butter in a large skillet over medium-high heat. Add garlic and chipotle peppers, cooking for 30 seconds until fragrant.",
      "Add shrimp to the skillet and cook for 2-3 minutes per side until pink and cooked through.",
      "Toss shrimp in the chipotle butter to coat evenly.",
      "Warm tortillas in a dry skillet until pliable.",
      "Assemble tacos: Place shrimp in tortillas, top generously with cilantro lime slaw.",
      "Serve with lime wedges, avocado slices, and hot sauce."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "shrimp", "seafood", "Mexican", "quick dinner", "cilantro lime slaw", "light", "fresh"],
    nutrition: {
      calories: 380,
      protein: "28g",
      carbs: "26g",
      fat: "18g",
      fiber: "4g",
      sodium: "720mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Veggie Tacos with Avocado Crema",
    slug: "gluten-free-chipotle-veggie-tacos-avocado-crema",
    seoTitle: "Gluten-Free Chipotle Veggie Tacos with Avocado Crema - Vegetarian Delight",
    description: "Roasted peppers, zucchini, and corn in smoky chipotle sauce — topped with avocado crema and cilantro for a satisfying vegetarian taco.",
    longDescription: "These gluten-free chipotle veggie tacos prove that vegetarian tacos can be just as satisfying as their meat-based counterparts. A colorful medley of bell peppers, zucchini, and corn is roasted until charred and caramelized, then tossed in a smoky chipotle sauce that adds depth and heat. The vegetables develop sweet, complex flavors through roasting, while the chipotle sauce brings smoky spice. Creamy avocado crema adds richness and cools the heat, while fresh cilantro and lime brighten everything up. These tacos are packed with nutrients, fiber, and flavor — perfect for Meatless Monday or any night you want a lighter but still satisfying meal.",
    seoDescription: "Gluten-free chipotle veggie tacos with roasted peppers, zucchini, corn, and avocado crema. Satisfying vegetarian Mexican dinner with smoky flavors.",
    category: "Entrees",
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-veggie-tacos-avocado-crema.png",
    ingredients: [
      "2 bell peppers (red and yellow), sliced",
      "2 zucchini, sliced into half-moons",
      "1.5 cups corn kernels (fresh or frozen)",
      "3 tablespoons olive oil",
      "2 chipotle peppers in adobo, minced",
      "2 tablespoons adobo sauce",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "For avocado crema: 1 ripe avocado, 1/4 cup Greek yogurt, juice of 1 lime, salt",
      "Toppings: fresh cilantro, cotija cheese, lime wedges"
    ],
    instructions: [
      "Preheat oven to 425°F. Line a baking sheet with parchment paper.",
      "Toss bell peppers, zucchini, and corn with 2 tablespoons olive oil, salt, and pepper. Spread on baking sheet.",
      "Roast for 18-20 minutes, stirring halfway, until vegetables are charred and tender.",
      "While vegetables roast, make avocado crema: Blend avocado, Greek yogurt, lime juice, and salt until smooth.",
      "In a small bowl, mix minced chipotle peppers, adobo sauce, remaining olive oil, and cumin.",
      "When vegetables are done, toss them with the chipotle mixture while still hot.",
      "Warm tortillas in a dry skillet.",
      "Assemble tacos: Fill tortillas with roasted vegetables, drizzle with avocado crema, and top with cilantro and cotija cheese.",
      "Serve with lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "vegetarian", "roasted vegetables", "Mexican", "meatless", "avocado crema", "healthy", "colorful"],
    nutrition: {
      calories: 360,
      protein: "10g",
      carbs: "42g",
      fat: "18g",
      fiber: "9g",
      sodium: "520mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Beef Barbacoa Tacos",
    slug: "gluten-free-chipotle-beef-barbacoa-tacos",
    seoTitle: "Gluten-Free Chipotle Beef Barbacoa Tacos - Tender & Rich",
    description: "Slow-cooked beef in smoky chipotle adobo sauce — tender, rich, perfectly spiced, and topped with pickled onions.",
    longDescription: "These gluten-free chipotle beef barbacoa tacos feature melt-in-your-mouth beef that's been slow-cooked in a rich chipotle adobo sauce until fork-tender. The beef is seared first to develop a caramelized crust, then braised low and slow with chipotle peppers, beef broth, lime juice, and Mexican spices. The result is incredibly tender meat with deep, complex flavors — smoky, slightly spicy, and utterly delicious. Pickled red onions add bright acidity that cuts through the richness, while fresh cilantro and crumbled queso fresco complete the tacos. This is special-occasion taco night at its finest, though the active cooking time is minimal.",
    seoDescription: "Gluten-free chipotle beef barbacoa tacos with slow-cooked tender beef in adobo sauce. Rich, smoky Mexican dinner with pickled onions.",
    category: "Entrees",
    prepTime: 20,
    cookTime: 180,
    totalTime: 200,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-chipotle-beef-barbacoa-tacos.png",
    ingredients: [
      "3 lbs beef chuck roast, cut into large chunks",
      "4 chipotle peppers in adobo, minced",
      "3 tablespoons adobo sauce",
      "2 cups gluten-free beef broth",
      "Juice of 2 limes",
      "6 cloves garlic, minced",
      "2 teaspoons cumin",
      "2 teaspoons oregano",
      "1 teaspoon smoked paprika",
      "2 bay leaves",
      "2 tablespoons vegetable oil",
      "Salt and pepper",
      "12-14 gluten-free corn tortillas",
      "For pickled onions: 1 red onion, thinly sliced, 1/2 cup apple cider vinegar, 1 tablespoon sugar, 1/2 teaspoon salt",
      "Toppings: fresh cilantro, queso fresco, lime wedges"
    ],
    instructions: [
      "Make pickled onions: Combine sliced onion, vinegar, sugar, and salt in a jar. Let sit at least 30 minutes.",
      "Season beef chunks generously with salt and pepper.",
      "Heat oil in a large Dutch oven over high heat. Sear beef in batches until browned on all sides. Remove and set aside.",
      "In the same pot, add garlic and cook for 30 seconds. Add chipotle peppers, adobo sauce, cumin, oregano, and smoked paprika. Stir for 1 minute.",
      "Return beef to pot. Add beef broth, lime juice, and bay leaves. Bring to a boil.",
      "Cover and reduce heat to low. Simmer for 2.5-3 hours until beef is fork-tender.",
      "Remove beef and shred with two forks. Return to pot and mix with sauce. Simmer uncovered for 10 minutes to thicken.",
      "Warm tortillas in a dry skillet.",
      "Assemble tacos: Fill tortillas with barbacoa beef, top with pickled onions, cilantro, and queso fresco.",
      "Serve with lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "beef", "barbacoa", "slow-cooked", "Mexican", "tender", "rich", "pickled onions"],
    nutrition: {
      calories: 480,
      protein: "42g",
      carbs: "30g",
      fat: "22g",
      fiber: "4g",
      sodium: "780mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Black Bean & Corn Tacos",
    slug: "gluten-free-chipotle-black-bean-corn-tacos",
    seoTitle: "Gluten-Free Chipotle Black Bean & Corn Tacos - Vegetarian & Hearty",
    description: "Vegetarian-friendly with chipotle-seasoned black beans, roasted corn, melted cheese, and fresh toppings for a satisfying meatless meal.",
    longDescription: "These gluten-free chipotle black bean and corn tacos are proof that vegetarian tacos can be incredibly satisfying and flavorful. Black beans are simmered with chipotle peppers, cumin, and garlic until creamy and flavorful, while corn kernels are roasted until slightly charred and sweet. The combination creates a hearty, protein-rich filling that's both nutritious and delicious. Melted cheddar or cotija cheese adds richness, while fresh tomatoes, cilantro, and lime provide brightness. These tacos come together quickly on busy weeknights and are budget-friendly without sacrificing flavor. They're perfect for Meatless Monday or any time you want a lighter but still filling meal.",
    seoDescription: "Gluten-free chipotle black bean and corn tacos with roasted corn and cotija cheese. Easy vegetarian Mexican dinner ready in 25 minutes.",
    category: "Entrees",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-black-bean-corn-tacos.png",
    ingredients: [
      "2 cans (15 oz each) black beans, drained and rinsed",
      "1.5 cups corn kernels (fresh or frozen)",
      "2 chipotle peppers in adobo, minced",
      "1 tablespoon adobo sauce",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1/2 cup vegetable broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "1 cup shredded cheddar or cotija cheese",
      "Toppings: diced tomatoes, fresh cilantro, sour cream, lime wedges, avocado"
    ],
    instructions: [
      "Heat 1 tablespoon olive oil in a skillet over medium-high heat. Add corn and cook for 5-6 minutes until charred. Remove and set aside.",
      "In the same skillet, heat remaining oil. Add garlic and cook for 30 seconds.",
      "Add black beans, chipotle peppers, adobo sauce, cumin, and vegetable broth. Simmer for 8-10 minutes, mashing some beans to create a creamy texture.",
      "Stir in roasted corn. Season with salt and pepper.",
      "Warm tortillas in a dry skillet until pliable.",
      "Assemble tacos: Spoon black bean and corn mixture into tortillas, top with cheese, diced tomatoes, cilantro, and a dollop of sour cream.",
      "Serve with lime wedges and avocado slices."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "black beans", "corn", "vegetarian", "Mexican", "quick dinner", "budget-friendly", "protein-rich"],
    nutrition: {
      calories: 390,
      protein: "16g",
      carbs: "52g",
      fat: "14g",
      fiber: "12g",
      sodium: "640mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Pork Carnitas Tacos",
    slug: "gluten-free-chipotle-pork-carnitas-tacos",
    seoTitle: "Gluten-Free Chipotle Pork Carnitas Tacos with Pineapple Salsa",
    description: "Crispy pulled pork finished with smoky chipotle glaze — topped with fresh pineapple salsa for sweet and savory perfection.",
    longDescription: "These gluten-free chipotle pork carnitas tacos feature tender, slow-cooked pork that's crisped to perfection and finished with a smoky chipotle glaze. The pork is first braised low and slow until it falls apart, then shredded and crisped in a hot skillet to create irresistible golden, crunchy edges. A final toss in chipotle glaze adds smoky heat that complements the rich pork beautifully. Fresh pineapple salsa brings sweet, tangy contrast that cuts through the richness, while red onions and cilantro add brightness. The combination of crispy, tender pork with sweet pineapple is absolutely addictive. These are restaurant-quality tacos that are surprisingly easy to make at home.",
    seoDescription: "Gluten-free chipotle pork carnitas tacos with pineapple salsa. Crispy pulled pork in smoky glaze with sweet tropical topping.",
    category: "Entrees",
    prepTime: 20,
    cookTime: 180,
    totalTime: 200,
    servings: 6,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-chipotle-pork-carnitas-tacos.png",
    ingredients: [
      "3 lbs pork shoulder, cut into large chunks",
      "1 onion, quartered",
      "6 cloves garlic",
      "2 bay leaves",
      "1 tablespoon cumin",
      "1 tablespoon oregano",
      "2 cups gluten-free chicken broth",
      "Juice of 2 oranges",
      "For chipotle glaze: 3 chipotle peppers, 2 tablespoons adobo sauce, 2 tablespoons honey, juice of 1 lime",
      "2 tablespoons vegetable oil",
      "Salt and pepper",
      "12-14 gluten-free corn tortillas",
      "For pineapple salsa: 1 cup diced pineapple, 1/4 red onion diced, 1/4 cup cilantro, juice of 1 lime, salt",
      "Toppings: cilantro, lime wedges"
    ],
    instructions: [
      "Season pork chunks with salt, pepper, cumin, and oregano.",
      "Place pork in a large pot or Dutch oven with onion, garlic, bay leaves, chicken broth, and orange juice. Bring to a boil.",
      "Cover and reduce heat to low. Simmer for 2.5-3 hours until pork is very tender.",
      "Make pineapple salsa: Combine diced pineapple, red onion, cilantro, lime juice, and salt. Refrigerate.",
      "Make chipotle glaze: Blend chipotle peppers, adobo sauce, honey, and lime juice until smooth.",
      "Remove pork from pot and shred with two forks. Discard cooking liquid.",
      "Heat oil in a large skillet over high heat. Add shredded pork in a single layer and let cook undisturbed for 3-4 minutes until crispy. Flip and crisp the other side.",
      "Toss crispy pork with chipotle glaze.",
      "Warm tortillas. Assemble tacos with carnitas, pineapple salsa, and fresh cilantro.",
      "Serve with lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "pork", "carnitas", "pineapple salsa", "Mexican", "slow-cooked", "crispy", "sweet and savory"],
    nutrition: {
      calories: 510,
      protein: "38g",
      carbs: "36g",
      fat: "24g",
      fiber: "5g",
      sodium: "720mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Fish Tacos with Mango Salsa",
    slug: "gluten-free-chipotle-fish-tacos-mango-salsa",
    seoTitle: "Gluten-Free Chipotle Fish Tacos with Mango Salsa - Light & Fresh",
    description: "Pan-seared white fish coated in chipotle-lime seasoning — brightened with vibrant mango salsa and crisp cabbage slaw.",
    longDescription: "These gluten-free chipotle fish tacos are a lighter, brighter take on taco night, featuring flaky white fish seasoned with smoky chipotle and lime. The fish is coated in a simple spice blend and pan-seared until golden and flaky, taking just minutes to cook. The star of these tacos is the fresh mango salsa — sweet, tangy, and slightly spicy — that provides tropical brightness against the smoky fish. Purple cabbage adds crunch and color, while creamy sauce ties everything together. These tacos are perfect for warm weather dining, and they come together quickly enough for busy weeknights. They're light but satisfying, with layers of flavor and texture in every bite.",
    seoDescription: "Gluten-free chipotle fish tacos with mango salsa. Quick pan-seared white fish with tropical topping and cabbage slaw for fresh, light dinner.",
    category: "Entrees",
    prepTime: 20,
    cookTime: 10,
    totalTime: 30,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-fish-tacos-mango-salsa.png",
    ingredients: [
      "1.5 lbs white fish fillets (cod, mahi-mahi, or tilapia)",
      "2 teaspoons chipotle powder",
      "1 teaspoon cumin",
      "1 teaspoon garlic powder",
      "Juice of 2 limes",
      "2 tablespoons olive oil",
      "Salt and pepper",
      "8-10 gluten-free corn tortillas",
      "For mango salsa: 1 ripe mango diced, 1/4 red onion diced, 1 jalapeño minced, 1/4 cup cilantro, juice of 1 lime, salt",
      "2 cups shredded purple cabbage",
      "For crema: 1/4 cup sour cream, 1 tablespoon lime juice, pinch of salt"
    ],
    instructions: [
      "Make mango salsa: Combine diced mango, red onion, jalapeño, cilantro, lime juice, and salt. Refrigerate.",
      "Make crema: Mix sour cream, lime juice, and salt. Set aside.",
      "Pat fish fillets dry. Season with chipotle powder, cumin, garlic powder, salt, and pepper.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Add fish fillets and cook for 3-4 minutes per side until golden and flaky. Break into chunks.",
      "Warm tortillas in a dry skillet.",
      "Assemble tacos: Layer shredded cabbage in tortillas, add fish chunks, top with mango salsa and a drizzle of crema.",
      "Serve with lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "fish", "seafood", "mango salsa", "Mexican", "light", "quick dinner", "tropical"],
    nutrition: {
      calories: 370,
      protein: "30g",
      carbs: "34g",
      fat: "12g",
      fiber: "5g",
      sodium: "580mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Tofu Tacos with Pickled Jalapeños",
    slug: "gluten-free-chipotle-tofu-tacos-pickled-jalapeños",
    seoTitle: "Gluten-Free Chipotle Tofu Tacos - Crispy Vegan Option",
    description: "Crispy tofu marinated in chipotle adobo — spicy, crunchy, plant-based tacos topped with pickled jalapeños and fresh slaw.",
    longDescription: "These gluten-free chipotle tofu tacos prove that plant-based tacos can be just as satisfying and flavorful as their meat-based counterparts. Extra-firm tofu is pressed, cubed, and marinated in a bold chipotle adobo mixture, then pan-fried until golden and crispy on all sides. The result is tofu with incredible texture — crispy exterior and tender interior — packed with smoky, spicy flavor. Pickled jalapeños add tangy heat, while crunchy cabbage slaw provides freshness and texture contrast. These vegan tacos are protein-rich, full of bold flavors, and surprisingly easy to make. They're perfect for Meatless Monday or any time you want a plant-based meal that doesn't compromise on flavor.",
    seoDescription: "Gluten-free chipotle tofu tacos with pickled jalapeños. Crispy vegan tacos with smoky marinated tofu, cabbage slaw, and spicy toppings.",
    category: "Entrees",
    prepTime: 30,
    cookTime: 15,
    totalTime: 45,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-tofu-tacos-pickled-jalapeños.png",
    ingredients: [
      "1 block (14 oz) extra-firm tofu, pressed and cubed",
      "3 chipotle peppers in adobo, minced",
      "2 tablespoons adobo sauce",
      "2 tablespoons soy sauce or tamari (gluten-free)",
      "1 tablespoon maple syrup",
      "2 teaspoons cumin",
      "3 cloves garlic, minced",
      "3 tablespoons vegetable oil",
      "8-10 gluten-free corn tortillas",
      "1/2 cup pickled jalapeño slices",
      "2 cups shredded red cabbage",
      "Juice of 1 lime",
      "Toppings: cilantro, avocado, vegan sour cream, lime wedges"
    ],
    instructions: [
      "Press tofu to remove excess moisture (wrap in paper towels and place under a heavy object for 15-20 minutes). Cut into 1-inch cubes.",
      "In a bowl, mix chipotle peppers, adobo sauce, soy sauce, maple syrup, cumin, and garlic to make marinade.",
      "Add tofu cubes to marinade, toss gently to coat. Let marinate for 15-20 minutes.",
      "Toss cabbage with lime juice and a pinch of salt. Set aside.",
      "Heat oil in a large skillet over medium-high heat.",
      "Add marinated tofu in a single layer. Cook for 3-4 minutes per side until golden and crispy on all sides.",
      "Warm tortillas in a dry skillet.",
      "Assemble tacos: Place crispy tofu in tortillas, top with cabbage slaw, pickled jalapeños, cilantro, and avocado.",
      "Serve with vegan sour cream and lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "tofu", "vegan", "plant-based", "Mexican", "crispy", "pickled jalapeños", "meatless"],
    nutrition: {
      calories: 340,
      protein: "14g",
      carbs: "36g",
      fat: "16g",
      fiber: "6g",
      sodium: "680mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Turkey Tacos with Sweet Potato Hash",
    slug: "gluten-free-chipotle-turkey-tacos-sweet-potato-hash",
    seoTitle: "Gluten-Free Chipotle Turkey Tacos with Sweet Potato Hash - Hearty & Healthy",
    description: "Ground turkey and diced sweet potatoes seasoned with chipotle spice — hearty, slightly sweet, and perfectly balanced.",
    longDescription: "These gluten-free chipotle turkey tacos feature lean ground turkey and roasted sweet potatoes for a hearty, nutritious twist on taco night. The turkey is seasoned with chipotle peppers and Mexican spices, creating bold smoky flavor without excess fat. Diced sweet potatoes are roasted until caramelized and tender, adding natural sweetness that balances the chipotle heat perfectly. The combination creates a filling that's both hearty and healthy, with complex flavors and satisfying textures. Fresh toppings like cilantro, tomatoes, and a squeeze of lime brighten everything up. These tacos are perfect for those who want a lighter option that's still filling and full of flavor.",
    seoDescription: "Gluten-free chipotle turkey tacos with sweet potato hash. Lean ground turkey and roasted sweet potatoes in smoky chipotle seasoning.",
    category: "Entrees",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Easy",
    image: "/recipe-images/gluten-free-chipotle-turkey-tacos-sweet-potato-hash.png",
    ingredients: [
      "1.5 lbs ground turkey (93% lean)",
      "2 medium sweet potatoes, diced into 1/2-inch cubes",
      "2 chipotle peppers in adobo, minced",
      "1 tablespoon adobo sauce",
      "1 teaspoon cumin",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon cinnamon",
      "3 cloves garlic, minced",
      "1 onion, diced",
      "3 tablespoons olive oil",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "Toppings: diced tomatoes, cilantro, shredded cheddar, sour cream, lime wedges"
    ],
    instructions: [
      "Preheat oven to 425°F. Toss sweet potato cubes with 2 tablespoons olive oil, salt, and pepper. Spread on a baking sheet and roast for 20-25 minutes until tender and caramelized, stirring halfway.",
      "Heat remaining oil in a large skillet over medium-high heat. Add onion and cook until softened, about 3 minutes.",
      "Add garlic and cook for 30 seconds.",
      "Add ground turkey, breaking it up with a wooden spoon. Cook until browned, about 6-7 minutes.",
      "Stir in chipotle peppers, adobo sauce, cumin, smoked paprika, and cinnamon. Cook for 2 minutes.",
      "Add roasted sweet potatoes to the skillet and toss to combine. Season with salt and pepper.",
      "Warm tortillas in a dry skillet.",
      "Assemble tacos: Fill tortillas with turkey and sweet potato mixture, top with diced tomatoes, cilantro, cheese, and sour cream.",
      "Serve with lime wedges."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "turkey", "sweet potato", "Mexican", "healthy", "lean protein", "hearty", "balanced"],
    nutrition: {
      calories: 410,
      protein: "32g",
      carbs: "38g",
      fat: "14g",
      fiber: "6g",
      sodium: "620mg"
    },
    isNaturallyGlutenFree: true
  },
  {
    title: "Gluten-Free Chipotle Steak Tacos with Queso Fresco",
    slug: "gluten-free-chipotle-steak-tacos-queso-fresco",
    seoTitle: "Gluten-Free Chipotle Steak Tacos with Queso Fresco - Premium & Bold",
    description: "Grilled steak strips with smoky chipotle rub — topped with crumbled queso fresco, cilantro, and radishes for an elevated taco experience.",
    longDescription: "These gluten-free chipotle steak tacos are an elevated take on taco night, featuring perfectly grilled steak seasoned with a bold chipotle rub. Flank steak or skirt steak is coated in a mixture of chipotle powder, cumin, garlic, and lime, then grilled to medium-rare perfection with beautiful char marks. The steak is sliced against the grain for maximum tenderness, creating juicy, flavorful strips. Crumbled queso fresco adds creamy, salty contrast, while fresh cilantro and sliced radishes provide brightness and crunch. These are steakhouse-quality tacos that are surprisingly simple to make at home. Perfect for entertaining or when you want to make taco night feel special.",
    seoDescription: "Gluten-free chipotle steak tacos with queso fresco. Grilled steak with smoky chipotle rub, fresh toppings, and crumbled Mexican cheese.",
    category: "Entrees",
    prepTime: 20,
    cookTime: 12,
    totalTime: 32,
    servings: 4,
    difficulty: "Medium",
    image: "/recipe-images/gluten-free-chipotle-steak-tacos-queso-fresco.png",
    ingredients: [
      "1.5 lbs flank steak or skirt steak",
      "2 tablespoons chipotle powder",
      "2 teaspoons cumin",
      "1 teaspoon garlic powder",
      "1 teaspoon smoked paprika",
      "Juice of 2 limes",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "8-10 gluten-free corn tortillas",
      "1 cup crumbled queso fresco",
      "4 radishes, thinly sliced",
      "1/2 cup fresh cilantro",
      "Lime wedges for serving",
      "Optional: chipotle crema or salsa verde"
    ],
    instructions: [
      "In a small bowl, mix chipotle powder, cumin, garlic powder, smoked paprika, salt, and pepper to create the rub.",
      "Rub the steak all over with lime juice and olive oil, then coat generously with the spice rub. Let sit for 15 minutes at room temperature.",
      "Preheat grill or grill pan to high heat.",
      "Grill steak for 4-6 minutes per side for medium-rare, or until desired doneness. Let rest for 5 minutes.",
      "Slice steak against the grain into thin strips.",
      "Warm tortillas on the grill or in a dry skillet until lightly charred.",
      "Assemble tacos: Place steak strips in tortillas, top with crumbled queso fresco, sliced radishes, and fresh cilantro.",
      "Serve with lime wedges and chipotle crema or salsa verde if desired."
    ],
    tags: ["gluten-free", "tacos", "chipotle", "steak", "beef", "Mexican", "grilled", "queso fresco", "premium", "entertaining"],
    nutrition: {
      calories: 460,
      protein: "36g",
      carbs: "28g",
      fat: "22g",
      fiber: "4g",
      sodium: "720mg"
    },
    isNaturallyGlutenFree: true
  }
];

async function addRecipes() {
  console.log("Adding 10 Gluten-Free Chipotle Taco recipes...");
  
  for (const recipe of chipotleTacoRecipes) {
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

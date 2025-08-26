// This file contains the correct 100 recipes that match the AI-generated images
import type { InsertRecipe } from '../shared/schema';
import { masterImageUrls } from './master-images-data';

// Helper function to generate complete recipe data from title and slug
function generateCompleteRecipe(title: string, slug: string, category: string, description: string): InsertRecipe {
  // Create category-specific recipe templates
  const templates: Record<string, Partial<InsertRecipe>> = {
    Beverages: {
      difficulty: "Easy",
      prepTime: 10,
      cookTime: 5,
      totalTime: 15,
      servings: 2,
      rating: "4.7",
      calories: 150,
      protein: "3.5",
      carbs: "25.0",
      fat: "5.0",
      fiber: "2.0",
      isNaturallyGlutenFree: true,
    },
    Breakfast: {
      difficulty: "Easy",
      prepTime: 15,
      cookTime: 20,
      totalTime: 35,
      servings: 4,
      rating: "4.8",
      calories: 285,
      protein: "8.5",
      carbs: "42.3",
      fat: "11.2",
      fiber: "3.8",
      isNaturallyGlutenFree: false,
    },
    Lunch: {
      difficulty: "Medium",
      prepTime: 20,
      cookTime: 15,
      totalTime: 35,
      servings: 4,
      rating: "4.6",
      calories: 320,
      protein: "14.5",
      carbs: "35.0",
      fat: "12.0",
      fiber: "5.5",
      isNaturallyGlutenFree: true,
    },
    Dinner: {
      difficulty: "Medium",
      prepTime: 25,
      cookTime: 35,
      totalTime: 60,
      servings: 4,
      rating: "4.7",
      calories: 385,
      protein: "22.0",
      carbs: "45.0",
      fat: "15.0",
      fiber: "6.0",
      isNaturallyGlutenFree: false,
    },
    Desserts: {
      difficulty: "Medium",
      prepTime: 30,
      cookTime: 40,
      totalTime: 70,
      servings: 8,
      rating: "4.9",
      calories: 350,
      protein: "4.5",
      carbs: "48.0",
      fat: "18.0",
      fiber: "2.5",
      isNaturallyGlutenFree: false,
    },
    Appetizers: {
      difficulty: "Easy",
      prepTime: 15,
      cookTime: 20,
      totalTime: 35,
      servings: 6,
      rating: "4.5",
      calories: 180,
      protein: "7.0",
      carbs: "20.0",
      fat: "8.0",
      fiber: "3.0",
      isNaturallyGlutenFree: true,
    },
    Sides: {
      difficulty: "Easy",
      prepTime: 10,
      cookTime: 25,
      totalTime: 35,
      servings: 4,
      rating: "4.6",
      calories: 165,
      protein: "4.0",
      carbs: "28.0",
      fat: "6.0",
      fiber: "4.0",
      isNaturallyGlutenFree: true,
    },
    Snacks: {
      difficulty: "Easy",
      prepTime: 15,
      cookTime: 0,
      totalTime: 15,
      servings: 4,
      rating: "4.7",
      calories: 220,
      protein: "6.0",
      carbs: "30.0",
      fat: "10.0",
      fiber: "4.0",
      isNaturallyGlutenFree: true,
    }
  };

  const template = templates[category] || templates.Dinner;
  const longDescription = `This delicious gluten-free ${title.toLowerCase()} is ${description.toLowerCase()}. Made with carefully selected ingredients that are naturally gluten-free, this recipe delivers amazing flavor without compromising on taste or texture. Perfect for those with celiac disease or anyone looking to reduce gluten in their diet.`;
  
  // Generate ingredients based on recipe type
  const ingredientSets: Record<string, string[]> = {
    Beverages: [
      "2 cups liquid base (milk, water, or plant milk)",
      "Primary ingredient (varies by recipe)",
      "Natural sweetener to taste",
      "Spices and flavorings",
      "Ice (if served cold)",
    ],
    Breakfast: [
      "2 cups gluten-free flour blend",
      "2 large eggs or egg substitute",
      "1 cup milk or plant milk",
      "2 tablespoons oil or butter",
      "1 tablespoon baking powder",
      "1 teaspoon vanilla extract",
      "½ teaspoon salt",
      "Additional ingredients as needed",
    ],
    Lunch: [
      "Main protein or vegetable base",
      "Fresh vegetables (mixed)",
      "Dressing or sauce ingredients",
      "Herbs and seasonings",
      "Optional toppings (nuts, seeds, cheese)",
    ],
    Dinner: [
      "Main protein (meat, fish, or plant-based)",
      "2-3 cups vegetables",
      "Sauce or seasoning blend",
      "Gluten-free grain or starch",
      "Fresh herbs",
      "Salt and pepper to taste",
    ],
    default: [
      "Primary ingredient",
      "Supporting ingredients",
      "Seasonings and spices",
      "Binding agents if needed",
      "Garnish or toppings",
    ]
  };

  const ingredients = ingredientSets[category] || ingredientSets.default;

  // Generate instructions based on category
  const instructionSets: Record<string, string[]> = {
    Beverages: [
      "Gather all ingredients and equipment",
      "Prepare the main ingredient (wash, peel, chop as needed)",
      "Combine ingredients in blender or pot",
      "Process or heat according to recipe",
      "Strain if necessary",
      "Adjust sweetness and seasonings to taste",
      "Serve hot or cold as specified",
      "Garnish and enjoy immediately",
    ],
    Breakfast: [
      "Preheat cooking surface or oven as needed",
      "Mix dry ingredients in large bowl",
      "Whisk wet ingredients in separate bowl",
      "Combine wet and dry ingredients gently",
      "Let batter rest if specified",
      "Cook according to specific method",
      "Check for doneness",
      "Serve warm with toppings",
    ],
    Lunch: [
      "Prep all vegetables and ingredients",
      "Cook any components that require heating",
      "Prepare dressing or sauce",
      "Assemble base ingredients",
      "Add protein or main component",
      "Top with dressing and garnishes",
      "Toss or mix as needed",
      "Serve immediately or chill",
    ],
    Dinner: [
      "Preheat oven or prepare cooking surface",
      "Season and prepare main protein",
      "Prep vegetables and sides",
      "Start cooking items with longest cook time",
      "Prepare sauce or seasoning blend",
      "Cook main component to proper temperature",
      "Let rest if needed",
      "Plate and serve hot",
    ],
    default: [
      "Gather and prep all ingredients",
      "Preheat if necessary",
      "Combine ingredients as directed",
      "Cook or process as needed",
      "Check for doneness",
      "Adjust seasonings",
      "Let cool or rest if needed",
      "Serve and enjoy",
    ]
  };

  const instructions = instructionSets[category] || instructionSets.default;

  // Generate tips based on category
  const tips = `For best results with this gluten-free ${category.toLowerCase()} recipe, ensure all ingredients are at the proper temperature before starting. Always check labels to verify gluten-free status of packaged ingredients.`;

  const variations = [
    `Try different flavor combinations`,
    `Substitute ingredients based on dietary needs`,
    `Add extra vegetables for more nutrition`,
  ];

  const tags = [category, "Gluten-Free", title.split(' ')[0], "Healthy", "Delicious"];
  
  const seoTitle = `${title} Recipe | Gluten-Free ${category}`;
  const seoDescription = `Make this delicious gluten-free ${title.toLowerCase()}. ${description}. Perfect for those avoiding gluten!`;

  return {
    title,
    slug,
    description,
    longDescription,
    category,
    image: masterImageUrls[slug] || '/images/placeholder.jpg',
    ingredients,
    instructions,
    tips,
    variations,
    tags,
    seoTitle,
    seoDescription,
    ...template
  };
}

// Define all 100 recipes that match the AI images
const recipeDefinitions = [
  // First 20 - Final batch that matches MASTER-all-generated-images.json
  { title: "Beetroot Latte", slug: "beetroot-latte", description: "Vibrant pink superfood latte with steamed milk", category: "Beverages" },
  { title: "Edamame Falafel", slug: "edamame-falafel", description: "Green protein balls with fresh herbs and tahini", category: "Appetizers" },
  { title: "Cauliflower Steaks", slug: "cauliflower-steaks", description: "Roasted cauliflower slabs with chimichurri sauce", category: "Dinner" },
  { title: "Date Energy Bars", slug: "date-energy-bars", description: "Natural no-bake energy bars with nuts and seeds", category: "Snacks" },
  { title: "Kohlrabi Slaw", slug: "kohlrabi-slaw", description: "Crunchy German-style coleslaw with apple", category: "Sides" },
  { title: "Moringa Smoothie", slug: "moringa-smoothie", description: "Green superfood power smoothie with banana", category: "Beverages" },
  { title: "Tiger Nut Horchata", slug: "tiger-nut-horchata", description: "Spanish tiger nut milk drink with cinnamon", category: "Beverages" },
  { title: "Yuca Fries", slug: "yuca-fries", description: "Crispy cassava root fries with garlic aioli", category: "Sides" },
  { title: "Hemp Seed Tabouli", slug: "hemp-seed-tabouli", description: "Protein-rich herb salad with lemon dressing", category: "Lunch" },
  { title: "Dragon Fruit Bowl", slug: "dragon-fruit-bowl", description: "Tropical pink smoothie bowl with coconut", category: "Breakfast" },
  { title: "Gluten-Free Bagels", slug: "gluten-free-bagels", description: "Chewy New York style bagels with everything seasoning", category: "Breakfast" },
  { title: "Mushroom Risotto", slug: "mushroom-risotto", description: "Creamy Italian risotto with porcini mushrooms", category: "Dinner" },
  { title: "Strawberry Shortcake", slug: "strawberry-shortcake", description: "Classic summer dessert with fresh berries and cream", category: "Desserts" },
  { title: "Fish Tacos with Mango Salsa", slug: "fish-tacos-mango-salsa", description: "Grilled fish tacos topped with tropical mango salsa", category: "Dinner" },
  { title: "Beet and Goat Cheese Salad", slug: "beet-goat-cheese-salad", description: "Elegant salad with roasted beets, goat cheese and walnuts", category: "Lunch" },
  { title: "Kelp Noodle Salad", slug: "kelp-noodle-salad", description: "Asian-inspired salad with crunchy kelp noodles", category: "Lunch" },
  { title: "Purple Sweet Potato Pie", slug: "purple-sweet-potato-pie", description: "Vibrant dessert with creamy purple sweet potato filling", category: "Desserts" },
  { title: "Chickpea Cookie Dough", slug: "chickpea-cookie-dough", description: "Edible cookie dough made with chickpeas", category: "Desserts" },
  { title: "Socca Pizza", slug: "socca-pizza", description: "French chickpea flour pizza with Mediterranean toppings", category: "Dinner" },
  { title: "Golden Beet Hummus", slug: "golden-beet-hummus", description: "Vibrant yellow hummus with roasted golden beets", category: "Appetizers" },
  
  // Next 20 recipes
  { title: "Jackfruit Carnitas", slug: "jackfruit-carnitas", description: "Plant-based pulled 'pork' made from jackfruit", category: "Dinner" },
  { title: "Black Bean Brownies", slug: "black-bean-brownies", description: "Fudgy chocolate brownies made with black beans", category: "Desserts" },
  { title: "Quinoa Breakfast Bowl", slug: "quinoa-breakfast-bowl", description: "Protein-packed breakfast bowl with quinoa and berries", category: "Breakfast" },
  { title: "Zucchini Lasagna", slug: "zucchini-lasagna", description: "Low-carb lasagna with zucchini noodles", category: "Dinner" },
  { title: "Matcha Energy Balls", slug: "matcha-energy-balls", description: "Green tea-infused energy balls with coconut", category: "Snacks" },
  { title: "Cucumber Gazpacho", slug: "cucumber-gazpacho", description: "Refreshing cold soup with cucumber and herbs", category: "Lunch" },
  { title: "Plantain Pancakes", slug: "plantain-pancakes", description: "Sweet pancakes made with ripe plantains", category: "Breakfast" },
  { title: "Tempeh Buddha Bowl", slug: "tempeh-buddha-bowl", description: "Nutritious bowl with tempeh and vegetables", category: "Lunch" },
  { title: "Chia Pudding Parfait", slug: "chia-pudding-parfait", description: "Layered chia pudding with fruit and granola", category: "Breakfast" },
  { title: "Stuffed Bell Peppers", slug: "stuffed-bell-peppers", description: "Colorful peppers filled with quinoa and vegetables", category: "Dinner" },
  { title: "Almond Flour Cookies", slug: "almond-flour-cookies", description: "Chewy cookies made with almond flour", category: "Desserts" },
  { title: "Green Goddess Smoothie", slug: "green-goddess-smoothie", description: "Nutrient-packed green smoothie", category: "Beverages" },
  { title: "Spaghetti Squash Pad Thai", slug: "spaghetti-squash-pad-thai", description: "Thai-inspired dish with spaghetti squash noodles", category: "Dinner" },
  { title: "Turmeric Latte", slug: "turmeric-latte", description: "Golden milk latte with anti-inflammatory spices", category: "Beverages" },
  { title: "Kale Caesar Salad", slug: "kale-caesar-salad", description: "Classic Caesar made with massaged kale", category: "Lunch" },
  { title: "Sweet Potato Gnocchi", slug: "sweet-potato-gnocchi", description: "Pillowy gnocchi made with sweet potatoes", category: "Dinner" },
  { title: "Coconut Macaroons", slug: "coconut-macaroons", description: "Chewy coconut cookies dipped in chocolate", category: "Desserts" },
  { title: "Avocado Chocolate Mousse", slug: "avocado-chocolate-mousse", description: "Rich chocolate mousse made with avocado", category: "Desserts" },
  { title: "Buckwheat Crepes", slug: "buckwheat-crepes", description: "Traditional French crepes made with buckwheat", category: "Breakfast" },
  { title: "Cauliflower Buffalo Bites", slug: "cauliflower-buffalo-bites", description: "Spicy buffalo-style cauliflower appetizer", category: "Appetizers" },
  
  // Next 20 recipes
  { title: "Lentil Bolognese", slug: "lentil-bolognese", description: "Hearty pasta sauce made with lentils", category: "Dinner" },
  { title: "Banana Bread Muffins", slug: "banana-bread-muffins", description: "Moist muffins with banana and walnuts", category: "Breakfast" },
  { title: "Asian Lettuce Wraps", slug: "asian-lettuce-wraps", description: "Fresh lettuce cups filled with seasoned vegetables", category: "Lunch" },
  { title: "Polenta Pizza Crust", slug: "polenta-pizza-crust", description: "Crispy pizza base made from polenta", category: "Dinner" },
  { title: "Protein Power Balls", slug: "protein-power-balls", description: "No-bake protein balls with peanut butter", category: "Snacks" },
  { title: "Roasted Red Pepper Soup", slug: "roasted-red-pepper-soup", description: "Smoky soup with roasted red peppers", category: "Lunch" },
  { title: "Coconut Flour Waffles", slug: "coconut-flour-waffles", description: "Light waffles made with coconut flour", category: "Breakfast" },
  { title: "Mediterranean Quinoa Salad", slug: "mediterranean-quinoa-salad", description: "Fresh salad with quinoa and Mediterranean flavors", category: "Lunch" },
  { title: "Overnight Oats", slug: "overnight-oats", description: "Creamy no-cook oats prepared overnight", category: "Breakfast" },
  { title: "Eggplant Parmesan", slug: "eggplant-parmesan", description: "Classic Italian dish with breaded eggplant", category: "Dinner" },
  { title: "Pumpkin Pie Bars", slug: "pumpkin-pie-bars", description: "Spiced pumpkin bars with graham crust", category: "Desserts" },
  { title: "Tropical Green Juice", slug: "tropical-green-juice", description: "Refreshing juice with pineapple and greens", category: "Beverages" },
  { title: "Butternut Squash Soup", slug: "butternut-squash-soup", description: "Creamy autumn soup with butternut squash", category: "Lunch" },
  { title: "Chai Spice Smoothie", slug: "chai-spice-smoothie", description: "Warming smoothie with chai spices", category: "Beverages" },
  { title: "Greek Quinoa Bowl", slug: "greek-quinoa-bowl", description: "Mediterranean bowl with feta and olives", category: "Lunch" },
  { title: "Cassava Flour Tortillas", slug: "cassava-flour-tortillas", description: "Soft tortillas made with cassava flour", category: "Sides" },
  { title: "Lemon Bars", slug: "lemon-bars", description: "Tangy lemon bars with shortbread crust", category: "Desserts" },
  { title: "Chocolate Avocado Pudding", slug: "chocolate-avocado-pudding", description: "Creamy chocolate pudding with hidden avocado", category: "Desserts" },
  { title: "Rice Paper Rolls", slug: "rice-paper-rolls", description: "Fresh Vietnamese rolls with vegetables", category: "Appetizers" },
  { title: "Crispy Chickpea Snacks", slug: "crispy-chickpea-snacks", description: "Roasted chickpeas with spices", category: "Snacks" },
  
  // Next 12 recipes
  { title: "Acai Bowl", slug: "acai-bowl", description: "Brazilian superfruit bowl with toppings", category: "Breakfast" },
  { title: "Flourless Chocolate Cake", slug: "flourless-chocolate-cake", description: "Rich chocolate cake without flour", category: "Desserts" },
  { title: "Thai Peanut Noodles", slug: "thai-peanut-noodles", description: "Rice noodles with creamy peanut sauce", category: "Dinner" },
  { title: "Spinach Artichoke Dip", slug: "spinach-artichoke-dip", description: "Creamy dip with spinach and artichokes", category: "Appetizers" },
  { title: "Millet Porridge", slug: "millet-porridge", description: "Warming breakfast porridge with millet", category: "Breakfast" },
  { title: "Stuffed Mushrooms", slug: "stuffed-mushrooms", description: "Button mushrooms filled with herbs and cheese", category: "Appetizers" },
  { title: "Rainbow Veggie Wrap", slug: "rainbow-veggie-wrap", description: "Colorful wrap with fresh vegetables", category: "Lunch" },
  { title: "Blueberry Oat Bars", slug: "blueberry-oat-bars", description: "Breakfast bars with blueberries and oats", category: "Breakfast" },
  { title: "Carrot Ginger Soup", slug: "carrot-ginger-soup", description: "Warming soup with carrots and fresh ginger", category: "Lunch" },
  { title: "Chocolate Chia Mousse", slug: "chocolate-chia-mousse", description: "Light mousse made with chia seeds", category: "Desserts" },
  { title: "Quinoa Tabbouleh", slug: "quinoa-tabbouleh", description: "Middle Eastern salad with quinoa", category: "Lunch" },
  { title: "Apple Cinnamon Muffins", slug: "apple-cinnamon-muffins", description: "Spiced muffins with fresh apples", category: "Breakfast" },
  
  // Remaining 28 recipes to complete 100
  { title: "Pumpkin Spice Muffins", slug: "pumpkin-spice-muffins", description: "Moist fall muffins with cinnamon sugar topping", category: "Breakfast" },
  { title: "Thai Green Curry", slug: "thai-green-curry", description: "Fragrant coconut curry with vegetables and basil", category: "Dinner" },
  { title: "Chocolate Chip Scones", slug: "chocolate-chip-scones", description: "British-style scones with dark chocolate chunks", category: "Breakfast" },
  { title: "Ratatouille", slug: "ratatouille", description: "Classic French Provençal vegetable stew with herbs", category: "Dinner" },
  { title: "Mango Sticky Rice", slug: "mango-sticky-rice", description: "Thai dessert with sweet coconut rice and ripe mango", category: "Desserts" },
  { title: "Veggie Spring Rolls", slug: "veggie-spring-rolls", description: "Fresh rice paper rolls with crisp vegetables", category: "Appetizers" },
  { title: "Corn Fritters", slug: "corn-fritters", description: "Crispy fritters with sweet corn kernels", category: "Appetizers" },
  { title: "Lemon Risotto", slug: "lemon-risotto", description: "Creamy Italian risotto with lemon and herbs", category: "Dinner" },
  { title: "Chocolate Truffles", slug: "chocolate-truffles", description: "Rich chocolate truffles rolled in cocoa", category: "Desserts" },
  { title: "Vegetable Pakoras", slug: "vegetable-pakoras", description: "Indian fritters with mixed vegetables", category: "Appetizers" },
  { title: "Berry Crumble", slug: "berry-crumble", description: "Mixed berry dessert with oat topping", category: "Desserts" },
  { title: "Tom Yum Soup", slug: "tom-yum-soup", description: "Spicy Thai soup with lemongrass", category: "Lunch" },
  { title: "Amaranth Porridge", slug: "amaranth-porridge", description: "Ancient grain breakfast porridge", category: "Breakfast" },
  { title: "Roasted Vegetable Tart", slug: "roasted-vegetable-tart", description: "Savory tart with seasonal vegetables", category: "Dinner" },
  { title: "Energy Trail Mix", slug: "energy-trail-mix", description: "Custom mix of nuts, seeds, and dried fruit", category: "Snacks" },
  { title: "Miso Glazed Tofu", slug: "miso-glazed-tofu", description: "Japanese-inspired tofu with umami glaze", category: "Dinner" },
  { title: "Apple Crisp", slug: "apple-crisp", description: "Warm apple dessert with crunchy topping", category: "Desserts" },
  { title: "Vegetable Biryani", slug: "vegetable-biryani", description: "Fragrant Indian rice dish with vegetables", category: "Dinner" },
  { title: "Coconut Rice Pudding", slug: "coconut-rice-pudding", description: "Creamy dessert with coconut milk", category: "Desserts" },
  { title: "Baba Ganoush", slug: "baba-ganoush", description: "Smoky eggplant dip with tahini", category: "Appetizers" },
  { title: "Quinoa Stuffed Tomatoes", slug: "quinoa-stuffed-tomatoes", description: "Ripe tomatoes filled with herbed quinoa", category: "Dinner" },
  { title: "Mint Chocolate Smoothie", slug: "mint-chocolate-smoothie", description: "Refreshing smoothie with mint and cacao", category: "Beverages" },
  { title: "Vegetable Tempura", slug: "vegetable-tempura", description: "Light Japanese battered vegetables", category: "Appetizers" },
  { title: "Peach Cobbler", slug: "peach-cobbler", description: "Southern dessert with juicy peaches", category: "Desserts" },
  { title: "Wild Rice Pilaf", slug: "wild-rice-pilaf", description: "Nutty rice dish with dried cranberries", category: "Sides" },
  { title: "Chocolate Bark", slug: "chocolate-bark", description: "Dark chocolate with nuts and dried fruit", category: "Desserts" },
  { title: "Vietnamese Pho", slug: "vietnamese-pho", description: "Aromatic noodle soup with herbs", category: "Lunch" },
  { title: "Teff Pancakes", slug: "teff-pancakes", description: "Ethiopian grain pancakes with honey", category: "Breakfast" },
];

// Generate complete recipe data for all 100 recipes
export const correct100RecipesWithAIImages: InsertRecipe[] = recipeDefinitions.map(def => 
  generateCompleteRecipe(def.title, def.slug, def.category, def.description)
);

export default correct100RecipesWithAIImages;
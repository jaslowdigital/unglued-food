import { generateRecipeImage } from './openai';
import * as fs from 'fs';

// Define the final 10 recipes to reach 100 total
const finalRecipes = [
  {
    title: "Gluten-Free Bagels",
    slug: "gluten-free-bagels",
    description: "Chewy New York style bagels made gluten-free",
    category: "Breakfast"
  },
  {
    title: "Mushroom Risotto",
    slug: "mushroom-risotto",
    description: "Creamy Italian risotto with wild mushrooms",
    category: "Dinner"
  },
  {
    title: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    description: "Classic summer dessert with fresh berries",
    category: "Desserts"
  },
  {
    title: "Fish Tacos with Mango Salsa",
    slug: "fish-tacos-mango-salsa",
    description: "Fresh fish tacos topped with tropical salsa",
    category: "Dinner"
  },
  {
    title: "Beet and Goat Cheese Salad",
    slug: "beet-goat-cheese-salad",
    description: "Elegant salad with roasted beets and creamy goat cheese",
    category: "Lunch"
  },
  {
    title: "Pumpkin Spice Muffins",
    slug: "pumpkin-spice-muffins",
    description: "Moist fall muffins with warming spices",
    category: "Breakfast"
  },
  {
    title: "Thai Green Curry",
    slug: "thai-green-curry",
    description: "Fragrant coconut curry with vegetables",
    category: "Dinner"
  },
  {
    title: "Chocolate Chip Scones",
    slug: "chocolate-chip-scones",
    description: "British-style scones with chocolate chips",
    category: "Breakfast"
  },
  {
    title: "Ratatouille",
    slug: "ratatouille",
    description: "Classic French vegetable stew",
    category: "Dinner"
  },
  {
    title: "Mango Sticky Rice",
    slug: "mango-sticky-rice",
    description: "Thai dessert with coconut rice and ripe mango",
    category: "Desserts"
  }
];

// Track all generated images so far
const completedRecipes = new Set([
  // First batch (1-23)
  "fluffy-blueberry-pancakes", "chicken-zucchini-pasta", "quinoa-chocolate-chip-cookies",
  "lentil-vegetable-curry", "coconut-flour-banana-bread", "mediterranean-chickpea-salad",
  "almond-crusted-salmon", "spinach-feta-quiche", "chocolate-chip-muffins",
  "asian-lettuce-wraps", "stuffed-bell-peppers", "flourless-peanut-butter-cookies",
  "mexican-quinoa-salad", "sweet-potato-hummus", "chicken-pad-thai",
  "veggie-packed-frittata", "almond-flour-brownies", "vietnamese-spring-rolls",
  "beef-and-broccoli-stir-fry", "baked-coconut-shrimp", "gluten-free-beef-wellington",
  "ultimate-gluten-free-mac-and-cheese", "classic-gluten-free-gingerbread-cookies",
  // Second batch (24-33)
  "fluffy-banana-oat-pancakes", "greek-quinoa-bowl-with-tzatziki", "coconut-flour-waffles",
  "lentil-soup-with-vegetables", "teriyaki-chicken-skewers", "chocolate-avocado-mousse",
  "buffalo-cauliflower-wings", "quinoa-tabbouleh-salad", "sweet-potato-gnocchi",
  "almond-butter-energy-balls", "zucchini-lasagna", "coconut-lime-rice",
  // Third batch (34-53)
  "cauliflower-pizza-crust", "thai-mango-salad", "polenta-fries",
  "chia-seed-jam", "stuffed-portobello-mushrooms", "corn-fritters",
  "black-bean-brownies", "spaghetti-squash-carbonara", "rice-paper-rolls",
  "turmeric-golden-milk", "buckwheat-crepes"
]);

// All remaining recipes that need images
const remainingRecipes = [
  { title: "Amaranth Porridge", slug: "amaranth-porridge", description: "Creamy ancient grain porridge", category: "Breakfast" },
  { title: "Millet Tabouleh", slug: "millet-tabouleh", description: "Grain salad with fresh herbs", category: "Lunch" },
  { title: "Cassava Flour Tortillas", slug: "cassava-flour-tortillas", description: "Soft and pliable tortillas", category: "Sides" },
  { title: "Teff Pancakes", slug: "teff-pancakes", description: "Ethiopian-inspired pancakes", category: "Breakfast" },
  { title: "Sorghum Salad Bowl", slug: "sorghum-salad-bowl", description: "Nutritious grain bowl", category: "Lunch" },
  { title: "Chickpea Flour Frittata", slug: "chickpea-flour-frittata", description: "Vegan egg-free frittata", category: "Breakfast" },
  { title: "Rice Noodle Pho", slug: "rice-noodle-pho", description: "Vietnamese soup with rice noodles", category: "Dinner" },
  { title: "Plantain Chips", slug: "plantain-chips", description: "Crispy baked plantain chips", category: "Snacks" },
  { title: "Quinoa Sushi Rolls", slug: "quinoa-sushi-rolls", description: "Sushi made with quinoa", category: "Lunch" },
  { title: "Almond Flour Biscuits", slug: "almond-flour-biscuits", description: "Fluffy Southern-style biscuits", category: "Sides" },
  { title: "Coconut Macaroons", slug: "coconut-macaroons", description: "Chewy coconut cookies", category: "Desserts" },
  { title: "Lentil Flatbread", slug: "lentil-flatbread", description: "Protein-rich Indian bread", category: "Sides" },
  { title: "Spiralized Vegetable Pad See Ew", slug: "spiralized-vegetable-pad-see-ew", description: "Thai noodle dish with veggies", category: "Dinner" },
  { title: "Cauliflower Tots", slug: "cauliflower-tots", description: "Crispy cauliflower bites", category: "Appetizers" },
  { title: "Matcha Energy Bites", slug: "matcha-energy-bites", description: "Green tea powered snacks", category: "Snacks" },
  { title: "Jackfruit Tacos", slug: "jackfruit-tacos", description: "Plant-based taco filling", category: "Dinner" },
  { title: "Aquafaba Chocolate Mousse", slug: "aquafaba-chocolate-mousse", description: "Vegan mousse from chickpea water", category: "Desserts" },
  { title: "Kelp Noodle Salad", slug: "kelp-noodle-salad", description: "Low-calorie sea vegetable noodles", category: "Lunch" },
  { title: "Purple Sweet Potato Pie", slug: "purple-sweet-potato-pie", description: "Vibrant purple dessert", category: "Desserts" },
  { title: "Chickpea Cookie Dough", slug: "chickpea-cookie-dough", description: "Edible cookie dough", category: "Snacks" },
  { title: "Socca Pizza", slug: "socca-pizza", description: "Chickpea flour pizza base", category: "Dinner" },
  { title: "Golden Beet Hummus", slug: "golden-beet-hummus", description: "Colorful twist on hummus", category: "Appetizers" },
  { title: "Acai Bowl", slug: "acai-bowl", description: "Brazilian superfood breakfast", category: "Breakfast" },
  { title: "Tempeh Buddha Bowl", slug: "tempeh-buddha-bowl", description: "Protein-packed bowl", category: "Lunch" },
  { title: "Hearts of Palm Pasta", slug: "hearts-of-palm-pasta", description: "Low-carb pasta alternative", category: "Dinner" },
  { title: "Chia Fresca", slug: "chia-fresca", description: "Mexican chia seed drink", category: "Beverages" },
  { title: "Jicama Fries", slug: "jicama-fries", description: "Crispy root vegetable fries", category: "Sides" },
  { title: "Tahini Cookies", slug: "tahini-cookies", description: "Middle Eastern sesame cookies", category: "Desserts" },
  { title: "Mushroom Walnut Bolognese", slug: "mushroom-walnut-bolognese", description: "Vegan pasta sauce", category: "Dinner" },
  { title: "Cacao Smoothie Bowl", slug: "cacao-smoothie-bowl", description: "Chocolate breakfast bowl", category: "Breakfast" },
  { title: "Forbidden Rice Pudding", slug: "forbidden-rice-pudding", description: "Black rice dessert", category: "Desserts" },
  { title: "Seeded Crackers", slug: "seeded-crackers", description: "Crunchy seed crackers", category: "Snacks" },
  { title: "Pumpkin Seed Pesto", slug: "pumpkin-seed-pesto", description: "Nut-free pesto", category: "Condiments" },
  { title: "Watermelon Gazpacho", slug: "watermelon-gazpacho", description: "Refreshing summer soup", category: "Lunch" },
  { title: "Beetroot Latte", slug: "beetroot-latte", description: "Vibrant pink latte", category: "Beverages" },
  { title: "Edamame Falafel", slug: "edamame-falafel", description: "Green protein balls", category: "Appetizers" }
];

// Combine all recipes that need images
const allRecipesToGenerate = [...remainingRecipes, ...finalRecipes];

console.log(`\n🎯 FINAL PUSH TO 100 RECIPES`);
console.log(`Already completed: ${completedRecipes.size} recipes with images`);
console.log(`Recipes to generate: ${allRecipesToGenerate.length}`);
console.log(`Target total: 100 recipes\n`);

async function completeAllRecipes() {
  const generatedImages: Record<string, string> = {};
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < allRecipesToGenerate.length; i++) {
    const recipe = allRecipesToGenerate[i];
    
    // Skip if already generated
    if (completedRecipes.has(recipe.slug)) {
      continue;
    }
    
    try {
      const description = `${recipe.category} dish: ${recipe.description}. Professional food photography, beautiful presentation, appetizing, vibrant colors`;
      
      console.log(`[${successCount + completedRecipes.size + 1}/100] Generating: ${recipe.title}`);
      
      const imageUrl = await generateRecipeImage(recipe.title, description);
      
      if (imageUrl) {
        generatedImages[recipe.slug] = imageUrl;
        successCount++;
        const total = successCount + completedRecipes.size;
        console.log(`✅ Success! Total progress: ${total}/100`);
        
        if (total === 100) {
          console.log('\n🎊 REACHED 100 RECIPES! 🎊\n');
        }
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save progress every 5 images
      if (successCount % 5 === 0) {
        fs.writeFileSync(`final-batch-${Date.now()}.json`, JSON.stringify({
          generated: generatedImages,
          totalCompleted: successCount + completedRecipes.size
        }, null, 2));
        console.log(`💾 Progress saved\n`);
      }
      
      // Longer break every 10 images
      if (successCount % 10 === 0 && successCount > 0) {
        console.log('⏳ Taking a 20 second break...\n');
        await new Promise(resolve => setTimeout(resolve, 20000));
      }
      
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error: ${errorMsg}`);
      
      if (errorMsg.includes('rate')) {
        console.log('⚠️ Rate limit - waiting 1 minute...\n');
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
  
  // Final report
  console.log('\n' + '='.repeat(60));
  console.log('🏁 FINAL REPORT');
  console.log('='.repeat(60));
  console.log(`✅ New images generated: ${successCount}`);
  console.log(`📊 Total recipes with images: ${successCount + completedRecipes.size}/100`);
  console.log(`❌ Errors: ${errorCount}`);
  
  // Save complete list
  fs.writeFileSync('complete-100-recipes-images.json', JSON.stringify({
    newlyGenerated: generatedImages,
    totalCount: successCount + completedRecipes.size,
    timestamp: new Date().toISOString()
  }, null, 2));
  
  return generatedImages;
}

// Execute
completeAllRecipes()
  .then((images) => {
    const total = Object.keys(images).length + completedRecipes.size;
    console.log(`\n✨ Mission ${total >= 100 ? 'COMPLETE' : 'Progress'}!`);
    console.log(`Total recipes with AI images: ${total}/100`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
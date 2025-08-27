import OpenAI from "openai";
import fs from "fs";
import path from "path";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Final batch of recipe images (51-100)
const recipeImages = [
  { slug: "lentil-bolognese", title: "Lentil Bolognese", prompt: "Hearty lentil bolognese sauce over pasta, garnished with fresh basil and parmesan, professional food photography" },
  { slug: "banana-bread-muffins", title: "Banana Bread Muffins", prompt: "Moist banana bread muffins with walnut topping, one broken open showing texture, professional food photography" },
  { slug: "asian-lettuce-wraps", title: "Asian Lettuce Wraps", prompt: "Fresh lettuce cups filled with seasoned vegetable mixture, arranged on platter with sauce, professional food photography" },
  { slug: "polenta-pizza-crust", title: "Polenta Pizza Crust", prompt: "Golden crispy polenta pizza crust with toppings, one slice lifted showing texture, professional food photography" },
  { slug: "protein-power-balls", title: "Protein Power Balls", prompt: "Peanut butter protein balls rolled in various coatings, arranged on plate, professional food photography" },
  { slug: "roasted-red-pepper-soup", title: "Roasted Red Pepper Soup", prompt: "Vibrant red roasted pepper soup with cream swirl and basil garnish, in white bowl, professional food photography" },
  { slug: "mediterranean-quinoa-salad", title: "Mediterranean Quinoa Salad", prompt: "Colorful quinoa salad with tomatoes, cucumbers, olives, feta cheese, herbs, professional food photography" },
  { slug: "overnight-oats", title: "Overnight Oats", prompt: "Creamy overnight oats in mason jar topped with berries, nuts, and honey, professional food photography" },
  { slug: "eggplant-parmesan", title: "Eggplant Parmesan", prompt: "Layered eggplant parmesan with melted cheese and marinara sauce, fresh basil on top, professional food photography" },
  { slug: "butternut-squash-soup", title: "Butternut Squash Soup", prompt: "Creamy orange butternut squash soup with cream swirl and pumpkin seeds, professional food photography" },
  { slug: "almond-crusted-chicken", title: "Almond Crusted Chicken", prompt: "Golden almond-crusted chicken breast sliced on plate with vegetables, professional food photography" },
  { slug: "quinoa-tabbouleh", title: "Quinoa Tabbouleh", prompt: "Fresh Middle Eastern tabbouleh salad made with quinoa, parsley, tomatoes, lemon, professional food photography" },
  { slug: "chocolate-avocado-truffles", title: "Chocolate Avocado Truffles", prompt: "Dark chocolate truffles made with avocado, dusted with cocoa powder, professional food photography" },
  { slug: "sweet-potato-toast", title: "Sweet Potato Toast", prompt: "Sliced sweet potato toasts with various toppings like avocado and eggs, professional food photography" },
  { slug: "lemon-bars", title: "Lemon Bars", prompt: "Tangy lemon bars with powdered sugar dusting on shortbread crust, cut in squares, professional food photography" },
  { slug: "veggie-noodle-stir-fry", title: "Veggie Noodle Stir-fry", prompt: "Colorful vegetable noodle stir-fry with zucchini and carrot spirals, professional food photography" },
  { slug: "apple-cider-donuts", title: "Apple Cider Donuts", prompt: "Glazed apple cider donuts with cinnamon sugar coating, stacked on plate, professional food photography" },
  { slug: "moroccan-chickpea-stew", title: "Moroccan Chickpea Stew", prompt: "Spiced Moroccan chickpea stew with vegetables and herbs in tagine dish, professional food photography" },
  { slug: "pumpkin-spice-latte", title: "Pumpkin Spice Latte", prompt: "Creamy pumpkin spice latte with whipped cream and cinnamon, in white mug, professional food photography" },
  { slug: "grain-free-granola", title: "Grain-free Granola", prompt: "Crunchy grain-free granola with nuts and dried fruits in bowl with yogurt, professional food photography" },
  { slug: "thai-peanut-noodles", title: "Thai Peanut Noodles", prompt: "Rice noodles with creamy peanut sauce, vegetables, crushed peanuts, lime, professional food photography" },
  { slug: "carrot-cake-energy-bites", title: "Carrot Cake Energy Bites", prompt: "Carrot cake flavored energy balls with coconut coating, arranged on plate, professional food photography" },
  { slug: "shepherds-pie", title: "Shepherd's Pie", prompt: "Traditional shepherd's pie with golden mashed potato topping in baking dish, professional food photography" },
  { slug: "blueberry-lemon-scones", title: "Blueberry Lemon Scones", prompt: "Triangular blueberry lemon scones with glaze drizzle, on cooling rack, professional food photography" },
  { slug: "mexican-street-corn-salad", title: "Mexican Street Corn Salad", prompt: "Mexican elote corn salad with lime, cotija cheese, chili powder, cilantro, professional food photography" },
  { slug: "chocolate-chip-banana-bread", title: "Chocolate Chip Banana Bread", prompt: "Moist banana bread loaf with chocolate chips, sliced on cutting board, professional food photography" },
  { slug: "mediterranean-stuffed-tomatoes", title: "Mediterranean Stuffed Tomatoes", prompt: "Ripe tomatoes stuffed with quinoa, herbs, and feta cheese, baked golden, professional food photography" },
  { slug: "green-tea-ice-cream", title: "Green Tea Ice Cream", prompt: "Creamy matcha green tea ice cream scoops in bowl with mint garnish, professional food photography" },
  { slug: "buffalo-chicken-dip", title: "Buffalo Chicken Dip", prompt: "Creamy buffalo chicken dip in skillet with celery sticks and chips, professional food photography" },
  { slug: "spinach-artichoke-dip", title: "Spinach Artichoke Dip", prompt: "Bubbly spinach artichoke dip in white baking dish with tortilla chips, professional food photography" },
  { slug: "peanut-butter-cups", title: "Peanut Butter Cups", prompt: "Homemade chocolate peanut butter cups, some broken showing filling, professional food photography" },
  { slug: "vegetable-lasagna", title: "Vegetable Lasagna", prompt: "Layered vegetable lasagna with visible layers of pasta, vegetables, cheese, professional food photography" },
  { slug: "mango-sticky-rice", title: "Mango Sticky Rice", prompt: "Thai mango sticky rice with ripe mango slices and coconut milk, professional food photography" },
  { slug: "loaded-sweet-potato-fries", title: "Loaded Sweet Potato Fries", prompt: "Crispy sweet potato fries loaded with toppings, cheese, bacon, green onions, professional food photography" },
  { slug: "chocolate-zucchini-bread", title: "Chocolate Zucchini Bread", prompt: "Moist chocolate zucchini bread loaf sliced, showing fudgy texture, professional food photography" },
  { slug: "greek-salad", title: "Greek Salad", prompt: "Traditional Greek salad with tomatoes, cucumbers, olives, feta, olive oil, professional food photography" },
  { slug: "banana-ice-cream", title: "Banana Ice Cream", prompt: "Creamy banana nice cream in bowl with banana slices and chocolate chips, professional food photography" },
  { slug: "stuffed-mushrooms", title: "Stuffed Mushrooms", prompt: "Baked stuffed mushroom caps with breadcrumb and cheese filling, golden brown, professional food photography" },
  { slug: "coconut-rice", title: "Coconut Rice", prompt: "Fluffy coconut rice in bowl garnished with toasted coconut and lime, professional food photography" },
  { slug: "veggie-burger", title: "Veggie Burger", prompt: "Hearty vegetable burger patty on bun with lettuce, tomato, avocado, professional food photography" },
  { slug: "apple-crisp", title: "Apple Crisp", prompt: "Golden apple crisp in baking dish with oat topping and vanilla ice cream, professional food photography" },
  { slug: "taco-salad", title: "Taco Salad", prompt: "Colorful taco salad in bowl with lettuce, beans, cheese, salsa, tortilla chips, professional food photography" },
  { slug: "chocolate-mousse", title: "Chocolate Mousse", prompt: "Rich dark chocolate mousse in glass dessert cup with whipped cream, professional food photography" },
  { slug: "ratatouille", title: "Ratatouille", prompt: "Classic French ratatouille with layered vegetables in round baking dish, professional food photography" },
  { slug: "pumpkin-bread", title: "Pumpkin Bread", prompt: "Moist pumpkin spice bread loaf with glaze, sliced on wooden board, professional food photography" },
  { slug: "vietnamese-spring-rolls", title: "Vietnamese Spring Rolls", prompt: "Fresh Vietnamese spring rolls with shrimp, vegetables, herbs, peanut dipping sauce, professional food photography" },
  { slug: "chocolate-bark", title: "Chocolate Bark", prompt: "Dark chocolate bark broken into pieces with nuts and dried fruits, professional food photography" },
  { slug: "minestrone-soup", title: "Minestrone Soup", prompt: "Hearty Italian minestrone soup with vegetables, beans, pasta in white bowl, professional food photography" },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filepath, buffer);
}

async function generateImage(prompt: string): Promise<string> {
  try {
    console.log(`Generating image with prompt: ${prompt.substring(0, 50)}...`);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    
    return response.data[0].url!;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

async function generateAndSaveImages() {
  // Fix the path to save in the correct location
  const imagesDir = path.join(process.cwd(), '..', 'attached_assets', 'generated_images');
  
  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log(`Starting image generation for ${recipeImages.length} recipes (final batch)...`);
  
  for (let i = 0; i < recipeImages.length; i++) {
    const recipe = recipeImages[i];
    const filename = `${recipe.slug.replace(/-/g, '_')}_${Math.random().toString(36).substring(7)}.png`;
    const filepath = path.join(imagesDir, filename);
    
    try {
      console.log(`[${i + 1}/${recipeImages.length}] Generating image for ${recipe.title}...`);
      
      // Generate image
      const imageUrl = await generateImage(recipe.prompt);
      
      // Download and save image
      await downloadImage(imageUrl, filepath);
      
      console.log(`✓ Saved image: ${filename}`);
      
      // Add delay to respect rate limits
      if (i < recipeImages.length - 1) {
        console.log("Waiting 2 seconds before next request...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`✗ Failed to generate image for ${recipe.title}:`, error);
      // Continue with next image
    }
  }
  
  console.log("\nImage generation complete!");
  console.log(`Images saved to: ${imagesDir}`);
}

// Run the generation
generateAndSaveImages().catch(console.error);
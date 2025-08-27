import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Recipe image generation data
const recipeImages = [
  { slug: "beetroot-latte", title: "Beetroot Latte", prompt: "A vibrant pink latte made with beetroot powder, steamed milk with beautiful foam art on top, served in a white ceramic cup on a wooden table, professional food photography, natural lighting" },
  { slug: "edamame-falafel", title: "Edamame Falafel", prompt: "Bright green falafel balls made with edamame, garnished with fresh herbs and tahini drizzle, served on a white plate, professional food photography, appetizing presentation" },
  { slug: "cauliflower-steaks", title: "Cauliflower Steaks", prompt: "Thick roasted cauliflower steaks with golden brown edges, drizzled with vibrant green chimichurri sauce, on a dark plate, professional food photography" },
  { slug: "date-energy-bars", title: "Date Energy Bars", prompt: "Homemade no-bake energy bars made with dates, nuts and seeds, cut into rectangles, showing texture with visible nuts and seeds, on parchment paper, professional food photography" },
  { slug: "kohlrabi-slaw", title: "Kohlrabi Slaw", prompt: "Fresh crunchy kohlrabi coleslaw with julienned kohlrabi and apple, light dressing, served in a white bowl, garnished with herbs, professional food photography" },
  { slug: "moringa-smoothie", title: "Moringa Smoothie", prompt: "Vibrant green smoothie made with moringa powder and banana, in a tall glass with a straw, garnished with moringa leaves, professional food photography" },
  { slug: "tiger-nut-horchata", title: "Tiger Nut Horchata", prompt: "Traditional Spanish tiger nut horchata drink, creamy white beverage in a glass, garnished with cinnamon stick, tiger nuts on the side, professional food photography" },
  { slug: "yuca-fries", title: "Yuca Fries", prompt: "Golden crispy yuca (cassava) fries in a serving basket, with garlic aioli dipping sauce on the side, professional food photography" },
  { slug: "hemp-seed-tabouli", title: "Hemp Seed Tabouli", prompt: "Fresh herb salad with hemp seeds, parsley, mint, tomatoes, and lemon dressing in a bowl, vibrant green colors, professional food photography" },
  { slug: "dragon-fruit-bowl", title: "Dragon Fruit Bowl", prompt: "Bright pink dragon fruit smoothie bowl topped with coconut flakes, tropical fruits, and edible flowers, in a white bowl, professional food photography" },
  { slug: "gluten-free-bagels", title: "Gluten-Free Bagels", prompt: "Golden brown gluten-free bagels with everything seasoning on top, one sliced showing fluffy interior, on a wooden board, professional food photography" },
  { slug: "mushroom-risotto", title: "Mushroom Risotto", prompt: "Creamy Italian mushroom risotto with porcini mushrooms, parmesan cheese, and fresh herbs in a white bowl, professional food photography" },
  { slug: "strawberry-shortcake", title: "Strawberry Shortcake", prompt: "Classic strawberry shortcake with layers of biscuit, fresh strawberries, and whipped cream, on a white plate, professional food photography" },
  { slug: "fish-tacos-mango-salsa", title: "Fish Tacos", prompt: "Grilled fish tacos in corn tortillas topped with colorful mango salsa, cilantro, and lime wedges, professional food photography" },
  { slug: "beet-goat-cheese-salad", title: "Beet Goat Cheese Salad", prompt: "Elegant salad with roasted red beets, crumbled goat cheese, candied walnuts, and arugula on a white plate, professional food photography" },
  { slug: "kelp-noodle-salad", title: "Kelp Noodle Salad", prompt: "Asian-inspired salad with translucent kelp noodles, colorful vegetables, sesame seeds, in a bowl with chopsticks, professional food photography" },
  { slug: "purple-sweet-potato-pie", title: "Purple Sweet Potato Pie", prompt: "Vibrant purple sweet potato pie with smooth filling, whipped cream topping, in a pie dish with one slice removed, professional food photography" },
  { slug: "chickpea-cookie-dough", title: "Chickpea Cookie Dough", prompt: "Bowl of edible cookie dough made with chickpeas, chocolate chips visible, with a spoon, safe to eat raw, professional food photography" },
  { slug: "socca-pizza", title: "Socca Pizza", prompt: "French chickpea flour pizza (socca) with Mediterranean toppings, olives, tomatoes, herbs, golden crust, professional food photography" },
  { slug: "golden-beet-hummus", title: "Golden Beet Hummus", prompt: "Bright golden yellow hummus made with roasted golden beets, drizzled with olive oil, served with vegetables, professional food photography" },
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
  const imagesDir = path.join(process.cwd(), 'attached_assets', 'generated_images');
  
  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log(`Starting image generation for ${recipeImages.length} recipes...`);
  
  for (let i = 0; i < recipeImages.length; i++) {
    const recipe = recipeImages[i];
    const filename = `${recipe.slug.replace(/-/g, '_')}_${Math.random().toString(36).substring(7)}.png`;
    const filepath = path.join(imagesDir, filename);
    
    // Check if image already exists
    if (fs.existsSync(filepath)) {
      console.log(`[${i + 1}/${recipeImages.length}] Image already exists for ${recipe.title}`);
      continue;
    }
    
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
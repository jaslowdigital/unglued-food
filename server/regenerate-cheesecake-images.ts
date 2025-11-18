import { generateRecipeImage } from './openai.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const recipes = [
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake – Classic Ganache",
    description: "Rich dark chocolate cheesecake topped with glossy chocolate ganache and fresh raspberries",
    filename: "gluten-free-dark-chocolate-raspberry-cheesecake-classic-ganache.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Swirl Cheesecake",
    description: "Elegant marble cheesecake with raspberry purée swirls throughout dark chocolate filling",
    filename: "gluten-free-dark-chocolate-raspberry-swirl-cheesecake.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Truffle Cheesecake",
    description: "Decadent truffle-textured cheesecake with raspberry reduction and chocolate drizzle",
    filename: "gluten-free-dark-chocolate-raspberry-truffle-cheesecake.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake Bars",
    description: "Easy square bars with raspberry layer between chocolate crust and creamy filling",
    filename: "gluten-free-dark-chocolate-raspberry-cheesecake-bars.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Mousse Cheesecake",
    description: "Airy mousse-cheesecake hybrid with shimmering raspberry gelée topping",
    filename: "gluten-free-dark-chocolate-raspberry-mousse-cheesecake.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake with Almond Flour Crust",
    description: "Classic cheesecake on naturally gluten-free almond flour crust with fresh raspberries",
    filename: "gluten-free-dark-chocolate-raspberry-cheesecake-almond-crust.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Cheesecake Tart",
    description: "French-inspired tart with dark chocolate filling and raspberry coulis decoration",
    filename: "gluten-free-dark-chocolate-raspberry-cheesecake-tart.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Layered Cheesecake",
    description: "Showstopping two-layer cake with distinct raspberry and dark chocolate cheesecake layers",
    filename: "gluten-free-dark-chocolate-raspberry-layered-cheesecake.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry No-Bake Cheesecake",
    description: "Chilled summer dessert with whipped chocolate filling and fresh raspberries on top",
    filename: "gluten-free-dark-chocolate-raspberry-no-bake-cheesecake.png"
  },
  {
    title: "Gluten-Free Dark Chocolate Raspberry Mini Cheesecakes",
    description: "Individual portions in cupcake liners with chocolate crumble base and raspberry garnish",
    filename: "gluten-free-dark-chocolate-raspberry-mini-cheesecakes.png"
  }
];

async function regenerateImages() {
  console.log('Starting image regeneration for 10 Dark Chocolate Raspberry Cheesecake recipes...\n');

  const imageDir = join(__dirname, 'client', 'public', 'recipe-images');
  await fs.mkdir(imageDir, { recursive: true });

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    console.log(`[${i + 1}/10] Generating image for: ${recipe.title}`);
    
    try {
      const imageUrl = await generateRecipeImage(recipe.title, recipe.description);
      console.log(`  ✓ Image URL received: ${imageUrl.substring(0, 50)}...`);
      
      // Fetch the image data
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const imagePath = join(imageDir, recipe.filename);
      await fs.writeFile(imagePath, buffer);
      
      const stats = await fs.stat(imagePath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`  ✓ Image saved: ${recipe.filename} (${fileSizeMB} MB)\n`);
      
    } catch (error) {
      console.error(`  ✗ Error generating image for ${recipe.title}:`, error);
    }
  }

  console.log('Image regeneration complete!');
}

regenerateImages().catch(console.error);

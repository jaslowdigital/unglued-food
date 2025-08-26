import OpenAI from "openai";
import * as fs from 'fs';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define specific, accurate prompts for each recipe that clearly describe what the dish should look like
const accurateRecipePrompts: Record<string, string> = {
  "beetroot-latte": "A vibrant pink or deep red colored latte in a white ceramic cup with latte art on top, made from beetroot powder mixed with steamed milk, served on a wooden table with a small spoon, professional coffee shop photography",
  
  "edamame-falafel": "Green falafel balls made with edamame beans, crispy golden exterior with bright green interior visible in one broken piece, served on a white plate with tahini sauce drizzle, fresh herbs garnish, pita bread on the side",
  
  "cauliflower-steaks": "Thick-cut roasted cauliflower steaks with golden-brown caramelized edges, seasoned with herbs and spices, served on an elegant plate with chimichurri sauce, grilled marks visible, restaurant presentation",
  
  "date-energy-bars": "Homemade rectangular energy bars made with dates, nuts and seeds, showing cross-section with visible chunks of dates and nuts, wrapped in parchment paper, healthy snack presentation",
  
  "kohlrabi-slaw": "Fresh coleslaw made with julienned kohlrabi, colorful with purple and green kohlrabi strips, creamy dressing, served in a white bowl with fresh herbs garnish, crisp and refreshing appearance",
  
  "moringa-smoothie": "Bright green smoothie in a tall glass made with moringa powder, topped with chia seeds and sliced banana, tropical fruit garnish, served with a bamboo straw, healthy breakfast presentation",
  
  "persimmon-salad": "Colorful salad with sliced orange persimmons, mixed greens, pomegranate seeds, crumbled goat cheese, candied walnuts, balsamic dressing, served on a white plate, autumn colors",
  
  "purple-potato-gnocchi": "Purple colored gnocchi made from purple potatoes, pan-fried until golden, served with brown butter sage sauce, parmesan shavings, elegant Italian presentation",
  
  "quinoa-tabbouleh": "Fresh Middle Eastern salad with quinoa instead of bulgur, lots of chopped parsley, diced tomatoes, cucumber, lemon wedges, served in a decorative bowl, vibrant green color dominant",
  
  "sorghum-porridge": "Creamy breakfast porridge made with sorghum grain, topped with fresh berries, honey drizzle, sliced almonds, served in a ceramic bowl, warm and comforting presentation",
  
  "sweet-potato-toast": "Sliced sweet potato toasted until golden, topped with avocado spread, poached egg, everything bagel seasoning, served on a wooden board, trendy breakfast presentation",
  
  "tempeh-bacon": "Crispy strips of marinated tempeh resembling bacon, golden-brown color with dark edges, served on a plate with scrambled eggs and toast, vegan breakfast presentation",
  
  "turmeric-golden-milk": "Golden yellow latte made with turmeric in a clear glass mug, frothy top with cinnamon sprinkle, star anise garnish, warm and inviting, ayurvedic drink presentation",
  
  "watermelon-poke-bowl": "Cubed watermelon arranged like tuna poke, with sesame seeds, scallions, avocado, edamame, served over rice in a bowl, colorful Hawaiian-inspired presentation",
  
  "zucchini-noodle-pad-thai": "Spiralized zucchini noodles stir-fried pad thai style, with peanuts, lime wedges, bean sprouts, red chili, served on a plate with chopsticks, Thai street food presentation",
  
  "amaranth-breakfast-bowl": "Cooked amaranth porridge topped with sliced fruits, nuts, coconut flakes, chia seeds, served in a ceramic bowl, Instagram-worthy breakfast presentation",
  
  "black-rice-sushi": "Sushi rolls made with black forbidden rice, colorful vegetables inside, served on a bamboo mat with wasabi, ginger, soy sauce, dramatic contrast presentation",
  
  "chia-pudding-parfait": "Layered chia pudding in a glass jar with alternating layers of chia pudding, fruit compote, granola, topped with fresh berries, healthy dessert presentation",
  
  "coconut-flour-pancakes": "Stack of fluffy pancakes made with coconut flour, golden brown, topped with maple syrup, fresh blueberries, butter pat melting on top, classic breakfast presentation",
  
  "millet-pilaf": "Fluffy millet grain pilaf with sautéed vegetables, herbs, toasted nuts, served in a decorative bowl, Middle Eastern style presentation with colorful ingredients visible",
  
  "plantain-tacos": "Ripe plantain slices used as taco shells, filled with black beans, colorful vegetables, salsa, cilantro, lime wedges on the side, creative Mexican presentation",
  
  "pomegranate-quinoa-salad": "Quinoa salad with ruby red pomegranate arils, chopped herbs, cucumber, feta cheese, served in a white bowl, jewel-like appearance with vibrant colors",
  
  "purple-cabbage-rolls": "Purple cabbage leaves stuffed and rolled with filling, arranged on a plate with tomato sauce, fresh herbs garnish, Eastern European style presentation",
  
  "spirulina-energy-balls": "Round green energy balls made with spirulina powder, rolled in coconut flakes, arranged on a plate, some broken to show texture inside, healthy snack presentation",
  
  "teff-injera-bread": "Traditional Ethiopian spongy flatbread made from teff, showing characteristic holes, served on a platter with colorful vegetable stews, authentic Ethiopian presentation",
  
  "tiger-nut-horchata": "Creamy white drink in a tall glass made from tiger nuts, cinnamon stick garnish, served cold with ice, Spanish/Latin American beverage presentation",
  
  "yuca-fries": "Golden crispy yuca (cassava) fries, thicker than regular fries, served in a basket with dipping sauce, Latin American style presentation",
  
  "buckwheat-crepes": "Thin buckwheat crepes folded on a plate, filled with savory ingredients, French galette style, rustic presentation with visible buckwheat texture",
  
  "hemp-seed-hummus": "Creamy hummus made with hemp seeds, drizzled with olive oil, paprika sprinkle, served with vegetable sticks and gluten-free crackers, Middle Eastern mezze presentation",
  
  "jackfruit-pulled-pork": "Shredded jackfruit prepared like pulled pork, served on a bun with coleslaw, BBQ sauce, Southern style sandwich presentation"
};

async function regenerateImage(recipeSlug: string, customPrompt: string): Promise<string> {
  try {
    console.log(`Generating accurate image for: ${recipeSlug}`);
    
    const fullPrompt = `${customPrompt}. High-quality professional food photography, appetizing, natural lighting, sharp focus, 8K resolution, magazine quality, no text or watermarks`;
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: fullPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || '';
  } catch (error: any) {
    if (error?.status === 429) {
      console.log('Rate limited, waiting 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 60000));
      return regenerateImage(recipeSlug, customPrompt); // Retry
    }
    console.error(`Error generating image for ${recipeSlug}:`, error);
    return '';
  }
}

async function regenerateAllImages() {
  const existingImages: Record<string, string> = JSON.parse(
    fs.readFileSync('./MASTER-all-generated-images.json', 'utf8')
  );
  
  const updatedImages: Record<string, string> = { ...existingImages };
  const recipesToRegenerate = Object.keys(accurateRecipePrompts);
  
  console.log(`\n🎨 Regenerating ${recipesToRegenerate.length} recipe images with accurate prompts\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const slug of recipesToRegenerate) {
    const prompt = accurateRecipePrompts[slug];
    
    try {
      const imageUrl = await regenerateImage(slug, prompt);
      
      if (imageUrl) {
        updatedImages[slug] = imageUrl;
        successCount++;
        console.log(`✅ [${successCount}/${recipesToRegenerate.length}] Generated: ${slug}`);
        
        // Save progress after each successful generation
        fs.writeFileSync(
          './REGENERATED-accurate-images.json',
          JSON.stringify(updatedImages, null, 2)
        );
      } else {
        failCount++;
        console.log(`❌ Failed: ${slug}`);
      }
      
      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error processing ${slug}:`, error);
      failCount++;
    }
  }
  
  console.log(`\n✨ Regeneration complete!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Results saved to: REGENERATED-accurate-images.json`);
}

// Check if OPENAI_API_KEY is available
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

// Run the regeneration
regenerateAllImages().catch(console.error);
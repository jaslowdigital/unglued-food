import OpenAI from "openai";
import * as fs from 'fs';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Additional accurate prompts for remaining recipes
const remainingRecipePrompts: Record<string, string> = {
  "plantain-tacos": "Ripe plantain slices grilled and used as taco shells, filled with black beans, colorful bell peppers, fresh salsa, avocado slices, cilantro, lime wedges on the side, creative Mexican fusion presentation",
  
  "pomegranate-quinoa-salad": "Fluffy quinoa salad with bright ruby red pomegranate arils scattered throughout, fresh mint leaves, diced cucumber, crumbled feta cheese, served in a white bowl, Mediterranean style with vibrant jewel-like colors",
  
  "purple-cabbage-rolls": "Vibrant purple cabbage leaves stuffed and rolled with rice and vegetable filling, arranged on a white plate with tomato sauce, fresh dill garnish, Eastern European style presentation",
  
  "spirulina-energy-balls": "Round green energy balls made with spirulina powder giving them a deep green color, rolled in white coconut flakes, arranged on a plate with one broken open to show dense texture inside, healthy snack presentation",
  
  "teff-injera-bread": "Traditional Ethiopian spongy flatbread made from teff flour, showing characteristic holes and bubbled texture, served on a large round platter with colorful vegetable stews in small portions, authentic Ethiopian presentation",
  
  "tiger-nut-horchata": "Creamy white beverage in a tall clear glass made from tiger nuts, cinnamon stick garnish, served cold with ice cubes visible, Spanish/Latin American traditional drink presentation",
  
  "yuca-fries": "Golden crispy yuca (cassava) fries, thicker than regular fries, served in a basket lined with paper, small bowl of garlic aioli dipping sauce, Latin American style presentation",
  
  "buckwheat-crepes": "Thin buckwheat galettes folded into triangles on a white plate, savory filling visible, darker brown color from buckwheat flour, French Brittany style presentation",
  
  "hemp-seed-hummus": "Creamy beige hummus made with hemp seeds, drizzled with olive oil in a spiral pattern, sprinkled with hemp seeds and paprika, served with colorful vegetable sticks and gluten-free crackers",
  
  "jackfruit-pulled-pork": "Shredded young jackfruit prepared like pulled pork in BBQ sauce, served on a whole grain bun with purple coleslaw on top, Southern BBQ style sandwich presentation",
  
  // Adding more recipes that need images
  "almond-flour-brownies": "Rich dark chocolate brownies made with almond flour, fudgy texture visible in cross-section, dusted with powdered sugar, served on parchment paper, decadent dessert presentation",
  
  "quinoa-breakfast-porridge": "Creamy quinoa porridge in a ceramic bowl, topped with sliced bananas, blueberries, drizzle of honey, chopped almonds, warm breakfast presentation",
  
  "chickpea-flour-omelette": "Golden yellow omelette made from chickpea flour, folded in half on a white plate, filled with sautéed vegetables, fresh herbs garnish, vegan breakfast option",
  
  "sweet-potato-gnocchi": "Orange sweet potato gnocchi with ridged texture, pan-seared until golden, served with brown butter and crispy sage leaves, Italian comfort food presentation",
  
  "coconut-rice-pudding": "Creamy white rice pudding made with coconut milk in a glass dessert bowl, topped with toasted coconut flakes, mango slices, tropical dessert presentation",
  
  "lentil-pasta-primavera": "Red lentil pasta with colorful spring vegetables, cherry tomatoes, asparagus, bell peppers, fresh basil, light olive oil sauce, healthy Italian presentation",
  
  "oat-flour-pizza": "Gluten-free pizza with oat flour crust, topped with tomato sauce, melted cheese, fresh basil, colorful vegetables, one slice being lifted showing stretchy cheese",
  
  "millet-breakfast-muffins": "Golden brown muffins made with millet flour, one broken open showing fluffy texture, topped with seeds, served on a cooling rack, healthy breakfast baking",
  
  "cassava-flour-tortillas": "Stack of soft cassava flour tortillas, light beige color, one folded showing flexibility, served on a traditional Mexican cloth, authentic presentation",
  
  "brown-rice-sushi-bowls": "Deconstructed sushi in a bowl with brown rice base, raw salmon, avocado, cucumber, edamame, nori strips, sesame seeds, drizzled with spicy mayo, poke bowl style",
  
  "amaranth-energy-bites": "Small round energy bites made with popped amaranth, giving them a crunchy texture, chocolate chips visible, arranged on a wooden board, healthy snack presentation",
  
  "sorghum-flour-cookies": "Golden brown cookies made with sorghum flour, chocolate chips throughout, one broken showing soft center, served on a white plate with glass of milk",
  
  "tapioca-pudding": "Classic tapioca pudding in a glass dessert cup, creamy with visible tapioca pearls, topped with whipped cream and a cherry, retro dessert presentation",
  
  "rice-paper-rolls": "Fresh Vietnamese spring rolls with rice paper wrapper, colorful vegetables and shrimp visible through translucent wrapper, served with peanut dipping sauce, Asian appetizer presentation",
  
  "polenta-fries": "Golden crispy polenta fries cut in thick sticks, served standing up in a metal cup, marinara sauce for dipping, Italian appetizer style",
  
  "banana-flour-pancakes": "Stack of light brown pancakes made with banana flour, topped with sliced bananas, maple syrup dripping down sides, pat of butter melting on top",
  
  "chestnut-flour-crepes": "Thin crepes made with chestnut flour, slightly darker color, filled with mushroom and cheese, folded on elegant plate, French bistro presentation",
  
  "corn-flour-muffins": "Yellow corn muffins with slightly coarse texture, one split open with butter melting, served in a basket with checkered cloth, Southern comfort food",
  
  "potato-starch-noodles": "Clear glass noodles made from potato starch, stir-fried with colorful vegetables, sesame oil sheen, served in a black bowl with chopsticks, Asian cuisine",
  
  "arrowroot-cookies": "Delicate shortbread-style cookies made with arrowroot flour, light color, decorated with icing, arranged on a vintage plate, tea time presentation",
  
  // Continue with more recipes...
  "wild-rice-pilaf": "Mixed wild and brown rice pilaf with dried cranberries, toasted pecans, fresh parsley, served in an earthenware bowl, autumn harvest presentation",
  
  "quinoa-flour-bread": "Sliced artisan bread made with quinoa flour, dense texture with seeds visible, one slice with butter, served on a wooden cutting board",
  
  "chickpea-pasta-salad": "Spiral chickpea pasta in a colorful salad with cherry tomatoes, olives, feta, fresh basil, lemon vinaigrette, Mediterranean picnic style",
  
  "rice-flour-tempura": "Light crispy tempura vegetables made with rice flour batter, golden color, served with tentsuyu dipping sauce, Japanese restaurant presentation",
  
  "buckwheat-noodle-soup": "Dark buckwheat soba noodles in clear broth, topped with green onions, nori, soft-boiled egg, tempura shrimp, Japanese comfort food",
  
  "coconut-flour-waffles": "Golden waffles made with coconut flour, crispy exterior, topped with fresh berries, whipped cream, maple syrup, breakfast cafe presentation",
  
  "almond-butter-smoothie": "Creamy beige smoothie in a mason jar, made with almond butter, topped with sliced almonds, banana slices, chia seeds, protein-rich breakfast drink",
  
  "cashew-cream-pasta": "Fettuccine with creamy white cashew-based alfredo sauce, black pepper, fresh parsley, served in a white bowl, vegan Italian comfort food",
  
  "hazelnut-flour-cake": "Slice of moist chocolate hazelnut cake, layers visible, ganache frosting, chopped hazelnuts on top, European patisserie presentation",
  
  "sesame-seed-bars": "Rectangular bars made with sesame seeds and honey, golden brown, cut into squares, Middle Eastern tahini-based sweet snack",
  
  "pumpkin-seed-pesto": "Bright green pesto made with pumpkin seeds, tossed with pasta, cherry tomatoes, served in a white bowl, creative Italian variation",
  
  "sunflower-seed-bread": "Rustic bread loaf covered in sunflower seeds, one slice showing dense seeded interior, served with butter, German-style healthy bread",
  
  "flax-meal-crackers": "Thin crispy crackers made with flax meal, golden brown with visible seeds, served with cheese and grapes, healthy appetizer presentation",
  
  "chia-seed-jam": "Bright berry chia jam in a glass jar, thick texture with visible chia seeds, spread on gluten-free toast, healthy breakfast condiment",
  
  "poppy-seed-muffins": "Lemon poppy seed muffins with visible black poppy seeds throughout, lemon glaze on top, served on a white plate with lemon slices",
  
  "mustard-seed-curry": "Indian curry with visible whole mustard seeds, rich golden sauce, served with rice, fresh cilantro garnish, authentic Indian presentation",
  
  "coriander-seed-cookies": "Delicate cookies with coriander seeds, light brown color, cup of tea alongside, Middle Eastern inspired tea cookies",
  
  "fennel-seed-bread": "Italian bread with fennel seeds throughout, golden crust, served with olive oil for dipping, rustic Mediterranean presentation"
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

async function continueRegeneration() {
  // Load existing images
  const existingImages: Record<string, string> = JSON.parse(
    fs.readFileSync('./REGENERATED-accurate-images.json', 'utf8')
  );
  
  const recipesToGenerate = Object.entries(remainingRecipePrompts);
  const totalToGenerate = recipesToGenerate.length;
  
  console.log(`\n🎨 Continuing regeneration with ${totalToGenerate} more recipes\n`);
  
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;
  
  for (const [slug, prompt] of recipesToGenerate) {
    // Skip if already has a regenerated image
    if (existingImages[slug] && existingImages[slug].includes('oaidalle')) {
      skipCount++;
      console.log(`⏭️  Skipping ${slug} (already regenerated)`);
      continue;
    }
    
    try {
      const imageUrl = await regenerateImage(slug, prompt);
      
      if (imageUrl) {
        existingImages[slug] = imageUrl;
        successCount++;
        console.log(`✅ [${successCount}/${totalToGenerate}] Generated: ${slug}`);
        
        // Save progress after each successful generation
        fs.writeFileSync(
          './REGENERATED-accurate-images.json',
          JSON.stringify(existingImages, null, 2)
        );
        
        // Also update the MASTER file
        fs.writeFileSync(
          './MASTER-all-generated-images.json',
          JSON.stringify(existingImages, null, 2)
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
  
  console.log(`\n✨ Continuation complete!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Results saved to: REGENERATED-accurate-images.json`);
}

// Check if OPENAI_API_KEY is available
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

// Run the continuation
continueRegeneration().catch(console.error);
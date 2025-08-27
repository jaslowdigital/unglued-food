import OpenAI from "openai";
import fs from "fs";
import path from "path";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Next batch of recipe images (21-50)
const recipeImages = [
  { slug: "jackfruit-carnitas", title: "Jackfruit Carnitas", prompt: "Shredded jackfruit tacos that look like pulled pork, served in corn tortillas with cilantro and lime, professional food photography" },
  { slug: "black-bean-brownies", title: "Black Bean Brownies", prompt: "Fudgy chocolate brownies made with black beans, cut into squares, showing moist texture, on parchment paper, professional food photography" },
  { slug: "quinoa-breakfast-bowl", title: "Quinoa Breakfast Bowl", prompt: "Protein-packed breakfast bowl with cooked quinoa, fresh berries, nuts, and honey drizzle, in a white bowl, professional food photography" },
  { slug: "zucchini-lasagna", title: "Zucchini Lasagna", prompt: "Layered lasagna with thin zucchini slices instead of pasta, cheese and tomato sauce visible, in baking dish, professional food photography" },
  { slug: "matcha-energy-balls", title: "Matcha Energy Balls", prompt: "Green matcha energy balls rolled in coconut, arranged on a plate, showing texture, professional food photography" },
  { slug: "cucumber-gazpacho", title: "Cucumber Gazpacho", prompt: "Refreshing green gazpacho soup with cucumber garnish and herbs, served in a white bowl with drizzle of olive oil, professional food photography" },
  { slug: "plantain-pancakes", title: "Plantain Pancakes", prompt: "Stack of golden plantain pancakes with syrup dripping down, butter on top, on white plate, professional food photography" },
  { slug: "tempeh-buddha-bowl", title: "Tempeh Buddha Bowl", prompt: "Colorful buddha bowl with marinated tempeh, quinoa, vegetables, avocado, and tahini dressing, professional food photography" },
  { slug: "chia-pudding-parfait", title: "Chia Pudding Parfait", prompt: "Layered chia pudding parfait in a glass jar with berries and granola layers visible, professional food photography" },
  { slug: "stuffed-bell-peppers", title: "Stuffed Bell Peppers", prompt: "Colorful bell peppers stuffed with quinoa and vegetables, topped with melted cheese, in baking dish, professional food photography" },
  { slug: "almond-flour-cookies", title: "Almond Flour Cookies", prompt: "Golden almond flour chocolate chip cookies on a cooling rack, showing chewy texture, professional food photography" },
  { slug: "green-goddess-smoothie", title: "Green Goddess Smoothie", prompt: "Vibrant green smoothie in a tall glass with a straw, garnished with spinach leaf and seeds, professional food photography" },
  { slug: "spaghetti-squash-pad-thai", title: "Spaghetti Squash Pad Thai", prompt: "Thai-style pad thai made with spaghetti squash noodles, peanuts, lime wedge, bean sprouts, professional food photography" },
  { slug: "turmeric-latte", title: "Turmeric Latte", prompt: "Golden turmeric latte with foam art on top, in a white ceramic cup, cinnamon stick garnish, professional food photography" },
  { slug: "kale-caesar-salad", title: "Kale Caesar Salad", prompt: "Fresh kale Caesar salad with croutons, parmesan shavings, and creamy dressing, in white bowl, professional food photography" },
  { slug: "sweet-potato-gnocchi", title: "Sweet Potato Gnocchi", prompt: "Orange sweet potato gnocchi with sage butter sauce, showing pillowy texture, on white plate, professional food photography" },
  { slug: "coconut-macaroons", title: "Coconut Macaroons", prompt: "Golden coconut macaroons dipped in dark chocolate, arranged on a plate, showing texture, professional food photography" },
  { slug: "avocado-chocolate-mousse", title: "Avocado Chocolate Mousse", prompt: "Rich dark chocolate mousse in glass dessert cups, topped with whipped cream and berries, professional food photography" },
  { slug: "buckwheat-crepes", title: "Buckwheat Crepes", prompt: "Thin French buckwheat crepes folded on plate with filling visible, garnished with herbs, professional food photography" },
  { slug: "cauliflower-buffalo-bites", title: "Cauliflower Buffalo Bites", prompt: "Crispy buffalo cauliflower bites with orange buffalo sauce coating, celery sticks and ranch dip, professional food photography" },
  { slug: "lentil-bolognese", title: "Lentil Bolognese", prompt: "Hearty lentil bolognese sauce over pasta, garnished with fresh basil and parmesan, professional food photography" },
  { slug: "banana-bread-muffins", title: "Banana Bread Muffins", prompt: "Moist banana bread muffins with walnut topping, one broken open showing texture, professional food photography" },
  { slug: "asian-lettuce-wraps", title: "Asian Lettuce Wraps", prompt: "Fresh lettuce cups filled with seasoned vegetable mixture, arranged on platter with sauce, professional food photography" },
  { slug: "polenta-pizza-crust", title: "Polenta Pizza Crust", prompt: "Golden crispy polenta pizza crust with toppings, one slice lifted showing texture, professional food photography" },
  { slug: "protein-power-balls", title: "Protein Power Balls", prompt: "Peanut butter protein balls rolled in various coatings, arranged on plate, professional food photography" },
  { slug: "roasted-red-pepper-soup", title: "Roasted Red Pepper Soup", prompt: "Vibrant red roasted pepper soup with cream swirl and basil garnish, in white bowl, professional food photography" },
  { slug: "coconut-flour-waffles", title: "Coconut Flour Waffles", prompt: "Stack of golden coconut flour waffles with berries and syrup, on white plate, professional food photography" },
  { slug: "mediterranean-quinoa-salad", title: "Mediterranean Quinoa Salad", prompt: "Colorful quinoa salad with tomatoes, cucumbers, olives, feta cheese, herbs, professional food photography" },
  { slug: "overnight-oats", title: "Overnight Oats", prompt: "Creamy overnight oats in mason jar topped with berries, nuts, and honey, professional food photography" },
  { slug: "eggplant-parmesan", title: "Eggplant Parmesan", prompt: "Layered eggplant parmesan with melted cheese and marinara sauce, fresh basil on top, professional food photography" },
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

  console.log(`Starting image generation for ${recipeImages.length} recipes (batch 21-50)...`);
  
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
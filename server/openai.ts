import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRecipeImage(recipeName: string, description: string): Promise<string> {
  try {
    const prompt = `High-quality, professional food photography of ${recipeName}. ${description}. Gluten-free dish beautifully plated, appetizing presentation, natural lighting, shallow depth of field, restaurant-quality styling, vibrant colors, fresh ingredients visible, garnished appropriately, on elegant dishware with subtle table setting.`;
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error(`Error generating image for ${recipeName}:`, error);
    return '';
  }
}

export async function generateRecipeSEOContent(recipeName: string, ingredients: string[]): Promise<{
  metaDescription: string;
  commentary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert specializing in gluten-free recipe content. Generate compelling meta descriptions and recipe commentary optimized for search engines. Respond with JSON in this format: { 'metaDescription': string, 'commentary': string }"
        },
        {
          role: "user",
          content: `Generate SEO content for this gluten-free recipe: "${recipeName}" with ingredients: ${ingredients.join(', ')}. 
          
          Meta description should be 150-160 characters, include "gluten-free", and be compelling for search results.
          Commentary should be 2-3 paragraphs discussing the recipe's appeal, health benefits, and gluten-free advantages.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      metaDescription: result.metaDescription || '',
      commentary: result.commentary || ''
    };
  } catch (error) {
    console.error(`Error generating SEO content for ${recipeName}:`, error);
    return {
      metaDescription: '',
      commentary: ''
    };
  }
}
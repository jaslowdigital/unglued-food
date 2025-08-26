import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, ChefHat, Flame } from "lucide-react";
import type { Recipe } from "@shared/schema";

export default function RecipePage() {
  const params = useParams() as { slug?: string };
  const slug = params.slug;

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ["/api/recipes/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/recipes/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Recipe not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sorry, we couldn't find the recipe you're looking for.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" data-testid={`recipe-page-${slug}`}>
      {/* SEO Meta Tags */}
      <title>{recipe.seoTitle || recipe.title}</title>
      <meta name="description" content={recipe.seoDescription || recipe.description} />
      
      {/* Hero Section */}
      <div className="mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4" data-testid="recipe-title">
              {recipe.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6" data-testid="recipe-description">
              {recipe.longDescription || recipe.description}
            </p>
            
            {/* Recipe Meta */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span data-testid="recipe-total-time">
                  {recipe.totalTime || recipe.cookTime} mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                <span data-testid="recipe-servings">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span data-testid="recipe-difficulty">{recipe.difficulty}</span>
              </div>
              {recipe.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span data-testid="recipe-calories">{recipe.calories} cal</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" data-testid={`tag-${tag}`}>
                  {tag}
                </Badge>
              ))}
              {recipe.isNaturallyGlutenFree && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Naturally Gluten-Free
                </Badge>
              )}
            </div>

            {/* Nutrition Info */}
            {(recipe.protein || recipe.carbs || recipe.fat || recipe.fiber) && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Nutrition Per Serving</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recipe.protein && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                        <p className="font-semibold" data-testid="nutrition-protein">{recipe.protein}g</p>
                      </div>
                    )}
                    {recipe.carbs && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                        <p className="font-semibold" data-testid="nutrition-carbs">{recipe.carbs}g</p>
                      </div>
                    )}
                    {recipe.fat && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                        <p className="font-semibold" data-testid="nutrition-fat">{recipe.fat}g</p>
                      </div>
                    )}
                    {recipe.fiber && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
                        <p className="font-semibold" data-testid="nutrition-fiber">{recipe.fiber}g</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recipe Image */}
          <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
            <img
              src={recipe.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"}
              alt={recipe.title}
              className="w-full h-full object-cover"
              data-testid="recipe-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop";
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-amber-600 text-white">
                ⭐ {recipe.rating}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Ingredients & Instructions */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                    data-testid={`ingredient-${index}`}
                  >
                    <span className="text-amber-600 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li 
                    key={index} 
                    className="flex"
                    data-testid={`instruction-${index}`}
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center font-semibold mr-3">
                      {index + 1}
                    </span>
                    <span className="pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tips & Variations */}
          {(recipe.tips || recipe.variations) && (
            <Card className="mt-6">
              <CardContent className="p-6">
                {recipe.tips && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Chef's Tips</h3>
                    <p className="text-gray-600 dark:text-gray-300" data-testid="recipe-tips">
                      {recipe.tips}
                    </p>
                  </div>
                )}
                
                {recipe.variations && recipe.variations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Variations</h3>
                    <ul className="space-y-1">
                      {recipe.variations.map((variation, index) => (
                        <li 
                          key={index}
                          className="flex items-start text-gray-600 dark:text-gray-300"
                          data-testid={`variation-${index}`}
                        >
                          <span className="text-amber-600 mr-2">•</span>
                          <span>{variation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": recipe.title,
          "description": recipe.description,
          "image": recipe.image,
          "prepTime": recipe.prepTime ? `PT${recipe.prepTime}M` : undefined,
          "cookTime": `PT${recipe.cookTime}M`,
          "totalTime": recipe.totalTime ? `PT${recipe.totalTime}M` : `PT${recipe.cookTime}M`,
          "recipeYield": `${recipe.servings} servings`,
          "recipeCategory": recipe.category,
          "recipeCuisine": recipe.tags[0],
          "nutrition": recipe.calories ? {
            "@type": "NutritionInformation",
            "calories": `${recipe.calories} calories`,
            "proteinContent": recipe.protein ? `${recipe.protein}g` : undefined,
            "carbohydrateContent": recipe.carbs ? `${recipe.carbs}g` : undefined,
            "fatContent": recipe.fat ? `${recipe.fat}g` : undefined,
            "fiberContent": recipe.fiber ? `${recipe.fiber}g` : undefined,
          } : undefined,
          "recipeIngredient": recipe.ingredients,
          "recipeInstructions": recipe.instructions.map((instruction, index) => ({
            "@type": "HowToStep",
            "name": `Step ${index + 1}`,
            "text": instruction
          })),
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": recipe.rating,
            "bestRating": "5",
            "worstRating": "1"
          }
        })
      }} />
    </div>
  );
}
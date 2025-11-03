import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Clock, Users, ChefHat, Flame, X } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RecipeRatingComment from "@/components/RecipeRatingComment";
import RecipeFlag from "@/components/RecipeFlag";
import SocialShare from "@/components/SocialShare";
import MetaTags from "@/components/MetaTags";
import type { Recipe, RecipeRating } from "@shared/schema";

export default function RecipePage() {
  const params = useParams() as { slug?: string };
  const slug = params.slug;
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Use category-appropriate fallback images when AI images fail to load
  const getFallbackImage = (category: string) => {
    const fallbacks: Record<string, string> = {
      "Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop",
      "Lunch": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      "Dinner": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      "Desserts": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
      "Snacks": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop",
      "Appetizers": "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&h=400&fit=crop",
      "Salads": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
      "Sides": "https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=600&h=400&fit=crop"
    };
    return fallbacks[category] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop";
  };

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

  // Fetch ratings/reviews for Schema.org markup
  const { data: ratings = [] } = useQuery<RecipeRating[]>({
    queryKey: ['/api/recipes', recipe?.id, 'ratings'],
    enabled: !!recipe?.id,
  });

  // Calculate aggregate rating
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : recipe?.rating || "0";
  const reviewCount = ratings.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Sorry, we couldn't find the recipe you're looking for.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert relative image URLs to absolute production URLs
  const getAbsoluteImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return getFallbackImage(recipe.category);
    if (imageUrl.startsWith('http')) return imageUrl;
    return `https://ungluedfood.com${imageUrl}`;
  };

  const absoluteImageUrl = getAbsoluteImageUrl(recipe.image);

  return (
    <div className="min-h-screen bg-dark-primary text-light-text overflow-x-hidden">
      <MetaTags 
        title={recipe.title}
        description={recipe.description}
        image={absoluteImageUrl}
        url={`/recipe/${slug}`}
        type="article"
      />
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24 max-w-full" data-testid={`recipe-page-${slug}`}>
      
      {/* Hero Section */}
      <div className="mb-8 max-w-full overflow-hidden">
        {/* Mobile Layout: Title, Image, Share, Description */}
        <div className="md:hidden max-w-full">
          {/* 1. Title */}
          <h1 className="text-2xl sm:text-3xl font-bold break-words max-w-full mb-4" data-testid="recipe-title" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            {recipe.title}
          </h1>

          {/* 2. Recipe Image */}
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden max-w-full mb-4">
            <img
              src={absoluteImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover max-w-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ maxWidth: '100%', height: 'auto', minHeight: '16rem' }}
              data-testid="recipe-image"
              onClick={() => setImageModalOpen(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage(recipe.category);
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-amber-600 text-white text-sm">
                ⭐ {recipe.rating}
              </Badge>
            </div>
          </div>

          {/* 3. Share Button */}
          <div className="flex items-center gap-2 mb-4">
            <SocialShare 
              title={recipe.title}
              description={recipe.description}
              url={`/recipe/${slug}`}
              image={absoluteImageUrl}
            />
            <RecipeFlag recipeId={recipe.id} recipeName={recipe.title} />
          </div>

          {/* 4. Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 break-words" data-testid="recipe-description" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
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
          {(recipe.protein || recipe.carbs || recipe.fat || recipe.fiber || recipe.sugar) && (
            <Card className="mb-6 max-w-full">
              <CardContent className="p-4 overflow-x-auto">
                <h3 className="font-semibold mb-3">Nutrition Per Serving</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-w-0">
                  {recipe.protein && (
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                      <p className="font-semibold break-words" data-testid="nutrition-protein">{recipe.protein}g</p>
                    </div>
                  )}
                  {recipe.carbs && (
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                      <p className="font-semibold break-words" data-testid="nutrition-carbs">{recipe.carbs}g</p>
                    </div>
                  )}
                  {recipe.sugar && (
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sugar</p>
                      <p className="font-semibold break-words" data-testid="nutrition-sugar">{recipe.sugar}g</p>
                    </div>
                  )}
                  {recipe.fat && (
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                      <p className="font-semibold break-words" data-testid="nutrition-fat">{recipe.fat}g</p>
                    </div>
                  )}
                  {recipe.fiber && (
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
                      <p className="font-semibold break-words" data-testid="nutrition-fiber">{recipe.fiber}g</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Layout: Original 2-column grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          <div className="max-w-full">
            <div className="flex items-start justify-between mb-4 gap-3">
              <h1 className="text-4xl font-bold break-words max-w-full" data-testid="recipe-title" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {recipe.title}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <SocialShare 
                  title={recipe.title}
                  description={recipe.description}
                  url={`/recipe/${slug}`}
                  image={absoluteImageUrl}
                />
                <RecipeFlag recipeId={recipe.id} recipeName={recipe.title} />
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 break-words" data-testid="recipe-description" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
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
            {(recipe.protein || recipe.carbs || recipe.fat || recipe.fiber || recipe.sugar) && (
              <Card className="mb-6 max-w-full">
                <CardContent className="p-4 overflow-x-auto">
                  <h3 className="font-semibold mb-3">Nutrition Per Serving</h3>
                  <div className="grid grid-cols-5 gap-4 min-w-0">
                    {recipe.protein && (
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                        <p className="font-semibold break-words" data-testid="nutrition-protein">{recipe.protein}g</p>
                      </div>
                    )}
                    {recipe.carbs && (
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                        <p className="font-semibold break-words" data-testid="nutrition-carbs">{recipe.carbs}g</p>
                      </div>
                    )}
                    {recipe.sugar && (
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sugar</p>
                        <p className="font-semibold break-words" data-testid="nutrition-sugar">{recipe.sugar}g</p>
                      </div>
                    )}
                    {recipe.fat && (
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                        <p className="font-semibold break-words" data-testid="nutrition-fat">{recipe.fat}g</p>
                      </div>
                    )}
                    {recipe.fiber && (
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
                        <p className="font-semibold break-words" data-testid="nutrition-fiber">{recipe.fiber}g</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recipe Image */}
          <div className="relative h-full rounded-lg overflow-hidden max-w-full">
            <img
              src={absoluteImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover max-w-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{ maxWidth: '100%', height: 'auto', minHeight: '16rem' }}
              data-testid="recipe-image"
              onClick={() => setImageModalOpen(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage(recipe.category);
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-amber-600 text-white text-sm">
                ⭐ {recipe.rating}
              </Badge>
            </div>
          </div>
        </div>

        {/* Image Expand Modal */}
        <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black border-0">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              data-testid="close-image-modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={absoluteImageUrl}
              alt={recipe.title}
              className="w-full h-full object-contain max-h-[95vh]"
              data-testid="expanded-recipe-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage(recipe.category);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="my-8" />

      {/* Ingredients & Instructions */}
      <div className="grid md:grid-cols-3 gap-8 max-w-full">
        {/* Ingredients */}
        <div className="md:col-span-1 max-w-full">
          <Card className="max-w-full">
            <CardContent className="p-4 sm:p-6 overflow-hidden">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2 max-w-full">
                {recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index} 
                    className="flex items-start break-words max-w-full"
                    data-testid={`ingredient-${index}`}
                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    <span className="text-amber-600 mr-2 flex-shrink-0">•</span>
                    <span className="break-words min-w-0">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2 max-w-full">
          <Card className="max-w-full">
            <CardContent className="p-4 sm:p-6 overflow-hidden">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4 max-w-full">
                {recipe.instructions.map((instruction, index) => (
                  <li 
                    key={index} 
                    className="flex break-words max-w-full"
                    data-testid={`instruction-${index}`}
                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center font-semibold mr-3 min-w-[2rem]">
                      {index + 1}
                    </span>
                    <span className="pt-1 break-words min-w-0">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tips & Variations */}
          {(recipe.tips || recipe.variations) && (
            <Card className="mt-6 max-w-full">
              <CardContent className="p-4 sm:p-6 overflow-hidden">
                {recipe.tips && (
                  <div className="mb-4 max-w-full">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Chef's Tips</h3>
                    <p className="text-gray-600 dark:text-gray-300 break-words" data-testid="recipe-tips" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      {recipe.tips}
                    </p>
                  </div>
                )}
                
                {recipe.variations && recipe.variations.length > 0 && (
                  <div className="max-w-full">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Variations</h3>
                    <ul className="space-y-1 max-w-full">
                      {recipe.variations.map((variation, index) => (
                        <li 
                          key={index}
                          className="flex items-start text-gray-600 dark:text-gray-300 break-words max-w-full"
                          data-testid={`variation-${index}`}
                          style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                        >
                          <span className="text-amber-600 mr-2 flex-shrink-0">•</span>
                          <span className="break-words min-w-0">{variation}</span>
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

      {/* Recipe Rating and Comments Section */}
      <div className="mt-8 max-w-full overflow-hidden">
        <RecipeRatingComment recipeId={recipe.id} />
      </div>

      {/* Enhanced Schema.org JSON-LD Markup for Google Rich Results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": recipe.title,
          "description": recipe.longDescription || recipe.description,
          "image": {
            "@type": "ImageObject",
            "url": absoluteImageUrl,
            "width": 1200,
            "height": 800
          },
          "author": {
            "@type": "Organization",
            "name": "Unglued Food",
            "url": "https://ungluedfood.com"
          },
          "datePublished": recipe.createdAt ? new Date(recipe.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          "prepTime": recipe.prepTime ? `PT${recipe.prepTime}M` : undefined,
          "cookTime": `PT${recipe.cookTime}M`,
          "totalTime": recipe.totalTime ? `PT${recipe.totalTime}M` : `PT${recipe.cookTime}M`,
          "recipeYield": `${recipe.servings} servings`,
          "recipeCategory": recipe.category,
          "recipeCuisine": recipe.tags[0] || "Gluten-Free",
          "keywords": recipe.tags.join(", "),
          "suitableForDiet": [
            "https://schema.org/GlutenFreeDiet",
            ...(recipe.tags.includes("keto") || recipe.tags.includes("low-carb") ? ["https://schema.org/LowCalorieDiet"] : []),
            ...(recipe.tags.includes("kosher") ? ["https://schema.org/KosherDiet"] : []),
            ...(recipe.tags.includes("vegan") ? ["https://schema.org/VeganDiet"] : [])
          ],
          "nutrition": recipe.calories ? {
            "@type": "NutritionInformation",
            "calories": `${recipe.calories} calories`,
            "servingSize": "1 serving",
            "proteinContent": recipe.protein ? `${recipe.protein}g` : undefined,
            "carbohydrateContent": recipe.carbs ? `${recipe.carbs}g` : undefined,
            "sugarContent": recipe.sugar ? `${recipe.sugar}g` : undefined,
            "fatContent": recipe.fat ? `${recipe.fat}g` : undefined,
            "fiberContent": recipe.fiber ? `${recipe.fiber}g` : undefined,
          } : undefined,
          "recipeIngredient": recipe.ingredients,
          "recipeInstructions": recipe.instructions.map((instruction, index) => ({
            "@type": "HowToStep",
            "name": `Step ${index + 1}`,
            "text": instruction,
            "position": index + 1
          })),
          "aggregateRating": reviewCount > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviewCount,
            "bestRating": "5",
            "worstRating": "1"
          } : (recipe.rating ? {
            "@type": "AggregateRating",
            "ratingValue": recipe.rating,
            "reviewCount": 1,
            "bestRating": "5",
            "worstRating": "1"
          } : undefined),
          "review": ratings.filter(r => r.reviewText).map(rating => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": rating.userName
            },
            "datePublished": rating.createdAt ? new Date(rating.createdAt).toISOString().split('T')[0] : undefined,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": rating.rating,
              "bestRating": "5",
              "worstRating": "1"
            },
            "reviewBody": rating.reviewText
          })),
          "isAccessibleForFree": true,
          "url": `https://ungluedfood.com/recipe/${slug}`
        })
      }} />
      </div>
      <Footer />
    </div>
  );
}
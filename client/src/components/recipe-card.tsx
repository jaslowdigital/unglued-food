import { Star, Clock, Users, Signal, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SocialShare from "@/components/SocialShare";
import { type Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <Signal className="h-4 w-4" />;
      case "Medium":
        return <Signal className="h-4 w-4" />;
      case "Hard":
        return <Signal className="h-4 w-4" />;
      default:
        return <Signal className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (isNaturallyGlutenFree: boolean) => {
    return isNaturallyGlutenFree ? "default" : "secondary";
  };

  const getBadgeText = (isNaturallyGlutenFree: boolean) => {
    return isNaturallyGlutenFree ? "Naturally GF" : "GF Substitute";
  };

  const recipeSlug = recipe.slug || recipe.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  // Use category-appropriate fallback images when AI images fail to load
  const getFallbackImage = (category: string) => {
    const fallbacks: Record<string, string> = {
      "Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
      "Lunch": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      "Dinner": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      "Desserts": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      "Snacks": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
      "Appetizers": "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop",
      "Salads": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      "Sides": "https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=400&h=300&fit=crop"
    };
    return fallbacks[category] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
  };

  const defaultImage = getFallbackImage(recipe.category);

  // Use image URL directly - Vite/Express serves public folder correctly
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return defaultImage;
    return imageUrl;
  };

  const imageUrl = getImageUrl(recipe.image);

  return (
    <article 
      className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 relative group"
      data-testid={`recipe-card-${recipe.id}`}
    >
      <Link href={`/recipe/${recipeSlug}`} className="block">
        <img 
          src={imageUrl} 
          alt={recipe.title}
          className="w-full h-48 object-cover" 
          data-testid={`recipe-image-${recipe.id}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
          <Badge 
            variant={getBadgeVariant(recipe.isNaturallyGlutenFree)}
            className={`text-xs px-2 py-1 rounded-full font-semibold ${
              recipe.isNaturallyGlutenFree 
                ? "bg-success-green text-dark-primary" 
                : "bg-warm-amber text-dark-primary"
            }`}
            data-testid={`recipe-badge-${recipe.id}`}
          >
            {getBadgeText(recipe.isNaturallyGlutenFree)}
          </Badge>
          <div className="flex items-center text-warm-amber">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm" data-testid={`recipe-rating-${recipe.id}`}>
              {recipe.rating}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2" data-testid={`recipe-title-${recipe.id}`}>
          {recipe.title}
        </h3>
        <p className="text-muted-gray mb-4 text-sm" data-testid={`recipe-description-${recipe.id}`}>
          {recipe.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-gray">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span data-testid={`recipe-cook-time-${recipe.id}`}>
              {recipe.cookTime} min
            </span>
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span data-testid={`recipe-servings-${recipe.id}`}>
              {recipe.servings} servings
            </span>
          </span>
          <span className="flex items-center">
            {getDifficultyIcon(recipe.difficulty)}
            <span className="ml-1" data-testid={`recipe-difficulty-${recipe.id}`}>
              {recipe.difficulty}
            </span>
          </span>
          </div>
        </div>
      </Link>
      
      {/* Social Share Button - appears on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div onClick={(e) => e.stopPropagation()}>
          <SocialShare 
            title={recipe.title}
            description={recipe.description}
            url={`/recipe/${recipeSlug}`}
            image={imageUrl}
          />
        </div>
      </div>
    </article>
  );
}

import { Star, Clock, Users, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
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

  return (
    <Link href={`/recipe/${recipeSlug}`}>
      <article 
        className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
        data-testid={`recipe-card-${recipe.id}`}
      >
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover" 
        data-testid={`recipe-image-${recipe.id}`}
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
      </article>
    </Link>
  );
}

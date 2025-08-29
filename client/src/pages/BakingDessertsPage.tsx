import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Clock, Users, Star } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { type Recipe } from "@shared/schema";

export default function BakingDessertsPage() {
  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  // Filter for baking & dessert recipes
  const bakingRecipes = recipes.filter(recipe => 
    recipe.category?.toLowerCase().includes('dessert') || 
    recipe.category?.toLowerCase().includes('baking') ||
    recipe.tags?.some(tag => 
      tag.toLowerCase().includes('baking') || 
      tag.toLowerCase().includes('dessert') ||
      tag.toLowerCase().includes('cookie') ||
      tag.toLowerCase().includes('cake') ||
      tag.toLowerCase().includes('bread')
    )
  );

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <button 
              className="flex items-center text-warm-amber hover:text-warm-orange transition-colors mb-8"
              data-testid="back-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </Link>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold mb-4" data-testid="page-title">
              Baking & Desserts
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Indulge in our collection of gluten-free baking recipes and desserts. From fluffy breads 
              to decadent cakes and cookies, these recipes prove that gluten-free can be just as delicious.
            </p>
            <div className="mt-6 inline-block bg-dark-accent px-4 py-2 rounded-full">
              <span className="text-warm-amber font-semibold" data-testid="recipe-count">
                {bakingRecipes.length} recipes found
              </span>
            </div>
          </div>

          {/* Recipe Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-dark-secondary rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bakingRecipes.map((recipe) => (
                <Link 
                  key={recipe.id} 
                  href={`/recipe/${recipe.slug}`}
                  className="group"
                  data-testid={`recipe-card-${recipe.id}`}
                >
                  <div className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img 
                      src={recipe.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                      data-testid={`recipe-image-${recipe.id}`}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-warm-amber transition-colors" data-testid={`recipe-title-${recipe.id}`}>
                          {recipe.title}
                        </h3>
                        {recipe.rating && (
                          <div className="flex items-center text-warm-amber">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="text-sm" data-testid={`recipe-rating-${recipe.id}`}>{recipe.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-muted-gray mb-4 text-sm line-clamp-2" data-testid={`recipe-description-${recipe.id}`}>
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-gray mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span data-testid={`recipe-time-${recipe.id}`}>{recipe.totalTime || recipe.cookTime} min</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span data-testid={`recipe-servings-${recipe.id}`}>{recipe.servings} servings</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-block bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
                          {recipe.difficulty || "Easy"}
                        </span>
                        <span className="inline-block bg-pink-500/20 text-pink-400 text-xs px-2 py-1 rounded-full">
                          {recipe.category || "Dessert"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {bakingRecipes.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-gray text-lg" data-testid="no-recipes-message">
                No baking or dessert recipes found. Check back soon for more sweet treats!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
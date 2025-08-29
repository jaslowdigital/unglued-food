import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Clock, Users } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { type Recipe } from "@shared/schema";

export default function NaturallyGlutenFreePage() {
  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  // Filter for naturally gluten-free recipes
  const naturallyGlutenFreeRecipes = recipes.filter(recipe => recipe.isNaturallyGlutenFree);

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
              Naturally Gluten-Free Recipes
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Fresh produce, meats, and dairy-based recipes that are naturally free from gluten. 
              These recipes use ingredients that don't contain wheat, barley, or rye by nature.
            </p>
            <div className="mt-6 inline-block bg-dark-accent px-4 py-2 rounded-full">
              <span className="text-warm-amber font-semibold" data-testid="recipe-count">
                {naturallyGlutenFreeRecipes.length} recipes found
              </span>
            </div>
          </div>

          {/* Recipe Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-secondary rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {naturallyGlutenFreeRecipes.map((recipe) => (
                <Link 
                  key={recipe.id} 
                  href={`/recipe/${recipe.slug}`}
                  className="group"
                  data-testid={`recipe-card-${recipe.id}`}
                >
                  <div className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img 
                      src={recipe.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                      data-testid={`recipe-image-${recipe.id}`}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-warm-amber transition-colors" data-testid={`recipe-title-${recipe.id}`}>
                        {recipe.title}
                      </h3>
                      <p className="text-muted-gray mb-4 text-sm line-clamp-2" data-testid={`recipe-description-${recipe.id}`}>
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-gray">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span data-testid={`recipe-time-${recipe.id}`}>{recipe.totalTime || recipe.cookTime} min</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span data-testid={`recipe-servings-${recipe.id}`}>{recipe.servings} servings</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                          Naturally Gluten-Free
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {naturallyGlutenFreeRecipes.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-gray text-lg" data-testid="no-recipes-message">
                No naturally gluten-free recipes found. Check back soon for more delicious options!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
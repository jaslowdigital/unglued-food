import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Clock, Users, Star } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { type Recipe } from "@shared/schema";

export default function GrainAlternativesPage() {
  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  // Filter for grain alternative recipes
  const grainAlternativeRecipes = recipes.filter(recipe => 
    recipe.tags?.some(tag => 
      tag.toLowerCase().includes('quinoa') || 
      tag.toLowerCase().includes('rice') ||
      tag.toLowerCase().includes('grain') ||
      tag.toLowerCase().includes('cauliflower') ||
      tag.toLowerCase().includes('zucchini') ||
      tag.toLowerCase().includes('pasta')
    ) ||
    recipe.title.toLowerCase().includes('quinoa') ||
    recipe.title.toLowerCase().includes('rice') ||
    recipe.description.toLowerCase().includes('grain')
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
              Grain Alternatives
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Discover creative substitutions using quinoa, rice, and other gluten-free grains. 
              These recipes showcase innovative ways to replace traditional wheat-based ingredients 
              while maintaining flavor and nutrition.
            </p>
            <div className="mt-6 inline-block bg-dark-accent px-4 py-2 rounded-full">
              <span className="text-warm-amber font-semibold" data-testid="recipe-count">
                {grainAlternativeRecipes.length} recipes found
              </span>
            </div>
          </div>

          {/* Featured Tips Section */}
          <div className="bg-dark-accent rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-warm-amber">
              Grain Alternative Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-dark-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Quinoa</h3>
                <p className="text-muted-gray">Complete protein source with nutty flavor. Rinse before cooking to remove bitterness.</p>
              </div>
              <div className="bg-dark-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Rice Varieties</h3>
                <p className="text-muted-gray">Brown, wild, and jasmine rice each offer unique textures and nutritional benefits.</p>
              </div>
              <div className="bg-dark-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Veggie Substitutes</h3>
                <p className="text-muted-gray">Cauliflower rice, zucchini noodles, and spaghetti squash make great grain replacements.</p>
              </div>
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
              {grainAlternativeRecipes.map((recipe) => (
                <Link 
                  key={recipe.id} 
                  href={`/recipe/${recipe.slug}`}
                  className="group"
                  data-testid={`recipe-card-${recipe.id}`}
                >
                  <div className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img 
                      src={recipe.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
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
                        <span className="inline-block bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">
                          {recipe.difficulty || "Easy"}
                        </span>
                        <span className="inline-block bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                          Grain Alternative
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {grainAlternativeRecipes.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-gray text-lg" data-testid="no-recipes-message">
                No grain alternative recipes found. Check back soon for more creative substitutions!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
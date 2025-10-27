import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RecipeCard from "@/components/recipe-card";
import RecipesPagination from "@/components/recipes-pagination";
import { type Recipe } from "@shared/schema";

const RECIPES_PER_PAGE = 48;

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  pageSize: number;
}

export default function FeaturedRecipes() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [location]);

  const offset = (currentPage - 1) * RECIPES_PER_PAGE;
  
  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    params.set('limit', RECIPES_PER_PAGE.toString());
    params.set('offset', offset.toString());
    if (selectedCategory !== "all") {
      params.set('category', selectedCategory);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    return `/api/recipes?${params.toString()}`;
  };
  
  const { data, isLoading } = useQuery<RecipesResponse>({
    queryKey: [buildQueryUrl()],
  });

  const recipes = data?.recipes || [];
  const totalRecipes = data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  const filteredRecipes = recipes.filter(recipe => {
    if (selectedDifficulty !== "all" && recipe.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="recipes" className="py-16 bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-4" data-testid="featured-recipes-title">
              Featured Recipes
            </h2>
            <p className="text-muted-gray" data-testid="featured-recipes-description">
              Hand-picked favorites from our community
            </p>
          </div>
          <Link href="/recipes">
            <Button 
              className="bg-warm-amber text-dark-primary px-6 py-2 rounded-lg hover:bg-warm-orange transition-colors"
              data-testid="button-view-all-recipes"
            >
              View All Recipes
            </Button>
          </Link>
        </div>

        {/* Recipe Search & Filter */}
        <div className="mb-8 bg-dark-secondary p-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-accent text-light-text border-dark-accent focus:border-warm-amber"
                data-testid="input-search-recipes"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger 
                className="bg-dark-accent text-light-text border-dark-accent focus:border-warm-amber"
                data-testid="select-category"
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Desserts">Desserts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger 
                className="bg-dark-accent text-light-text border-dark-accent focus:border-warm-amber"
                data-testid="select-difficulty"
              >
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipe Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="bg-dark-secondary rounded-xl overflow-hidden h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6" id="home-recipe-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            <RecipesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!isLoading && filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-gray text-lg" data-testid="no-recipes-found">
              No recipes found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

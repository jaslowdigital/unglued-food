import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, Filter } from "lucide-react";
import RecipeCard from "@/components/recipe-card";
import RecipesPagination from "@/components/recipes-pagination";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@shared/schema";

const RECIPES_PER_PAGE = 48;

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  pageSize: number;
}

export default function RecipesPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCookTime, setSelectedCookTime] = useState("all");

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

  const { data: allRecipesData, isLoading } = useQuery<RecipesResponse>({
    queryKey: ["/api/recipes", {
      limit: RECIPES_PER_PAGE,
      offset,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchTerm || undefined,
    }],
  });

  const allRecipes = allRecipesData?.recipes || [];
  
  const { data: categoriesData } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });
  
  const recipes = categoriesData || [];

  // Get unique categories, difficulties, and cook time ranges
  const categories = useMemo(() => {
    const cats = [...new Set(recipes.map(r => r.category))];
    return ["all", ...cats.sort()];
  }, [recipes]);

  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;
      
      const matchesCookTime = selectedCookTime === "all" || 
        (selectedCookTime === "quick" && recipe.cookTime <= 30) ||
        (selectedCookTime === "medium" && recipe.cookTime > 30 && recipe.cookTime <= 60) ||
        (selectedCookTime === "long" && recipe.cookTime > 60);
      
      return matchesDifficulty && matchesCookTime;
    });
  }, [allRecipes, selectedDifficulty, selectedCookTime]);
  
  const totalRecipes = allRecipesData?.total || 0;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedCookTime("all");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedDifficulty !== "all",
    selectedCookTime !== "all",
    searchTerm !== ""
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold mb-4" data-testid="recipes-page-title">
            All Gluten-Free Recipes
          </h1>
          <p className="text-muted-gray max-w-2xl mx-auto" data-testid="recipes-page-subtitle">
            Explore our complete collection of {recipes.length}+ delicious gluten-free recipes
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="bg-dark-accent border-warm-amber/20 mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-gray" />
                <Input
                  type="text"
                  placeholder="Search recipes by name, ingredients, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-secondary border-muted-gray/20 text-light-text placeholder:text-muted-gray"
                  data-testid="search-recipes"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-dark-secondary border-muted-gray/20 text-light-text" data-testid="filter-category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-muted-gray/20">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-dark-secondary border-muted-gray/20 text-light-text" data-testid="filter-difficulty">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-muted-gray/20">
                    {difficulties.map(diff => (
                      <SelectItem key={diff} value={diff}>
                        {diff === "all" ? "All Difficulties" : diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCookTime} onValueChange={setSelectedCookTime}>
                  <SelectTrigger className="bg-dark-secondary border-muted-gray/20 text-light-text" data-testid="filter-cooktime">
                    <SelectValue placeholder="Cook Time" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-muted-gray/20">
                    <SelectItem value="all">All Cook Times</SelectItem>
                    <SelectItem value="quick">Quick (&le;30 mins)</SelectItem>
                    <SelectItem value="medium">Medium (30-60 mins)</SelectItem>
                    <SelectItem value="long">Long (&gt;60 mins)</SelectItem>
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-warm-amber text-warm-amber hover:bg-warm-amber/10"
                    data-testid="clear-filters"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters ({activeFiltersCount})
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-gray" data-testid="results-count">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </p>
          {filteredRecipes.length > 0 && (
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-warm-amber/10 text-warm-amber border-warm-amber/20">
                {filteredRecipes.filter(r => r.isNaturallyGlutenFree).length} Naturally GF
              </Badge>
              <Badge variant="secondary" className="bg-warm-amber/10 text-warm-amber border-warm-amber/20">
                {filteredRecipes.filter(r => r.category === "Desserts").length} Desserts
              </Badge>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="bg-dark-accent rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && filteredRecipes.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6" id="recipes-grid">
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

        {/* No Results */}
        {!isLoading && filteredRecipes.length === 0 && (
          <Card className="bg-dark-accent border-muted-gray/20 p-12 text-center">
            <CardContent>
              <p className="text-xl text-muted-gray mb-4">No recipes found</p>
              <p className="text-muted-gray mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button
                onClick={clearFilters}
                className="bg-warm-amber text-dark-primary hover:bg-warm-amber/90"
                data-testid="clear-all-button"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RecipeCard from "@/components/recipe-card";
import { type Recipe } from "@shared/schema";

export default function FeaturedRecipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes", searchQuery, selectedCategory !== "all" ? selectedCategory : undefined],
    enabled: true,
  });

  const filteredRecipes = recipes.filter(recipe => {
    if (selectedDifficulty !== "all" && recipe.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-dark-secondary rounded-xl overflow-hidden h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
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

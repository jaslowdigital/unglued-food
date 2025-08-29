import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Recipe } from "@shared/schema";

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["/api/recipes"],
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/recipes/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Recipe Deleted",
        description: "The recipe has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete recipe",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteRecipeMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">Loading recipes...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recipe Management</h1>
          <Link href="/add-recipe">
            <Button data-testid="button-add-new-recipe">
              <Plus className="h-4 w-4 mr-2" />
              Add New Recipe
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {recipes.map((recipe: Recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Recipe Image */}
                  <div className="w-48 h-32 flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop";
                      }}
                    />
                  </div>

                  {/* Recipe Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2" data-testid={`recipe-title-${recipe.slug}`}>
                          {recipe.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {recipe.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{recipe.category}</Badge>
                          <Badge variant="outline">{recipe.difficulty}</Badge>
                          <Badge variant="outline">{recipe.totalTime} min</Badge>
                          <Badge variant="outline">{recipe.servings} servings</Badge>
                          <Badge variant="outline">⭐ {recipe.rating}</Badge>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Created: {new Date(recipe.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <Link href={`/recipe/${recipe.slug}`}>
                          <Button variant="outline" size="icon" data-testid={`button-view-${recipe.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <Link href={`/edit-recipe/${recipe.id}`}>
                          <Button variant="outline" size="icon" data-testid={`button-edit-${recipe.slug}`}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              data-testid={`button-delete-${recipe.slug}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(recipe.id)}
                                className="bg-red-600 hover:bg-red-700"
                                data-testid={`confirm-delete-${recipe.slug}`}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {recipes.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No Recipes Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Start by adding your first gluten-free recipe!
                </p>
                <Link href="/add-recipe">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recipe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
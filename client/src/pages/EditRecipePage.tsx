import { useState, useEffect } from "react";
import { useForm, useFieldArray, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { z } from "zod";
import { insertRecipeSchema, type Recipe } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ImageUploader } from "@/components/ImageUploader";

// Using string types for form inputs that will be transformed
const editRecipeFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  category: z.string(),
  difficulty: z.string(),
  prepTime: z.string().min(1, "Prep time is required"),
  cookTime: z.string().min(1, "Cook time is required"),
  totalTime: z.string().min(1, "Total time is required"),
  servings: z.string().min(1, "Servings is required"),
  rating: z.string().min(1, "Rating is required"),
  calories: z.string().optional(),
  protein: z.string().optional(),
  carbs: z.string().optional(),
  fat: z.string().optional(),
  fiber: z.string().optional(),
  image: z.string().optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  tips: z.string().optional(),
  variations: z.array(z.string()).optional(),
  tags: z.array(z.string()),
  isNaturallyGlutenFree: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

type EditRecipeForm = z.infer<typeof editRecipeFormSchema>;

export default function EditRecipePage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const recipeId = params.id;

  const { data: recipe, isLoading } = useQuery<Recipe>({
    queryKey: ["/api/recipes", recipeId],
    enabled: !!recipeId,
  });

  const form = useForm<EditRecipeForm>({
    resolver: zodResolver(editRecipeFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      category: "Breakfast",
      difficulty: "Easy",
      prepTime: "15",
      cookTime: "30",
      totalTime: "45",
      servings: "4",
      rating: "4.5",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
      image: "",
      ingredients: [""],
      instructions: [""],
      tips: "",
      variations: [] as string[],
      tags: [""],
      isNaturallyGlutenFree: true,
      seoTitle: "",
      seoDescription: "",
    },
  });

  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray<EditRecipeForm>({
    control: form.control as Control<EditRecipeForm>,
    name: "ingredients",
  });

  const { fields: instructionFields, append: addInstruction, remove: removeInstruction } = useFieldArray<EditRecipeForm>({
    control: form.control as Control<EditRecipeForm>,
    name: "instructions",
  });

  const { fields: tagFields, append: addTag, remove: removeTag } = useFieldArray<EditRecipeForm>({
    control: form.control as Control<EditRecipeForm>,
    name: "tags",
  });

  const { fields: variationFields, append: addVariation, remove: removeVariation } = useFieldArray<EditRecipeForm>({
    control: form.control as Control<EditRecipeForm>,
    name: "variations",
  });

  // Reset form when recipe data loads
  useEffect(() => {
    if (recipe) {
      form.reset({
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        longDescription: recipe.longDescription,
        category: recipe.category,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime.toString(),
        cookTime: recipe.cookTime.toString(),
        totalTime: recipe.totalTime.toString(),
        servings: recipe.servings.toString(),
        rating: recipe.rating.toString(),
        calories: recipe.calories?.toString() || "",
        protein: recipe.protein?.toString() || "",
        carbs: recipe.carbs?.toString() || "",
        fat: recipe.fat?.toString() || "",
        fiber: recipe.fiber?.toString() || "",
        image: recipe.image,
        ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [""],
        instructions: recipe.instructions.length > 0 ? recipe.instructions : [""],
        tips: recipe.tips || "",
        variations: (recipe.variations || []) as string[],
        tags: recipe.tags.length > 0 ? recipe.tags : [""],
        isNaturallyGlutenFree: recipe.isNaturallyGlutenFree,
        seoTitle: recipe.seoTitle,
        seoDescription: recipe.seoDescription,
      });
    }
  }, [recipe, form]);

  const updateRecipeMutation = useMutation({
    mutationFn: async (data: EditRecipeForm) => {
      // Transform form data to proper types
      const transformedData = {
        ...data,
        prepTime: parseInt(data.prepTime),
        cookTime: parseInt(data.cookTime),
        totalTime: parseInt(data.totalTime),
        servings: parseInt(data.servings),
        rating: parseFloat(data.rating),
        calories: data.calories ? parseInt(data.calories) : undefined,
        protein: data.protein ? parseFloat(data.protein) : undefined,
        carbs: data.carbs ? parseFloat(data.carbs) : undefined,
        fat: data.fat ? parseFloat(data.fat) : undefined,
        fiber: data.fiber ? parseFloat(data.fiber) : undefined,
      };

      // Generate SEO fields if not provided
      if (!transformedData.seoTitle) {
        transformedData.seoTitle = `${transformedData.title} - Gluten-Free Recipe | Unglued Food`;
      }
      if (!transformedData.seoDescription) {
        transformedData.seoDescription = `${transformedData.description} This ${transformedData.difficulty.toLowerCase()} gluten-free recipe serves ${transformedData.servings} and takes ${transformedData.totalTime} minutes to make.`;
      }

      return await apiRequest("PUT", `/api/recipes/${recipeId}`, transformedData);
    },
    onSuccess: () => {
      toast({
        title: "Recipe Updated",
        description: "Your recipe has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes", recipeId] });
      setLocation("/admin");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update recipe",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditRecipeForm) => {
    // Filter out empty values
    const cleanedData = {
      ...data,
      ingredients: data.ingredients.filter(Boolean),
      instructions: data.instructions.filter(Boolean),
      tags: data.tags.filter(Boolean),
      variations: data.variations?.filter(Boolean) || [],
    };
    
    updateRecipeMutation.mutate(cleanedData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">Loading recipe...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">Recipe not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Edit Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Recipe Title *</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Enter recipe title"
                    data-testid="input-title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    {...form.register("slug")}
                    placeholder="url-friendly-slug"
                    data-testid="input-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Brief description of the recipe"
                  rows={2}
                  data-testid="textarea-description"
                />
              </div>

              <div>
                <Label htmlFor="longDescription">Long Description *</Label>
                <Textarea
                  id="longDescription"
                  {...form.register("longDescription")}
                  placeholder="Detailed description of the recipe"
                  rows={4}
                  data-testid="textarea-long-description"
                />
              </div>

              <div>
                <Label htmlFor="image">Recipe Image</Label>
                <ImageUploader
                  onImageUploaded={(imageUrl) => {
                    form.setValue("image", imageUrl);
                  }}
                  currentImage={form.watch("image")}
                  buttonText="Upload Recipe Image"
                  className="mt-2"
                />
                {form.formState.errors.image && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.image.message}</p>
                )}
              </div>

              {/* Recipe Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => form.setValue("category", value)} value={form.watch("category")}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                      <SelectItem value="Appetizers">Appetizers</SelectItem>
                      <SelectItem value="Salads">Salads</SelectItem>
                      <SelectItem value="Sides">Sides</SelectItem>
                      <SelectItem value="Beverages">Beverages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select onValueChange={(value) => form.setValue("difficulty", value)} value={form.watch("difficulty")}>
                    <SelectTrigger data-testid="select-difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="servings">Servings *</Label>
                  <Input
                    id="servings"
                    type="number"
                    {...form.register("servings")}
                    placeholder="4"
                    data-testid="input-servings"
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating (1-5) *</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    {...form.register("rating")}
                    placeholder="4.5"
                    data-testid="input-rating"
                  />
                </div>
              </div>

              {/* Timing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="prepTime">Prep Time (minutes) *</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    {...form.register("prepTime")}
                    placeholder="15"
                    data-testid="input-prep-time"
                  />
                </div>

                <div>
                  <Label htmlFor="cookTime">Cook Time (minutes) *</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    {...form.register("cookTime")}
                    placeholder="30"
                    data-testid="input-cook-time"
                  />
                </div>

                <div>
                  <Label htmlFor="totalTime">Total Time (minutes) *</Label>
                  <Input
                    id="totalTime"
                    type="number"
                    {...form.register("totalTime")}
                    placeholder="45"
                    data-testid="input-total-time"
                  />
                </div>
              </div>

              {/* Nutrition */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    {...form.register("calories")}
                    placeholder="300"
                    data-testid="input-calories"
                  />
                </div>

                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    step="0.1"
                    {...form.register("protein")}
                    placeholder="15.5"
                    data-testid="input-protein"
                  />
                </div>

                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    step="0.1"
                    {...form.register("carbs")}
                    placeholder="45.0"
                    data-testid="input-carbs"
                  />
                </div>

                <div>
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    step="0.1"
                    {...form.register("fat")}
                    placeholder="12.0"
                    data-testid="input-fat"
                  />
                </div>

                <div>
                  <Label htmlFor="fiber">Fiber (g)</Label>
                  <Input
                    id="fiber"
                    type="number"
                    step="0.1"
                    {...form.register("fiber")}
                    placeholder="3.5"
                    data-testid="input-fiber"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <Label className="text-lg font-semibold">Ingredients *</Label>
                <div className="space-y-2 mt-2">
                  {ingredientFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...form.register(`ingredients.${index}`)}
                        placeholder={`Ingredient ${index + 1}`}
                        data-testid={`input-ingredient-${index}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={ingredientFields.length === 1}
                        data-testid={`button-remove-ingredient-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addIngredient("")}
                    className="w-full"
                    data-testid="button-add-ingredient"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <Label className="text-lg font-semibold">Instructions *</Label>
                <div className="space-y-2 mt-2">
                  {instructionFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full flex items-center justify-center font-semibold mt-2">
                        {index + 1}
                      </div>
                      <Textarea
                        {...form.register(`instructions.${index}`)}
                        placeholder={`Step ${index + 1} instructions`}
                        rows={2}
                        data-testid={`textarea-instruction-${index}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                        disabled={instructionFields.length === 1}
                        className="mt-2"
                        data-testid={`button-remove-instruction-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addInstruction("")}
                    className="w-full"
                    data-testid="button-add-instruction"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instruction
                  </Button>
                </div>
              </div>

              {/* Chef's Tips */}
              <div>
                <Label htmlFor="tips">Chef's Tips</Label>
                <Textarea
                  id="tips"
                  {...form.register("tips")}
                  placeholder="Any helpful tips for making this recipe"
                  rows={3}
                  data-testid="textarea-tips"
                />
              </div>

              {/* Tags */}
              <div>
                <Label className="text-lg font-semibold">Tags</Label>
                <div className="space-y-2 mt-2">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...form.register(`tags.${index}`)}
                        placeholder={`Tag ${index + 1}`}
                        data-testid={`input-tag-${index}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                        data-testid={`button-remove-tag-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag("")}
                    className="w-full"
                    data-testid="button-add-tag"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Variations */}
              <div>
                <Label className="text-lg font-semibold">Recipe Variations (Optional)</Label>
                <div className="space-y-2 mt-2">
                  {variationFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...form.register(`variations.${index}`)}
                        placeholder={`Variation ${index + 1}`}
                        data-testid={`input-variation-${index}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeVariation(index)}
                        data-testid={`button-remove-variation-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addVariation("")}
                    className="w-full"
                    data-testid="button-add-variation"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variation
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={updateRecipeMutation.isPending}
                  className="flex-1"
                  data-testid="button-submit"
                >
                  {updateRecipeMutation.isPending ? "Updating..." : "Update Recipe"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/admin")}
                  className="flex-1"
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
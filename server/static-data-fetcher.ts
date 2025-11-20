import { DatabaseStorage } from './storage.js';
import type { Recipe } from '@shared/schema';

const storage = new DatabaseStorage();

export async function getAllRecipeSlugsPaths() {
  const recipes = await storage.getRecipes();
  return recipes.map(recipe => ({
    slug: recipe.slug,
    recipe
  }));
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
  return storage.getRecipeBySlug(slug);
}

export async function getAllCategories() {
  return storage.getCategories();
}

export async function getAllRecipes() {
  return storage.getRecipes();
}

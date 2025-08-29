import { 
  type Recipe, 
  type InsertRecipe, 
  type Product, 
  type InsertProduct, 
  type Newsletter, 
  type InsertNewsletter,
  type AdminUser,
  type InsertAdminUser,
  type Session,
  type InsertSession,
  type RecipeRating,
  type InsertRecipeRating,
  type RecipeComment,
  type InsertRecipeComment,
  recipes,
  products,
  newsletters,
  adminUsers,
  sessions,
  recipeRatings,
  recipeComments
} from "@shared/schema";
import { randomUUID } from "crypto";
import correct100RecipesWithAIImages from "./correct-100-recipes-with-ai-images";
import { db } from "./db";
import { eq, desc, avg, count, and } from "drizzle-orm";

export interface IStorage {
  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  getRecipe(id: string): Promise<Recipe | undefined>;
  getRecipeBySlug(slug: string): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  updateRecipe(id: string, recipe: Partial<InsertRecipe>): Promise<Recipe | undefined>;
  deleteRecipe(id: string): Promise<boolean>;
  searchRecipes(query: string): Promise<Recipe[]>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;
  
  // Admin Authentication
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  deleteSession(id: string): Promise<boolean>;

  // Recipe Ratings & Comments
  getRatingsForRecipe(recipeId: string): Promise<RecipeRating[]>;
  getCommentsForRecipe(recipeId: string): Promise<RecipeComment[]>;
  createRating(rating: InsertRecipeRating): Promise<RecipeRating>;
  createComment(comment: InsertRecipeComment): Promise<RecipeComment>;
  getAverageRating(recipeId: string): Promise<number>;
  getUserRatingForRecipe(recipeId: string, userEmail: string): Promise<RecipeRating | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getRecipes(): Promise<Recipe[]> {
    return await db.select().from(recipes);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return await db.select().from(recipes).where(eq(recipes.category, category));
  }

  async getRecipe(id: string): Promise<Recipe | undefined> {
    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id));
    return recipe || undefined;
  }

  async getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
    const [recipe] = await db.select().from(recipes).where(eq(recipes.slug, slug));
    return recipe || undefined;
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const [recipe] = await db
      .insert(recipes)
      .values(insertRecipe)
      .returning();
    return recipe;
  }

  async updateRecipe(id: string, updateData: Partial<InsertRecipe>): Promise<Recipe | undefined> {
    const [recipe] = await db
      .update(recipes)
      .set(updateData)
      .where(eq(recipes.id, id))
      .returning();
    return recipe || undefined;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const result = await db.delete(recipes).where(eq(recipes.id, id));
    return result.rowCount > 0;
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    // Simple text search implementation
    const allRecipes = await db.select().from(recipes);
    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  // Newsletter
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return newsletter || undefined;
  }

  // Admin Authentication
  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db
      .insert(adminUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(sessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session || undefined;
  }

  async deleteSession(id: string): Promise<boolean> {
    const result = await db.delete(sessions).where(eq(sessions.id, id));
    return result.rowCount > 0;
  }

  // Recipe Ratings & Comments
  async getRatingsForRecipe(recipeId: string): Promise<RecipeRating[]> {
    return await db
      .select()
      .from(recipeRatings)
      .where(eq(recipeRatings.recipeId, recipeId))
      .orderBy(desc(recipeRatings.createdAt));
  }

  async getCommentsForRecipe(recipeId: string): Promise<RecipeComment[]> {
    return await db
      .select()
      .from(recipeComments)
      .where(eq(recipeComments.recipeId, recipeId))
      .orderBy(desc(recipeComments.createdAt));
  }

  async createRating(insertRating: InsertRecipeRating): Promise<RecipeRating> {
    // Check if user already rated this recipe
    const existingRating = await this.getUserRatingForRecipe(insertRating.recipeId, insertRating.userEmail);
    
    if (existingRating) {
      // Update existing rating
      const [rating] = await db
        .update(recipeRatings)
        .set({ rating: insertRating.rating })
        .where(eq(recipeRatings.id, existingRating.id))
        .returning();
      return rating;
    } else {
      // Create new rating
      const [rating] = await db
        .insert(recipeRatings)
        .values(insertRating)
        .returning();
      return rating;
    }
  }

  async createComment(insertComment: InsertRecipeComment): Promise<RecipeComment> {
    const [comment] = await db
      .insert(recipeComments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async getAverageRating(recipeId: string): Promise<number> {
    const result = await db
      .select({ avgRating: avg(recipeRatings.rating) })
      .from(recipeRatings)
      .where(eq(recipeRatings.recipeId, recipeId));
    
    return Math.round((Number(result[0]?.avgRating) || 0) * 10) / 10;
  }

  async getUserRatingForRecipe(recipeId: string, userEmail: string): Promise<RecipeRating | undefined> {
    const [rating] = await db
      .select()
      .from(recipeRatings)
      .where(and(
        eq(recipeRatings.recipeId, recipeId),
        eq(recipeRatings.userEmail, userEmail)
      ));
    return rating || undefined;
  }
}

export class MemStorage implements IStorage {
  private recipes: Map<string, Recipe>;
  private products: Map<string, Product>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.recipes = new Map();
    this.products = new Map();
    this.newsletters = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed recipes
    const sampleRecipes: InsertRecipe[] = correct100RecipesWithAIImages;

    sampleRecipes.forEach(recipe => {
      const id = randomUUID();
      const fullRecipe: Recipe = { 
        ...recipe, 
        id, 
        createdAt: new Date() 
      };
      this.recipes.set(id, fullRecipe);
    });

    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Almond Flour",
        brand: "Organic Valley",
        description: "Organic, finely ground almond flour perfect for baking",
        price: "12.99",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Flours & Baking",
        affiliateLink: "https://example.com/affiliate/almond-flour",
        badge: "Best Seller",
      },
      {
        name: "Rice & Quinoa Pasta",
        brand: "Ancient Harvest",
        description: "Perfect texture, variety pack of gluten-free pasta",
        price: "8.49",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Pasta & Grains",
        affiliateLink: "https://example.com/affiliate/pasta",
        badge: "Editor's Pick",
      },
      {
        name: "Artisan GF Bread",
        brand: "Canyon Bakehouse",
        description: "Soft, fluffy, freezer-friendly gluten-free bread",
        price: "6.99",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Pantry Staples",
        affiliateLink: "https://example.com/affiliate/bread",
        badge: "Fresh",
      },
      {
        name: "Seed Crackers Mix",
        brand: "Mary's Gone Crackers",
        description: "Crunchy, protein-packed gluten-free crackers",
        price: "4.99",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Snacks",
        affiliateLink: "https://example.com/affiliate/crackers",
        badge: "New",
      },
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = { 
        ...product, 
        id, 
        createdAt: new Date() 
      };
      this.products.set(id, fullProduct);
    });
  }

  // Recipe methods
  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe => recipe.category === category);
  }

  async getRecipe(id: string): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = randomUUID();
    const recipe: Recipe = { 
      ...insertRecipe, 
      id, 
      createdAt: new Date() 
    };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
    return Array.from(this.recipes.values()).find(recipe => recipe.slug === slug);
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      subscribedAt: new Date() 
    };
    this.newsletters.set(insertNewsletter.email, newsletter);
    return newsletter;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    return this.newsletters.get(email);
  }

  // Add missing methods for MemStorage
  async updateRecipe(id: string, updateData: Partial<InsertRecipe>): Promise<Recipe | undefined> {
    const recipe = this.recipes.get(id);
    if (!recipe) return undefined;
    
    const updatedRecipe = { ...recipe, ...updateData };
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    return this.recipes.delete(id);
  }

  // Admin Authentication (stub for MemStorage)
  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    throw new Error("Admin functionality requires database storage");
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    throw new Error("Admin functionality requires database storage");
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    throw new Error("Admin functionality requires database storage");
  }

  async getSession(id: string): Promise<Session | undefined> {
    throw new Error("Admin functionality requires database storage");
  }

  async deleteSession(id: string): Promise<boolean> {
    throw new Error("Admin functionality requires database storage");
  }

  // Recipe Ratings & Comments (stub for MemStorage)
  async getRatingsForRecipe(recipeId: string): Promise<RecipeRating[]> {
    throw new Error("Rating functionality requires database storage");
  }

  async getCommentsForRecipe(recipeId: string): Promise<RecipeComment[]> {
    throw new Error("Comment functionality requires database storage");
  }

  async createRating(rating: InsertRecipeRating): Promise<RecipeRating> {
    throw new Error("Rating functionality requires database storage");
  }

  async createComment(comment: InsertRecipeComment): Promise<RecipeComment> {
    throw new Error("Comment functionality requires database storage");
  }

  async getAverageRating(recipeId: string): Promise<number> {
    throw new Error("Rating functionality requires database storage");
  }

  async getUserRatingForRecipe(recipeId: string, userEmail: string): Promise<RecipeRating | undefined> {
    throw new Error("Rating functionality requires database storage");
  }
}

export const storage = new DatabaseStorage();

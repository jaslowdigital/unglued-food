import { type Recipe, type InsertRecipe, type Product, type InsertProduct, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";
import glutenFreeRecipes100 from "./gluten-free-recipes-100";

export interface IStorage {
  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  getRecipe(id: string): Promise<Recipe | undefined>;
  getRecipeBySlug(slug: string): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  searchRecipes(query: string): Promise<Recipe[]>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;
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
    const sampleRecipes: InsertRecipe[] = glutenFreeRecipes100;

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
}

export const storage = new MemStorage();

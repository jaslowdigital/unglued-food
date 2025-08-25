import { type Recipe, type InsertRecipe, type Product, type InsertProduct, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  getRecipe(id: string): Promise<Recipe | undefined>;
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
    const sampleRecipes: InsertRecipe[] = [
      {
        title: "Mediterranean Quinoa Bowl",
        description: "Fresh vegetables, quinoa, and a zesty lemon dressing make this bowl perfect for lunch or dinner.",
        category: "Lunch",
        difficulty: "Easy",
        cookTime: 25,
        servings: 4,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 cup quinoa", "2 cups vegetable broth", "1 cucumber, diced", "1 cup cherry tomatoes", "1/2 red onion", "1/4 cup olive oil", "2 tbsp lemon juice", "Salt and pepper"],
        instructions: ["Cook quinoa in vegetable broth", "Let quinoa cool", "Mix vegetables", "Whisk dressing", "Combine all ingredients"],
        tags: ["Mediterranean", "Quinoa", "Healthy", "Vegetarian"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Perfect GF Chocolate Chip Cookies",
        description: "Made with almond flour, these cookies are chewy, delicious, and nobody will know they're gluten-free.",
        category: "Desserts",
        difficulty: "Medium",
        cookTime: 35,
        servings: 24,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 cups almond flour", "1/2 tsp baking soda", "1/2 tsp salt", "1/2 cup coconut oil", "1/2 cup brown sugar", "1 egg", "1 tsp vanilla", "1 cup chocolate chips"],
        instructions: ["Preheat oven to 350°F", "Mix dry ingredients", "Cream wet ingredients", "Combine wet and dry", "Add chocolate chips", "Bake 12-15 minutes"],
        tags: ["Cookies", "Almond Flour", "Chocolate", "Baking"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Creamy Mushroom GF Pasta",
        description: "Rich and creamy pasta made with rice noodles and fresh mushrooms in a dairy-free sauce.",
        category: "Dinner",
        difficulty: "Easy",
        cookTime: 20,
        servings: 4,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["12 oz GF pasta", "1 lb mixed mushrooms", "3 cloves garlic", "1 cup coconut milk", "1/4 cup nutritional yeast", "2 tbsp olive oil", "Salt and pepper", "Fresh herbs"],
        instructions: ["Cook pasta according to package", "Sauté mushrooms and garlic", "Add coconut milk", "Stir in nutritional yeast", "Combine with pasta", "Garnish with herbs"],
        tags: ["Pasta", "Mushrooms", "Dairy-Free", "Comfort Food"],
        isNaturallyGlutenFree: false,
      },
    ];

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

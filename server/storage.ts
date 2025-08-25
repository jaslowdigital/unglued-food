import { type Recipe, type InsertRecipe, type Product, type InsertProduct, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";
import { glutenFreeRecipes } from "./recipes-data";

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
    const sampleRecipes: InsertRecipe[] = glutenFreeRecipes;

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
        description: "Spicy cauliflower rice topped with black beans, avocado, and fresh salsa.",
        category: "Lunch",
        difficulty: "Easy",
        cookTime: 20,
        servings: 4,
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 large cauliflower head", "1 can black beans", "1 avocado, sliced", "1/2 cup corn", "1/4 cup red onion", "2 tbsp olive oil", "1 tsp cumin", "1 tsp chili powder", "1/4 cup cilantro", "Lime wedges"],
        instructions: ["Pulse cauliflower in food processor", "Heat oil in large pan", "Sauté cauliflower with spices 8 minutes", "Heat black beans", "Prepare fresh toppings", "Assemble bowls with cauliflower rice", "Top with beans, avocado, corn, and cilantro"],
        tags: ["Mexican", "Cauliflower", "Healthy", "Vegetarian", "Low-Carb"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "GF Lemon Bars",
        description: "Tangy lemon curd on a buttery shortbread crust, all made gluten-free.",
        category: "Desserts",
        difficulty: "Medium",
        cookTime: 45,
        servings: 12,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 1/2 cups GF flour blend", "1/2 cup powdered sugar", "1/2 cup butter", "4 large eggs", "1 1/3 cups granulated sugar", "1/4 cup GF flour", "1/2 cup lemon juice", "2 tbsp lemon zest", "Powdered sugar for dusting"],
        instructions: ["Preheat oven to 350°F", "Mix crust ingredients", "Press into 9x13 pan", "Bake crust 15 minutes", "Whisk filling ingredients", "Pour over hot crust", "Bake 20-25 minutes more", "Cool completely, dust with powdered sugar"],
        tags: ["Lemon", "Bars", "Citrus", "Sweet", "Classic"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Asian Lettuce Wraps",
        description: "Fresh and light lettuce wraps filled with seasoned ground turkey and vegetables.",
        category: "Lunch",
        difficulty: "Easy",
        cookTime: 15,
        servings: 4,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 lb ground turkey", "1 head butter lettuce", "1 can water chestnuts", "2 green onions", "2 cloves garlic", "1 tbsp ginger", "3 tbsp coconut aminos", "1 tbsp sesame oil", "1 tsp rice vinegar", "Red pepper flakes"],
        instructions: ["Heat oil in large skillet", "Cook turkey until browned", "Add garlic and ginger, cook 1 minute", "Stir in water chestnuts and sauce", "Cook 3-4 minutes", "Remove from heat", "Serve in lettuce cups", "Garnish with green onions"],
        tags: ["Asian", "Lettuce Wraps", "Low-Carb", "Fresh", "Quick"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Coconut Chia Pudding",
        description: "Creamy overnight chia pudding with coconut milk and fresh berries.",
        category: "Breakfast",
        difficulty: "Easy",
        cookTime: 5,
        servings: 4,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1/4 cup chia seeds", "1 can coconut milk", "2 tbsp maple syrup", "1 tsp vanilla", "1/4 tsp salt", "1 cup mixed berries", "1/4 cup toasted coconut", "2 tbsp almond butter"],
        instructions: ["Whisk chia seeds with coconut milk", "Add maple syrup, vanilla, and salt", "Refrigerate overnight", "Stir after 1 hour to prevent clumping", "Serve topped with berries", "Garnish with coconut and almond butter"],
        tags: ["Chia", "Pudding", "Coconut", "Healthy", "Make-Ahead"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Stuffed Bell Peppers",
        description: "Colorful bell peppers stuffed with seasoned ground beef, rice, and vegetables.",
        category: "Dinner",
        difficulty: "Medium",
        cookTime: 45,
        servings: 6,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1594756202441-09ceaf71eaa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["6 large bell peppers", "1 lb ground beef", "1 cup cooked rice", "1 onion, diced", "2 cloves garlic", "1 can diced tomatoes", "1 cup shredded cheese", "2 tsp Italian seasoning", "Salt and pepper", "2 tbsp olive oil"],
        instructions: ["Preheat oven to 375°F", "Cut tops off peppers, remove seeds", "Cook beef with onion and garlic", "Add tomatoes, rice, seasonings", "Stuff peppers with mixture", "Top with cheese", "Bake 35-40 minutes"],
        tags: ["Stuffed Peppers", "Ground Beef", "Rice", "Comfort Food", "Family"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "GF Apple Crisp",
        description: "Classic apple crisp with a crunchy oat topping, perfectly spiced and naturally gluten-free.",
        category: "Desserts",
        difficulty: "Easy",
        cookTime: 40,
        servings: 8,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1571167530149-ba448dd46bb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["6 large apples, sliced", "1 cup GF oats", "1/2 cup almond flour", "1/2 cup brown sugar", "1/4 cup butter", "1 tsp cinnamon", "1/2 tsp nutmeg", "1/4 tsp salt", "2 tbsp lemon juice"],
        instructions: ["Preheat oven to 375°F", "Toss apples with lemon juice and cinnamon", "Place apples in baking dish", "Mix oats, flour, sugar, and spices", "Cut in butter until crumbly", "Sprinkle over apples", "Bake 35-40 minutes until golden"],
        tags: ["Apple", "Crisp", "Oats", "Fall", "Comfort"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Greek Chicken Bowls",
        description: "Mediterranean-inspired bowls with marinated chicken, vegetables, and tzatziki sauce.",
        category: "Lunch",
        difficulty: "Medium",
        cookTime: 30,
        servings: 4,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 lbs chicken breast", "1 cucumber, diced", "2 cups cherry tomatoes", "1/2 red onion", "1/2 cup kalamata olives", "1/2 cup feta cheese", "1/4 cup olive oil", "2 tbsp lemon juice", "2 tsp oregano", "Greek yogurt", "Fresh dill"],
        instructions: ["Marinate chicken in oil, lemon, oregano", "Grill chicken 6-7 minutes per side", "Prepare vegetables", "Make tzatziki with yogurt, cucumber, dill", "Slice chicken", "Assemble bowls with chicken and vegetables", "Top with feta and tzatziki"],
        tags: ["Greek", "Mediterranean", "Chicken", "Fresh", "Protein"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Sweet Potato Gnocchi",
        description: "Pillowy soft gnocchi made from roasted sweet potatoes and served with sage butter.",
        category: "Dinner",
        difficulty: "Hard",
        cookTime: 90,
        servings: 6,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["3 large sweet potatoes", "2 cups GF flour blend", "1 egg", "1 tsp salt", "1/4 cup butter", "8 fresh sage leaves", "1/2 cup parmesan cheese", "Black pepper"],
        instructions: ["Roast sweet potatoes at 400°F for 1 hour", "Mash sweet potatoes until smooth", "Mix with flour, egg, and salt", "Knead into smooth dough", "Roll into ropes, cut into pieces", "Boil gnocchi until they float", "Sauté with butter and sage", "Serve with parmesan"],
        tags: ["Gnocchi", "Sweet Potato", "Homemade", "Italian", "Advanced"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Energy Balls",
        description: "No-bake energy balls packed with dates, nuts, and chocolate chips for a quick snack.",
        category: "Snacks",
        difficulty: "Easy",
        cookTime: 15,
        servings: 20,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 cup medjool dates", "1 cup almonds", "1/4 cup chia seeds", "2 tbsp cocoa powder", "1 tsp vanilla", "1/4 tsp salt", "1/4 cup mini chocolate chips", "Coconut flakes for rolling"],
        instructions: ["Pulse dates in food processor", "Add almonds and pulse until chopped", "Add chia seeds, cocoa, vanilla, salt", "Process until mixture holds together", "Fold in chocolate chips", "Roll into 1-inch balls", "Roll in coconut", "Chill 30 minutes"],
        tags: ["Energy Balls", "No-Bake", "Dates", "Healthy", "Snack"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Zucchini Fritters",
        description: "Crispy zucchini fritters with fresh herbs, perfect as a side dish or appetizer.",
        category: "Snacks",
        difficulty: "Easy",
        cookTime: 20,
        servings: 4,
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 large zucchini, grated", "1/2 cup GF flour blend", "1 egg", "1/4 cup fresh dill", "2 green onions", "1 tsp salt", "1/2 tsp pepper", "1/4 cup olive oil", "Greek yogurt for serving"],
        instructions: ["Grate zucchini and salt, let drain 30 minutes", "Squeeze out excess moisture", "Mix zucchini with flour, egg, herbs", "Heat oil in large skillet", "Form patties and fry 3-4 minutes per side", "Drain on paper towels", "Serve with yogurt"],
        tags: ["Zucchini", "Fritters", "Crispy", "Herbs", "Vegetarian"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Teriyaki Salmon Bowls",
        description: "Glazed salmon served over rice with steamed vegetables and homemade teriyaki sauce.",
        category: "Dinner",
        difficulty: "Easy",
        cookTime: 25,
        servings: 4,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["4 salmon fillets", "2 cups cooked rice", "1 cup broccoli", "1 cup snap peas", "1/4 cup coconut aminos", "2 tbsp honey", "2 tbsp rice vinegar", "1 tbsp ginger", "2 cloves garlic", "1 tbsp sesame seeds"],
        instructions: ["Steam vegetables until tender", "Mix sauce ingredients in small pan", "Simmer sauce until thickened", "Pan-sear salmon 4 minutes per side", "Brush salmon with teriyaki sauce", "Serve over rice with vegetables", "Garnish with sesame seeds"],
        tags: ["Teriyaki", "Salmon", "Asian", "Healthy", "Bowl"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Almond Flour Muffins",
        description: "Fluffy blueberry muffins made with almond flour and sweetened with maple syrup.",
        category: "Breakfast",
        difficulty: "Easy",
        cookTime: 25,
        servings: 12,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 cups almond flour", "3 eggs", "1/4 cup maple syrup", "1/4 cup coconut oil", "1 tsp vanilla", "1 tsp baking soda", "1/2 tsp salt", "1 cup fresh blueberries", "1 tbsp lemon zest"],
        instructions: ["Preheat oven to 350°F", "Whisk wet ingredients", "Mix dry ingredients separately", "Combine wet and dry ingredients", "Fold in blueberries and zest", "Fill muffin cups 2/3 full", "Bake 18-22 minutes"],
        tags: ["Muffins", "Almond Flour", "Blueberry", "Healthy", "Breakfast"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Cauliflower Mac and Cheese",
        description: "Creamy comfort food made with roasted cauliflower and a rich cheese sauce.",
        category: "Dinner",
        difficulty: "Medium",
        cookTime: 35,
        servings: 6,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 large cauliflower head", "2 cups shredded cheddar", "1 cup milk", "3 tbsp butter", "2 tbsp GF flour", "1 tsp mustard powder", "1/2 tsp paprika", "Salt and pepper", "1/4 cup breadcrumbs"],
        instructions: ["Cut cauliflower into bite-sized pieces", "Roast at 425°F for 20 minutes", "Make cheese sauce with butter, flour, milk", "Add cheese and seasonings", "Combine cauliflower with sauce", "Top with breadcrumbs", "Bake 15 minutes until golden"],
        tags: ["Cauliflower", "Mac and Cheese", "Comfort Food", "Creamy", "Vegetarian"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Acai Smoothie Bowl",
        description: "Antioxidant-rich acai bowl topped with fresh fruit, granola, and coconut flakes.",
        category: "Breakfast",
        difficulty: "Easy",
        cookTime: 10,
        servings: 2,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 acai packets", "1 frozen banana", "1/2 cup blueberries", "1/4 cup coconut milk", "1 tbsp honey", "1/4 cup GF granola", "1 kiwi, sliced", "2 tbsp coconut flakes", "1 tbsp chia seeds"],
        instructions: ["Blend acai, banana, and coconut milk", "Add honey to taste", "Pour into bowls", "Arrange fresh fruit on top", "Sprinkle with granola and coconut", "Add chia seeds", "Serve immediately"],
        tags: ["Acai", "Smoothie Bowl", "Antioxidants", "Fresh Fruit", "Healthy"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Herb-Crusted Lamb Chops",
        description: "Tender lamb chops with a flavorful herb crust, served with roasted vegetables.",
        category: "Dinner",
        difficulty: "Medium",
        cookTime: 25,
        servings: 4,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1594756202441-09ceaf71eaa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["8 lamb chops", "2 tbsp fresh rosemary", "2 tbsp fresh thyme", "3 cloves garlic", "1/4 cup olive oil", "2 tbsp Dijon mustard", "1 lb baby potatoes", "1 bunch asparagus", "Salt and pepper"],
        instructions: ["Season lamb chops with salt and pepper", "Mix herbs, garlic, oil, and mustard", "Coat lamb with herb mixture", "Roast potatoes at 400°F for 20 minutes", "Add asparagus to pan", "Sear lamb 3-4 minutes per side", "Rest 5 minutes before serving"],
        tags: ["Lamb", "Herbs", "Elegant", "Roasted Vegetables", "Special Occasion"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Pumpkin Spice Latte Overnight Oats",
        description: "Fall-flavored overnight oats with pumpkin, spices, and a hint of coffee.",
        category: "Breakfast",
        difficulty: "Easy",
        cookTime: 10,
        servings: 4,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 cups GF oats", "1/2 cup pumpkin puree", "2 cups milk", "1/4 cup maple syrup", "2 tbsp chia seeds", "1 tsp pumpkin pie spice", "1/2 tsp vanilla", "2 tbsp instant coffee", "Whipped cream"],
        instructions: ["Mix all ingredients except whipped cream", "Divide among 4 jars", "Refrigerate overnight", "Stir before serving", "Top with whipped cream", "Sprinkle with extra pumpkin spice"],
        tags: ["Overnight Oats", "Pumpkin", "Fall", "Coffee", "Make-Ahead"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Shrimp and Avocado Salad",
        description: "Light and refreshing salad with grilled shrimp, avocado, and citrus dressing.",
        category: "Lunch",
        difficulty: "Easy",
        cookTime: 15,
        servings: 4,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 lb large shrimp", "2 avocados, sliced", "4 cups mixed greens", "1 cup cherry tomatoes", "1/4 red onion", "1/4 cup olive oil", "2 tbsp lime juice", "1 tbsp honey", "1 tsp cumin", "Salt and pepper"],
        instructions: ["Season and grill shrimp 2-3 minutes per side", "Prepare salad vegetables", "Whisk dressing ingredients", "Arrange greens, avocado, tomatoes", "Top with warm shrimp", "Drizzle with dressing", "Serve immediately"],
        tags: ["Shrimp", "Avocado", "Salad", "Light", "Citrus"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Chocolate Zucchini Cake",
        description: "Moist and decadent chocolate cake with hidden zucchini for extra nutrition.",
        category: "Desserts",
        difficulty: "Medium",
        cookTime: 45,
        servings: 12,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 cups grated zucchini", "1 3/4 cups GF flour blend", "3/4 cup cocoa powder", "2 cups sugar", "3 eggs", "1 cup vegetable oil", "2 tsp vanilla", "1 1/2 tsp baking soda", "1 tsp salt", "1 cup chocolate chips"],
        instructions: ["Preheat oven to 350°F", "Grate zucchini and squeeze out moisture", "Mix dry ingredients", "Beat eggs, oil, and vanilla", "Combine wet and dry ingredients", "Fold in zucchini and chocolate chips", "Bake in bundt pan 40-45 minutes"],
        tags: ["Chocolate", "Zucchini", "Cake", "Hidden Vegetables", "Moist"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Mexican Street Corn Salad",
        description: "All the flavors of elote in a fresh, easy-to-eat salad with lime and cotija cheese.",
        category: "Snacks",
        difficulty: "Easy",
        cookTime: 15,
        servings: 6,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["4 cups corn kernels", "1/4 cup mayonnaise", "1/4 cup Mexican crema", "1/2 cup cotija cheese", "1/4 cup cilantro", "2 tbsp lime juice", "1 tsp chili powder", "1/4 tsp cayenne", "Salt to taste"],
        instructions: ["Char corn in dry skillet until golden", "Mix mayo, crema, and lime juice", "Add warm corn to dressing", "Stir in most of the cheese and cilantro", "Season with chili powder and cayenne", "Garnish with remaining cheese and cilantro"],
        tags: ["Mexican", "Corn", "Street Food", "Salad", "Spicy"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Turkey Meatballs with Marinara",
        description: "Tender turkey meatballs in a rich tomato sauce, perfect over zucchini noodles or rice.",
        category: "Dinner",
        difficulty: "Medium",
        cookTime: 30,
        servings: 6,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["2 lbs ground turkey", "1/2 cup GF breadcrumbs", "1 egg", "1/4 cup grated parmesan", "2 cloves garlic", "1 jar marinara sauce", "2 tbsp olive oil", "1/4 cup fresh basil", "Salt and pepper", "Zucchini noodles"],
        instructions: ["Mix turkey, breadcrumbs, egg, cheese, garlic", "Form into 1.5-inch meatballs", "Heat oil in large skillet", "Brown meatballs on all sides", "Add marinara sauce", "Simmer 15-20 minutes", "Serve over zucchini noodles", "Garnish with basil"],
        tags: ["Turkey", "Meatballs", "Marinara", "Italian", "Healthy"],
        isNaturallyGlutenFree: false,
      },
      {
        title: "Coconut Rice Pudding",
        description: "Creamy, comforting rice pudding made with coconut milk and topped with toasted coconut.",
        category: "Desserts",
        difficulty: "Easy",
        cookTime: 25,
        servings: 6,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 cup jasmine rice", "1 can coconut milk", "2 cups whole milk", "1/3 cup sugar", "1/2 tsp vanilla", "1/4 tsp salt", "1/2 tsp cinnamon", "1/4 cup toasted coconut", "Fresh mango"],
        instructions: ["Cook rice according to package directions", "Heat coconut milk and regular milk", "Add cooked rice to milk mixture", "Stir in sugar, vanilla, salt", "Simmer 15-20 minutes until thick", "Add cinnamon", "Serve warm or chilled", "Top with coconut and mango"],
        tags: ["Rice Pudding", "Coconut", "Comfort", "Creamy", "Tropical"],
        isNaturallyGlutenFree: true,
      },
      {
        title: "Buffalo Cauliflower Bites",
        description: "Crispy roasted cauliflower tossed in spicy buffalo sauce, perfect for game day.",
        category: "Snacks",
        difficulty: "Easy",
        cookTime: 30,
        servings: 4,
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ingredients: ["1 large cauliflower head", "3/4 cup GF flour", "3/4 cup water", "1 tsp garlic powder", "1/2 cup buffalo sauce", "2 tbsp butter", "Ranch or blue cheese dressing", "Celery sticks"],
        instructions: ["Preheat oven to 450°F", "Cut cauliflower into florets", "Make batter with flour, water, garlic powder", "Dip cauliflower in batter", "Bake 15 minutes", "Mix buffalo sauce with butter", "Toss cauliflower in sauce", "Bake 20 more minutes"],
        tags: ["Buffalo", "Cauliflower", "Spicy", "Game Day", "Crispy"],
        isNaturallyGlutenFree: false,
      }
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

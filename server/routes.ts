import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertNewsletterSchema,
  insertRecipeSchema,
  insertRecipeRatingSchema,
  insertRecipeCommentSchema,
  insertRecipeFlagSchema,
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { containsLinksOrCode } from "./utils/reviewValidation";

export async function registerRoutes(app: Express): Promise<Server> {
  // Recipe routes
  app.get("/api/recipes", async (req, res) => {
    try {
      const { category, search, limit, offset } = req.query;
      
      if (limit !== undefined && offset !== undefined) {
        const limitNum = parseInt(limit as string, 10);
        const offsetNum = parseInt(offset as string, 10);
        const { recipes, total } = await storage.getRecipesPaginated(
          limitNum,
          offsetNum,
          category as string | undefined,
          search as string | undefined
        );
        const page = Math.floor(offsetNum / limitNum) + 1;
        const pageSize = limitNum;
        return res.json({ recipes, total, page, pageSize });
      }
      
      let recipes;
      if (search) {
        recipes = await storage.searchRecipes(search as string);
      } else if (category) {
        recipes = await storage.getRecipesByCategory(category as string);
      } else {
        recipes = await storage.getRecipes();
      }
      
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const recipe = await storage.getRecipe(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  });

  app.post("/api/recipes", async (req, res) => {
    try {
      const validatedData = insertRecipeSchema.parse(req.body);
      const recipe = await storage.createRecipe(validatedData);
      res.status(201).json(recipe);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid recipe data", details: error.errors });
      }
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Failed to create recipe" });
    }
  });

  app.put("/api/recipes/:id", async (req, res) => {
    try {
      const validatedData = insertRecipeSchema.partial().parse(req.body);
      const recipe = await storage.updateRecipe(req.params.id, validatedData);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid recipe data", details: error.errors });
      }
      console.error("Error updating recipe:", error);
      res.status(500).json({ error: "Failed to update recipe" });
    }
  });

  app.delete("/api/recipes/:id", async (req, res) => {
    try {
      const success = await storage.deleteRecipe(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Failed to delete recipe" });
    }
  });

  app.get("/api/recipes/slug/:slug", async (req, res) => {
    try {
      const recipe = await storage.getRecipeBySlug(req.params.slug);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  });

  // Recipe Ratings & Comments routes
  app.get("/api/recipes/:id/ratings", async (req, res) => {
    try {
      const ratings = await storage.getRatingsForRecipe(req.params.id);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ratings" });
    }
  });

  app.get("/api/recipes/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsForRecipe(req.params.id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.get("/api/recipes/:id/average-rating", async (req, res) => {
    try {
      const averageRating = await storage.getAverageRating(req.params.id);
      res.json({ averageRating });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch average rating" });
    }
  });

  app.post("/api/recipes/:id/ratings", async (req, res) => {
    try {
      const data = {
        ...req.body,
        recipeId: req.params.id,
      };
      
      // Validate review text for links and code
      if (data.reviewText && containsLinksOrCode(data.reviewText)) {
        // If review contains links or code, remove the review text but keep the rating
        data.reviewText = null;
      }
      
      const validatedData = insertRecipeRatingSchema.parse(data);
      const rating = await storage.createRating(validatedData);
      res.status(201).json(rating);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid rating data", details: error.errors });
      }
      console.error("Error creating rating:", error);
      res.status(500).json({ error: "Failed to create rating" });
    }
  });

  app.post("/api/recipes/:id/comments", async (req, res) => {
    try {
      const validatedData = insertRecipeCommentSchema.parse({
        ...req.body,
        recipeId: req.params.id,
      });
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid comment data", details: error.errors });
      }
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      
      let products;
      if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Newsletter route
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(result.data.email);
      if (existing) {
        return res.status(409).json({ error: "Email already subscribed" });
      }

      const subscription = await storage.subscribeToNewsletter(result.data);
      res.json({ message: "Successfully subscribed to newsletter", subscription });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Recipe Flagging endpoints
  app.post("/api/recipes/:id/flag", async (req, res) => {
    try {
      const validatedData = insertRecipeFlagSchema.parse({
        ...req.body,
        recipeId: req.params.id,
      });
      
      // Create the flag
      const flag = await storage.createRecipeFlag(validatedData);

      // Automatically move recipe to flagged status
      await storage.updateRecipeStatus(req.params.id, 'flagged');

      // TODO: Send email notification when SENDGRID_API_KEY is available
      console.log(`Recipe flagged: ${req.params.id} by ${validatedData.userName} for reason: ${validatedData.reason}`);
      
      res.status(201).json(flag);
    } catch (error) {
      console.error("Error flagging recipe:", error);
      res.status(500).json({ error: "Failed to flag recipe" });
    }
  });

  app.get("/api/recipe-flags", async (req, res) => {
    try {
      const recipeId = req.query.recipeId as string;
      const flags = await storage.getRecipeFlags(recipeId);
      res.json(flags);
    } catch (error) {
      console.error("Error fetching flags:", error);
      res.status(500).json({ error: "Failed to fetch flags" });
    }
  });

  // Object Storage routes for image upload
  app.post("/api/objects/upload", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  // Serve uploaded images
  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // Serve public assets
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    try {
      const filePath = req.params.filePath;
      const objectStorageService = new ObjectStorageService();
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

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
import { regenerateStaticPages } from "./regenerate-static-pages";

export async function registerRoutes(app: Express): Promise<Server> {
  // Recipe routes
  app.get("/api/recipes", async (req, res) => {
    try {
      const { category, search, limit, offset, subcategory } = req.query;
      
      if (limit !== undefined && offset !== undefined) {
        const limitNum = parseInt(limit as string, 10);
        const offsetNum = parseInt(offset as string, 10);
        const { recipes, total } = await storage.getRecipesPaginated(
          limitNum,
          offsetNum,
          category as string | undefined,
          search as string | undefined,
          subcategory as string | undefined
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
      
      // Regenerate static pages for SEO
      regenerateStaticPages().catch(err => 
        console.error('Failed to regenerate static pages:', err)
      );
      
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
      
      // Regenerate static pages for SEO
      regenerateStaticPages().catch(err => 
        console.error('Failed to regenerate static pages:', err)
      );
      
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
      
      // Regenerate static pages for SEO
      regenerateStaticPages().catch(err => 
        console.error('Failed to regenerate static pages:', err)
      );
      
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

  // Categories route
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
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

  // Dynamic XML Sitemap for Recipes
  app.get("/gluten-free-recipes.xml", async (req, res) => {
    try {
      const SITE_DOMAIN = "https://ungluedfood.com";
      
      // Get all published recipes ordered by most recently updated first
      const recipes = await storage.getRecipes();
      const publishedRecipes = recipes
        .filter(r => r.status === 'published')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Helper function to escape XML special characters
      const escapeXml = (str: string) => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };
      
      // Helper function to format date as YYYY-MM-DD
      const formatDate = (date: Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      // Generate XML sitemap
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
      xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
      
      for (const recipe of publishedRecipes) {
        const recipeUrl = `${SITE_DOMAIN}/recipe/${recipe.slug}`;
        
        // Normalize image URL - ensure it's ALWAYS a full, valid URL with https://
        let imageUrl = '';
        if (recipe.image) {
          if (recipe.image.startsWith('http://') || recipe.image.startsWith('https://')) {
            imageUrl = recipe.image;
          } else {
            // Ensure path starts with /
            const imagePath = recipe.image.startsWith('/') ? recipe.image : `/${recipe.image}`;
            imageUrl = `${SITE_DOMAIN}${imagePath}`;
          }
        } else {
          imageUrl = `${SITE_DOMAIN}/unglued-food-og-main.png`;
        }
        
        const lastModified = formatDate(recipe.createdAt);
        
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(recipeUrl)}</loc>\n`;
        xml += `    <lastmod>${lastModified}</lastmod>\n`;
        xml += '    <changefreq>monthly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '    <image:image>\n';
        xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(recipe.title)}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(recipe.description)}</image:caption>\n`;
        xml += '    </image:image>\n';
        xml += '  </url>\n';
      }
      
      xml += '</urlset>';
      
      // Set proper XML content-type header
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Dynamic Image Sitemap Generator - Google Image Sitemap Format
  app.get("/recipe-images.xml", async (req, res) => {
    try {
      const SITE_DOMAIN = "https://ungluedfood.com";
      
      // Get all published recipes
      const recipes = await storage.getRecipes();
      const publishedRecipes = recipes
        .filter(r => r.status === 'published')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Helper function to escape XML special characters
      const escapeXml = (str: string) => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };
      
      // Helper to validate and filter supported image formats
      const isSupportedImageFormat = (url: string): boolean => {
        const supportedFormats = ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.webp', '.svg', '.avif'];
        const urlLower = url.toLowerCase();
        return supportedFormats.some(format => urlLower.includes(format));
      };
      
      // Generate Google Image Sitemap XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
      xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
      
      for (const recipe of publishedRecipes) {
        const recipeUrl = `${SITE_DOMAIN}/recipe/${recipe.slug}`;
        
        // Normalize image URL - ensure it's ALWAYS a full, valid URL with https://
        let imageUrl = '';
        if (recipe.image) {
          if (recipe.image.startsWith('http://') || recipe.image.startsWith('https://')) {
            imageUrl = recipe.image;
          } else {
            // Ensure path starts with /
            const imagePath = recipe.image.startsWith('/') ? recipe.image : `/${recipe.image}`;
            imageUrl = `${SITE_DOMAIN}${imagePath}`;
          }
        } else {
          imageUrl = `${SITE_DOMAIN}/unglued-food-og-main.png`;
        }
        
        // Validate image format
        if (!isSupportedImageFormat(imageUrl)) {
          continue;
        }
        
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(recipeUrl)}</loc>\n`;
        xml += '    <image:image>\n';
        xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(recipe.title)}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(recipe.description)}</image:caption>\n`;
        xml += '    </image:image>\n';
        xml += '  </url>\n';
      }
      
      xml += '</urlset>';
      
      // Set proper XML content-type header
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.send(xml);
    } catch (error) {
      console.error("Error generating image sitemap:", error);
      res.status(500).send('Error generating image sitemap');
    }
  });

  // Pinterest Product Feed
  app.get("/pinterest-feed.xml", async (req, res) => {
    try {
      // Always use production domain for Pinterest feed (external validators need public URLs)
      const SITE_DOMAIN = "https://ungluedfood.com";

      const recipes = await storage.getRecipes();
      const publishedRecipes = recipes.filter(r => r.status === 'published');

      const escapeXml = (str: string): string => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };

      // Generate Pinterest Product Feed XML (RSS format with Google namespace)
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
      xml += '<channel>\n';
      xml += '<title>Unglued Food - Gluten-Free Recipes</title>\n';
      xml += '<link>https://ungluedfood.com</link>\n';
      xml += '<description>Delicious gluten-free recipes for every occasion</description>\n\n';

      for (const recipe of publishedRecipes) {
        const recipeUrl = `${SITE_DOMAIN}/recipe/${recipe.slug}`;
        
        // Normalize image URL - ensure it's ALWAYS a full, valid URL with https://
        let imageUrl = '';
        if (recipe.image) {
          if (recipe.image.startsWith('http://') || recipe.image.startsWith('https://')) {
            imageUrl = recipe.image;
          } else {
            // Ensure path starts with /
            const imagePath = recipe.image.startsWith('/') ? recipe.image : `/${recipe.image}`;
            imageUrl = `${SITE_DOMAIN}${imagePath}`;
          }
        } else {
          // Fallback image
          imageUrl = `${SITE_DOMAIN}/unglued-food-og-main.png`;
        }

        // Build product type from category and subcategory
        const productType = recipe.subcategory 
          ? `${recipe.category} &gt; ${recipe.subcategory}`
          : recipe.category;

        xml += '<item>\n';
        xml += `  <g:id>${escapeXml(recipe.slug)}</g:id>\n`;
        xml += `  <title>${escapeXml(recipe.title)}</title>\n`;
        xml += `  <description>${escapeXml(recipe.description)}</description>\n`;
        xml += `  <g:product_type>${productType}</g:product_type>\n`;
        xml += `  <link>${escapeXml(recipeUrl)}</link>\n`;
        xml += `  <g:image_link>${escapeXml(imageUrl)}</g:image_link>\n`;
        xml += `  <g:condition>New</g:condition>\n`;
        xml += `  <g:availability>in stock</g:availability>\n`;
        xml += `  <g:price>0 USD</g:price>\n`;
        xml += `  <g:brand>Unglued Food</g:brand>\n`;
        
        // Add custom labels for categorization
        if (recipe.difficulty) {
          xml += `  <g:custom_label_0>${escapeXml(recipe.difficulty)}</g:custom_label_0>\n`;
        }
        if (recipe.tags && recipe.tags.length > 0) {
          xml += `  <g:custom_label_1>${escapeXml(recipe.tags.slice(0, 3).join(', '))}</g:custom_label_1>\n`;
        }
        
        xml += `  <g:identifier_exists>FALSE</g:identifier_exists>\n`;
        xml += '</item>\n\n';
      }

      xml += '</channel>\n';
      xml += '</rss>';

      // Set proper XML content-type header
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.send(xml);
    } catch (error) {
      console.error("Error generating Pinterest feed:", error);
      res.status(500).send('Error generating Pinterest product feed');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

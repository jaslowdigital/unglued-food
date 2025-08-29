import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  prepTime: integer("prep_time").notNull(),
  cookTime: integer("cook_time").notNull(),
  totalTime: integer("total_time").notNull(),
  servings: integer("servings").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  calories: integer("calories"),
  protein: decimal("protein", { precision: 5, scale: 1 }),
  carbs: decimal("carbs", { precision: 5, scale: 1 }),
  fat: decimal("fat", { precision: 5, scale: 1 }),
  fiber: decimal("fiber", { precision: 5, scale: 1 }),
  image: text("image").notNull(),
  ingredients: json("ingredients").$type<string[]>().notNull(),
  instructions: json("instructions").$type<string[]>().notNull(),
  tips: text("tips"),
  variations: json("variations").$type<string[]>(),
  tags: json("tags").$type<string[]>().notNull(),
  isNaturallyGlutenFree: boolean("is_naturally_gluten_free").notNull().default(false),
  status: varchar("status").notNull().default("published"), // "published", "draft", "flagged"
  seoTitle: text("seo_title").notNull(),
  seoDescription: text("seo_description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  affiliateLink: text("affiliate_link").notNull(),
  badge: text("badge"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

// Admin user schema for recipe management
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Session storage table for admin authentication
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => adminUsers.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  subscribedAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Recipe Ratings table
export const recipeRatings = pgTable("recipe_ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  recipeId: varchar("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  userEmail: varchar("user_email").notNull(),
  userName: varchar("user_name").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  createdAt: timestamp("created_at").defaultNow(),
});

// Recipe Comments table  
export const recipeComments = pgTable("recipe_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  recipeId: varchar("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  userEmail: varchar("user_email").notNull(),
  userName: varchar("user_name").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Recipe Flags table for reporting incorrect content
export const recipeFlags = pgTable("recipe_flags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  recipeId: varchar("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  userEmail: varchar("user_email").notNull(),
  userName: varchar("user_name").notNull(),
  reason: varchar("reason").notNull(), // "incorrect-ingredients", "wrong-instructions", "nutrition-info", "other"
  description: text("description"),
  status: varchar("status").notNull().default("pending"), // "pending", "reviewed", "resolved"
  createdAt: timestamp("created_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

export const insertRecipeRatingSchema = createInsertSchema(recipeRatings).omit({
  id: true,
  createdAt: true,
});

export const insertRecipeCommentSchema = createInsertSchema(recipeComments).omit({
  id: true,
  createdAt: true,
});

export const insertRecipeFlagSchema = createInsertSchema(recipeFlags).omit({
  id: true,
  createdAt: true,
  reviewedAt: true,
});

export type RecipeRating = typeof recipeRatings.$inferSelect;
export type InsertRecipeRating = z.infer<typeof insertRecipeRatingSchema>;
export type RecipeComment = typeof recipeComments.$inferSelect;
export type InsertRecipeComment = z.infer<typeof insertRecipeCommentSchema>;
export type RecipeFlag = typeof recipeFlags.$inferSelect;
export type InsertRecipeFlag = z.infer<typeof insertRecipeFlagSchema>;

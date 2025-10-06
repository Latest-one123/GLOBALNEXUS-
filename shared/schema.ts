import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// News articles table
export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content"), // Full article content
  category: varchar("category").notNull(), // politics, technology, sports, business, world
  language: varchar("language").notNull(), // en, ar
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  readMinutes: integer("read_minutes").default(5), // Reading time in minutes
  views: integer("views").default(0),
  isBreaking: boolean("is_breaking").default(false),
  publishedAt: timestamp("published_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Article schemas
export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  views: true,
  updatedAt: true,
}).extend({
  category: z.enum(["politics", "technology", "sports", "business", "world"]),
  language: z.enum(["en", "ar"]),
});

export const updateArticleSchema = insertArticleSchema.partial();

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type UpdateArticle = z.infer<typeof updateArticleSchema>;
export type Article = typeof articles.$inferSelect;

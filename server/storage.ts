import { type User, type InsertUser, type Article, type InsertArticle, type UpdateArticle, users, articles } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "../db/index";
import { eq, desc, and, sql } from "drizzle-orm";
import bcrypt from "bcrypt";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticle(id: string): Promise<Article | undefined>;
  getArticles(filters?: {
    category?: string;
    language?: string;
    isBreaking?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, updates: UpdateArticle): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  incrementArticleViews(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Map<string, Article>;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Article methods
  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticles(filters?: {
    category?: string;
    language?: string;
    isBreaking?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]> {
    let articles = Array.from(this.articles.values());

    // Apply filters
    if (filters?.category && filters.category !== "all") {
      articles = articles.filter(article => article.category === filters.category);
    }
    if (filters?.language) {
      articles = articles.filter(article => article.language === filters.language);
    }
    if (filters?.isBreaking !== undefined) {
      articles = articles.filter(article => article.isBreaking === filters.isBreaking);
    }

    // Sort by publishedAt (newest first)
    articles.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    // Apply pagination
    const offset = filters?.offset || 0;
    const limit = filters?.limit || articles.length;
    return articles.slice(offset, offset + limit);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const now = new Date();
    
    // Apply defaults for fields not provided
    const article: Article = {
      id,
      title: insertArticle.title,
      summary: insertArticle.summary,
      content: insertArticle.content || null,
      category: insertArticle.category,
      language: insertArticle.language,
      author: insertArticle.author,
      imageUrl: insertArticle.imageUrl || null,
      readMinutes: insertArticle.readMinutes || 5,
      views: 0,
      isBreaking: insertArticle.isBreaking || false,
      publishedAt: insertArticle.publishedAt || now,
      updatedAt: now,
    };
    
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: string, updates: UpdateArticle): Promise<Article | undefined> {
    const existing = this.articles.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: Article = {
      ...existing,
      ...updates,
      updatedAt: new Date(), // Always update timestamp
    };

    this.articles.set(id, updated);
    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  async incrementArticleViews(id: string): Promise<void> {
    const article = this.articles.get(id);
    if (article) {
      article.views = (article.views || 0) + 1;
      article.updatedAt = new Date();
      this.articles.set(id, article);
    }
  }
}

// Database storage implementation
export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return result[0];
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id));
    return result[0];
  }

  async getArticles(filters?: {
    category?: string;
    language?: string;
    isBreaking?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]> {
    const conditions = [];

    if (filters?.category && filters.category !== "all") {
      conditions.push(eq(articles.category, filters.category));
    }
    if (filters?.language) {
      conditions.push(eq(articles.language, filters.language));
    }
    if (filters?.isBreaking !== undefined) {
      conditions.push(eq(articles.isBreaking, filters.isBreaking));
    }

    let query = db.select().from(articles);

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    query = query.orderBy(desc(articles.publishedAt)) as any;

    if (filters?.limit) {
      query = query.limit(filters.limit) as any;
    }
    if (filters?.offset) {
      query = query.offset(filters.offset) as any;
    }

    return await query;
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(insertArticle).returning();
    return result[0];
  }

  async updateArticle(id: string, updates: UpdateArticle): Promise<Article | undefined> {
    const result = await db
      .update(articles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return result[0];
  }

  async deleteArticle(id: string): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id)).returning();
    return result.length > 0;
  }

  async incrementArticleViews(id: string): Promise<void> {
    await db
      .update(articles)
      .set({ 
        views: sql`${articles.views} + 1`, 
        updatedAt: sql`now()` 
      })
      .where(eq(articles.id, id));
  }
}

export const storage = new DbStorage();

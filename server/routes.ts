import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema, updateArticleSchema } from "@shared/schema";
import { z } from "zod";
import { requireAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Article endpoints
  
  // GET /api/articles - Get articles with optional filters
  app.get("/api/articles", async (req, res) => {
    try {
      const { category, language, isBreaking, limit, offset } = req.query;
      
      const filters = {
        category: category as string,
        language: language as string,
        isBreaking: isBreaking === "true" ? true : isBreaking === "false" ? false : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });

      const articles = await storage.getArticles(filters);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /api/articles/:id - Get single article
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const article = await storage.getArticle(id);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/articles - Create new article (protected)
  app.post("/api/articles", requireAuth, async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PATCH /api/articles/:id - Update article (protected)
  app.patch("/api/articles/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateArticleSchema.parse(req.body);
      
      const updatedArticle = await storage.updateArticle(id, validatedData);
      
      if (!updatedArticle) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(updatedArticle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      console.error("Error updating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE /api/articles/:id - Delete article (protected)
  app.delete("/api/articles/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteArticle(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST /api/articles/:id/views - Increment article views
  app.post("/api/articles/:id/views", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if article exists first
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      await storage.incrementArticleViews(id);
      res.status(200).json({ message: "Views incremented" });
    } catch (error) {
      console.error("Error incrementing views:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// تحميل environment variables يدوياً
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تحميل .env يدوياً
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    for (const line of envLines) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^"|"$/g, '');
        process.env[key] = value;
      }
    }
  }
} catch (error) {
  console.log('⚠️  Could not load .env file');
}

import express from "express";
import session from "express-session";
import { setupVite, serveStatic } from "./vite";
import api from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionSecret = process.env.SESSION_SECRET || "fallback-secret";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  }),
);

if (process.env.NODE_ENV === "development") {
  await setupVite(app);
} else {
  serveStatic(app);
}

app.use("/api", api);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV}`);
});

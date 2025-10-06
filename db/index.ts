import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// تحميل .env يدوياً
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  console.log('✅ Environment variables loaded from .env');
}

console.log('🔧 DATABASE_URL exists:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL must be set');
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

console.log('✅ Database configured successfully');

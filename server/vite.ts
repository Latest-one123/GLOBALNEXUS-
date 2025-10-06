import fs from 'fs';
import path from 'path';
import { type Express, static as expressStatic } from 'express';
import { createServer as createViteServer } from 'vite';

export async function setupVite(app: Express) {
  const server = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(server.middlewares);
  console.log('✅ Vite development server setup complete');
}

export function serveStatic(app: Express) {
  const buildPath = path.resolve('dist/public');

  if (!fs.existsSync(buildPath)) {
    console.log('⚠️  Build directory not found, running in development mode with Vite...');
    return;
  }

  app.use(expressStatic(buildPath));
  console.log('✅ Serving static files from:', buildPath);
}

// دالة log المفقودة
export function log(message: string) {
  console.log(`📝 ${message}`);
}

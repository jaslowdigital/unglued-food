import { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STATIC_HTML_DIR = join(__dirname, '../dist/public');

export async function staticHtmlMiddleware(req: Request, res: Response, next: NextFunction) {
  // Only intercept GET requests for HTML pages (not API calls, assets, etc.)
  if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/assets')) {
    return next();
  }
  
  // Skip for admin, edit, and add pages (keep those as SPA)
  if (req.path.startsWith('/admin') || req.path.startsWith('/add-recipe') || req.path.startsWith('/edit-recipe')) {
    return next();
  }
  
  try {
    // Try to find static HTML file
    let htmlPath: string;
    
    if (req.path === '/' || req.path === '/index.html') {
      htmlPath = join(STATIC_HTML_DIR, 'index.html');
    } else {
      // For routes like /recipe/some-slug, strip leading slash before joining
      const relativePath = req.path.replace(/^\/+/, '');
      htmlPath = join(STATIC_HTML_DIR, relativePath, 'index.html');
    }
    
    // Check if file exists
    await fs.access(htmlPath);
    
    // File exists, serve it
    const html = await fs.readFile(htmlPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
    
  } catch (error) {
    // File doesn't exist, continue to next middleware (SPA)
    next();
  }
}

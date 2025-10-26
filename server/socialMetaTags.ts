import { Request, Response, NextFunction } from "express";
import { type IStorage } from "./storage";

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Validates and sanitizes host header to prevent Host header injection attacks
 * Only allows production domain and Replit deployment domains
 */
function getSafeHost(requestHost: string | undefined): string {
  const DEFAULT_HOST = 'ungluedfood.com';
  
  if (!requestHost) {
    return DEFAULT_HOST;
  }
  
  // Remove port if present
  const hostWithoutPort = requestHost.split(':')[0];
  
  // Whitelist of allowed hosts
  const allowedHosts = [
    'ungluedfood.com',
    'www.ungluedfood.com',
    'localhost' // For development only
  ];
  
  // Check exact match
  if (allowedHosts.includes(hostWithoutPort)) {
    return hostWithoutPort;
  }
  
  // Allow *.replit.app and *.replit.dev domains for Replit deployments
  if (hostWithoutPort.endsWith('.replit.app') || hostWithoutPort.endsWith('.replit.dev')) {
    // Additional validation: ensure it's a valid subdomain format (including hyphens in username)
    const domainPattern = /^[a-z0-9][a-z0-9-]*\.replit\.(app|dev)$/i;
    if (domainPattern.test(hostWithoutPort)) {
      return hostWithoutPort;
    }
  }
  
  // If host doesn't match whitelist, use default
  return DEFAULT_HOST;
}

// Social media crawler user agents
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'pinterest',
  'redditbot',
  'SkypeUriPreview',
  'googlebot'
];

/**
 * Detects if the request is from a social media crawler/bot
 */
function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;
  return CRAWLER_USER_AGENTS.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

/**
 * Generates HTML with Open Graph and Twitter Card meta tags for a recipe
 */
function generateRecipeMetaHTML(recipe: any, baseUrl: string): string {
  // Escape all user-generated content to prevent XSS
  const safeTitle = escapeHtml(recipe.title || '');
  const safeSeoTitle = escapeHtml(recipe.seoTitle || recipe.title || '');
  const safeDescription = escapeHtml(recipe.description || '');
  const safeSeoDescription = escapeHtml(recipe.seoDescription || recipe.description || '');
  const safeCategory = escapeHtml(recipe.category || '');
  const safeSlug = escapeHtml(recipe.slug || '');
  
  const recipeUrl = `${baseUrl}/recipe/${safeSlug}`;
  const imageUrl = recipe.image?.startsWith('http') 
    ? escapeHtml(recipe.image)
    : `${baseUrl}${escapeHtml(recipe.image || '')}`;
  
  const safeCreatedAt = recipe.createdAt || new Date().toISOString();
  const safeTags = recipe.tags?.map((tag: string) => 
    `<meta property="article:tag" content="${escapeHtml(tag)}">`
  ).join('\n    ') || '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeSeoTitle}</title>
    <meta name="description" content="${safeSeoDescription}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${safeSeoTitle}">
    <meta property="og:description" content="${safeSeoDescription}">
    <meta property="og:url" content="${recipeUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="1024">
    <meta property="og:image:type" content="${recipe.image?.endsWith('.png') ? 'image/png' : 'image/jpeg'}">
    <meta property="og:image:alt" content="${safeTitle}">
    <meta property="og:site_name" content="Unglued Food - Gluten-Free Recipes">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeSeoTitle}">
    <meta name="twitter:description" content="${safeSeoDescription}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="${safeTitle}">
    
    <!-- Additional Meta Tags -->
    <meta property="article:published_time" content="${safeCreatedAt}">
    <meta property="article:author" content="Unglued Food">
    <meta property="article:section" content="${safeCategory}">
    ${safeTags}
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${recipeUrl}">
    
    <!-- Redirect to the actual React app after meta tags are read -->
    <meta http-equiv="refresh" content="0;url=${recipeUrl}">
    <script>window.location.href = '${recipeUrl}';</script>
</head>
<body>
    <h1>${safeTitle}</h1>
    <p>${safeDescription}</p>
    <p>Redirecting to recipe...</p>
</body>
</html>`;
}

/**
 * Middleware to serve pre-rendered HTML with meta tags to social media crawlers
 */
export function socialMetaTagsMiddleware(storage: IStorage) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers['user-agent'] || '';
    
    // Only intercept crawler requests
    if (!isCrawler(userAgent)) {
      return next();
    }
    
    // Only handle recipe pages
    const recipeMatch = req.path.match(/^\/recipe\/([a-z0-9-]+)$/);
    if (!recipeMatch) {
      return next();
    }
    
    const slug = recipeMatch[1];
    
    try {
      // Fetch recipe from database
      const recipe = await storage.getRecipeBySlug(slug);
      
      if (!recipe) {
        return next(); // Recipe not found, continue to 404
      }
      
      // Determine base URL with safe, validated host
      const requestHost = (req.headers['x-forwarded-host'] || req.headers.host) as string | undefined;
      const safeHost = getSafeHost(requestHost);
      
      // Always use HTTPS for social sharing (validate protocol too)
      const requestProto = req.headers['x-forwarded-proto'] as string | undefined;
      const protocol = (requestProto === 'http' || requestProto === 'https') ? requestProto : 'https';
      
      const baseUrl = `${protocol}://${safeHost}`;
      
      // Generate and serve HTML with meta tags
      const html = generateRecipeMetaHTML(recipe, baseUrl);
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
      
    } catch (error) {
      console.error('Error generating social meta tags:', error);
      next(); // Fall back to regular routing on error
    }
  };
}

import { Request, Response, NextFunction } from "express";
import { type IStorage } from "./storage";
import fs from "fs";
import path from "path";

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
 * Generates meta tags for a recipe to inject into the index.html template
 */
function generateRecipeMetaTags(recipe: any, baseUrl: string): string {
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
  
  const modifiedTime = recipe.updatedAt || recipe.createdAt || new Date().toISOString();
  
  return `<title>${safeSeoTitle}</title>
    <meta name="description" content="${safeSeoDescription}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
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
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="${safeTitle}">
    <meta name="twitter:site" content="@ungluedfood">
    
    <!-- Pinterest Meta Tags -->
    <meta name="pinterest:description" content="${safeDescription}">
    <meta name="pinterest-rich-pin" content="true">
    
    <!-- Additional Meta Tags -->
    <meta property="article:published_time" content="${safeCreatedAt}">
    <meta property="article:modified_time" content="${modifiedTime}">
    <meta property="article:author" content="Unglued Food">
    <meta property="article:publisher" content="https://www.facebook.com/ungluedfood">
    <meta property="article:section" content="${safeCategory}">
    ${safeTags}
    
    <!-- Social Profile Links -->
    <link rel="me" href="https://twitter.com/ungluedfood">
    <link rel="me" href="https://www.facebook.com/ungluedfood">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${recipeUrl}">`
;
}

/**
 * Middleware to inject recipe meta tags into HTML for social media crawlers
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
      
      // For social media crawlers, always use the production domain
      // This ensures Pinterest and other platforms get valid, publicly accessible URLs
      const baseUrl = 'https://ungluedfood.com';
      
      // Read the index.html template
      const templatePath = path.resolve(import.meta.dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(templatePath, "utf-8");
      
      // Generate recipe-specific meta tags
      const metaTags = generateRecipeMetaTags(recipe, baseUrl);
      
      // Replace the default OG meta tags with recipe-specific ones
      // Find and replace the section between Pinterest verification and font links
      const pinterestVerifyTag = '<meta name="p:domain_verify" content="c13a43a44ee84b52fac02ba147d69d5f"/>';
      const ogStartComment = '<!-- Default Open Graph Meta Tags for Social Sharing -->';
      const twitterEndTag = '<meta name="twitter:image:alt" content="Gluten-Free Halloween Desserts" />';
      
      const pinterestIndex = template.indexOf(pinterestVerifyTag);
      const ogStartIndex = template.indexOf(ogStartComment);
      const twitterEndIndex = template.indexOf(twitterEndTag);
      
      if (pinterestIndex !== -1 && ogStartIndex !== -1 && twitterEndIndex !== -1) {
        const beforeMeta = template.substring(0, pinterestIndex + pinterestVerifyTag.length);
        const afterTwitterEnd = template.substring(template.indexOf('>', twitterEndIndex) + 1);
        
        // Inject the new meta tags
        template = beforeMeta + '\n    \n    ' + metaTags + '\n    ' + afterTwitterEnd;
      }
      
      // Serve the HTML directly to the crawler
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.send(template);
      
    } catch (error) {
      console.error('Error generating social meta tags:', error);
      next(); // Fall back to regular routing on error
    }
  };
}

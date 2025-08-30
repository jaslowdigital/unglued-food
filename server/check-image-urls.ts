// Check the status of AI-generated image URLs
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkImageUrls() {
  // Read current recipes
  const recipesPath = path.join(__dirname, 'gluten-free-recipes-100.ts');
  const content = fs.readFileSync(recipesPath, 'utf8');
  
  // Extract image URLs
  const imageMatches = content.match(/"image":\s*"([^"]+)"/g);
  
  if (!imageMatches) {
    console.log('No image URLs found');
    return;
  }
  
  console.log(`Found ${imageMatches.length} image URLs`);
  
  let expiredCount = 0;
  let validCount = 0;
  
  for (const match of imageMatches.slice(0, 5)) { // Check first 5 for speed
    const url = match.match(/"image":\s*"([^"]+)"/)?.[1];
    if (!url) continue;
    
    // Check if Azure blob storage URL is expired
    if (url.includes('oaidalleapiprodscus.blob.core.windows.net')) {
      // Extract expiry date from URL
      const seMatch = url.match(/se=([^&]+)/);
      if (seMatch) {
        const expiryDate = decodeURIComponent(seMatch[1]);
        const expiry = new Date(expiryDate);
        const now = new Date();
        
        if (expiry < now) {
          expiredCount++;
          console.log(`❌ EXPIRED: ${url.substring(0, 100)}... (expired: ${expiry.toISOString()})`);
        } else {
          validCount++;
          console.log(`✅ VALID: ${url.substring(0, 100)}... (expires: ${expiry.toISOString()})`);
        }
      }
    } else {
      console.log(`➡️  Other URL: ${url.substring(0, 100)}...`);
    }
  }
  
  console.log(`\n📊 Status Summary:`);
  console.log(`   Valid: ${validCount}`);
  console.log(`   Expired: ${expiredCount}`);
  
  if (expiredCount > 0) {
    console.log(`\n⚠️  AI image URLs have expired! Need to regenerate or use fallback images.`);
  }
}

checkImageUrls().catch(console.error);
import * as fs from 'fs';
import path from 'path';

// This script compiles all generated images from various progress files
const allImages: Record<string, string> = {};
let fileCount = 0;

// Read all JSON files that contain generated images
const files = fs.readdirSync('.').filter(f => f.endsWith('.json'));

console.log(`\nScanning ${files.length} JSON files for image URLs...\n`);

// First, let's look for the complete manual tracking file
const manualTrackingFile = 'all-generated-images-manual.json';
if (fs.existsSync(manualTrackingFile)) {
  const data = JSON.parse(fs.readFileSync(manualTrackingFile, 'utf8'));
  Object.assign(allImages, data);
  console.log(`✅ Loaded ${Object.keys(data).length} images from manual tracking`);
}

// Process all progress and completion files
for (const file of files) {
  if (file.includes('progress') || file.includes('complete') || file.includes('final') || file.includes('batch') || file.includes('generated')) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const data = JSON.parse(content);
      let found = 0;
      
      // Try different possible structures
      const sources = [
        data.generated,
        data.generatedImages, 
        data.generatedInThisBatch,
        data.newlyGenerated,
        data.lastBatchGenerated,
        data.finalBatchImages,
        data.images,
        data // In case the whole file is just the images object
      ];
      
      for (const source of sources) {
        if (source && typeof source === 'object') {
          for (const [slug, url] of Object.entries(source)) {
            if (typeof url === 'string' && url.includes('blob.core.windows.net')) {
              allImages[slug] = url;
              found++;
            }
          }
        }
      }
      
      if (found > 0) {
        console.log(`✅ ${file}: Found ${found} images`);
        fileCount++;
      }
    } catch (e) {
      // Skip files that can't be parsed
    }
  }
}

// Also check for any manual tracking from our generation scripts
const manualImages: Record<string, string> = {
  // First batch from initial generation
  "fluffy-blueberry-pancakes": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-LlWCOCsrN2yWqOGkiqIqo2sq.png?st=2025-08-26T14%3A38%3A55Z&se=2025-08-26T16%3A38%3A55Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b74f183f-e7f8-479f-ad70-d7bb436e31c8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T15%3A38%3A56Z&ske=2025-08-27T15%3A38%3A56Z&sks=b&skv=2024-08-04&sig=QhUQWnQGvSVHlhd7HxQBQhBZdl0ZX7Vbfm5XLXlJJyI%3D",
  "chicken-zucchini-pasta": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RRr2OcqenZPvkzbepd1VRMvi/user-xGKxQZAhnHKRnely7G002aa0/img-gLRjJ0MmAyuUOJ0sF2qlN7V1.png?st=2025-08-26T14%3A39%3A16Z&se=2025-08-26T16%3A39%3A16Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d32e3c8d-e66d-42f3-91c9-d73e088c8742&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T15%3A39%3A16Z&ske=2025-08-27T15%3A39%3A16Z&sks=b&skv=2024-08-04&sig=kPHzZsaXqnlJfJYXy38t2s8qNRqzwdh38w6fLlJyQXo%3D",
  // Add more manual entries if needed...
};

// Merge manual images (but don't overwrite existing)
for (const [slug, url] of Object.entries(manualImages)) {
  if (!allImages[slug]) {
    allImages[slug] = url;
  }
}

console.log(`\n📊 SUMMARY:`);
console.log(`   Files processed: ${fileCount}`);
console.log(`   Total unique images found: ${Object.keys(allImages).length}`);
console.log(`   Target: 100 recipes\n`);

// List which recipes we have images for
const slugsWithImages = Object.keys(allImages).sort();
console.log('Recipes with AI images:');
slugsWithImages.forEach((slug, i) => {
  console.log(`${(i + 1).toString().padStart(3)}. ${slug}`);
});

// Save the complete compilation
const outputFile = 'MASTER-all-generated-images.json';
fs.writeFileSync(outputFile, JSON.stringify(allImages, null, 2));
console.log(`\n✅ Master image list saved to ${outputFile}`);
console.log(`📊 Total recipes with AI-generated images: ${Object.keys(allImages).length}/100`);

export default allImages;
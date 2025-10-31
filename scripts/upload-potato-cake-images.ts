import { objectStorageClient } from "../server/objectStorage";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.join(__dirname, "..");

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;

if (!BUCKET_ID) {
  throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID environment variable not set");
}

const potatoCakeImages = [
  "gluten-free-blackberry-lemon-potato-cake.png",
  "gluten-free-carrot-potato-spice-cake.png",
  "gluten-free-chocolate-potato-cake.png",
  "gluten-free-chocolate-raspberry-potato-layer-cake.png",
  "gluten-free-coconut-pineapple-potato-cake.png",
  "gluten-free-currant-rhubarb-potato-cake-streusel.png",
  "gluten-free-raspberry-white-chocolate-potato-cake.png",
  "gluten-free-rum-amaretto-potato-cake.png",
  "gluten-free-strawberry-potato-cake-cream-cheese.png",
  "gluten-free-vanilla-bean-potato-cake.png",
];

async function uploadPotatoCakeImages() {
  console.log("🚀 Uploading 10 Gluten-Free Potato Cake images to production object storage...\n");

  const bucket = objectStorageClient.bucket(BUCKET_ID);
  let successCount = 0;

  for (const imageName of potatoCakeImages) {
    try {
      const localPath = path.join(projectRoot, "client/public/recipe-images", imageName);
      const destinationPath = `public/recipe-images/${imageName}`;

      const fileBuffer = readFileSync(localPath);

      const file = bucket.file(destinationPath);
      
      await file.save(fileBuffer, {
        contentType: "image/png",
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });

      console.log(`✅ Uploaded: ${imageName}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to upload ${imageName}:`, error);
    }
  }

  console.log(`\n🎉 Upload complete! Successfully uploaded ${successCount}/${potatoCakeImages.length} images`);
  console.log(`📍 Images are now available in production at: https://ungluedfood.com/recipe-images/...`);
}

uploadPotatoCakeImages().catch(console.error);

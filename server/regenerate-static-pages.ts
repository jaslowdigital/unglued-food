import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let regenerationInProgress: Promise<void> | null = null;
let lastRegenerationTime = 0;
const DEBOUNCE_MS = 5000;

export async function regenerateStaticPages(): Promise<void> {
  const now = Date.now();
  
  if (regenerationInProgress) {
    console.log('⏳ Static page regeneration already in progress, reusing existing build...');
    return regenerationInProgress;
  }
  
  if (now - lastRegenerationTime < DEBOUNCE_MS) {
    console.log('⏭️  Skipping regeneration (debounced - too soon after last build)');
    return;
  }
  
  regenerationInProgress = (async () => {
    try {
      console.log('🔄 Regenerating static pages for SEO...');
      lastRegenerationTime = Date.now();
      
      const scriptPath = path.join(__dirname, 'build-static-pages.ts');
      const { stdout, stderr } = await execAsync(`tsx ${scriptPath}`, {
        cwd: __dirname,
        timeout: 30000
      });
      
      if (stdout) console.log(stdout);
      if (stderr && !stderr.includes('ExperimentalWarning')) {
        console.error('Static regeneration stderr:', stderr);
      }
      
      console.log('✅ Static pages regenerated successfully');
    } catch (error) {
      console.error('❌ Failed to regenerate static pages:', error);
      throw error;
    } finally {
      regenerationInProgress = null;
    }
  })();
  
  return regenerationInProgress;
}

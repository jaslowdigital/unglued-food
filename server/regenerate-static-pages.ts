import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function regenerateStaticPages(): Promise<void> {
  try {
    console.log('🔄 Regenerating static pages for SEO...');
    
    const scriptPath = path.join(__dirname, 'build-static-pages.ts');
    const { stdout, stderr } = await execAsync(`tsx ${scriptPath}`, {
      cwd: __dirname
    });
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
    console.log('✅ Static pages regenerated successfully');
  } catch (error) {
    console.error('❌ Failed to regenerate static pages:', error);
  }
}

#!/usr/bin/env tsx

/**
 * Verification script to ensure static HTML is being served correctly
 * Run this after regenerating static pages to confirm SEO setup is working
 */

const testRecipes = [
  'gluten-free-dark-chocolate-raspberry-cheesecake-classic-ganache',
  'gluten-free-swiss-mushroom-melt-venison-burger',
  'artisan-gluten-free-sourdough-bread'
];

async function verifyStaticHTML() {
  console.log('🔍 Verifying Static HTML for SEO\n');
  console.log('=' .repeat(60));
  
  let passCount = 0;
  let failCount = 0;
  
  // Test homepage
  try {
    const homeResponse = await fetch('http://localhost:5000/');
    const homeHtml = await homeResponse.text();
    
    if (homeHtml.includes('791+') && homeHtml.includes('Delicious Gluten-Free Recipes')) {
      console.log('✅ Homepage: Static HTML served correctly');
      passCount++;
    } else {
      console.log('❌ Homepage: Missing expected content');
      failCount++;
    }
  } catch (error) {
    console.log('❌ Homepage: Failed to fetch');
    failCount++;
  }
  
  // Test recipe pages
  for (const slug of testRecipes) {
    try {
      const url = `http://localhost:5000/recipe/${slug}`;
      const response = await fetch(url);
      const html = await response.text();
      
      const checks = {
        'Meta Description': html.includes('<meta name="description"'),
        'Open Graph': html.includes('property="og:title"'),
        'Twitter Card': html.includes('name="twitter:card"'),
        'Schema.org': html.includes('"@context": "https://schema.org"'),
        'Canonical URL': html.includes('<link rel="canonical"'),
        'Recipe Content': html.includes('<h1') && html.toLowerCase().includes('ingredient')
      };
      
      const passed = Object.values(checks).every(Boolean);
      
      if (passed) {
        console.log(`✅ ${slug.substring(0, 40)}...`);
        passCount++;
      } else {
        console.log(`❌ ${slug}`);
        console.log('   Failed checks:', Object.entries(checks).filter(([, v]) => !v).map(([k]) => k).join(', '));
        failCount++;
      }
    } catch (error) {
      console.log(`❌ ${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failCount++;
    }
  }
  
  console.log('=' .repeat(60));
  console.log(`\n📊 Results: ${passCount} passed, ${failCount} failed`);
  
  if (failCount === 0) {
    console.log('\n✅ All checks passed! Static HTML is working correctly.');
    console.log('   Google and other search engines can now crawl your recipes.');
  } else {
    console.log('\n⚠️  Some checks failed. Review the output above.');
  }
}

verifyStaticHTML().catch(console.error);

// Shared utility functions for category handling

/**
 * Convert category name to URL-friendly slug
 * Examples: "Desserts" -> "desserts", "Appetizers" -> "appetizers"
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Convert slug back to category name for display
 * Examples: "desserts" -> "Desserts", "appetizers" -> "Appetizers"
 */
export function slugToCategory(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate SEO-friendly category metadata
 */
export function getCategoryMeta(categoryName: string) {
  const slug = categoryToSlug(categoryName);
  const displayName = categoryName;
  
  // Category-specific descriptions for SEO
  const descriptions: Record<string, string> = {
    'desserts': 'Discover delicious gluten-free dessert recipes including cakes, cookies, brownies, and more. Easy-to-follow recipes for every sweet craving.',
    'appetizers': 'Explore mouthwatering gluten-free appetizer recipes perfect for parties and entertaining. From crostini to dips, find crowd-pleasing starters.',
    'breakfast': 'Start your day right with hearty gluten-free breakfast recipes. Waffles, pancakes, muffins, and more morning favorites.',
    'breads': 'Bake perfect gluten-free breads, muffins, scones, and artisan loaves. Detailed recipes for delicious homemade gluten-free baking.',
    'dinner': 'Quick and easy gluten-free dinner recipes for weeknight meals. Healthy, flavorful dishes the whole family will love.',
    'lunch': 'Satisfying gluten-free lunch ideas for home or on-the-go. Fresh, nutritious recipes to power through your day.',
    'sides': 'Complete your meal with delicious gluten-free side dishes. From roasted vegetables to grain alternatives.',
    'snacks': 'Healthy gluten-free snack recipes for any time of day. Quick bites and party-ready finger foods.',
    'entrees': 'Hearty gluten-free entree recipes featuring chicken, seafood, and vegetarian options. Restaurant-quality meals at home.',
    'pizza': 'Authentic gluten-free pizza recipes with perfect crusts and creative toppings. From classic to gourmet variations.',
    'salads': 'Fresh and flavorful gluten-free salad recipes. Healthy meals packed with nutrients and taste.',
    'soups': 'Warming gluten-free soup recipes perfect for any season. Creamy, hearty, and comforting bowls.',
    'beverages': 'Refreshing gluten-free beverage recipes including smoothies, drinks, and specialty beverages.',
    'holiday': 'Festive gluten-free holiday recipes for special occasions. Thanksgiving, Christmas, and celebration favorites.',
    'kosher': 'Gluten-free kosher recipes following dietary laws. Traditional flavors adapted for gluten-free cooking.',
    'keto': 'Low-carb gluten-free keto recipes for healthy eating. Delicious dishes that fit your ketogenic lifestyle.',
    'vegetarian': 'Plant-based gluten-free vegetarian recipes. Meat-free meals full of flavor and nutrition.'
  };
  
  const defaultDescription = `Browse our collection of gluten-free ${displayName.toLowerCase()} recipes. Easy-to-follow instructions and delicious results every time.`;
  
  return {
    slug,
    displayName,
    title: `Gluten-Free ${displayName} Recipes - UNGLUED FOOD`,
    description: descriptions[slug] || defaultDescription,
    url: `/category/${slug}`,
    keywords: `gluten-free ${displayName.toLowerCase()}, ${displayName.toLowerCase()} recipes, gluten-free cooking, celiac-friendly ${displayName.toLowerCase()}`
  };
}

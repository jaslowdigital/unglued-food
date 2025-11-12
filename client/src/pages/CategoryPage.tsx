import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { slugToCategory, getCategoryMeta } from "@shared/utils";
import RecipeCard from "@/components/recipe-card";
import RecipesPagination from "@/components/recipes-pagination";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChevronRight, Home } from "lucide-react";
import type { Recipe } from "@shared/schema";
import type { CategoryWithLatestRecipe } from "../../../server/storage";

const RECIPES_PER_PAGE = 48;

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  pageSize: number;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [location] = useLocation();
  
  if (!slug) {
    return <div>Category not found</div>;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Sync page state with URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get('page');
    
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [location]);

  // Fetch category data to verify it exists and get the latest recipe for OG image
  const { data: categories } = useQuery<CategoryWithLatestRecipe[]>({
    queryKey: ["/api/categories"],
  });

  // Match by slug instead of converted name to handle punctuation correctly
  const categoryData = categories?.find(c => c.slug === slug);
  
  // Use the actual category name from the database for API calls and display
  const categoryName = categoryData?.category || slugToCategory(slug);
  const categoryMeta = getCategoryMeta(categoryName);

  // Fetch paginated recipes for this category
  const offset = (currentPage - 1) * RECIPES_PER_PAGE;
  
  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    params.set('limit', RECIPES_PER_PAGE.toString());
    params.set('offset', offset.toString());
    params.set('category', categoryName);
    return `/api/recipes?${params.toString()}`;
  };

  const { data: recipesData, isLoading } = useQuery<RecipesResponse>({
    queryKey: [buildQueryUrl()],
  });

  const recipes = recipesData?.recipes || [];
  const totalRecipes = recipesData?.total || 0;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  // Set SEO meta tags
  useEffect(() => {
    if (!categoryData) return;

    const siteUrl = window.location.origin;
    const ogImage = categoryData.latestRecipe?.image 
      ? `${siteUrl}${categoryData.latestRecipe.image}`
      : `${siteUrl}/og-image.png`;
    const canonicalUrl = `${siteUrl}${categoryMeta.url}`;

    document.title = categoryMeta.title;
    
    const setMetaTag = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', categoryMeta.description, false);
    setMetaTag('keywords', categoryMeta.keywords, false);
    
    // Open Graph tags
    setMetaTag('og:type', 'website');
    setMetaTag('og:title', categoryMeta.title);
    setMetaTag('og:description', categoryMeta.description);
    setMetaTag('og:url', canonicalUrl);
    setMetaTag('og:image', ogImage);
    setMetaTag('og:image:width', '1200');
    setMetaTag('og:image:height', '630');
    setMetaTag('og:site_name', 'UNGLUED FOOD');
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', categoryMeta.title, false);
    setMetaTag('twitter:description', categoryMeta.description, false);
    setMetaTag('twitter:image', ogImage, false);
    
    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [categoryData, categoryMeta]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Loading state for category verification
  if (!categories) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-dark-accent rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-dark-accent rounded w-2/3 mb-8"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Category not found
  if (!categoryData) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-playfair font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-gray mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link href="/recipes">
            <a className="text-warm-amber hover:text-warm-amber/80 transition-colors" data-testid="link-recipes">
              Browse all recipes
            </a>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-dark-accent/50 border-b border-muted-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-gray">
            <Link href="/">
              <a className="flex items-center hover:text-warm-amber transition-colors" data-testid="breadcrumb-home">
                <Home className="w-4 h-4 mr-1" />
                Home
              </a>
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/recipes">
              <a className="hover:text-warm-amber transition-colors" data-testid="breadcrumb-recipes">
                Recipes
              </a>
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-warm-amber" data-testid="breadcrumb-category">{categoryMeta.displayName}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* H1: Main category heading */}
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-warm-amber" data-testid="category-title">
            Gluten-Free {categoryMeta.displayName}
          </h1>

          {/* H2: Category description */}
          <h2 className="text-xl md:text-2xl text-muted-gray max-w-3xl mx-auto mb-6" data-testid="category-description">
            {categoryMeta.description}
          </h2>

          {/* Category stats */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-muted-gray" data-testid="category-count">
              <span className="font-semibold text-warm-amber">{categoryData.count}</span> recipes
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="bg-dark-accent rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && recipes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            <RecipesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* No Results */}
        {!isLoading && recipes.length === 0 && (
          <div className="bg-dark-accent border border-muted-gray/20 rounded-xl p-12 text-center">
            <p className="text-xl text-muted-gray mb-4">No recipes found in this category</p>
            <p className="text-muted-gray mb-6">
              Check back later for new recipes in {categoryMeta.displayName}
            </p>
            <Link href="/recipes">
              <a className="inline-block bg-warm-amber text-dark-primary px-6 py-3 rounded-lg hover:bg-warm-amber/90 transition-colors" data-testid="browse-all-button">
                Browse All Recipes
              </a>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

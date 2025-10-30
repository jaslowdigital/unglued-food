import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import RecipeCategories from "@/components/recipe-categories.tsx";
import FeaturedRecipes from "@/components/featured-recipes";
import EducationSection from "@/components/education-section";
import ProductRecommendations from "@/components/product-recommendations";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Home() {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const ogImageUrl = `${siteUrl}/unglued-food-og.jpg`;

    document.title = "Unglued Food - Your Free Source for Fresh Gluten-Free Recipes";
    
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

    setMetaTag('description', 'Discover delicious gluten-free recipes for every occasion. From breakfast to desserts, find easy-to-follow recipes that are safe for celiac disease and gluten sensitivity.', false);
    setMetaTag('og:title', 'Unglued Food - Your Free Source for Fresh Gluten-Free Recipes');
    setMetaTag('og:description', 'Discover delicious gluten-free recipes for every occasion. From breakfast to desserts, find easy-to-follow recipes that are safe for celiac disease and gluten sensitivity.');
    setMetaTag('og:url', siteUrl);
    setMetaTag('og:image', ogImageUrl);
    setMetaTag('og:image:secure_url', ogImageUrl);
    setMetaTag('og:image:width', '1200');
    setMetaTag('og:image:height', '630');
    setMetaTag('og:image:type', 'image/jpeg');
    setMetaTag('og:image:alt', 'Unglued Food - Fresh Gluten-Free Recipes');
    setMetaTag('twitter:title', 'Unglued Food - Your Free Source for Fresh Gluten-Free Recipes', false);
    setMetaTag('twitter:description', 'Discover delicious gluten-free recipes for every occasion. From breakfast to desserts, find easy-to-follow recipes that are safe for celiac disease and gluten sensitivity.', false);
    setMetaTag('twitter:image', ogImageUrl, false);
    setMetaTag('twitter:image:alt', 'Unglued Food - Fresh Gluten-Free Recipes', false);
  }, []);

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />
      <Hero />
      <RecipeCategories />
      <FeaturedRecipes />
      <EducationSection />
      <ProductRecommendations />
      <NewsletterSignup />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

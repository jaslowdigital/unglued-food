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

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";
import { Info } from "lucide-react";

export default function ProductRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "Flours & Baking", label: "Flours & Baking" },
    { id: "Pasta & Grains", label: "Pasta & Grains" },
    { id: "Snacks", label: "Snacks" },
    { id: "Pantry Staples", label: "Pantry Staples" }
  ];

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory !== "all" ? selectedCategory : undefined],
    enabled: true,
  });

  return (
    <section id="products" className="py-16 bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4" data-testid="products-title">
            Recommended Products
          </h2>
          <p className="text-muted-gray max-w-2xl mx-auto" data-testid="products-description">
            Curated gluten-free products we love and trust, with affiliate links to help support our mission
          </p>
        </div>

        {/* Product Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category.id 
                  ? "bg-warm-amber text-dark-primary" 
                  : "bg-dark-accent text-muted-gray hover:bg-warm-amber/20 hover:text-warm-amber"
              }`}
              data-testid={`category-filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-dark-secondary rounded-xl overflow-hidden h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-gray text-lg" data-testid="no-products-found">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="mt-12 text-center">
          <div className="bg-dark-accent p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-muted-gray" data-testid="affiliate-disclosure">
              <Info className="inline mr-2 h-4 w-4" />
              We earn a small commission from purchases made through our affiliate links. This helps us maintain the site and provide free content without additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

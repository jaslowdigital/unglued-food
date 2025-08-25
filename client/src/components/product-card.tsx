import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getBadgeColor = (badge: string | null) => {
    if (!badge) return "bg-muted-gray";
    switch (badge) {
      case "Best Seller":
        return "bg-success-green";
      case "Editor's Pick":
        return "bg-warm-orange";
      case "Fresh":
        return "bg-blue-500";
      case "New":
        return "bg-purple-500";
      default:
        return "bg-muted-gray";
    }
  };

  const handleBuyNow = () => {
    // In a real implementation, this would redirect to the affiliate link
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div 
      className="bg-dark-secondary rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
      data-testid={`product-card-${product.id}`}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover bg-white" 
        data-testid={`product-image-${product.id}`}
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {product.badge && (
            <Badge 
              className={`text-xs text-white px-2 py-1 rounded-full font-semibold ${getBadgeColor(product.badge)}`}
              data-testid={`product-badge-${product.id}`}
            >
              {product.badge}
            </Badge>
          )}
          <div className="flex items-center text-warm-amber">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm" data-testid={`product-rating-${product.id}`}>
              {product.rating}
            </span>
          </div>
        </div>
        <h3 className="font-semibold mb-1" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-muted-gray text-sm mb-3" data-testid={`product-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-warm-amber font-bold" data-testid={`product-price-${product.id}`}>
            ${product.price}
          </span>
          <Button 
            onClick={handleBuyNow}
            className="bg-warm-amber text-dark-primary px-3 py-1 rounded text-sm hover:bg-warm-orange transition-colors"
            data-testid={`product-buy-button-${product.id}`}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

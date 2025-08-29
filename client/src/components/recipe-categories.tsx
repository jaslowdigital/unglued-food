import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function RecipeCategories() {
  const categories = [
    {
      title: "Naturally Gluten-Free",
      description: "Fresh produce, meats, and dairy-based recipes",
      recipeCount: "120+",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Baking & Desserts", 
      description: "Gluten-free flours, breads, and sweet treats",
      recipeCount: "85+",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Grain Alternatives",
      description: "Quinoa, rice, and creative substitutions", 
      recipeCount: "95+",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  return (
    <section className="py-16 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4" data-testid="categories-title">
            Browse by Category
          </h2>
          <p className="text-muted-gray max-w-2xl mx-auto" data-testid="categories-description">
            Find exactly what you're looking for with our organized recipe collections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href={index === 0 ? "/naturally-gluten-free" : index === 1 ? "/baking-desserts" : "/grain-alternatives"}
              className="block bg-dark-accent rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              data-testid={`category-card-${index}`}
            >
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`category-title-${index}`}>
                  {category.title}
                </h3>
                <p className="text-muted-gray mb-4" data-testid={`category-description-${index}`}>
                  {category.description}
                </p>
                <div className="flex items-center text-warm-amber">
                  <span className="mr-2" data-testid={`category-count-${index}`}>
                    {category.recipeCount} recipes
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

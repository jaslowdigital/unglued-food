import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ImageTestPage() {
  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ["/api/recipes"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="flex justify-center items-center min-h-screen pt-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-primary text-light-text">
        <Header />
        <div className="container mx-auto p-8 pt-24">
          <p className="text-red-500">Error loading recipes</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-light-text">
      <Header />
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Image Verification - First 20 Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes?.slice(0, 20).map((recipe: any) => (
          <Card key={recipe.slug} className="p-4" data-testid={`test-card-${recipe.slug}`}>
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="text-sm text-gray-600">Slug: {recipe.slug}</p>
                <p className="text-sm text-gray-500 mt-2">{recipe.description}</p>
              </div>
              <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  data-testid={`test-image-${recipe.slug}`}
                />
              </div>
              <div className="text-xs text-gray-400 break-all">
                Image URL: {recipe.image?.substring(0, 80)}...
              </div>
            </div>
          </Card>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}
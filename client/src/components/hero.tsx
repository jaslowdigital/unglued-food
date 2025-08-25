import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-16">
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-primary via-dark-primary/80 to-transparent z-10"></div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 leading-tight" data-testid="hero-title">
              Deliciously <span className="text-warm-amber">Gluten-Free</span> Living
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed" data-testid="hero-description">
              Discover amazing recipes, trusted products, and expert guidance for your gluten-free journey. From naturally gluten-free foods to innovative substitutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('recipes')}
                className="bg-gradient-to-r from-warm-amber to-warm-orange hover:from-warm-orange hover:to-warm-amber text-dark-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                data-testid="button-explore-recipes"
              >
                Explore Recipes
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('education')}
                className="border border-warm-amber text-warm-amber hover:bg-warm-amber hover:text-dark-primary px-8 py-3 rounded-lg transition-all duration-300"
                data-testid="button-start-learning"
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

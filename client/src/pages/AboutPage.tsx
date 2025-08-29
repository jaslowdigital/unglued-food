import { ArrowLeft, Heart, Users, Award, Target } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  const teamValues = [
    {
      icon: Heart,
      title: "Passion for Health",
      description: "We're dedicated to making gluten-free living delicious and accessible for everyone."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive community where everyone can share experiences and learn together."
    },
    {
      icon: Award,
      title: "Quality Content",
      description: "Every recipe is tested and every product recommendation is carefully curated."
    },
    {
      icon: Target,
      title: "Clear Mission",
      description: "Empowering people to thrive with confidence on their gluten-free journey."
    }
  ];

  const stats = [
    { number: "100+", label: "Tested Recipes" },
    { number: "50K+", label: "Community Members" },
    { number: "500+", label: "Products Reviewed" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <button 
              className="flex items-center text-warm-amber hover:text-warm-orange transition-colors mb-8"
              data-testid="back-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-playfair font-bold mb-6" data-testid="page-title">
              About Unglued Food
            </h1>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              We're passionate about proving that gluten-free doesn't mean flavor-free. 
              Our mission is to help you discover the joy of delicious, safe, and nutritious gluten-free living.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-dark-secondary rounded-xl p-6" data-testid={`stat-${index}`}>
                <div className="text-3xl font-bold text-warm-amber mb-2">{stat.number}</div>
                <div className="text-muted-gray">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Our Story
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-gray leading-relaxed">
                  Unglued Food was born from a personal journey of discovery and adaptation. When our founder 
                  was diagnosed with celiac disease, the world of food suddenly became a minefield of uncertainty 
                  and restriction.
                </p>
                <p className="text-muted-gray leading-relaxed">
                  But instead of accepting a life of bland alternatives, we embarked on a mission to prove that 
                  gluten-free cooking could be every bit as delicious, creative, and satisfying as traditional cooking.
                </p>
                <p className="text-muted-gray leading-relaxed">
                  Today, we're proud to be a trusted resource for thousands of people navigating their own 
                  gluten-free journeys, offering tested recipes, honest product reviews, and a supportive community.
                </p>
              </div>
              <div className="bg-dark-secondary rounded-xl p-8 text-center">
                <div className="w-24 h-24 bg-warm-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-warm-amber" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Made with Love</h3>
                <p className="text-muted-gray">
                  Every recipe is crafted with care, tested multiple times, and refined until it's perfect.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              What Drives Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamValues.map((value, index) => (
                <div key={index} className="bg-dark-secondary rounded-xl p-6 text-center" data-testid={`value-${index}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber/20 rounded-full mb-4">
                    <value.icon className="h-6 w-6 text-warm-amber" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-muted-gray text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-dark-accent rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🧪</div>
                <h3 className="text-xl font-semibold mb-3">Rigorously Tested</h3>
                <p className="text-muted-gray">
                  Every recipe is tested multiple times in real home kitchens to ensure consistent results.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-3">Expert Curation</h3>
                <p className="text-muted-gray">
                  Our product recommendations come from years of experience and honest evaluation.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-gray">
                  We listen to our community and continuously improve based on your feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Join Our Mission */}
          <div className="text-center bg-dark-secondary rounded-xl p-8">
            <h2 className="text-3xl font-playfair font-bold mb-4 text-warm-amber">
              Join Our Mission
            </h2>
            <p className="text-muted-gray mb-6 max-w-2xl mx-auto">
              Whether you're newly diagnosed, a seasoned gluten-free veteran, or supporting someone on their journey, 
              you're welcome in our community. Together, we're proving that gluten-free living can be delicious, 
              creative, and joyful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/all-recipes"
                className="bg-warm-amber text-dark-primary px-6 py-3 rounded-lg font-semibold hover:bg-warm-orange transition-colors"
              >
                Explore Our Recipes
              </Link>
              <Link 
                href="/add-recipe"
                className="border border-warm-amber text-warm-amber px-6 py-3 rounded-lg font-semibold hover:bg-warm-amber hover:text-dark-primary transition-colors"
              >
                Share Your Recipe
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
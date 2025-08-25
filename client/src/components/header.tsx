import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [cartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-dark-primary/95 backdrop-blur-sm border-b border-dark-accent z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-playfair font-bold text-warm-amber cursor-pointer" data-testid="logo">
                Unglued Food
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {location === '/' ? (
                <button 
                  onClick={() => scrollToSection('recipes')}
                  className="hover:text-warm-amber transition-colors duration-200"
                  data-testid="nav-recipes"
                >
                  Featured
                </button>
              ) : (
                <Link href="/" className="hover:text-warm-amber transition-colors duration-200" data-testid="nav-home">
                  Home
                </Link>
              )}
              <Link 
                href="/recipes"
                className="hover:text-warm-amber transition-colors duration-200"
                data-testid="nav-all-recipes"
              >
                All Recipes
              </Link>
              <button 
                onClick={() => scrollToSection('education')}
                className="hover:text-warm-amber transition-colors duration-200"
                data-testid="nav-learn"
              >
                Learn
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="hover:text-warm-amber transition-colors duration-200"
                data-testid="nav-products"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-warm-amber transition-colors duration-200"
                data-testid="nav-about"
              >
                About
              </button>
            </div>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:text-warm-amber transition-colors"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:text-warm-amber transition-colors relative"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-warm-orange text-xs rounded-full h-5 w-5 flex items-center justify-center text-dark-primary font-semibold">
                {cartCount}
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-accent">
            <div className="flex flex-col space-y-4">
              {location === '/' ? (
                <button 
                  onClick={() => scrollToSection('recipes')}
                  className="text-left hover:text-warm-amber transition-colors"
                  data-testid="mobile-nav-recipes"
                >
                  Featured
                </button>
              ) : (
                <Link href="/" className="text-left hover:text-warm-amber transition-colors" data-testid="mobile-nav-home">
                  Home
                </Link>
              )}
              <Link 
                href="/recipes"
                className="text-left hover:text-warm-amber transition-colors"
                data-testid="mobile-nav-all-recipes"
              >
                All Recipes
              </Link>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-left hover:text-warm-amber transition-colors"
                data-testid="mobile-nav-learn"
              >
                Learn
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-left hover:text-warm-amber transition-colors"
                data-testid="mobile-nav-products"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left hover:text-warm-amber transition-colors"
                data-testid="mobile-nav-about"
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

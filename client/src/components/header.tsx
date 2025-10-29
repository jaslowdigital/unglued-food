import { useState } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [cartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:text-warm-amber transition-colors duration-200 flex items-center gap-1" data-testid="nav-categories">
                    Categories <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-dark-secondary border-dark-accent w-64">
                  <DropdownMenuLabel className="text-warm-amber">Recipe Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-dark-accent" />
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Desserts" className="flex justify-between items-center cursor-pointer">
                      <span>Desserts</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 30-45 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Breads" className="flex justify-between items-center cursor-pointer">
                      <span>Breads</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 60-90 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Pizza" className="flex justify-between items-center cursor-pointer">
                      <span>Pizza & Focaccia</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 120-150 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Entrees" className="flex justify-between items-center cursor-pointer">
                      <span>Entrees</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 45-60 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Scones" className="flex justify-between items-center cursor-pointer">
                      <span>Scones</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 25-30 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Soups" className="flex justify-between items-center cursor-pointer">
                      <span>Soups & Stews</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 30-60 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recipes?category=Sides" className="flex justify-between items-center cursor-pointer">
                      <span>Sides</span>
                      <span className="text-xs text-muted-gray flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 20-30 min
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-dark-accent" />
                  <DropdownMenuItem asChild>
                    <Link href="/recipes" className="cursor-pointer text-warm-amber">
                      View All Categories →
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link 
                href="/add-recipe"
                className="hover:text-warm-amber transition-colors duration-200"
                data-testid="nav-add-recipe"
              >
                Add Recipe
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
              onClick={openSearch}
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
              <div className="pl-4 space-y-2 border-l-2 border-dark-accent">
                <p className="text-xs text-warm-amber font-semibold mb-2">Categories</p>
                <Link href="/recipes?category=Desserts" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Desserts</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 30-45 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Breads" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Breads</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 60-90 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Pizza" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Pizza & Focaccia</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 120-150 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Entrees" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Entrees</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 45-60 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Scones" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Scones</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 25-30 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Soups" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Soups & Stews</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 30-60 min
                    </span>
                  </div>
                </Link>
                <Link href="/recipes?category=Sides" className="block text-sm hover:text-warm-amber transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex justify-between items-center">
                    <span>Sides</span>
                    <span className="text-xs text-muted-gray flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 20-30 min
                    </span>
                  </div>
                </Link>
              </div>
              <Link 
                href="/add-recipe"
                className="text-left hover:text-warm-amber transition-colors"
                data-testid="mobile-nav-add-recipe"
              >
                Add Recipe
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

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[500px] bg-dark-secondary border-dark-accent">
          <DialogHeader>
            <DialogTitle className="text-warm-amber font-playfair text-2xl">
              Search Recipes
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for recipes, ingredients, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-primary border-dark-accent focus:border-warm-amber text-light-primary placeholder:text-muted-foreground"
                autoFocus
                data-testid="input-search-query"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSearchOpen(false)}
                className="border-dark-accent hover:bg-dark-accent"
                data-testid="button-cancel-search"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-warm-amber hover:bg-warm-orange text-dark-primary font-semibold"
                disabled={!searchQuery.trim()}
                data-testid="button-submit-search"
              >
                Search
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}

import { ArrowLeft, ShoppingCart, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ShoppingGuidePage() {
  const shoppingTips = [
    {
      title: "Start with the Perimeter",
      content: "Shop the outer edges of the store first - fresh produce, meats, and dairy are naturally gluten-free.",
      icon: ShoppingCart
    },
    {
      title: "Read Every Label",
      content: "Even products that seem safe can contain hidden gluten. Always check the ingredient list.",
      icon: AlertTriangle
    },
    {
      title: "Look for Certification",
      content: "Certified gluten-free symbols guarantee the product meets strict safety standards.",
      icon: CheckCircle
    },
    {
      title: "Budget Wisely",
      content: "Mix expensive specialty items with affordable naturally gluten-free staples.",
      icon: DollarSign
    }
  ];

  const essentialItems = {
    "Pantry Staples": [
      "Certified gluten-free oats",
      "Rice (brown, white, wild)",
      "Quinoa",
      "Gluten-free pasta",
      "Rice cakes",
      "Gluten-free bread",
      "Certified GF flour blends",
      "Coconut flour",
      "Almond flour"
    ],
    "Fresh & Frozen": [
      "Fresh fruits and vegetables",
      "Frozen vegetables (check labels)",
      "Fresh meats and poultry",
      "Fish and seafood",
      "Eggs",
      "Plain yogurt",
      "Cheese (check processed varieties)",
      "Milk and dairy alternatives"
    ],
    "Condiments & Sauces": [
      "Tamari (gluten-free soy sauce)",
      "Apple cider vinegar",
      "Coconut aminos",
      "GF mustard",
      "Pure vanilla extract",
      "Olive oil",
      "Coconut oil",
      "Hot sauce (check labels)"
    ]
  };

  const avoidList = [
    "Regular soy sauce",
    "Wheat-based pasta",
    "Regular bread and baked goods",
    "Beer (unless GF)",
    "Processed meats with fillers",
    "Soup mixes and bouillon cubes",
    "Flavored rice mixes",
    "Imitation crab meat"
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

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold mb-4" data-testid="page-title">
              Gluten-Free Shopping Guide
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Navigate the grocery store with confidence. Learn what to buy, what to avoid, 
              and how to shop smart for gluten-free living.
            </p>
          </div>

          {/* Shopping Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {shoppingTips.map((tip, index) => (
              <div key={index} className="bg-dark-secondary rounded-xl p-6 text-center" data-testid={`tip-${index}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber/20 rounded-full mb-4">
                  <tip.icon className="h-6 w-6 text-warm-amber" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{tip.title}</h3>
                <p className="text-muted-gray text-sm">{tip.content}</p>
              </div>
            ))}
          </div>

          {/* Essential Shopping List */}
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Essential Gluten-Free Shopping List
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(essentialItems).map(([category, items], categoryIndex) => (
                <div key={categoryIndex} className="bg-dark-secondary rounded-xl p-6" data-testid={`category-${categoryIndex}`}>
                  <h3 className="text-xl font-semibold mb-4 text-warm-amber">{category}</h3>
                  <ul className="space-y-2">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-muted-gray">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Items to Avoid */}
          <div className="bg-dark-accent rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold text-red-400 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3" />
              Common Items to Avoid
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {avoidList.map((item, index) => (
                <div key={index} className="flex items-center bg-dark-secondary p-3 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-muted-gray text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Tips */}
          <div className="bg-dark-secondary rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-warm-amber mb-6 flex items-center">
              <DollarSign className="h-6 w-6 mr-3" />
              Budget-Friendly Shopping Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Buy in Bulk</h3>
                    <p className="text-muted-gray text-sm">Purchase rice, quinoa, and GF oats from bulk bins when available.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Store Brands</h3>
                    <p className="text-muted-gray text-sm">Many stores offer affordable gluten-free store brand options.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Seasonal Shopping</h3>
                    <p className="text-muted-gray text-sm">Buy produce in season and freeze or preserve for later use.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Make from Scratch</h3>
                    <p className="text-muted-gray text-sm">Homemade GF bread and baked goods cost less than store-bought.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Use Coupons & Apps</h3>
                    <p className="text-muted-gray text-sm">Download manufacturer coupons and cashback apps for savings.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Focus on Whole Foods</h3>
                    <p className="text-muted-gray text-sm">Fresh ingredients are often cheaper than processed GF alternatives.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
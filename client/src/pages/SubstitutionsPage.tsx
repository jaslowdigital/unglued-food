import { ArrowLeft, ChefHat, Wheat, Scale, Clock } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SubstitutionsPage() {
  const flourSubstitutions = [
    {
      flour: "All-Purpose Flour",
      substitute: "GF Flour Blend (1:1 ratio)",
      notes: "Works best for most recipes. Add xanthan gum if not included in blend."
    },
    {
      flour: "Bread Flour",
      substitute: "GF Bread Flour or High-Protein GF Blend",
      notes: "Look for blends with higher protein content for better structure."
    },
    {
      flour: "Cake Flour",
      substitute: "GF Flour Blend + Cornstarch",
      notes: "Use 3/4 cup GF blend + 1/4 cup cornstarch per cup of cake flour."
    },
    {
      flour: "Self-Rising Flour",
      substitute: "GF Flour + Baking Powder + Salt",
      notes: "1 cup GF flour + 1½ tsp baking powder + ¼ tsp salt."
    }
  ];

  const ingredientSubstitutions = [
    {
      category: "Breadcrumbs",
      original: "Regular breadcrumbs",
      substitute: "GF breadcrumbs, crushed GF crackers, or ground nuts",
      ratio: "1:1 ratio"
    },
    {
      category: "Soy Sauce",
      original: "Regular soy sauce",
      substitute: "Tamari or coconut aminos",
      ratio: "1:1 ratio"
    },
    {
      category: "Beer",
      original: "Regular beer",
      substitute: "GF beer, wine, or broth",
      ratio: "1:1 ratio for cooking"
    },
    {
      category: "Pasta",
      original: "Wheat pasta",
      substitute: "Rice, corn, quinoa, or legume pasta",
      ratio: "Same cooking method, check timing"
    },
    {
      category: "Oats",
      original: "Regular oats",
      substitute: "Certified gluten-free oats",
      ratio: "1:1 ratio"
    },
    {
      category: "Barley",
      original: "Pearl barley",
      substitute: "Rice, quinoa, or certified GF barley",
      ratio: "Adjust cooking time as needed"
    }
  ];

  const bakingTips = [
    {
      title: "Add Binding Agents",
      content: "GF flours need help sticking together. Add xanthan or guar gum if your blend doesn't include it.",
      icon: ChefHat
    },
    {
      title: "Increase Moisture",
      content: "GF baked goods can be dry. Add extra eggs, oil, or moisture-rich ingredients like applesauce.",
      icon: Scale
    },
    {
      title: "Allow Rest Time",
      content: "Let GF batters and doughs rest for 15-30 minutes before baking for better hydration.",
      icon: Clock
    },
    {
      title: "Check Doneness",
      content: "GF baked goods may need different baking times. Use a toothpick to test doneness.",
      icon: Wheat
    }
  ];

  const conversionChart = [
    {
      measurement: "1 cup all-purpose flour",
      gfOptions: [
        "1 cup GF flour blend (1:1 replacement)",
        "¾ cup rice flour + ¼ cup potato starch",
        "½ cup rice flour + ½ cup almond flour (for cookies)",
        "¾ cup oat flour + ¼ cup tapioca starch"
      ]
    },
    {
      measurement: "1 tablespoon wheat flour (for thickening)",
      gfOptions: [
        "1 tablespoon cornstarch",
        "1 tablespoon arrowroot powder",
        "1 tablespoon tapioca starch",
        "2 tablespoons rice flour"
      ]
    }
  ];

  const xanthanGumGuide = [
    { item: "Cookies", amount: "¼ teaspoon per cup of flour" },
    { item: "Muffins & Quick Breads", amount: "½ teaspoon per cup of flour" },
    { item: "Cakes", amount: "¾ teaspoon per cup of flour" },
    { item: "Bread", amount: "1 teaspoon per cup of flour" },
    { item: "Pizza Dough", amount: "1-2 teaspoons per cup of flour" }
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
              Gluten-Free Substitutions
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Master the art of gluten-free substitutions with our comprehensive guide. 
              Convert any recipe to gluten-free with confidence using these tested ratios and techniques.
            </p>
          </div>

          {/* Baking Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {bakingTips.map((tip, index) => (
              <div key={index} className="bg-dark-secondary rounded-xl p-6 text-center" data-testid={`baking-tip-${index}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber/20 rounded-full mb-4">
                  <tip.icon className="h-6 w-6 text-warm-amber" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{tip.title}</h3>
                <p className="text-muted-gray text-sm">{tip.content}</p>
              </div>
            ))}
          </div>

          {/* Flour Substitutions */}
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Flour Substitutions
            </h2>
            <div className="bg-dark-secondary rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left" data-testid="flour-substitutions-table">
                  <thead>
                    <tr className="border-b border-dark-accent">
                      <th className="pb-4 text-warm-amber font-semibold">Original Flour</th>
                      <th className="pb-4 text-warm-amber font-semibold">GF Substitute</th>
                      <th className="pb-4 text-warm-amber font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flourSubstitutions.map((sub, index) => (
                      <tr key={index} className="border-b border-dark-accent/30">
                        <td className="py-4 font-medium text-white">{sub.flour}</td>
                        <td className="py-4 text-muted-gray">{sub.substitute}</td>
                        <td className="py-4 text-muted-gray text-sm">{sub.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ingredient Substitutions */}
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Common Ingredient Substitutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ingredientSubstitutions.map((sub, index) => (
                <div key={index} className="bg-dark-secondary rounded-xl p-6" data-testid={`ingredient-sub-${index}`}>
                  <div className="mb-3">
                    <span className="inline-block bg-warm-amber/20 text-warm-amber px-2 py-1 rounded-full text-sm font-semibold">
                      {sub.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">✗</span>
                      <span className="text-muted-gray">{sub.original}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-white font-medium">{sub.substitute}</span>
                    </div>
                    <p className="text-muted-gray text-sm mt-2">{sub.ratio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Chart */}
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Flour Conversion Chart
            </h2>
            <div className="bg-dark-secondary rounded-xl p-6">
              {conversionChart.map((conversion, index) => (
                <div key={index} className="mb-6 last:mb-0" data-testid={`conversion-${index}`}>
                  <h3 className="text-white font-semibold mb-3">{conversion.measurement}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {conversion.gfOptions.map((option, optionIndex) => (
                      <div key={optionIndex} className="bg-dark-accent p-3 rounded-lg flex items-center">
                        <span className="text-green-400 mr-2">→</span>
                        <span className="text-muted-gray text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Xanthan Gum Guide */}
          <div className="bg-dark-accent rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-warm-amber mb-6 flex items-center">
              <ChefHat className="h-6 w-6 mr-3" />
              Xanthan Gum Usage Guide
            </h2>
            <p className="text-muted-gray mb-6">
              Xanthan gum helps bind gluten-free flours and improves texture. Here's how much to use:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {xanthanGumGuide.map((item, index) => (
                <div key={index} className="bg-dark-secondary p-4 rounded-lg" data-testid={`xanthan-guide-${index}`}>
                  <h3 className="font-semibold text-white mb-2">{item.item}</h3>
                  <p className="text-warm-amber text-sm">{item.amount}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-warm-amber/10 rounded-lg">
              <p className="text-sm text-warm-amber">
                <strong>Tip:</strong> If your gluten-free flour blend already contains xanthan gum, 
                you don't need to add more. Check the ingredient list on your flour package.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { ArrowLeft, Search, AlertTriangle, CheckCircle, Eye } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LabelReadingPage() {
  const hiddenGlutenSources = [
    "Malt (barley malt, malt extract, malt flavoring)",
    "Brewer's yeast",
    "Wheat starch (unless labeled GF)",
    "Modified food starch (if from wheat)",
    "Hydrolyzed wheat protein",
    "Wheat germ oil",
    "Triticale",
    "Seitan",
    "Vital wheat gluten",
    "Bulgur",
    "Durum",
    "Semolina",
    "Graham flour",
    "Faro/Farro",
    "Spelt",
    "Kamut",
    "Einkorn",
    "Emmer"
  ];

  const safeIngredients = [
    "Rice flour",
    "Corn starch",
    "Potato starch",
    "Tapioca starch",
    "Almond flour",
    "Coconut flour",
    "Quinoa flour",
    "Buckwheat flour",
    "Arrowroot powder",
    "Xanthan gum",
    "Guar gum"
  ];

  const certificationSymbols = [
    {
      name: "Certified Gluten-Free",
      description: "Products with this symbol have been tested and verified to contain less than 10 ppm of gluten."
    },
    {
      name: "GFCO Certification",
      description: "Gluten-Free Certification Organization symbol ensures products meet strict gluten-free standards."
    },
    {
      name: "NSF Gluten-Free",
      description: "NSF International certification for gluten-free products with rigorous testing requirements."
    }
  ];

  const labelTips = [
    {
      title: "Read the Allergen Statement",
      content: "Look for 'Contains: Wheat' warnings, but remember that absence doesn't guarantee gluten-free.",
      icon: AlertTriangle
    },
    {
      title: "Check the Ingredient List",
      content: "Ingredients are listed by weight. Scan the entire list for hidden gluten sources.",
      icon: Search
    },
    {
      title: "Look for Certification",
      content: "Certified gluten-free symbols provide the highest level of safety assurance.",
      icon: CheckCircle
    },
    {
      title: "When in Doubt, Don't",
      content: "If you're unsure about an ingredient or product, it's better to avoid it until you can verify.",
      icon: Eye
    }
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
              Label Reading Guide
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Master the art of reading food labels to identify hidden gluten and make safe choices. 
              Your essential guide to spotting gluten in ingredient lists.
            </p>
          </div>

          {/* Label Reading Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {labelTips.map((tip, index) => (
              <div key={index} className="bg-dark-secondary rounded-xl p-6 text-center" data-testid={`tip-${index}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber/20 rounded-full mb-4">
                  <tip.icon className="h-6 w-6 text-warm-amber" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{tip.title}</h3>
                <p className="text-muted-gray text-sm">{tip.content}</p>
              </div>
            ))}
          </div>

          {/* Hidden Gluten Sources vs Safe Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Hidden Gluten Sources */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="hidden-gluten">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-red-400">Hidden Gluten Sources</h2>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {hiddenGlutenSources.map((source, index) => (
                  <div key={index} className="flex items-start bg-red-500/10 p-3 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-gray text-sm">{source}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                <p className="text-sm text-red-300">
                  <strong>Important:</strong> This list is not exhaustive. Always verify ingredients with manufacturers when uncertain.
                </p>
              </div>
            </div>

            {/* Safe Ingredients */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="safe-ingredients">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-green-400">Safe Gluten-Free Ingredients</h2>
              </div>
              <div className="space-y-2">
                {safeIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start bg-green-500/10 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-gray text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                <p className="text-sm text-green-300">
                  <strong>Note:</strong> These ingredients are naturally gluten-free but can be subject to cross-contamination during processing.
                </p>
              </div>
            </div>
          </div>

          {/* Certification Symbols */}
          <div className="bg-dark-accent rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold text-warm-amber mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3" />
              Certification Symbols to Look For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificationSymbols.map((cert, index) => (
                <div key={index} className="bg-dark-secondary p-4 rounded-lg text-center" data-testid={`cert-${index}`}>
                  <div className="w-16 h-16 bg-warm-amber/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-warm-amber" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{cert.name}</h3>
                  <p className="text-muted-gray text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Label Reading Process */}
          <div className="bg-dark-secondary rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-warm-amber mb-6">
              Step-by-Step Label Reading Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-amber text-dark-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  1
                </div>
                <h3 className="font-semibold mb-2 text-white">Look for Certifications</h3>
                <p className="text-muted-gray text-sm">Check for gluten-free certification symbols first.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-amber text-dark-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  2
                </div>
                <h3 className="font-semibold mb-2 text-white">Read Allergen Statement</h3>
                <p className="text-muted-gray text-sm">Check for "Contains: Wheat" warnings at the bottom.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-amber text-dark-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  3
                </div>
                <h3 className="font-semibold mb-2 text-white">Scan Ingredients</h3>
                <p className="text-muted-gray text-sm">Read the entire ingredient list for hidden gluten sources.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-amber text-dark-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  4
                </div>
                <h3 className="font-semibold mb-2 text-white">Research Unknown Terms</h3>
                <p className="text-muted-gray text-sm">Look up unfamiliar ingredients before consuming.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
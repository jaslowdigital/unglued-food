import { ArrowLeft, Home, AlertTriangle, CheckCircle, Utensils, Shield } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CrossContaminationPage() {
  const kitchenTips = [
    {
      title: "Separate Storage",
      content: "Store gluten-free items in sealed containers, preferably on higher shelves to avoid crumbs falling from above.",
      icon: Home
    },
    {
      title: "Dedicated Tools",
      content: "Use separate cutting boards, toasters, and utensils for gluten-free cooking, or thoroughly clean between uses.",
      icon: Utensils
    },
    {
      title: "Clean Surfaces",
      content: "Always clean counters and cooking surfaces thoroughly before preparing gluten-free foods.",
      icon: Shield
    },
    {
      title: "Be Mindful of Oils",
      content: "Don't reuse oil that has been used to fry gluten-containing foods. Use fresh oil for gluten-free frying.",
      icon: AlertTriangle
    }
  ];

  const commonSources = [
    "Shared toasters",
    "Contaminated cutting boards",
    "Flour dust in the air",
    "Shared condiment jars (double-dipping)",
    "Pasta cooking water",
    "Shared fryer oil",
    "Breadcrumb residue",
    "Contaminated work surfaces",
    "Shared colanders and strainers",
    "Wooden utensils with deep grooves"
  ];

  const preventionSteps = [
    {
      step: "Clean Everything First",
      description: "Start with a completely clean kitchen. Wash all surfaces, utensils, and equipment with soap and hot water."
    },
    {
      step: "Use the 'Bottom-Up' Rule",
      description: "Store gluten-free items on higher shelves to prevent contamination from crumbs falling down."
    },
    {
      step: "Label Everything",
      description: "Clearly label gluten-free containers, condiments, and designated kitchen tools to avoid mix-ups."
    },
    {
      step: "Create GF Zones",
      description: "Designate specific areas of your kitchen for gluten-free food preparation and storage."
    },
    {
      step: "Wash Hands Frequently",
      description: "Wash hands thoroughly after handling gluten-containing foods before touching gluten-free items."
    },
    {
      step: "Check Everything Twice",
      description: "Double-check all ingredients, tools, and surfaces before preparing gluten-free meals."
    }
  ];

  const restaurantTips = [
    "Ask about dedicated gluten-free preparation areas",
    "Inquire about separate fryers for gluten-free items",
    "Request that your meal be prepared on a clean surface",
    "Ask if they use separate utensils for gluten-free cooking",
    "Verify that condiments come from separate containers",
    "Ask about ingredients in sauces and seasonings",
    "Request your salad be made in a clean bowl",
    "Ask if the grill is cleaned before cooking your food"
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
              Preventing Cross-Contamination
            </h1>
            <p className="text-muted-gray max-w-3xl mx-auto text-lg" data-testid="page-description">
              Learn how to keep your gluten-free foods safe from contamination at home, 
              while dining out, and in shared kitchen spaces.
            </p>
          </div>

          {/* What is Cross-Contamination */}
          <div className="bg-dark-secondary rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold text-warm-amber mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3" />
              What is Cross-Contamination?
            </h2>
            <p className="text-muted-gray mb-4">
              Cross-contamination occurs when gluten-free foods come into contact with gluten-containing foods, 
              surfaces, or utensils. Even tiny amounts (as little as 20 parts per million) can cause reactions 
              in people with celiac disease.
            </p>
            <p className="text-muted-gray">
              For those with celiac disease, cross-contamination can trigger symptoms and intestinal damage, 
              making prevention absolutely essential for maintaining health.
            </p>
          </div>

          {/* Kitchen Safety Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-warm-amber">
              Kitchen Safety Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kitchenTips.map((tip, index) => (
                <div key={index} className="bg-dark-secondary rounded-xl p-6 text-center" data-testid={`kitchen-tip-${index}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber/20 rounded-full mb-4">
                    <tip.icon className="h-6 w-6 text-warm-amber" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{tip.title}</h3>
                  <p className="text-muted-gray text-sm">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Sources & Prevention Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Common Sources */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="common-sources">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-red-400">Common Sources</h2>
              </div>
              <div className="space-y-2">
                {commonSources.map((source, index) => (
                  <div key={index} className="flex items-start bg-red-500/10 p-3 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-gray text-sm">{source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Steps */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="prevention-steps">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-green-400">Prevention Steps</h2>
              </div>
              <div className="space-y-4">
                {preventionSteps.map((step, index) => (
                  <div key={index} className="bg-green-500/10 p-3 rounded-lg">
                    <h3 className="font-semibold text-white mb-1">{step.step}</h3>
                    <p className="text-muted-gray text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dining Out Safety */}
          <div className="bg-dark-accent rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold text-warm-amber mb-6 flex items-center">
              <Utensils className="h-6 w-6 mr-3" />
              Dining Out Safely
            </h2>
            <p className="text-muted-gray mb-6">
              When eating at restaurants, communication is key. Don't be afraid to ask detailed questions about 
              food preparation methods and ingredients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurantTips.map((tip, index) => (
                <div key={index} className="flex items-start bg-dark-secondary p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-gray text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Protocol */}
          <div className="bg-dark-secondary rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3" />
              What to Do If Contamination Occurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-400 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Stop Eating</h3>
                <p className="text-muted-gray text-sm">Immediately stop consuming the contaminated food.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-400 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Clean Thoroughly</h3>
                <p className="text-muted-gray text-sm">Wash your mouth and hands, clean all surfaces and utensils.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-400 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Monitor Symptoms</h3>
                <p className="text-muted-gray text-sm">Watch for reactions and consult your healthcare provider if needed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
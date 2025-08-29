import { ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function GlutenFreeBasicsPage() {
  const basicSections = [
    {
      title: "What is Gluten?",
      content: "Gluten is a protein found in wheat, barley, rye, and derivatives of these grains. It gives bread its chewy texture and helps baked goods hold their shape. For people with celiac disease, non-celiac gluten sensitivity, or wheat allergies, consuming gluten can cause serious health problems."
    },
    {
      title: "Who Needs to Avoid Gluten?",
      content: "People with celiac disease (1% of population), non-celiac gluten sensitivity (estimated 6% of population), or wheat allergies must avoid gluten. Some people also choose a gluten-free lifestyle for other health reasons."
    },
    {
      title: "Hidden Sources of Gluten",
      content: "Gluten can hide in unexpected places like soy sauce, salad dressings, processed meats, soups, and even medications. Always read labels carefully and look for certified gluten-free products when in doubt."
    }
  ];

  const safeGrains = [
    "Rice (all varieties)", "Quinoa", "Corn", "Oats (certified GF)", 
    "Buckwheat", "Amaranth", "Millet", "Teff", "Sorghum"
  ];

  const avoidGrains = [
    "Wheat", "Barley", "Rye", "Triticale", "Bulgur", "Durum", "Semolina", 
    "Spelt", "Kamut", "Einkorn", "Emmer", "Farro"
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Gluten-Free Basics
            </h1>
            <p className="text-muted-gray max-w-2xl mx-auto text-lg" data-testid="page-description">
              Your comprehensive guide to understanding gluten-free living, from the basics to advanced tips.
            </p>
          </div>

          {/* Basic Information Sections */}
          <div className="space-y-8 mb-12">
            {basicSections.map((section, index) => (
              <div key={index} className="bg-dark-secondary rounded-xl p-6" data-testid={`section-${index}`}>
                <h2 className="text-2xl font-semibold text-warm-amber mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-gray leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Safe vs Avoid Grains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Safe Grains */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="safe-grains">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-green-400">Safe Grains & Starches</h2>
              </div>
              <ul className="space-y-2">
                {safeGrains.map((grain, index) => (
                  <li key={index} className="flex items-center text-muted-gray">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {grain}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-300">
                    Always look for "certified gluten-free" labels, especially for oats, as cross-contamination can occur.
                  </p>
                </div>
              </div>
            </div>

            {/* Grains to Avoid */}
            <div className="bg-dark-secondary rounded-xl p-6" data-testid="avoid-grains">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-red-400">Grains to Avoid</h2>
              </div>
              <ul className="space-y-2">
                {avoidGrains.map((grain, index) => (
                  <li key={index} className="flex items-center text-muted-gray">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                    {grain}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-300">
                    These grains and their derivatives should be completely avoided if you have celiac disease or gluten sensitivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Tips */}
          <div className="bg-dark-accent rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-warm-amber mb-4">
              Essential Tips for Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Always read ingredient labels carefully</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Look for certified gluten-free symbols</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Prevent cross-contamination in your kitchen</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Start with naturally gluten-free foods</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Focus on whole foods and fresh ingredients</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-warm-amber mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-gray">Connect with the gluten-free community</p>
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
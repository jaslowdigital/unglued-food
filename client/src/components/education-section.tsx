import { Info, Leaf, AlertTriangle, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EducationSection() {
  const educationCards = [
    {
      icon: Info,
      title: "What Does Gluten-Free Mean?",
      description: "Gluten-free means containing less than 20 parts per million of gluten - a protein found in wheat, barley, and rye. Essential for those with celiac disease or gluten sensitivity.",
      iconColor: "text-warm-amber",
      bgColor: "bg-warm-amber/20"
    },
    {
      icon: Leaf,
      title: "Naturally Gluten-Free Foods",
      description: "Fresh fruits and vegetables, unprocessed meats, fish, dairy, nuts, legumes, and gluten-free grains like rice, quinoa, and corn are naturally safe.",
      iconColor: "text-success-green",
      bgColor: "bg-success-green/20"
    },
    {
      icon: AlertTriangle,
      title: "Foods to Avoid",
      description: "Wheat, rye, barley, and their derivatives including bread, pasta, crackers, and many processed foods. Always check labels for hidden gluten sources.",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/20"
    }
  ];

  const shoppingTips = [
    "Read ingredient labels carefully for wheat, rye, and barley",
    "Look for certified \"gluten-free\" labels",
    "Be aware of cross-contamination risks",
    "Check oats for \"gluten-free\" certification"
  ];

  return (
    <section id="education" className="py-16 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4" data-testid="education-title">
            Learn About Gluten-Free Living
          </h2>
          <p className="text-muted-gray max-w-3xl mx-auto" data-testid="education-description">
            Master the fundamentals of gluten-free cooking and shopping with our comprehensive guides
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Educational Content */}
          <div>
            <div className="space-y-8">
              {educationCards.map((card, index) => (
                <div key={index} className="bg-dark-accent p-6 rounded-xl" data-testid={`education-card-${index}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                      <card.icon className={`${card.iconColor} text-xl h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" data-testid={`education-card-title-${index}`}>
                        {card.title}
                      </h3>
                      <p className="text-muted-gray mb-4" data-testid={`education-card-description-${index}`}>
                        {card.description}
                      </p>
                      <button 
                        className="text-warm-amber hover:text-warm-orange transition-colors"
                        data-testid={`education-card-link-${index}`}
                      >
                        Learn More <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Guide */}
          <div className="space-y-6">
            {/* Shopping Tips Card */}
            <div className="bg-gradient-to-br from-warm-amber/10 to-warm-orange/10 border border-warm-amber/20 rounded-xl p-8">
              <h3 className="text-2xl font-playfair font-semibold mb-6" data-testid="shopping-tips-title">
                Smart Shopping Tips
              </h3>
              <div className="space-y-4">
                {shoppingTips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-3" data-testid={`shopping-tip-${index}`}>
                    <div className="w-6 h-6 bg-warm-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="text-dark-primary text-sm h-4 w-4" />
                    </div>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Guide CTA */}
            <div className="text-center bg-dark-accent p-6 rounded-xl">
              <div className="w-20 h-20 bg-warm-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-warm-amber text-2xl h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2" data-testid="download-guide-title">
                Free Shopping Guide
              </h4>
              <p className="text-muted-gray mb-4 text-sm" data-testid="download-guide-description">
                Get our comprehensive PDF guide with shopping lists, label reading tips, and brand recommendations.
              </p>
              <Button 
                className="bg-warm-amber text-dark-primary px-6 py-2 rounded-lg hover:bg-warm-orange transition-colors font-semibold"
                data-testid="button-download-guide"
              >
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

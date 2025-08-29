import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiPinterest } from "react-icons/si";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Recipes",
      links: [
        { label: "Breakfast", href: "#" },
        { label: "Lunch & Dinner", href: "#" },
        { label: "Desserts", href: "#" },
        { label: "Baking", href: "#" },
        { label: "Quick Meals", href: "#" }
      ]
    },
    {
      title: "Learn",
      links: [
        { label: "Gluten-Free Basics", href: "/gluten-free-basics" },
        { label: "Shopping Guide", href: "/shopping-guide" },
        { label: "Label Reading", href: "/label-reading" },
        { label: "Cross-Contamination", href: "/cross-contamination" },
        { label: "Substitutions", href: "/substitutions" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Affiliate Disclosure", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: SiPinterest, href: "#", label: "Pinterest" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer id="about" className="bg-dark-primary border-t border-dark-accent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-playfair font-bold text-warm-amber mb-4" data-testid="footer-brand">
              Unglued Food
            </h3>
            <p className="text-muted-gray mb-6" data-testid="footer-brand-description">
              Your trusted source for delicious gluten-free recipes and quality product recommendations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-muted-gray hover:text-warm-amber transition-colors"
                  aria-label={social.label}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4 className="font-semibold mb-4" data-testid={`footer-section-title-${sectionIndex}`}>
                {section.title}
              </h4>
              <ul className="space-y-2 text-muted-gray">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        className="hover:text-warm-amber transition-colors"
                        data-testid={`footer-link-${sectionIndex}-${linkIndex}`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="hover:text-warm-amber transition-colors"
                        data-testid={`footer-link-${sectionIndex}-${linkIndex}`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-accent mt-12 pt-8 text-center text-muted-gray">
          <p data-testid="footer-copyright">
            &copy; {currentYear} Unglued Food. All rights reserved. Made with ❤️ for the gluten-free community.
          </p>
          <div className="mt-4 pt-4 border-t border-dark-accent/30">
            <Link 
              href="/admin" 
              className="text-xs text-muted-gray/70 hover:text-warm-amber transition-colors"
              data-testid="footer-admin-link"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

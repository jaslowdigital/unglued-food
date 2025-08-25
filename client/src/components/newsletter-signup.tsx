import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to the Unglued Food community. Check your email for a confirmation.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    subscribeMutation.mutate(email);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-dark-secondary to-dark-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-dark-primary/30 backdrop-blur-sm rounded-2xl p-12 border border-warm-amber/20">
          <h2 className="text-3xl font-playfair font-bold mb-4" data-testid="newsletter-title">
            Stay Updated
          </h2>
          <p className="text-muted-gray mb-8 max-w-2xl mx-auto" data-testid="newsletter-description">
            Get weekly recipes, product recommendations, and gluten-free living tips delivered to your inbox.
          </p>
          
          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-dark-accent text-light-text border-dark-accent focus:border-warm-amber"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-gradient-to-r from-warm-amber to-warm-orange text-dark-primary font-semibold px-8 py-3 rounded-lg hover:from-warm-orange hover:to-warm-amber transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-newsletter-subscribe"
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-muted-gray mt-4" data-testid="newsletter-privacy">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}

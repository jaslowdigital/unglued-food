import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FacebookBrowserBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);

  useEffect(() => {
    // Check if user is in Facebook in-app browser
    const userAgent = navigator.userAgent || navigator.vendor || '';
    const isFB = userAgent.includes('FBAN') || userAgent.includes('FBAV');
    
    // Check if user has dismissed the banner before
    const isDismissed = localStorage.getItem('fbBrowserBannerDismissed') === 'true';
    
    setIsFacebookBrowser(isFB);
    setIsVisible(isFB && !isDismissed);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('fbBrowserBannerDismissed', 'true');
  };

  if (!isFacebookBrowser || !isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed top-16 left-0 right-0 z-40 bg-warm-orange text-dark-primary"
      data-testid="facebook-browser-banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <ExternalLink className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              For the best experience, tap the menu (•••) and select <strong>"Open in Browser"</strong>
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="hover:bg-dark-primary/10 flex-shrink-0"
            data-testid="button-dismiss-fb-banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

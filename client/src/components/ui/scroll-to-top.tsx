import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-warm-amber text-dark-primary p-3 rounded-full shadow-lg hover:bg-warm-orange transition-colors transform hover:scale-105 z-40"
      size="icon"
      data-testid="button-scroll-to-top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Facebook, Twitter, MessageCircle, Mail, Link, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SiPinterest, SiWhatsapp } from "react-icons/si";

interface SocialShareProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export default function SocialShare({ title, description, url, image }: SocialShareProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedImage = image ? encodeURIComponent(image) : '';

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "text-blue-600",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "text-sky-500",
      bgColor: "hover:bg-sky-50 dark:hover:bg-sky-900/20"
    },
    {
      name: "Pinterest",
      icon: SiPinterest,
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
      color: "text-red-600",
      bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20"
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "text-green-600",
      bgColor: "hover:bg-green-50 dark:hover:bg-green-900/20"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "text-gray-600",
      bgColor: "hover:bg-gray-50 dark:hover:bg-gray-900/20"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Recipe link has been copied to your clipboard.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy link to clipboard. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleShareClick = (shareLink: typeof shareLinks[0]) => {
    window.open(shareLink.url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-amber-600 border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          data-testid="button-share-recipe"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Recipe
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-amber-600" />
            Share Recipe
          </DialogTitle>
          <DialogDescription>
            Share "{title}" with your friends and family!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Social Media Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-3">Share on social media</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Button
                    key={platform.name}
                    variant="outline"
                    onClick={() => handleShareClick(platform)}
                    className={`justify-start ${platform.color} ${platform.bgColor} border-current`}
                    data-testid={`button-share-${platform.name.toLowerCase()}`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {platform.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Copy Link Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Or copy link</h3>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 text-sm"
                data-testid="input-share-url"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                data-testid="button-copy-link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Recipe Preview */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Preview
            </h4>
            <div className="space-y-1">
              <p className="font-semibold text-sm" data-testid="preview-title">
                {title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2" data-testid="preview-description">
                {description}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400" data-testid="preview-url">
                {shareUrl}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function MetaTags({ title, description, image, url, type = "website" }: MetaTagsProps) {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    
    // Open Graph meta tags
    setMetaTag("og:type", type, true);
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    
    if (url) {
      setMetaTag("og:url", `${window.location.origin}${url}`, true);
    }
    
    if (image) {
      // Handle both relative and absolute image URLs
      const imageUrl = image.startsWith('http') 
        ? image 
        : `${window.location.origin}${image.startsWith('/') ? image : '/' + image}`;
      
      // Core Open Graph image tags
      setMetaTag("og:image", imageUrl, true);
      setMetaTag("og:image:secure_url", imageUrl.replace('http://', 'https://'), true);
      setMetaTag("og:image:alt", `Image for ${title}`, true);
      
      // Image dimensions and type (critical for social media)
      setMetaTag("og:image:width", "1200", true);
      setMetaTag("og:image:height", "630", true);
      setMetaTag("og:image:type", image.endsWith('.png') ? "image/png" : "image/jpeg", true);
    }
    
    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    
    if (image) {
      const imageUrl = image.startsWith('http') 
        ? image 
        : `${window.location.origin}${image.startsWith('/') ? image : '/' + image}`;
      setMetaTag("twitter:image", imageUrl);
      setMetaTag("twitter:image:alt", `Image for ${title}`);
    }
    
    // Site name
    setMetaTag("og:site_name", "Unglued Food - Gluten-Free Recipes", true);
    
  }, [title, description, image, url, type]);

  return null; // This component doesn't render anything visible
}

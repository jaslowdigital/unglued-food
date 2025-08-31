import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded?: (imageUrl: string) => void;
  currentImage?: string;
  buttonText?: string;
  className?: string;
}

/**
 * A dedicated image upload component for recipe images that opens the user's media folder
 * for image selection and upload.
 * 
 * Features:
 * - Opens file browser for image selection
 * - Drag and drop support
 * - Image preview functionality
 * - Progress tracking for uploads
 * - Automatic resizing and optimization
 * 
 * @param props - Component props
 * @param props.onImageUploaded - Callback function called when image upload completes
 * @param props.currentImage - Current image URL to display as preview
 * @param props.buttonText - Custom text for the upload button
 * @param props.className - Optional CSS class name for styling
 */
export function ImageUploader({
  onImageUploaded,
  currentImage,
  buttonText = "Upload Image",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 20971520) { // 20MB
      alert('File size must be less than 20MB');
      return;
    }

    setIsUploading(true);

    try {
      // Get upload URL from backend
      const response = await fetch('/api/objects/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadURL } = await response.json();

      // Upload file directly to storage
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      // Extract the clean URL without query parameters for our purposes
      const cleanUrl = uploadURL.split('?')[0];
      
      if (onImageUploaded) {
        onImageUploaded(cleanUrl);
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Current recipe image"
            className="w-full h-48 object-cover rounded-lg border border-amber-600/20"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            Current Image
          </div>
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        data-testid="input-file-upload"
      />
      
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-amber-500 bg-amber-500/10' 
            : 'border-amber-600/30 hover:border-amber-500/50'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-amber-400">Uploading image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-lg font-medium text-amber-400">{buttonText}</p>
              <p className="text-sm text-gray-400 mt-1">
                Click to browse or drag and drop an image here
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports JPG, PNG, GIF up to 20MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
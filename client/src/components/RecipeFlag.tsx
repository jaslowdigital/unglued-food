import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecipeFlagProps {
  recipeId: string;
  recipeName: string;
}

export default function RecipeFlag({ recipeId, recipeName }: RecipeFlagProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const flagMutation = useMutation({
    mutationFn: (data: { reason: string; description: string; userName: string; userEmail: string }) =>
      apiRequest(`/api/recipes/${recipeId}/flag`, 'POST', data),
    onSuccess: () => {
      // Save user info to localStorage for future use
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);
      
      // Invalidate and refetch recipes to remove flagged recipe
      queryClient.invalidateQueries({ queryKey: ['/api/recipes'] });
      
      toast({
        title: "Recipe Flagged Successfully",
        description: "Thank you for reporting this issue. The recipe has been removed from the website and we'll review it shortly.",
        variant: "default",
      });
      
      // Reset form and close dialog
      setReason("");
      setDescription("");
      setOpen(false);
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Flag Recipe",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason || !userName || !userEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!userEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    flagMutation.mutate({ reason, description, userName, userEmail });
  };

  const flagReasons = [
    { value: "incorrect-ingredients", label: "Incorrect or missing ingredients" },
    { value: "wrong-instructions", label: "Wrong cooking instructions" },
    { value: "nutrition-info", label: "Incorrect nutrition information" },
    { value: "not-gluten-free", label: "Recipe contains gluten" },
    { value: "misleading-title", label: "Misleading recipe title/description" },
    { value: "other", label: "Other issue" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          data-testid="button-flag-recipe"
        >
          <Flag className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Report Recipe Issue
          </DialogTitle>
          <DialogDescription>
            Report an issue with "{recipeName}". The recipe will be temporarily removed while we review your feedback.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName" className="text-sm font-medium">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                required
                data-testid="input-user-name"
              />
            </div>
            <div>
              <Label htmlFor="userEmail" className="text-sm font-medium">
                Your Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                required
                data-testid="input-user-email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reason" className="text-sm font-medium">
              Issue Type <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger data-testid="select-flag-reason">
                <SelectValue placeholder="Select the type of issue" />
              </SelectTrigger>
              <SelectContent>
                {flagReasons.map((flagReason) => (
                  <SelectItem key={flagReason.value} value={flagReason.value}>
                    {flagReason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details about the issue..."
              className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              data-testid="textarea-flag-description"
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>What happens next:</strong> This recipe will be immediately removed from the website and we'll send you an email confirmation. We'll review your report and take appropriate action.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
              data-testid="button-cancel-flag"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1"
              disabled={isSubmitting || !reason || !userName || !userEmail}
              data-testid="button-submit-flag"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
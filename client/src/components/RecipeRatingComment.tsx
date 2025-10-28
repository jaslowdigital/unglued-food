import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { RecipeRating } from "@shared/schema";

interface RecipeRatingCommentProps {
  recipeId: string;
}

export default function RecipeRatingComment({ recipeId }: RecipeRatingCommentProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load user info from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedEmail = localStorage.getItem('userEmail') || '';
    setUserName(savedName);
    setUserEmail(savedEmail);
  }, []);

  // Save user info to localStorage
  const saveUserInfo = (name: string, email: string) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  };

  // Fetch ratings/reviews
  const { data: ratings = [] } = useQuery<RecipeRating[]>({
    queryKey: ['/api/recipes', recipeId, 'ratings'],
  });

  // Fetch average rating
  const { data: averageData } = useQuery<{ averageRating: number }>({
    queryKey: ['/api/recipes', recipeId, 'average-rating'],
  });

  // Create rating/review mutation
  const ratingMutation = useMutation({
    mutationFn: (data: { rating: number; userName: string; userEmail: string; reviewText?: string }) =>
      apiRequest(`/api/recipes/${recipeId}/ratings`, 'POST', data),
    onSuccess: () => {
      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      });
      setUserRating(0);
      setReviewText("");
      queryClient.invalidateQueries({ queryKey: ['/api/recipes', recipeId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRatingSubmit = async () => {
    if (!userName || !userEmail || userRating === 0) {
      toast({
        title: "Missing information",
        description: "Please provide your name, email, and select a rating.",
        variant: "destructive",
      });
      return;
    }

    saveUserInfo(userName, userEmail);
    ratingMutation.mutate({ 
      rating: userRating, 
      userName, 
      userEmail,
      reviewText: reviewText.trim() || undefined
    });
  };

  const averageRating = averageData?.averageRating || 0;
  const totalRatings = ratings.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-6 space-y-6" data-testid="recipe-rating-comment">
      {/* Average Rating Display */}
      <div className="text-center border-b border-dark-accent pb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">Recipe Rating</h3>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= averageRating ? 'fill-warm-amber text-warm-amber' : 'text-muted-gray'
                }`}
              />
            ))}
          </div>
          <span className="text-warm-amber font-semibold text-xl">
            {averageRating > 0 ? averageRating.toFixed(1) : 'Not rated'}
          </span>
        </div>
        <p className="text-muted-gray">
          {totalRatings > 0 ? `Based on ${totalRatings} rating${totalRatings > 1 ? 's' : ''}` : 'Be the first to rate this recipe'}
        </p>
      </div>

      {/* Rating Form */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Rate This Recipe</h4>
        
        {/* User Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userName" className="text-white">Your Name</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="bg-dark-accent border-dark-accent text-white"
              data-testid="input-user-name"
            />
          </div>
          <div>
            <Label htmlFor="userEmail" className="text-white">Your Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-dark-accent border-dark-accent text-white"
              data-testid="input-user-email"
            />
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-2">
          <Label className="text-white">Your Rating</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setUserRating(star)}
                className="focus:outline-none"
                data-testid={`star-${star}`}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredRating || userRating)
                      ? 'fill-warm-amber text-warm-amber'
                      : 'text-muted-gray hover:text-warm-amber'
                  }`}
                />
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <p className="text-warm-amber text-sm">
              You rated this recipe {userRating} star{userRating > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <Label htmlFor="reviewText" className="text-white">Your Review (Optional)</Label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this recipe..."
            className="w-full bg-dark-accent border border-dark-accent text-white min-h-[100px] p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-warm-amber"
            data-testid="textarea-review-text"
          />
        </div>

        <Button
          onClick={handleRatingSubmit}
          disabled={ratingMutation.isPending || userRating === 0}
          className="w-full bg-warm-amber hover:bg-warm-orange text-dark-primary font-semibold"
          data-testid="button-submit-rating"
        >
          {ratingMutation.isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 border-t border-dark-accent pt-6">
        <h4 className="text-lg font-semibold text-white">
          Reviews ({ratings.length})
        </h4>

        <div className="space-y-4">
          {ratings.length > 0 ? (
            ratings.map((review) => (
              <div
                key={review.id}
                className="bg-dark-accent p-4 rounded-lg"
                data-testid={`review-${review.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-warm-amber mr-2" />
                    <span className="font-semibold text-white">{review.userName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= review.rating
                              ? 'fill-warm-amber text-warm-amber'
                              : 'text-muted-gray'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-gray text-sm">
                      {review.createdAt ? formatDate(review.createdAt.toString()) : 'Recently'}
                    </span>
                  </div>
                </div>
                {review.reviewText && (
                  <p className="text-muted-gray leading-relaxed">{review.reviewText}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-gray text-center py-8">
              No reviews yet. Be the first to rate this recipe!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
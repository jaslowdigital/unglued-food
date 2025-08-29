import { useState, useEffect } from "react";
import { Star, MessageCircle, Send, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { RecipeRating, RecipeComment } from "@shared/schema";

interface RecipeRatingCommentProps {
  recipeId: string;
}

export default function RecipeRatingComment({ recipeId }: RecipeRatingCommentProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
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

  // Fetch ratings
  const { data: ratings = [] } = useQuery({
    queryKey: ['/api/recipes', recipeId, 'ratings'],
  });

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['/api/recipes', recipeId, 'comments'],
  });

  // Fetch average rating
  const { data: averageData } = useQuery({
    queryKey: ['/api/recipes', recipeId, 'average-rating'],
  });

  // Create rating mutation
  const ratingMutation = useMutation({
    mutationFn: (data: { rating: number; userName: string; userEmail: string }) =>
      apiRequest(`/api/recipes/${recipeId}/ratings`, 'POST', data),
    onSuccess: () => {
      toast({
        title: "Rating submitted",
        description: "Thank you for your rating!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/recipes', recipeId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create comment mutation
  const commentMutation = useMutation({
    mutationFn: (data: { comment: string; userName: string; userEmail: string }) =>
      apiRequest(`/api/recipes/${recipeId}/comments`, 'POST', data),
    onSuccess: () => {
      toast({
        title: "Comment added",
        description: "Your comment has been posted!",
      });
      setComment("");
      setShowCommentForm(false);
      queryClient.invalidateQueries({ queryKey: ['/api/recipes', recipeId, 'comments'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
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
    ratingMutation.mutate({ rating: userRating, userName, userEmail });
  };

  const handleCommentSubmit = async () => {
    if (!userName || !userEmail || !comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your name, email, and write a comment.",
        variant: "destructive",
      });
      return;
    }

    saveUserInfo(userName, userEmail);
    commentMutation.mutate({ comment: comment.trim(), userName, userEmail });
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

        <Button
          onClick={handleRatingSubmit}
          disabled={ratingMutation.isPending || userRating === 0}
          className="w-full bg-warm-amber hover:bg-warm-orange text-dark-primary font-semibold"
          data-testid="button-submit-rating"
        >
          {ratingMutation.isPending ? "Submitting..." : "Submit Rating"}
        </Button>
      </div>

      {/* Comments Section */}
      <div className="space-y-4 border-t border-dark-accent pt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-white flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Comments ({comments.length})
          </h4>
          <Button
            onClick={() => setShowCommentForm(!showCommentForm)}
            variant="outline"
            className="border-warm-amber text-warm-amber hover:bg-warm-amber hover:text-dark-primary"
            data-testid="button-toggle-comment-form"
          >
            Add Comment
          </Button>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="space-y-4 bg-dark-accent p-4 rounded-lg">
            <div>
              <Label htmlFor="comment" className="text-white">Your Comment</Label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                className="w-full bg-dark-secondary border border-dark-secondary text-white min-h-[100px] p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-warm-amber"
                data-testid="textarea-comment"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleCommentSubmit}
                disabled={commentMutation.isPending || !comment.trim()}
                className="bg-warm-amber hover:bg-warm-orange text-dark-primary font-semibold"
                data-testid="button-submit-comment"
              >
                <Send className="h-4 w-4 mr-2" />
                {commentMutation.isPending ? "Posting..." : "Post Comment"}
              </Button>
              <Button
                onClick={() => setShowCommentForm(false)}
                variant="outline"
                className="border-muted-gray text-muted-gray hover:bg-muted-gray hover:text-dark-primary"
                data-testid="button-cancel-comment"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-dark-accent p-4 rounded-lg"
                data-testid={`comment-${comment.id}`}
              >
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 text-warm-amber mr-2" />
                  <span className="font-semibold text-white">{comment.userName}</span>
                  <span className="text-muted-gray ml-auto text-sm">
                    {comment.createdAt ? formatDate(comment.createdAt.toString()) : 'Recently'}
                  </span>
                </div>
                <p className="text-muted-gray leading-relaxed">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-gray text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
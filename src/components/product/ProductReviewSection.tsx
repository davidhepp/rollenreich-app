"use client";

import { useState } from "react";
import Rating from "./Rating";
import { Button } from "@/components/ui/button";

interface ProductReviewSectionProps {
  productId?: string;
  className?: string;
}

export default function ProductReviewSection({
  className = "",
}: ProductReviewSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      setIsSubmitted(true);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  if (isSubmitted) {
    return (
      <div className={`max-w-3xl mx-auto mt-10 ${className}`}>
        <div className="bg-bg-primary p-6 ">
          <h3 className="text-lg font-medium mb-4 bg-bg-primary font-bold">
            Thank you for your rating!
          </h3>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Your rating:
            </p>
            <Rating
              initialRating={rating}
              allowHalfStars={true}
              showLabel={true}
              readonly={true}
              size="lg"
            />
          </div>
          {review && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Your comment:
              </p>
              <div className="bg-bg-primary p-3 rounded-md">
                <p className="text-gray-700">{review}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mx-auto mt-10 ${className}`}>
      <div className="bg-bg-primary p-6  border">
        <h3 className="text-lg font-medium mb-4">
          How do you rate this product?
        </h3>
        <div className="mb-4">
          <Rating
            initialRating={0}
            allowHalfStars={true}
            showLabel={true}
            readonly={false}
            size="lg"
            onRatingChange={handleRatingChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your comment (optional)
          </label>
          <textarea
            id="review"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Share your experience with this product..."
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-btn-primary hover:bg-btn-primary/90 text-fg-primarypx-6 py-2"
          >
            Submit Rating
          </Button>
        </div>
      </div>
    </div>
  );
}

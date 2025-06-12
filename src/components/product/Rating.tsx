"use client";
import { useState } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showLabel?: boolean;
  allowHalfStars?: boolean;
}

const Rating = ({
  initialRating = 0,
  onRatingChange,
  size = "md",
  readonly = false,
  showLabel = true,
  allowHalfStars = true,
}: RatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const maxRating = 5;

  const sizes: Record<"sm" | "md" | "lg", string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (value: number) => {
    if (readonly) return;
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    starIndex: number
  ) => {
    if (readonly) return;

    if (!allowHalfStars) {
      setHoverRating(starIndex);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const isLeftHalf = x < width / 2;

    const value = isLeftHalf ? starIndex - 0.5 : starIndex;
    setHoverRating(value);
  };

  const handleMouseEnter = (starIndex: number) => {
    if (readonly) return;
    if (!allowHalfStars) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const getStarFillType = (
    starIndex: number,
    currentRating: number
  ): "full" | "half" | "empty" => {
    if (currentRating >= starIndex) return "full";
    if (currentRating >= starIndex - 0.5) return "half";
    return "empty";
  };

  const getStar = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    const fillType = getStarFillType(starIndex, currentRating);

    return (
      <div
        key={starIndex}
        className={`${sizes[size]} relative ${
          readonly
            ? "cursor-default"
            : "cursor-pointer hover:scale-105 transition-transform duration-150"
        }`}
        onClick={() =>
          !readonly &&
          handleClick(allowHalfStars && hoverRating ? hoverRating : starIndex)
        }
        onMouseMove={(e) => handleMouseMove(e, starIndex)}
        onMouseEnter={() => handleMouseEnter(starIndex)}
      >
        {fillType === "empty" && (
          <Star
            className={`w-full h-full text-gray-200 fill-gray-200 transition-colors duration-200`}
          />
        )}

        {fillType === "full" && (
          <Star
            className={`w-full h-full transition-colors duration-200 ${
              hoverRating > 0 && hoverRating >= starIndex - 0.5
                ? "text-[#c8aa6e] fill-[#c8aa6e]"
                : "text-[#c8aa6e] fill-[#c8aa6e]"
            }`}
          />
        )}

        {fillType === "half" && (
          <div className="relative w-full h-full">
            <Star className="absolute inset-0 w-full h-full text-gray-200 fill-gray-200" />
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            >
              <Star className="w-full h-full text-[#c8aa6e] fill-[#c8aa6e]" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <div className="flex space-x-1" onMouseLeave={handleMouseLeave}>
          {Array.from({ length: maxRating }, (_, i) => getStar(i + 1))}
        </div>
        {showLabel && (
          <span className="ml-2 text-sm font-medium text-text-primary">
            {hoverRating || rating ? `${hoverRating || rating}` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default Rating;

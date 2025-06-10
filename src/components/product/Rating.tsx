"use client";
import { useState } from "react";

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
        {/* Background star (empty) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full fill-gray-200 text-gray-200 transition-colors duration-200"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>

        {/* Filled star overlay */}
        {fillType !== "empty" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`absolute inset-0 w-full h-full transition-colors duration-200 ${
              hoverRating > 0 && hoverRating >= starIndex - 0.5
                ? "fill-[#c8aa6e] text-[#c8aa6e]"
                : "fill-[#c8aa6e] text-[#c8aa6e]"
            }`}
            style={{
              clipPath: fillType === "half" ? "inset(0 50% 0 0)" : "none",
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </div>
    );
  };

  const formatRating = (value: number): string => {
    if (value === 0) return "Noch nicht bewertet";
    return `${value} von 5 Sternen`;
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-1" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxRating }, (_, i) => getStar(i + 1))}
      </div>

      {showLabel && (
        <div className="text-sm text-gray-600 font-medium">
          {hoverRating || rating ? (
            <span>{formatRating(hoverRating || rating)}</span>
          ) : (
            <span className="text-gray-400">Noch nicht bewertet</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;

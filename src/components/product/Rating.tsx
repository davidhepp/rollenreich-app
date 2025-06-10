import { Star, StarHalf } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ratingVariants = cva("relative flex items-center", {
  variants: {
    variant: {
      default: "",
      outline: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface RatingProps extends VariantProps<typeof ratingVariants> {
  rating: number;
  className?: string;
}

export default function Rating({ rating, variant, className }: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  if (variant === "outline") {
    return (
      <div className={cn(ratingVariants({ variant, className }))}>
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className="w-4 h-4" color="#c8aa6e" />
          ))}
        </div>
        <div className="absolute flex">
          {Array.from({ length: fullStars }, (_, index) => (
            <Star
              key={index}
              fill="#c8aa6e"
              stroke="none"
              className="w-4 h-4"
            />
          ))}
          {hasHalfStar && (
            <StarHalf fill="#c8aa6e" stroke="none" className="w-4 h-4" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(ratingVariants({ variant, className }))}>
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} fill="#6a7282" stroke="none" className="w-4 h-4" />
        ))}
      </div>
      <div className="absolute flex">
        {Array.from({ length: fullStars }, (_, index) => (
          <Star key={index} fill="#c8aa6e" stroke="none" className="w-4 h-4" />
        ))}
        {hasHalfStar && (
          <StarHalf fill="#c8aa6e" stroke="none" className="w-4 h-4" />
        )}
      </div>
    </div>
  );
}

import { Skeleton } from "./skeleton";

// Skeleton component for ProductCard
export const ProductCardSkeleton = () => (
  <div className="overflow-hidden">
    <div className="relative bg-bg-primary aspect-square flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
    <div className="p-4">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  </div>
);

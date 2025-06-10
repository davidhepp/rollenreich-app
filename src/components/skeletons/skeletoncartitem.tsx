import { Skeleton } from "../ui/skeleton";

export const CartItemSkeleton = () => {
  return (
    <div className="border-t border-b border-gray-200 py-6">
      <div className="flex gap-6 items-start">
        {/* Image skeleton */}
        <div className="relative">
          <Skeleton className="w-40 h-40 bg-bg-primary" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col justify-between flex-1 h-40">
          <div>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3 text-sm mt-2">
            <Skeleton className="h-4 w-8" />
            <span className="text-gray-300">|</span>
            <Skeleton className="h-4 w-12" />
            <span className="text-gray-300">|</span>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Price and quantity skeleton */}
        <div className="flex flex-col justify-between h-40 items-end">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

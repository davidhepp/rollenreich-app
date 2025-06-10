import { Skeleton } from "../ui/skeleton";

export const BestSellersSkeleton = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide scroll-smooth">
      <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-72 sm:w-80">
            <div className="overflow-hidden">
              <div className="relative bg-bg-primary aspect-square flex items-center justify-center">
                <Skeleton className="w-3/4 h-3/4" />
                <div className="absolute top-4 right-4">
                  <Skeleton className="w-6 h-6" />
                </div>
              </div>
              <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

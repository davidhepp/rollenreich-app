import { Skeleton } from "../ui/skeleton";
import { CartItemSkeleton } from "./skeletoncartitem";

export default function CartSkeleton() {
  return (
    <div className="min-h-screen px-4 pt-24 md:px-8 bg-white pb-4">
      <main className="max-w-7xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Skeleton className="h-4 w-12" />
          <span>/</span>
          <Skeleton className="h-4 w-16" />
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            {Array.from({ length: 1 }).map((_, index) => (
              <CartItemSkeleton key={index} />
            ))}
          </section>

          <aside className="lg:col-span-1">
            <div className="border rounded-none border-gray-200 p-6">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-3 w-24 mb-2" />
              <div className="w-full border-t border-gray-200 my-4" />
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="w-full border-t border-gray-200 my-4" />
              <Skeleton className="h-3 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <div className="flex items-center my-2">
                <span className="flex-1 border-t border-gray-200" />
                <span className="mx-2 text-xs text-gray-400">OR</span>
                <span className="flex-1 border-t border-gray-200" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

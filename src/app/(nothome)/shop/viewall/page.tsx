"use client";

import { Product } from "@prisma/client";
import { ProductImage } from "@prisma/client";
import ProductCard from "@/components/cards/ProductCard";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { fetchProducts, PaginationData } from "./_actions";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";

export default function ViewAllProducts() {
  const [products, setProducts] = useState<
    (Product & { images: ProductImage[] })[]
  >([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadProducts = async (page: number = 1, append: boolean = false) => {
    setLoading(true);
    try {
      const data = await fetchProducts(page, 9);

      if (append) {
        setProducts((prev) => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(1, false);
  }, []);

  const handleLoadMore = () => {
    if (pagination && pagination.hasMore) {
      loadProducts(pagination.currentPage + 1, true);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
          </nav>

          <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
            <div className="flex items-center space-x-8">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>Shop All</span>
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
          <div className="flex items-center space-x-8">
            <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
              <span className="underline">Category</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
              <span className="underline">Filter</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort By:</span>
              <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                <span className="underline">New Arrivals</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product: Product & { images: ProductImage[] }) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price.toString()}
              imageSrc={product.images?.[0]?.url}
            />
          ))}
        </div>

        {pagination && pagination.hasMore && (
          <div className="flex justify-center mb-16">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 transition-colors border-1 border-text-primary hover:bg-bg-secondary bg-white rounded-none"
              variant="outline"
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}

        {pagination && (
          <div className="text-center text-sm text-gray-600 mb-8">
            Showing {products.length} of {pagination.totalProducts} products
          </div>
        )}
      </div>
    </div>
  );
}

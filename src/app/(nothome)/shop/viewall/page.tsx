"use client";

import { Product } from "@prisma/client";
import { ProductImage } from "@prisma/client";
import ProductCard from "@/components/cards/ProductCard";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
  limit: number;
}

interface ApiResponse {
  products: (Product & { images: ProductImage[] })[];
  pagination: PaginationData;
}

export default function ViewAllProducts() {
  const [products, setProducts] = useState<
    (Product & { images: ProductImage[] })[]
  >([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchProducts = async (page: number = 1, append: boolean = false) => {
    setLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(
        `${baseUrl}/api/products/viewall?page=${page}&limit=9`
      );
      const data: ApiResponse = await response.json();

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
    fetchProducts(1, false);
  }, []);

  const handleLoadMore = () => {
    if (pagination && pagination.hasMore) {
      fetchProducts(pagination.currentPage + 1, true);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
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

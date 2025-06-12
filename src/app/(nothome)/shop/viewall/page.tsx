"use client";

import { Product } from "@prisma/client";
import { ProductImage } from "@prisma/client";
import ProductCard from "@/components/cards/ProductCard";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { fetchProducts, PaginationData } from "./_actions";
import ViewAllSkeleton from "@/components/skeletons/ViewAllSkeleton";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewAllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<
    (Product & { images: ProductImage[] })[]
  >([]);
  const [lastPaginationData, setLastPaginationData] =
    useState<PaginationData | null>(null);

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shop-products", currentPage],
    queryFn: () => fetchProducts(currentPage, 9),
  });

  useEffect(() => {
    if (productsData) {
      if (currentPage === 1) {
        setAllProducts(productsData.products);
      } else {
        setAllProducts((prev) => [...prev, ...productsData.products]);
      }
      setLastPaginationData(productsData.pagination);
    }
  }, [productsData, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (isLoading && currentPage === 1) {
    return <ViewAllSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading products. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Shop All</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                <span className="underline text-sm">Category</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                <span className="underline text-sm">Filter</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort By:</span>
                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                  <span className="underline text-sm">New Arrivals</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allProducts.map((product: Product & { images: ProductImage[] }) => (
            <Link href={`/shop/product/${product.sku}`} key={product.id}>
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price.toString()}
                imageSrc={product.images?.[0]?.url}
              />
            </Link>
          ))}
        </div>

        {(productsData?.pagination || lastPaginationData) &&
          (productsData?.pagination?.hasMore ||
            lastPaginationData?.hasMore) && (
            <div className="flex justify-center mb-16">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading && currentPage > 1}
                className="px-8 py-3 transition-colors border-1 border-text-primary hover:bg-bg-secondary bg-white rounded-none"
                variant="outline"
              >
                {isLoading && currentPage > 1 ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

        {(productsData?.pagination || lastPaginationData) && (
          <div className="text-center text-sm text-gray-600 mb-8">
            Showing {allProducts.length} of{" "}
            {(productsData?.pagination || lastPaginationData)?.totalProducts}{" "}
            products
          </div>
        )}
      </div>
    </div>
  );
}

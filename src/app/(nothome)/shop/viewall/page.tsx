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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { value: "newest", label: "New Arrivals" },
  { value: "oldest", label: "Oldest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ViewAllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
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
    queryKey: ["shop-products", currentPage, sortBy],
    queryFn: () => fetchProducts(currentPage, 9, sortBy),
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

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    setAllProducts([]);
  };

  const getCurrentSortLabel = () => {
    return (
      sortOptions.find((option) => option.value === sortBy)?.label ||
      "New Arrivals"
    );
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
              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort By:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity cursor-pointer">
                      <span className="underline text-sm">
                        {getCurrentSortLabel()}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`cursor-pointer ${
                          sortBy === option.value
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }`}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
                productId={product.id}
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

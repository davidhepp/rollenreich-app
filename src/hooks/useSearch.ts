import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Product,
  ProductImage,
  ProductCollection,
  Collection,
} from "@prisma/client";

type SearchProduct = Product & {
  images: ProductImage[];
  collections: (ProductCollection & {
    collection: Collection;
  })[];
};

interface SearchResponse {
  products: SearchProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasMore: boolean;
    limit: number;
    query: string;
  };
}

const searchProducts = async (
  query: string,
  page: number = 1,
  limit: number = 6
): Promise<SearchResponse> => {
  const response = await fetch(
    `/api/products/search?q=${encodeURIComponent(
      query
    )}&page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
};

export const useSearch = (debounceMs: number = 300) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset page when query changes
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery, page],
    queryFn: () => searchProducts(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2, // Only search if query is at least 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const updateQuery = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setPage(1);
  };

  const loadMore = () => {
    if (data?.pagination?.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    query: searchQuery,
    debouncedQuery,
    products: data?.products || [],
    pagination: data?.pagination,
    isLoading:
      isLoading || (searchQuery !== debouncedQuery && searchQuery.length >= 2),
    isError,
    error,
    isFetching,
    updateQuery,
    clearSearch,
    loadMore,
    hasResults: (data?.products?.length || 0) > 0,
    showResults: debouncedQuery.length >= 2,
  };
};

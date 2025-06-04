import { baseUrl } from "@/lib/utils";

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
  limit: number;
}

export const fetchProducts = async (page: number = 1, limit: number = 9) => {
  const data = await fetch(
    `${baseUrl}/api/products/viewall?page=${page}&limit=${limit}`
  ).then((res) => res.json());
  return data;
};

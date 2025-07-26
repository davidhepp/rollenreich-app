export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
  limit: number;
  sort?: string;
}

export const fetchProducts = async (
  page: number = 1,
  limit: number = 9,
  sort: string = "newest"
) => {
  const data = await fetch(
    `/api/products/viewall?page=${page}&limit=${limit}&sort=${sort}`
  ).then((res) => res.json());
  return data;
};

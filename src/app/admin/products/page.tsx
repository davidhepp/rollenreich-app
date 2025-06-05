"use client";
import { columns, Product } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchProducts } from "./_actions";
import { useQuery } from "@tanstack/react-query";
import { ProductImage } from "@prisma/client";

export default function ProductsPage() {
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchProducts(),
  });

  const products = productsData || [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </div>
    );
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} />
    </div>
  );
}

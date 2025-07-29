"use client";
import { columns } from "./columns";
import { DataTableProductsAdmin } from "@/components/ui/data-table-products-admin";
import { fetchProducts } from "./_actions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 hover:bg-gray-100"
        >
          <Link href="/admin">
            <ArrowLeft /> Back to Admin
          </Link>
        </Button>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 hover:bg-gray-100"
        >
          <Link href="/admin">← Back to Admin</Link>
        </Button>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading products. Please try again.
          </div>
        </div>
      </div>
    );
  }
  console.log(products);

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-4 hover:bg-gray-100"
      >
        <Link href="/admin">← Back to Admin</Link>
      </Button>
      <DataTableProductsAdmin columns={columns} data={products} />
    </div>
  );
}

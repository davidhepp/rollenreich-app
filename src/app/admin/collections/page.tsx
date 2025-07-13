"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchCollections } from "./_actions";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
  const {
    data: collectionsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-collections"],
    queryFn: () => fetchCollections(),
  });

  const collections = collectionsData || [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading collections...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading collections. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={collections} />
    </div>
  );
}

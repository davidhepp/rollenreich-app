"use client";
import { columns } from "./columns";
import { DataTableCollectionsAdmin } from "@/components/ui/data-table-collections-admin";
import { fetchCollections } from "./_actions";
import { useQuery } from "@tanstack/react-query";

export default function CollectionsPage() {
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
      <DataTableCollectionsAdmin columns={columns} data={collections} />
    </div>
  );
}

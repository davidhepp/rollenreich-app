"use client";
import { columns } from "./columns";
import { DataTableCollectionsAdmin } from "@/components/ui/data-table-collections-admin";
import { fetchCollections } from "./_actions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
          <div className="text-lg">Loading collections...</div>
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
            Error loading collections. Please try again.
          </div>
        </div>
      </div>
    );
  }

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
      <DataTableCollectionsAdmin columns={columns} data={collections} />
    </div>
  );
}

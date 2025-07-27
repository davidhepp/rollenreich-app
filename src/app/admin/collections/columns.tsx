"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CollectionsDropdown } from "@/components/admin/CollectionsDropdown";

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  index?: number | null;
  isActive: boolean;
  isFeatured: boolean;
  image?: {
    id: string;
    url: string;
    altText?: string | null;
  } | null;
  products: Array<{
    id: string;
    productId: string;
    collectionId: string;
    product?: {
      id: string;
      name: string;
      sku?: string | null;
      images: Array<{
        id: string;
        url: string;
        altText?: string | null;
      }>;
    };
  }>;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Collection>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded-none"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded-none"
      />
    ),
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isActive ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isFeatured ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.createdAt).toLocaleString("de-DE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.updatedAt).toLocaleString("de-DE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      return <div>{row.original.products.length}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const collection = row.original;

      return <CollectionsDropdown collection={collection} />;
    },
  },
];

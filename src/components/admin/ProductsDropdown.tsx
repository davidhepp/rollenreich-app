import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Product } from "@/app/admin/products/columns";
import { useState } from "react";
import { ProductEditForm } from "./ProductEditForm";
import { DeletionModal } from "./DeletionModal";
import { copyToClipboard } from "./_actions";

export const ProductsDropdown = ({ product }: { product: Product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  const handleFormError = (error: Error) => {
    console.error("Form error:", error.message);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-none">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => copyToClipboard(product.id, () => {})}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Edit product
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeletionModalOpen(true)}
          >
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit product {product.name}</DialogTitle>
          <DialogDescription>{product.sku}</DialogDescription>
        </DialogHeader>

        <ProductEditForm
          product={product}
          images={product.images.map((image) => image.url)}
          onSuccess={() => setIsDialogOpen(false)}
          onError={handleFormError}
        />
      </DialogContent>

      <DeletionModal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        product={product}
      />
    </Dialog>
  );
};

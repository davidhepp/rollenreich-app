import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter } from "../ui/dialog";
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

export const ProductsDropdown = ({ product }: { product: Product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(product.id);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  const handleFormError = (error: Error) => {
    // TODO: Add error handling here
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
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyId}>
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
          <DropdownMenuItem className="text-destructive">
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
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-none bg-btn-secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

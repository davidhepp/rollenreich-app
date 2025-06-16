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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Check, Copy, Edit } from "lucide-react";
import { useState } from "react";

export const ProductsDropdown = ({ product }: { product: Product }) => {
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [isCopiedSku, setIsCopiedSku] = useState(false);
  const [isEditingSku, setIsEditingSku] = useState(false);

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(product.id);
    setIsCopiedId(true);
    setTimeout(() => setIsCopiedId(false), 2000);
  };

  const handleCopySku = async () => {
    await navigator.clipboard.writeText(product.sku);
    setIsCopiedSku(true);
    setTimeout(() => setIsCopiedSku(false), 2000);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Delete product</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit product {product.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{product.sku}</DialogDescription>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>ID</Label>
            <div className="relative flex-1">
              <Input value={product.id} disabled />
              <Button
                variant="ghost"
                className="rounded-none absolute right-0 top-0 transition-all duration-200"
                onClick={handleCopyId}
              >
                <div className="relative">
                  <Copy
                    className={`h-4 w-4 transition-all duration-200 ${
                      isCopiedId ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                  />
                  <Check
                    className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                      isCopiedId ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </div>
                <span className="sr-only">Copy ID</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>SKU</Label>
            <div className="relative flex-1">
              <Input value={product.sku} disabled={!isEditingSku} />
              <div className="absolute right-0 top-0 flex">
                <Button
                  variant="ghost"
                  className="rounded-none transition-all duration-200"
                  onClick={() => setIsEditingSku(!isEditingSku)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit SKU</span>
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-none transition-all duration-200"
                  onClick={handleCopySku}
                >
                  <div className="relative">
                    <Copy
                      className={`h-4 w-4 transition-all duration-200 ${
                        isCopiedSku
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100"
                      }`}
                    />
                    <Check
                      className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                        isCopiedSku
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                    />
                  </div>
                  <span className="sr-only">Copy SKU</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input defaultValue={product.name} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Price</Label>
            <Input defaultValue={product.price} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Stock</Label>
            <Input defaultValue={product.inStock} type="number" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea defaultValue={product.description} />
          </div>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Label>Featured</Label>
              <Checkbox
                defaultChecked={product.isFeatured}
                className="rounded-none h-5 w-5 cursor-pointer"
              />
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center gap-2">
              <Label>Active</Label>
              <Checkbox
                defaultChecked={product.isActive}
                className="rounded-none h-5 w-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none bg-btn-secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-btn-primary hover:bg-btn-primary-hover rounded-none"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

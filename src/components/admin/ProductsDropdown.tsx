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

export const ProductsDropdown = ({ product }: { product: Product }) => {
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
            <Label>Name</Label>
            <Input defaultValue={product.name} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Price</Label>
            <Input defaultValue={product.price} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Stock</Label>
            <Input defaultValue={product.stock} type="number" />
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Product } from "@/app/admin/products/columns";

export const DeletionModal = ({
  isOpen,
  onClose,
  onDelete,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  product: Product;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product &quot;{product.name}&quot;</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

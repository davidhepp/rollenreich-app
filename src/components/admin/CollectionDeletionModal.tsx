import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Collection } from "@/app/admin/collections/columns";
import { deleteCollection } from "./_actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const CollectionDeletionModal = ({
  isOpen,
  onClose,
  collection,
}: {
  isOpen: boolean;
  onClose: () => void;
  collection: Collection;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteCollection(collection.id),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Collection &quot;{collection.name}&quot;
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this collection?
            <br />
            This action cannot be undone and will remove the collection but not
            the products in it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

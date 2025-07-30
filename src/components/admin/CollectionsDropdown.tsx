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
import { Collection } from "@/app/admin/collections/columns";
import { useState } from "react";
import { CollectionEditForm } from "./CollectionEditForm";
import { CollectionDeletionModal } from "./CollectionDeletionModal";
import { copyToClipboard } from "./_actions";

export const CollectionsDropdown = ({
  collection,
}: {
  collection: Collection;
}) => {
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
            onClick={() => copyToClipboard(collection.id, () => {})}
          >
            Copy collection ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Edit collection
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeletionModalOpen(true)}
          >
            Delete collection
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit collection {collection.name}</DialogTitle>
          <DialogDescription>{collection.slug}</DialogDescription>
        </DialogHeader>

        <CollectionEditForm
          collection={collection}
          onSuccess={() => setIsDialogOpen(false)}
          onError={handleFormError}
        />
      </DialogContent>

      <CollectionDeletionModal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        collection={collection}
      />
    </Dialog>
  );
};

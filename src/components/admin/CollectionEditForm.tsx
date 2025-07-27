import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Lock, Unlock, Loader2 } from "lucide-react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import { Collection } from "@/app/admin/collections/columns";
import { CollectionEditFormSchema } from "@/lib/schemas/collectionSchema";
import { CollectionEditFormData, CollectionEditFormProps } from "@/lib/types";
import { updateCollection, copyToClipboard } from "./_actions";
import { DialogClose, DialogFooter } from "../ui/dialog";

interface Product {
  id: string;
  name: string;
  sku?: string | null;
}

export const CollectionEditForm = ({
  collection,
  onSuccess,
  onError,
}: CollectionEditFormProps) => {
  const queryClient = useQueryClient();
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [isCopiedSlug, setIsCopiedSlug] = useState(false);
  const [isEditingSlug, setIsEditingSlug] = useState(false);

  // Fetch all available products for selection
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const response = await fetch("/api/admin/fetchproducts");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CollectionEditFormData>({
    resolver: zodResolver(CollectionEditFormSchema),
    defaultValues: {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description || "",
      index: collection.index || 0,
      isActive: collection.isActive,
      isFeatured: collection.isFeatured,
      image: collection.image?.url || "",
      productIds: collection.products.map(
        (pc) => pc.product?.id || pc.productId
      ),
    },
  });

  const selectedProductIds = watch("productIds");

  // Reset form when collection changes
  useEffect(() => {
    reset({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description || "",
      index: collection.index || 0,
      isActive: collection.isActive,
      isFeatured: collection.isFeatured,
      image: collection.image?.url || "",
      productIds: collection.products.map(
        (pc) => pc.product?.id || pc.productId
      ),
    });
    setIsEditingSlug(false);
  }, [collection, reset]);

  const mutation = useMutation({
    mutationFn: updateCollection,
    onSuccess: (updatedCollection) => {
      // Update the cache with the new collection data
      queryClient.setQueryData(
        ["admin-collections"],
        (oldData: Collection[] | undefined) => {
          if (!oldData) return [updatedCollection];
          return oldData.map((c) =>
            c.id === updatedCollection.id ? updatedCollection : c
          );
        }
      );

      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });

      setIsEditingSlug(false);

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Failed to update collection:", error.message);
      onError?.(error);
    },
  });

  const onSubmit = (data: CollectionEditFormData) => {
    mutation.mutate(data);
  };

  const toggleProductSelection = (productId: string) => {
    const currentIds = getValues("productIds");
    const newIds = currentIds.includes(productId)
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId];
    setValue("productIds", newIds);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label>ID</Label>
        <div className="relative flex-1">
          <Input value={collection.id} disabled />
          <Button
            type="button"
            variant="ghost"
            className="rounded-none absolute right-0 top-0 transition-all duration-200"
            onClick={() => copyToClipboard(collection.id, setIsCopiedId)}
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
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter collection name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Slug</Label>
        <div className="relative flex-1">
          <Input
            {...register("slug")}
            disabled={!isEditingSlug}
            placeholder="Enter slug"
            className={errors.slug ? "border-red-500" : ""}
          />
          <div className="absolute right-0 top-0 flex">
            <Button
              type="button"
              variant="ghost"
              className="rounded-none"
              onClick={() => setIsEditingSlug(!isEditingSlug)}
            >
              <div className="relative">
                <Lock
                  className={`h-4 w-4 transition-all duration-200 ${
                    isEditingSlug
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                />
                <Unlock
                  className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                    isEditingSlug
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />
              </div>
              <span className="sr-only">Edit Slug</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="rounded-none transition-all duration-200"
              onClick={() =>
                copyToClipboard(getValues("slug"), setIsCopiedSlug)
              }
            >
              <div className="relative">
                <Copy
                  className={`h-4 w-4 transition-all duration-200 ${
                    isCopiedSlug ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <Check
                  className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                    isCopiedSlug ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </div>
              <span className="sr-only">Copy Slug</span>
            </Button>
          </div>
        </div>
        {errors.slug && (
          <p className="text-sm text-red-600">{errors.slug.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="index">Index</Label>
        <Input
          id="index"
          type="number"
          min="0"
          {...register("index", { valueAsNumber: true })}
          placeholder="Enter index position"
          className={errors.index ? "border-red-500" : ""}
        />
        {errors.index && (
          <p className="text-sm text-red-600">{errors.index.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          {...register("image")}
          placeholder="Enter image URL"
          className={errors.image ? "border-red-500" : ""}
        />
        {errors.image && (
          <p className="text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter collection description"
          rows={4}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Products in Collection</Label>
        <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
          {allProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No products available</p>
          ) : (
            <div className="space-y-2">
              {allProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedProductIds.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                    className="rounded-none"
                  />
                  <div className="flex-1 text-sm">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-gray-500 ml-2">({product.sku})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {selectedProductIds.length} product(s) selected
        </p>
      </div>

      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Label>Featured</Label>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
                className="rounded-none h-5 w-5 cursor-pointer"
              />
            )}
          />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center gap-2">
          <Label>Active</Label>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
                className="rounded-none h-5 w-5 cursor-pointer"
              />
            )}
          />
        </div>
      </div>

      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" className="rounded-none">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-btn-primary hover:bg-btn-primary-hover rounded-none"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

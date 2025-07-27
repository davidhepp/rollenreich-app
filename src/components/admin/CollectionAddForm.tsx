import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import { Collection } from "@/app/admin/collections/columns";
import { CollectionAddFormSchema } from "@/lib/schemas/collectionSchema";
import { CollectionAddFormData, CollectionAddFormProps } from "@/lib/types";
import { addCollection } from "./_actions";
import { DialogClose, DialogFooter } from "../ui/dialog";

interface Product {
  id: string;
  name: string;
  sku?: string | null;
}

export const CollectionAddForm = ({
  onSuccess,
  onError,
}: CollectionAddFormProps) => {
  const queryClient = useQueryClient();

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
  } = useForm<CollectionAddFormData>({
    resolver: zodResolver(CollectionAddFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      index: 0,
      isActive: true,
      isFeatured: false,
      image: "",
      productIds: [],
    },
  });

  const selectedProductIds = watch("productIds");

  // Reset form when component mounts
  useEffect(() => {
    reset({
      name: "",
      slug: "",
      description: "",
      index: 0,
      isActive: true,
      isFeatured: false,
      image: "",
      productIds: [],
    });
  }, [reset]);

  const mutation = useMutation({
    mutationFn: addCollection,
    onSuccess: (newCollection) => {
      // Update the cache with the new collection data
      queryClient.setQueryData(
        ["admin-collections"],
        (oldData: Collection[] | undefined) => {
          if (!oldData) return [newCollection];
          return [newCollection, ...oldData];
        }
      );

      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Failed to add collection:", error.message);
      onError?.(error);
    },
  });

  const onSubmit = (data: CollectionAddFormData) => {
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
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          {...register("slug")}
          placeholder="Enter slug"
          className={errors.slug ? "border-red-500" : ""}
        />
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
              Adding...
            </>
          ) : (
            "Add Collection"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

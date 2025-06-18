import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Lock, Unlock, Loader2, Plus, X } from "lucide-react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import { Product } from "@/app/admin/products/columns";
import { ProductFormSchema } from "@/lib/schemas/productSchema";
import { ProductFormData, ProductEditFormProps } from "@/lib/types";
import { updateProduct, copyToClipboard } from "./_actions";
import { DialogClose, DialogFooter } from "../ui/dialog";

export const ProductEditForm = ({
  product,
  onSuccess,
  onError,
}: ProductEditFormProps) => {
  const queryClient = useQueryClient();
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [isCopiedSku, setIsCopiedSku] = useState(false);
  const [isEditingSku, setIsEditingSku] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price:
        typeof product.price === "string"
          ? parseFloat(String(product.price).replace(",", "."))
          : Number(product.price),
      inStock: product.inStock,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      description: product.description,
      images: product.images.map((image) => image.url),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images" as never,
  });

  // Reset form when product changes
  useEffect(() => {
    reset({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price:
        typeof product.price === "string"
          ? parseFloat(String(product.price).replace(",", "."))
          : Number(product.price),
      inStock: product.inStock,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      description: product.description,
      images: product.images.map((image) => image.url),
    });
    setIsEditingSku(false);
  }, [product, reset]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      // Update the cache with the new product data
      queryClient.setQueryData(
        ["admin-products"],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [updatedProduct];
          return oldData.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
        }
      );

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });

      setIsEditingSku(false);

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Failed to update product:", error.message);
      onError?.(error);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data);
  };

  const addImageField = () => {
    append("");
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
          <Input value={product.id} disabled />
          <Button
            type="button"
            variant="ghost"
            className="rounded-none absolute right-0 top-0 transition-all duration-200"
            onClick={() => copyToClipboard(product.id, setIsCopiedId)}
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
          <Input
            {...register("sku")}
            disabled={!isEditingSku}
            placeholder="Enter SKU"
            className={errors.sku ? "border-red-500" : ""}
          />
          <div className="absolute right-0 top-0 flex">
            <Button
              type="button"
              variant="ghost"
              className="rounded-none"
              onClick={() => setIsEditingSku(!isEditingSku)}
            >
              <div className="relative">
                <Lock
                  className={`h-4 w-4 transition-all duration-200 ${
                    isEditingSku ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <Unlock
                  className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                    isEditingSku ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </div>
              <span className="sr-only">Edit SKU</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="rounded-none transition-all duration-200"
              onClick={() => copyToClipboard(getValues("sku"), setIsCopiedSku)}
            >
              <div className="relative">
                <Copy
                  className={`h-4 w-4 transition-all duration-200 ${
                    isCopiedSku ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <Check
                  className={`h-4 w-4 absolute inset-0 transition-all duration-200 ${
                    isCopiedSku ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </div>
              <span className="sr-only">Copy SKU</span>
            </Button>
          </div>
        </div>
        {errors.sku && (
          <p className="text-sm text-red-600">{errors.sku.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter product name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          step="1"
          min="0"
          {...register("price", { valueAsNumber: true })}
          placeholder="Enter price"
          className={errors.price ? "border-red-500" : ""}
        />
        {errors.price && (
          <p className="text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="inStock">Stock *</Label>
        <Input
          id="inStock"
          type="number"
          min="0"
          {...register("inStock", { valueAsNumber: true })}
          placeholder="Enter stock quantity"
          className={errors.inStock ? "border-red-500" : ""}
        />
        {errors.inStock && (
          <p className="text-sm text-red-600">{errors.inStock.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Image URLs</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addImageField}
            className="rounded-none"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-xs text-gray-500 italic">
            No images added yet. Click &quot;Add Image&quot; to add image URLs.
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`images.${index}` as const)}
                  placeholder="Enter image URL"
                  className={errors.images?.[index] ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => remove(index)}
                  className="rounded-none"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {errors.images && (
          <p className="text-sm text-red-600">
            {Array.isArray(errors.images)
              ? "Please check the image URLs"
              : errors.images.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter product description"
          rows={4}
        />
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

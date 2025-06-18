import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, X } from "lucide-react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import { Product } from "@/app/admin/products/columns";
import { ProductAddFormSchema } from "@/lib/schemas/productSchema";
import { ProductAddFormData, ProductAddFormProps } from "@/lib/types";
import { addProduct } from "./_actions";
import { DialogClose, DialogFooter } from "../ui/dialog";

export const ProductAddForm = ({ onSuccess, onError }: ProductAddFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductAddFormData>({
    resolver: zodResolver(ProductAddFormSchema),
    defaultValues: {
      sku: "",
      name: "",
      price: 0,
      inStock: 0,
      isActive: true,
      isFeatured: false,
      description: "",
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images" as never,
  });

  // Reset form when product changes
  useEffect(() => {
    reset({
      sku: "",
      name: "",
      price: 0,
      inStock: 0,
      isActive: true,
      isFeatured: false,
      description: "",
      images: [],
    });
  }, [reset]);

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      // Update the cache with the new product data
      queryClient.setQueryData(
        ["admin-products"],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [newProduct];
          return oldData.map((p) => (p.id === newProduct.id ? newProduct : p));
        }
      );

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Failed to add product:", error.message);
      onError?.(error);
    },
  });

  const onSubmit = (data: ProductAddFormData) => {
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
        <Label>SKU *</Label>
        <div className="relative flex-1">
          <Input
            {...register("sku")}
            placeholder="Enter SKU"
            className={errors.sku ? "border-red-500" : ""}
          />
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
            "Add Product"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

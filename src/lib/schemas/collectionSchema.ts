import { z } from "zod";

export const CollectionEditFormSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Collection name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  index: z.number().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  image: z.string().optional(),
  productIds: z.array(z.string()),
});

export const CollectionAddFormSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  index: z.number().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  image: z.string().optional(),
  productIds: z.array(z.string()),
});

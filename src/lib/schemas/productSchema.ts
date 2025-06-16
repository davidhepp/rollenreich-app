import { z } from "zod";

// Zod schema for product form validation
export const ProductFormSchema = z.object({
  id: z.string(),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than 0"),
  inStock: z.number().min(0, "Stock quantity must be 0 or greater"),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  description: z.string(),
  images: z.array(z.string()),
});

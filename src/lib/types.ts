import { Product } from "@/app/admin/products/columns";

export interface ProductFormData {
  id: string;
  sku: string;
  name: string;
  price: number;
  inStock: number;
  isActive: boolean;
  isFeatured: boolean;
  description: string;
  images: string[];
}

export interface ProductEditFormProps {
  product: Product;
  images: string[];
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

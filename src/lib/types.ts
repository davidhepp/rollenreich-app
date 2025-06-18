import { Product } from "@/app/admin/products/columns";

export interface ProductEditFormData {
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

export interface ProductAddFormData {
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

export interface ProductAddFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

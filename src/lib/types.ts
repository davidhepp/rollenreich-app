import { Product } from "@/app/admin/products/columns";
import { Collection } from "@/app/admin/collections/columns";

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

export interface CollectionEditFormData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  index?: number;
  isActive: boolean;
  isFeatured: boolean;
  image?: string;
  productIds: string[];
}

export interface CollectionAddFormData {
  name: string;
  slug: string;
  description?: string;
  index?: number;
  isActive: boolean;
  isFeatured: boolean;
  image?: string;
  productIds: string[];
}

export interface CollectionEditFormProps {
  collection: Collection;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface CollectionAddFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

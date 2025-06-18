import { Product } from "@/app/admin/products/columns";
import { ProductAddFormData, ProductEditFormData } from "@/lib/types";

export const updateProduct = async (
  data: ProductEditFormData
): Promise<Product> => {
  const response = await fetch("/api/admin/editproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update product");
  }

  return response.json();
};

export const copyToClipboard = async (
  text: string,
  setter: (value: boolean) => void
) => {
  await navigator.clipboard.writeText(text);
  setter(true);
  setTimeout(() => setter(false), 2000);
};

export const deleteProduct = async (id: string) => {
  const response = await fetch("/api/admin/deleteproduct", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete product");
  }

  return response.json();
};

export const addProduct = async (data: ProductAddFormData) => {
  const response = await fetch("/api/admin/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add product");
  }

  return response.json();
};

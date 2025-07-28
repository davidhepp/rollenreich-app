import { OrderStatus } from "@prisma/client";

// types/order.ts
export interface OrderHistoryItem {
  id: string;
  productId: string; // Add productId for cart operations
  title: string;
  price: number;
  quantity: number;
  collection?: string;
  variation?: string;
  imageSrc?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderHistoryItem[];
  total: number;
}

export interface OrderCardProps {
  order: Order;
  onAddAllToCart: (order: Order) => void;
  isAddingToCart?: boolean;
}

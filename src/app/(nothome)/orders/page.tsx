"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import OrderCard from "@/components/orderhistory/historyelement";
import { Order } from "@/components/orderhistory/orderhistelement";
import { useOrders } from "@/hooks/useOrders";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMultipleToCart } from "@/lib/cartActions";

export default function OrderHistoryPage() {
  const { data: session } = useSession();
  const { orders: dbOrders, isLoading, isError } = useOrders(!!session);
  const queryClient = useQueryClient();
  const [addingToCartOrderId, setAddingToCartOrderId] = useState<string | null>(
    null
  );

  // Transform database orders to frontend Order format
  const orders: Order[] = dbOrders.map((dbOrder) => {
    const createdAt = new Date(dbOrder.createdAt);
    return {
      id: dbOrder.id,
      orderNumber: `ORD-${createdAt.getFullYear()}-${dbOrder.id
        .slice(-3)
        .toUpperCase()}`,
      createdAt: createdAt.toISOString(),
      status: dbOrder.status.toLowerCase() as Order["status"],
      total: Number(dbOrder.total),
      items: dbOrder.items.map((item) => ({
        id: item.id,
        productId: item.productId, // Include productId for cart operations
        title: item.product.name,
        price: Number(item.price),
        quantity: item.quantity,
        collection:
          item.product.collections?.[0]?.collection?.name || undefined,
        variation:
          `${item.product.color ? `Color ${item.product.color}` : ""} ${
            item.product.material ? `Material ${item.product.material}` : ""
          }`.trim() || undefined,
        imageSrc: item.product.images?.[0]?.url || "/products/standard.png",
      })),
    };
  });

  const addAllToCartMutation = useMutation({
    mutationFn: (items: { productId: string; quantity: number }[]) =>
      addMultipleToCart(items),
    onSuccess: async () => {
      // Invalidate and refetch cart data
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      await queryClient.refetchQueries({ queryKey: ["cart"] });
      setAddingToCartOrderId(null);
    },
    onError: (error) => {
      console.error("Failed to add items to cart:", error);
      setAddingToCartOrderId(null);
    },
  });

  const handleAddAllToCart = (order: Order) => {
    setAddingToCartOrderId(order.id);
    const cartItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    addAllToCartMutation.mutate(cartItems);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="rounded-none bg-transparent shadow-none">
              <CardContent className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="rounded-none bg-transparent shadow-none">
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Error while loading orders
                </h2>
                <p className="text-gray-600 mb-4">
                  Failed to load order history
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-btn-primary hover:bg-btn-primary-hover text-white rounded-none"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Order History</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="rounded-none bg-transparent shadow-none mb-6">
            <CardHeader>
              <CardTitle className="text-lg">My Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Overview of your past orders and their details.
              </p>
            </CardContent>
          </Card>

          {/* Orders List */}
          {orders.length === 0 ? (
            // Empty State
            <Card className="rounded-none bg-transparent shadow-none">
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h2>
                <p className="text-gray-600 mb-4">
                  You have not made any order yet.
                </p>
                <Button
                  asChild
                  className="bg-btn-primary hover:bg-btn-primary-hover text-white rounded-none"
                >
                  <Link href="/shop/viewall">Shop Now</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Orders List
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onAddAllToCart={handleAddAllToCart}
                  isAddingToCart={addingToCartOrderId === order.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

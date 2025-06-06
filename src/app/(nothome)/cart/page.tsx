"use client";
import React from "react";
import CartItem from "../../../components/cart/cartitem";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FaPaypal } from "react-icons/fa";
import { editQuantity, getCart, removeFromCart } from "./_actions";
import {
  CartItem as CartItemType,
  Product,
  ProductImage,
} from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CartPage = () => {
  const queryClient = useQueryClient();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const editQuantityMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => editQuantity(productId, quantity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => removeFromCart(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleQuantityChange = (productId: string, quantity: number) => {
    editQuantityMutation.mutate({ productId, quantity });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate(productId);
  };

  const cart = cartData?.items;

  const total = cart?.reduce(
    (
      acc: number,
      item: CartItemType & { product: Product & { images: ProductImage[] } }
    ) => acc + Number(item.product.price) * item.quantity,
    0
  );
  if (isLoading) return <div>Loading...</div>;
  const shipping = 0;
  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Cart grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <section className="lg:col-span-2">
            {cart?.map(
              (
                item: CartItemType & {
                  product: Product & { images: ProductImage[] };
                }
              ) => (
                <CartItem
                  key={item.id}
                  name={item.product.name}
                  price={Number(item.product.price)}
                  quantity={item.quantity}
                  imageSrc={item.product.images[0].url as string}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(item.id, quantity)
                  }
                  onRemove={() => handleRemoveItem(item.id)}
                />
              )
            )}
          </section>

          <aside className="lg:col-span-1">
            <div className="border rounded-none border-gray-200 p-6">
              <h2 className="font-semibold mb-4 text-sm">ORDER SUMMARY</h2>
              <div className="text-xs mb-2">{cartData?.id}</div>
              <div className="w-full border-t border-gray-200 my-4" />
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between font-semibold text-base mb-4">
                <span>Estimated Total</span>
                <span>${total + shipping}</span>
              </div>
              <div className="w-full border-t border-gray-200 my-4" />
              <details className="mb-4 text-xs">
                <summary className="cursor-pointer">View Details</summary>
                <div className="text-xs mt-2">
                  You will be charged at the time of shipment. If this is a
                  personalized or made-to-order purchase, you will be charged at
                  the time of purchase.
                </div>
              </details>
              <Button
                className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white mb-2 border rounded-none"
                disabled={
                  isLoading ||
                  editQuantityMutation.isPending ||
                  removeFromCartMutation.isPending
                }
              >
                Checkout
              </Button>
              <div className="flex items-center my-2">
                <span className="flex-1 border-t border-gray-200" />
                <span className="mx-2 text-xs text-gray-400">OR</span>
                <span className="flex-1 border-t border-gray-200" />
              </div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center border-text-primary hover:bg-bg-secondary bg-white rounded-none"
                disabled={
                  isLoading ||
                  editQuantityMutation.isPending ||
                  removeFromCartMutation.isPending
                }
              >
                Pay With <FaPaypal />
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              name="Lorem Ipsum"
              price="00"
              imageSrc="/products/standard.png"
            />
            <ProductCard
              name="Lorem Ipsum"
              price="00"
              imageSrc="/products/standard_black.png"
            />
            <ProductCard
              name="Lorem Ipsum"
              price="00"
              imageSrc="/products/standard_green.png"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CartPage;

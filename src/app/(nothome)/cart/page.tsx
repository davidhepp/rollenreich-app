"use client";
import React from "react";
import CartItem from "../../../components/cart/cartitem";
import { Button } from "@/components/ui/button";
import { FaPaypal } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import {
  CartItem as CartItemType,
  Product,
  ProductImage,
} from "@prisma/client";
import CartSkeleton from "@/components/skeletons/CartSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import BestSellersClient from "@/components/product/BestSellersClient";

const CartPage = () => {
  const { cart, total, isLoading, editQuantity, removeItem, isMutating } =
    useCart();

  if (isLoading) {
    return <CartSkeleton />;
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            {cart.map(
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
                  imageSrc={item.product.images[0]?.url ?? ""}
                  onQuantityChange={(qty) =>
                    editQuantity({ productId: item.id, quantity: qty })
                  }
                  onRemove={() => removeItem(item.id)}
                />
              )
            )}
          </section>

          <aside className="lg:col-span-1">
            <div className="border border-gray-200 p-6">
              <h2 className="font-semibold mb-4 text-sm">ORDER SUMMARY</h2>
              <div className="w-full border-t border-gray-200 my-4" />
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between font-semibold text-base mb-4">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <Button
                className="w-full bg-btn-primary text-white mb-2"
                disabled={isMutating}
              >
                Checkout
              </Button>
              <div className="flex items-center my-2">
                <span className="flex-1 border-t" />
                <span className="mx-2 text-xs">OR</span>
                <span className="flex-1 border-t" />
              </div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                disabled={isMutating}
              >
                Pay With <FaPaypal className="ml-2" />
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
          <BestSellersClient />
        </section>
      </div>
    </main>
  );
};

export default CartPage;

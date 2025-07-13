"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import FavoritItem from "@/components/favorites/favorititem";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useSession } from "next-auth/react";
import {
  Collection,
  Product,
  ProductImage,
  WishlistItem,
} from "@prisma/client";
import { useCart } from "@/hooks/useCart";

const FavoritesPage = () => {
  const { data: session } = useSession();
  const { wishlist, removeFromWishlist } = useWishlist(!!session);
  const { addToCart } = useCart(!!session);

  const RemoveFavorite = (productId: string) => {
    removeFromWishlist.mutate(productId);
  };

  const AddToCart = (
    item: WishlistItem & { product: Product & { images: ProductImage[] } }
  ) => {
    addToCart({ productId: item.productId, quantity: 1 });
  };

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
              <BreadcrumbPage>Favorites</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {!wishlist || wishlist.items.length === 0 ? (
          <div className="text-center py-10 flex flex-col items-center">
            <p className="text-gray-600 text-xl mb-2">
              Your wishlist is currently empty.
            </p>
            <p className="text-gray-500 mb-8">
              Add products you want to buy later.
            </p>
            <Link href="/shop/viewall">
              <Button
                variant="outline"
                className="px-6 py-3 border-text-primary hover:bg-bg-secondary bg-white rounded-none"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            {wishlist.items.map(
              (
                item: WishlistItem & {
                  product: Product & {
                    images: ProductImage[];
                    collections: Collection[];
                  };
                }
              ) => (
                <FavoritItem
                  key={item.id}
                  id={item.product.id}
                  sku={item.product.sku ?? ""}
                  name={item.product.name}
                  price={Number(item.product.price)}
                  collection={item.product.collections[0].name}
                  quantity={1}
                  imageSrc={item.product.images[0].url}
                  onRemove={() => RemoveFavorite(item.productId)}
                  onAddToCart={() => AddToCart(item)}
                />
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage;

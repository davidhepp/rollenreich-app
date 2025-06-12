"use client";
// =========================================================================
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import FavoritItem from "@/components/favorites/favorititem";
import { Button } from "@/components/ui/button";

// =========================================================================
// NEUE TYPEN und MOCK-DATEN FÜR WISHLIST
// =========================================================================
interface WishlistItemType {
  id: string;
  name: string;
  price: number;
  collection?: string;
  variation?: string;
  imageSrc?: string;
}

const mockWishlistItems: WishlistItemType[] = [
  {
    id: "tp1",
    name: 'Toilete Paper "Standard"',
    price: 8.99,
    collection: "Standard Collection",
    variation: "Black",
    imageSrc: "/products/standard_black.png",
  },
  {
    id: "tp2",
    name: 'Toilete Paper "Standard"',
    price: 9.99,
    collection: "Standard Collektion",
    variation: "Green",
    imageSrc: "/products/standard_green.png",
  },
  {
    id: "tp3",
    name: 'Toilete Paper "Standard"',
    price: 7.49,
    collection: "Standard Collection",
    variation: "White",
    imageSrc: "/products/standard.png",
  },
];

// =========================================================================

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<WishlistItemType[]>([]);

  useEffect(() => {
    setFavorites(mockWishlistItems);
  }, []);

  const RemoveFavorite = (id: string) => {
    console.log(`${id} removed from favorites`);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  const AddToCart = (item: WishlistItemType) => {
    console.log(`${item.name} added to cart`);
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
              <BreadcrumbPage>Favorites</BreadcrumbPage> {}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mb-8 text-center">Wishlist</h1> {}
        <div className="grid grid-cols-1 gap-8">
          {favorites.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg shadow-inner flex flex-col items-center">
              <p className="text-gray-600 text-xl mb-4">Wishlist is empty.</p>
              <p className="text-gray-500">
                Add products you want to buy later.
              </p>
              <Link href="/shop/viewall" passHref className="block">
                {" "}
                {}
                <Button
                  variant="outline"
                  className="mt-6 px-6 py-3 rounded-none bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            favorites.map((item) => (
              <FavoritItem
                key={item.id}
                name={item.name}
                price={item.price}
                collection={item.collection}
                variation={item.variation}
                quantity={1}
                imageSrc={item.imageSrc}
                onRemove={() => RemoveFavorite(item.id)}
                onAddToCart={() => AddToCart(item)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default FavoritesPage;

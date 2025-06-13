import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard";
import CollectionHero from "@/components/collection/CollectionHero";
import { ChevronDown } from "lucide-react";
import { fetchCollection } from "./_actions";
import { Button } from "@/components/ui/button";
import { Product, ProductImage } from "@prisma/client";

interface ProductCollection {
  product: Product & { images: ProductImage[] };
}

const CollectionPageView = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const collection = await fetchCollection(slug);
  const products =
    collection?.products?.map((pc: ProductCollection) => pc.product) || [];

  if (!collection) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
        <div className="max-w-7xl mx-auto text-center mt-12">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Collection not found
          </h1>
          <Button variant="outline" asChild className="rounded-none">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <CollectionHero
          imageSrc={collection.image?.url || ""}
          alt={collection.image?.altText || ""}
          name={collection.name}
        />

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{collection?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center space-x-8">
                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                  <span className="underline text-sm">Category</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                  <span className="underline text-sm">Filter</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm">Sort By:</span>
                  <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                    <span className="underline text-sm">New Arrivals</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.map((product: Product & { images: ProductImage[] }) => (
              <Link href={`/shop/product/${product.sku}`} key={product.id}>
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price?.toString() || "0"}
                  imageSrc={product.images?.[0]?.url}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CollectionPageView;

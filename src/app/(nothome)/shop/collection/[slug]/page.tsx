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

const CollectionPageView = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const display = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <CollectionHero
          imageSrc="/collections/demo1.png"
          alt="Greek Seas"
          name="Greek Seas"
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
                  <BreadcrumbPage>{display}</BreadcrumbPage>
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
          <h3 className="text-xl font-semibold mb-6"></h3>
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

export default CollectionPageView;

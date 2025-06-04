"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProduct } from "./_actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductImage, Product } from "@prisma/client";
import { Truck, Heart } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<
    (Product & { images: ProductImage[] }) | null
  >(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = await fetchProduct(params.sku as string);
      setProduct(productData);
    };
    fetchProductData();
  }, [params.sku]);

  console.log("Product data:", product);
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
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
              <BreadcrumbLink asChild>
                <Link href="/shop/viewall">Collection</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square relative ">
            <div>
              {product?.images?.[0]?.url && (
                <Image
                  src={product?.images?.[0]?.url}
                  alt={product?.name}
                  width={500}
                  height={500}
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-30">
              <h1 className="text-3xl font-bold mb-6">{product?.name}</h1>
              <p className="text-lg  mb-2">{product?.description}</p>
            </div>

            <Button className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
              Add To Cart
            </Button>

            <div className="flex justify-between items-center pt-4">
              <button className="flex items-center gap-2  ">
                <Truck strokeWidth={1.5} />
                Easy Return
              </button>
              <button className="flex items-center gap-2 ">
                <Heart strokeWidth={1.5} />
                Add To Wish List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

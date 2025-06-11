import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProduct, fetchFeaturedProducts } from "./_actions";
import { ProductImage, Product } from "@prisma/client";
import { Truck, Heart } from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import ProductActions from "@/components/product/ProductActions";
import Rating from "@/components/product/Rating";
import ProductImageGallery from "@/components/product/ProductImageGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await fetchProduct(sku);
  const featuredProducts = await fetchFeaturedProducts();

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
          <div>
            <ProductImageGallery images={product?.images ?? []} productName={product?.name} />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold ">{product?.name}</h1>
              <Rating
                size="sm"
                //initialRating={product?.rating}
                initialRating={5}
                allowHalfStars={true}
                showLabel={true}
                readonly={true}
              />
            </div>
            <p className="text-sm mt-2">Artikel {product?.sku}</p>
            <div className="mt-30">
              <ProductActions
                productId={product?.id}
                productPrice={product?.price}
              />
            </div>
            <div className="flex justify-between items-center pt-4">
              <button className="flex items-center gap-2">
                <Truck strokeWidth={1.5} />
                Easy Return
              </button>
              <button className="flex items-center gap-2">
                <Heart strokeWidth={1.5} />
                Add To Wish List
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <Accordion
            type="single"
            collapsible
            className="w-full border bg-bg-primary"
            defaultValue="item-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Detail</AccordionTrigger>
              <AccordionContent>{product?.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>About The Collection</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Sustainability</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="w-full border bg-bg-primary  p-6 flex flex-col justify-center">
            <div className="font-bold text-lg mb-2">Shipping and Return</div>
            <Separator className="my-4" />
            <div className="text-base">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </div>
          </div>
        </div>

        {/* Kundenbewertung */}

        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-bg-primary p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">
              Wie bewerten Sie dieses Produkt?
            </h3>
            <div className="mb-4">
              <Rating
                initialRating={0}
                allowHalfStars={true}
                showLabel={true}
                readonly={false}
                size="lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ihr Kommentar (optional)
              </label>
              <textarea
                id="review"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Teilen Sie Ihre Erfahrungen mit diesem Produkt..."
              />
            </div>
          </div>
        </div>

        {/* Bestseller */}
        <section id="best-sellers" className="w-full py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
                Best Sellers
              </h2>
              <Link
                href="/shop/viewall"
                className="hover:text-btn-primary transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
              <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
                {featuredProducts?.map(
                  (
                    product: Product & { images: ProductImage[] },
                    index: number
                  ) => (
                    <div
                      key={product.id || index}
                      className="flex-shrink-0 w-72 sm:w-80"
                    >
                      <Link href={`/shop/product/${product.sku}`}>
                        <ProductCard
                          name={product.name}
                          price={product.price.toString()}
                          imageSrc={product.images[0]?.url}
                        />
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

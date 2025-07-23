import { fetchProduct, fetchFeaturedProducts } from "./_actions";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductReviewSection from "@/components/product/ProductReviewSection";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductInfoSection from "@/components/product/ProductInfoSection";
import ProductDetailsAccordion from "@/components/product/ProductDetailsAccordion";
import ShippingInfoCard from "@/components/product/ShippingInfoCard";
import BestSellersSection from "@/components/product/BestSellersSection";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await fetchProduct(sku);
  const featuredProducts = await fetchFeaturedProducts();

  const firstCollection = product?.collections?.[0]?.collection;

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <ProductBreadcrumb
          collectionSlug={firstCollection?.slug}
          collectionName={firstCollection?.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProductImageGallery
              images={product?.images ?? []}
              productName={product?.name}
            />
          </div>

          <ProductInfoSection product={product} />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <ProductDetailsAccordion product={product} />
          <ShippingInfoCard />
        </div>

        <ProductReviewSection />

        <BestSellersSection products={featuredProducts} />
      </div>
    </div>
  );
}

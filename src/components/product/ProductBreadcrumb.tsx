import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductBreadcrumbProps {
  collectionSlug?: string;
  collectionName?: string;
  className?: string;
}

// obere Leiste mit Home, Collection, Product
export default function ProductBreadcrumb({
  collectionSlug,
  collectionName,
  className = "",
}: ProductBreadcrumbProps) {
  return (
    <Breadcrumb className={`mb-8 ${className}`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={
                collectionSlug
                  ? `/shop/collection/${collectionSlug}`
                  : "/shop/viewall"
              }
            >
              {collectionName || "Shop All"}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Product</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

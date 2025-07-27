import { Product } from "@prisma/client";
import { Truck } from "lucide-react";
import Rating from "./Rating";
import ProductActions from "./ProductActions";
import AddToWishlistButton from "@/components/favorites/AddToWishlistButton";

interface ProductInfoSectionProps {
  product: Product | null;
}

export default function ProductInfoSection({
  product,
}: ProductInfoSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <Rating
          size="sm"
          initialRating={5}
          allowHalfStars={true}
          showLabel={true}
          readonly={true}
        />
      </div>
      <p className="text-sm mt-2">SKU: {product?.sku}</p>
      <div className="mt-30">
        <ProductActions productId={product?.id} productPrice={product?.price} />
      </div>
      <div className="flex justify-between items-center pt-4">
        <button className="flex items-center gap-2">
          <Truck strokeWidth={1.5} />
          Easy Return
        </button>
        {product?.id && (
          <AddToWishlistButton
            productId={product.id}
            variant="text"
            iconSize={16}
          />
        )}
      </div>
    </div>
  );
}

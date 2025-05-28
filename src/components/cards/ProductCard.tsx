import { Heart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price }) => {
  return (
    <div className="overflow-hidden group cursor-pointer">
      <div className="relative bg-bg-primary aspect-square flex items-center justify-center">
        <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-2">{name}</h3>
        <p className="font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

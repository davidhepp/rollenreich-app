import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
      {/* Product Image Area */}
      <div className="relative aspect-square bg-bg-primary flex items-center justify-center">
        {/* Heart Icon */}
        <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-text-primary font-medium mb-2">{name}</h3>
        <p className="text-text-primary font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

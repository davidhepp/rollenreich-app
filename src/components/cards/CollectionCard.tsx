import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface CollectionCardProps {
  title?: string;
  buttonText?: string;
  size?: "small" | "large";
  imageSrc?: string;
  href?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  buttonText = "Call To Action",
  size = "small",
  imageSrc,
  href,
}) => {
  const cardHeight = size === "large" ? "h-200" : "h-128";

  return (
    <div
      className={`overflow-hidden ${cardHeight} flex flex-col justify-end relative`}
    >
      <div className={`absolute inset-0 ${!imageSrc ? "bg-bg-primary" : ""}`}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title || "Collection"}
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
            priority
          />
        )}
      </div>
      <div className="space-y-4 relative z-10 p-6">
        {title && <h3 className=" text-lg font-medium">{title}</h3>}
        <Link href={href || ""}>
          <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-6 py-2 rounded-none transition-colors duration-200 w-fit">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;

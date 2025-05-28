import React from "react";
import { Button } from "../ui/button";

interface CollectionCardProps {
  title?: string;
  buttonText?: string;
  size?: "small" | "large";
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  buttonText = "Call To Action",
  size = "small",
}) => {
  const cardHeight = size === "large" ? "h-200" : "h-128";

  return (
    <div
      className={`bg-bg-primary overflow-hidden ${cardHeight} flex flex-col justify-end p-6`}
    >
      <div className="space-y-4">
        {title && <h3 className=" text-lg font-medium">{title}</h3>}
        <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-6 py-2 rounded-none transition-colors duration-200 w-fit">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CollectionCard;

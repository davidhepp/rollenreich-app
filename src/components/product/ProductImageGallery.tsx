"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProductImage } from "@prisma/client";

// Props für ein einzelnes Vorschaubild
interface ThumbnailItemProps {
  image: ProductImage;
  isSelected: boolean;
  onClick: () => void;
  productName?: string;
  index: number;
}

// Komponente für ein einzelnes Vorschaubild
function ThumbnailItem({
  image,
  isSelected,
  onClick,
  productName,
  index,
}: ThumbnailItemProps) {
  const baseClasses =
    "relative aspect-square w-full cursor-pointer rounded-md border-2 transition-all";
  const selectedClasses = "border-primary opacity-100";
  const unselectedClasses = "border-transparent opacity-75 hover:opacity-100";

  return (
    <div
      key={image.id}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View image ${index + 1}`}
      aria-pressed={isSelected}
    >
      <Image
        src={image.url}
        alt={`${productName || "Product"} thumbnail ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-md"
        priority={index < 3} // Lade die ersten paar Bilder priorisiert
      />
    </div>
  );
}

// Props für das Hauptanzeigebild
interface MainDisplayImageProps {
  selectedImage: ProductImage | undefined;
  productName?: string;
}

// Komponente für das Hauptanzeigebild
function MainDisplayImage({
  selectedImage,
  productName,
}: MainDisplayImageProps) {
  if (!selectedImage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg aspect-square">
        <p className="text-gray-500">Select an image</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full h-full">
      <Image
        src={selectedImage.url}
        alt={productName || "Product"}
        layout="fill"
        objectFit="contain" // 'contain' zeigt das ganze Bild, 'cover' füllt den Bereich
        className="rounded-lg"
        priority // Lade das Hauptbild priorisiert
      />
    </div>
  );
}

// Props für die Hauptgalerie-Komponente
interface ProductImageGalleryProps {
  images: ProductImage[];
  productName?: string;
}

// Hauptkomponente der Bildergalerie
export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProductImage | undefined>(
    images?.[0]
  );

  // Effekt, um das ausgewählte Bild zu aktualisieren, wenn sich die `images`-Prop ändert
  useEffect(() => {
    if (images && images.length > 0) {
      // Wenn das aktuell ausgewählte Bild nicht mehr in der neuen Liste ist, wähle das erste Bild
      const currentSelectedExists = images.some(
        (img) => img.id === selectedImage?.id
      );
      if (!currentSelectedExists) {
        setSelectedImage(images[0]);
      }
    } else if (!images || images.length === 0) {
      // Wenn keine Bilder mehr vorhanden sind, setze das ausgewählte Bild zurück
      setSelectedImage(undefined);
    }
  }, [images, selectedImage]);

  const handleThumbnailClick = useCallback((image: ProductImage) => {
    setSelectedImage(image);
  }, []);

  // Fallback, wenn keine Bilder vorhanden sind
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 h-[500px] max-h-[500px]">
      {/* Spalte für Vorschaubilder */}
      <div className="overflow-y-auto flex flex-col space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {images.map((image, index) => (
          <ThumbnailItem
            key={image.id} // React key
            image={image}
            isSelected={selectedImage?.id === image.id}
            onClick={() => handleThumbnailClick(image)}
            productName={productName}
            index={index}
          />
        ))}
      </div>

      {/* Spalte für das Hauptbild */}
      <MainDisplayImage
        selectedImage={selectedImage}
        productName={productName}
      />
    </div>
  );
}

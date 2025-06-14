"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProductImage } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  onClick: () => void;
}

// Komponente für das Hauptanzeigebild
function MainDisplayImage({
  selectedImage,
  productName,
  onClick,
}: MainDisplayImageProps) {
  if (!selectedImage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg aspect-square">
        <p className="text-gray-500">Select an image</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full h-full hover:cursor-pointer">
      <Image
        src={selectedImage.url}
        alt={productName || "Product"}
        layout="fill"
        objectFit="contain"
        className="rounded-lg object-contain w-full h-full" // Added object-contain w-full h-full
        priority
        onClick={onClick}
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

  const handleThumbnailClick = useCallback(
    (image: ProductImage) => {
      setSelectedImage(image);
    },
    [setSelectedImage]
  );

  const handlePrevImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  }, [images, selectedImage, setSelectedImage]);

  const handleNextImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  }, [images, selectedImage, setSelectedImage]);

  // State für das Modal
  const [showModal, setShowModal] = useState(false);

  // Fallback, wenn keine Bilder vorhanden sind
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:h-[500px] md:max-h-[500px]">
        {/* Spalte für Vorschaubilder (Desktop) */}
        <div className="hidden md:flex flex-col space-y-2 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((image, index) => (
            <ThumbnailItem
              key={image.id}
              image={image}
              isSelected={selectedImage?.id === image.id}
              onClick={() => handleThumbnailClick(image)}
              productName={productName}
              index={index}
            />
          ))}
        </div>

        {/* Spalte für das Hauptbild mit mobiler Navigation */}
        <div className="relative w-full h-full">
          {/* Wrapper for main image and mobile nav */}
          <MainDisplayImage
            selectedImage={selectedImage}
            productName={productName}
            onClick={() => setShowModal(true)} // This opens the modal
          />
          {/* Mobile Navigation Buttons & Counter */}
          {images && images.length > 1 && (
            <div className="md:hidden absolute inset-0 flex items-center justify-between p-1 sm:p-2 z-10">
              <button
                onClick={handlePrevImage}
                disabled={
                  images.findIndex((img) => img.id === selectedImage?.id) === 0
                }
                className="bg-black bg-opacity-40 text-white p-2 rounded-full disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Vorheriges Bild"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                disabled={
                  images.findIndex((img) => img.id === selectedImage?.id) ===
                  images.length - 1
                }
                className="bg-black bg-opacity-40 text-white p-2 rounded-full disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Nächstes Bild"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
          {images && images.length > 0 && selectedImage && (
            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs z-10">
              {images.findIndex((img) => img.id === selectedImage.id) + 1} /{" "}
              {images.length}
            </div>
          )}
        </div>
      </div>
      {/* Modal für große Bildansicht */}
      {showModal && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative flex items-center"
            onClick={(e) => e.stopPropagation()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowModal(false)}
            aria-label="Close modal"
          >
            {/* Left Arrow */}
            <button
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 text-4xl px-3 py-1 rounded-full bg-black bg-opacity-40 text-white transition  hover:cursor-pointer hover:bg-opacity-70 ${
                images.findIndex((img) => img.id === selectedImage.id) === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:text-primary"
              }`}
              onClick={() => {
                const currentIdx = images.findIndex(
                  (img) => img.id === selectedImage.id
                );
                if (currentIdx > 0) setSelectedImage(images[currentIdx - 1]);
              }}
              aria-label="Vorheriges Bild"
              disabled={
                images.findIndex((img) => img.id === selectedImage.id) === 0
              }
              tabIndex={
                images.findIndex((img) => img.id === selectedImage.id) === 0
                  ? -1
                  : 0
              }
            >
              <ArrowLeft />
            </button>
            {/* Modal Content */}
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-white text-3xl font-bold z-10 hover:text-red-400 hover:cursor-pointer"
                onClick={() => setShowModal(false)}
                aria-label="Schließen"
              >
                ×
              </button>
              <Image
                src={selectedImage.url}
                alt={selectedImage.altText || productName || "Product"}
                className="max-h-[90vh] max-w-[90vw] rounded-none shadow-lg"
                width={500}
                height={500}
              />
              {/* Counter unten zentriert */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                {images.findIndex((img) => img.id === selectedImage.id) + 1}/
                {images.length}
              </div>
            </div>
            {/* Right Arrow */}
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 text-4xl px-3 py-1 rounded-full bg-black bg-opacity-40 text-white transition hover:cursor-pointer hover:bg-opacity-70 ${
                images.findIndex((img) => img.id === selectedImage.id) ===
                images.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:text-primary"
              }`}
              onClick={() => {
                const currentIdx = images.findIndex(
                  (img) => img.id === selectedImage.id
                );
                if (currentIdx < images.length - 1)
                  setSelectedImage(images[currentIdx + 1]);
              }}
              aria-label="Nächstes Bild"
              disabled={
                images.findIndex((img) => img.id === selectedImage.id) ===
                images.length - 1
              }
              tabIndex={
                images.findIndex((img) => img.id === selectedImage.id) ===
                images.length - 1
                  ? -1
                  : 0
              }
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

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
    "relative aspect-square w-full cursor-pointer border-2 transition-all";
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
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${isSelected ? "Currently selected: " : "Select "}image ${
        index + 1
      } of ${productName || "product"}${
        image.altText ? `: ${image.altText}` : ""
      }`}
      aria-pressed={isSelected}
      aria-describedby={`thumbnail-desc-${index}`}
    >
      <Image
        src={image.url}
        alt={
          image.altText || `${productName || "Product"} thumbnail ${index + 1}`
        }
        layout="fill"
        objectFit="cover"
        className=""
        priority={index < 3} // Lade die ersten paar Bilder priorisiert
      />
      {/* Hidden description for screen readers */}
      <span id={`thumbnail-desc-${index}`} className="sr-only">
        {isSelected
          ? "Currently viewing this image"
          : "Click to view this image in main display"}
      </span>
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
      <div className="w-full h-full flex items-center justify-center bg-gray-100  aspect-square">
        <p className="text-gray-500">Select an image</p>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square w-full h-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open fullscreen view of ${
        selectedImage.altText || productName || "product image"
      }`}
      aria-describedby="main-image-instruction"
    >
      <Image
        src={selectedImage.url}
        alt={selectedImage.altText || `${productName || "Product"} - Main view`}
        layout="fill"
        objectFit="contain"
        className="object-contain w-full h-full" // Added object-contain w-full h-full
        priority
      />
      {/* Screen reader instruction */}
      <span id="main-image-instruction" className="sr-only">
        Click or press Enter to open this image in fullscreen view
      </span>
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

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showModal) return;

      switch (event.key) {
        case "Escape":
          setShowModal(false);
          break;
        case "ArrowLeft":
          event.preventDefault();
          const currentIdx = images.findIndex(
            (img) => img.id === selectedImage?.id
          );
          if (currentIdx > 0) {
            setSelectedImage(images[currentIdx - 1]);
          }
          break;
        case "ArrowRight":
          event.preventDefault();
          const currentIndex = images.findIndex(
            (img) => img.id === selectedImage?.id
          );
          if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1]);
          }
          break;
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showModal, images, selectedImage, setSelectedImage]);

  // Fallback, wenn keine Bilder vorhanden sind
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full flex items-center justify-center bg-gray-100 ">
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
                className="bg-black bg-opacity-40 text-white p-2  disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="bg-black bg-opacity-40 text-white p-2  disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Nächstes Bild"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
          {images && images.length > 0 && selectedImage && (
            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-2 py-1  text-xs z-10">
              {images.findIndex((img) => img.id === selectedImage.id) + 1} /{" "}
              {images.length}
            </div>
          )}
        </div>
      </div>
      {/* Improved Modal for Fullscreen Image View */}
      {showModal && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button - Top Right */}
          <button
            className="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center  bg-black/50 text-white transition-all duration-200 hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 sm:top-6 sm:right-6"
            onClick={() => setShowModal(false)}
            aria-label="Close fullscreen view"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Counter - Top Center */}
          <div className="absolute top-4 left-1/2 z-20 -translate-x-1/2 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm sm:top-6">
            <span id="modal-title" aria-live="polite">
              Image {images.findIndex((img) => img.id === selectedImage.id) + 1}{" "}
              of {images.length}
              {selectedImage.altText && `: ${selectedImage.altText}`}
            </span>
          </div>

          {/* Main Content Container */}
          <div
            className="flex h-full items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-black/50 text-white transition-all duration-200 hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 sm:left-6 sm:h-14 sm:w-14 ${
                    images.findIndex((img) => img.id === selectedImage.id) === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:text-primary-400"
                  }`}
                  onClick={() => {
                    const currentIdx = images.findIndex(
                      (img) => img.id === selectedImage.id
                    );
                    if (currentIdx > 0)
                      setSelectedImage(images[currentIdx - 1]);
                  }}
                  disabled={
                    images.findIndex((img) => img.id === selectedImage.id) === 0
                  }
                  aria-label="Previous image"
                >
                  <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>

                {/* Next Button */}
                <button
                  className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-black/50 text-white transition-all duration-200 hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-6 sm:h-14 sm:w-14 ${
                    images.findIndex((img) => img.id === selectedImage.id) ===
                    images.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:text-primary-400"
                  }`}
                  onClick={() => {
                    const currentIdx = images.findIndex(
                      (img) => img.id === selectedImage.id
                    );
                    if (currentIdx < images.length - 1)
                      setSelectedImage(images[currentIdx + 1]);
                  }}
                  disabled={
                    images.findIndex((img) => img.id === selectedImage.id) ===
                    images.length - 1
                  }
                  aria-label="Next image"
                >
                  <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative max-h-full max-w-full overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.url}
                  alt={
                    selectedImage.altText ||
                    `${productName || "Product"} - Fullscreen view`
                  }
                  className="h-auto w-auto max-h-[85vh] max-w-[85vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
                  width={1200}
                  height={1200}
                  priority
                  quality={95}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  role="img"
                  aria-describedby="fullscreen-image-desc"
                />
                {/* Extended description for screen readers */}
                <span id="fullscreen-image-desc" className="sr-only">
                  Fullscreen view of {productName || "product"} image.
                  {selectedImage.altText &&
                    `Description: ${selectedImage.altText}. `}
                  Use arrow keys to navigate between images or press Escape to
                  close.
                </span>
              </div>
            </div>
          </div>

          {/* Keyboard hint - Bottom */}
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center">
            <div
              className="bg-black/50 px-4 py-2 text-xs text-white/70 backdrop-blur-sm sm:text-sm"
              role="status"
              aria-live="polite"
            >
              <span className="sr-only">Keyboard shortcuts: </span>
              Press ESC to close{" "}
              {images.length > 1 && "• Arrow keys to navigate"}
            </div>
          </div>

          {/* Additional accessibility improvements */}
          <div className="sr-only" aria-live="assertive" aria-atomic="true">
            {/* Announce image changes to screen readers */}
            Image {images.findIndex((img) => img.id === selectedImage.id) +
              1}{" "}
            of {images.length} is now displayed.
            {selectedImage.altText && ` ${selectedImage.altText}`}
          </div>
        </div>
      )}
    </>
  );
}

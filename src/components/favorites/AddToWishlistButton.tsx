"use client";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "../ui/button";
import { WishlistItem } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";

interface AddToWishlistButtonProps {
  productId: string;
  variant?: "icon" | "text";
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  iconSize?: number;
  strokeWidth?: number;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({
  productId,
  variant = "icon",
  className = "",
  size = variant === "text" ? "default" : "icon",
  iconSize = 16,
  strokeWidth = 1.5,
}) => {
  const { data: session } = useSession();
  const { addToWishlist, removeFromWishlist, wishlist, isMutating } =
    useWishlist(!!session);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const isInWishlist = wishlist?.items.some(
    (item: WishlistItem) => item.productId === productId
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      setShowLoginDialog(true);
      return;
    }

    if (isInWishlist) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate(productId);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Prevent event bubbling when dialog is closed by outside click
      setTimeout(() => {
        setShowLoginDialog(false);
      }, 0);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLoginDialog(false);
  };

  const handleDialogContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDialogOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const renderButton = () => {
    if (variant === "text") {
      return (
        <label
          className={`flex items-center gap-2 hover:text-red-500 transition-colors duration-200 ${className} ${
            isMutating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleClick}
        >
          <Heart
            size={iconSize}
            strokeWidth={strokeWidth}
            className={`${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
          />
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </label>
      );
    }

    return (
      <Button
        variant="ghost"
        size={size}
        className={`hover:text-red-500 transition-colors duration-200 ${className}`}
        onClick={handleClick}
        disabled={isMutating}
      >
        <Heart
          size={iconSize}
          strokeWidth={strokeWidth}
          className={`${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>
    );
  };

  return (
    <>
      {renderButton()}
      {showLoginDialog && (
        <div
          className="fixed inset-0 z-50"
          onClick={handleDialogOverlayClick}
        />
      )}
      <AlertDialog open={showLoginDialog} onOpenChange={handleDialogClose}>
        <AlertDialogContent onClick={handleDialogContentClick}>
          <AlertDialogHeader>
            <AlertDialogTitle>Login to add to wishlist</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <Button
              asChild
              className="bg-btn-primary hover:bg-btn-primary-hover text-white rounded-none"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddToWishlistButton;

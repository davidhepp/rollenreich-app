"use client";

import React from "react";
import { Order, OrderCardProps } from "../orderhistory/orderhistelement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Rating from "@/components/product/Rating";
import Image from "next/image";

const OrderCard = ({
  order,
  onAddAllToCart,
  isAddingToCart = false,
}: OrderCardProps) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50";
      case "shipped":
        return "text-blue-600 bg-blue-50";
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "pending":
        return "text-gray-600 bg-gray-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "shipped":
        return "Shipped";
      case "processing":
        return "Processing";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <Card className="rounded-none bg-transparent shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-lg">
                Order {order.orderNumber}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(order.createdAt).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-none text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-base font-medium">{order.total.toFixed(2)}€</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={item.imageSrc || "/placeholder.png"}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.title}
                </p>
                {item.collection && (
                  <p className="text-sm text-gray-600">{item.collection}</p>
                )}
                {item.variation && (
                  <p className="text-sm text-gray-600">{item.variation}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Rating
                  initialRating={0}
                  allowHalfStars={true}
                  showLabel={false}
                  readonly={false}
                  size="sm"
                ></Rating>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none"
            onClick={() => onAddAllToCart(order)}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add all to cart"
            )}
          </Button>
          <Button variant="outline" size="sm" className="rounded-none">
            Download Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

"use client";

import React from "react";
import { Order, OrderCardProps } from "../orderhistory/orderhistelement";
import Rating from "@/components/product/Rating";
import Image from "next/image";

const OrderCard = ({ order, onAddAllToCart }: OrderCardProps) => {
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50';
            case 'shipped':
                return 'text-blue-600 bg-blue-50';
            case 'processing':
                return 'text-yellow-600 bg-yellow-50';
            case 'pending':
                return 'text-gray-600 bg-gray-50';
            case 'cancelled':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusText = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return 'delivered';
            case 'shipped':
                return 'shipped';
            case 'processing':
                return 'processing';
            case 'pending':
                return 'pending';
            case 'cancelled':
                return 'cancelled';
            default:
                return status;
        }
    };

    return (
        <div className="bg-gray-50 rounded-none p-6 border-b">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Order {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-none text-sm font-medium ${getStatusColor(order.status)}`}>
                        {/* TODO: Replace with status badge icon when available */}
                        <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" />
                        {getStatusText(order.status)}
                    </span>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Whole</p>
                    <p className="font-semibold text-lg">
                        {order.total.toFixed(2)} €
                    </p>
                </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                            {item.imageSrc && (
                                <Image
                                    src={item.imageSrc}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.collection && (
                                <p className="text-sm text-gray-600">
                                    {item.collection}
                                </p>
                            )}
                            {item.variation && (
                                <p className="text-sm text-gray-600">
                                    {item.variation}
                                </p>
                            )}
                            <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Rating
                                initialRating={0}
                                allowHalfStars={true}
                                showLabel={true}
                                readonly={false}
                                size="lg">
                            </Rating>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">
                                {(item.price * item.quantity).toFixed(2)} €
                            </p>
                            <p className="text-sm text-gray-600">
                                {item.price.toFixed(2)} € / piece
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Actions */}
            <div className="flex gap-3 pt-4">
                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
                        onClick={() => onAddAllToCart(order)}>
                    <span className="underline text-sm">Add all to cart</span>

                </button>
                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                    <span className="underline text-sm">Track Order</span>

                </button>
                <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
                    <span className="underline text-sm">Downloading Invoice</span>

                </button>
            </div>
        </div>
    );
};

export default OrderCard;
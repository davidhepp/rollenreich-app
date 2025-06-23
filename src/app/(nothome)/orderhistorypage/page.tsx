"use client";

import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import OrderCard from "@/components/orderhistory/historyelement";
import { Order } from "@/components/orderhistory/orderhistelement";

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                setIsLoading(true);


                await new Promise(resolve => setTimeout(resolve, 1000));


                const mockOrders: Order[] = [
                    {
                        id: '1',
                        orderNumber: 'ORD-2024-001',
                        createdAt: '2024-01-15T10:30:00Z',
                        status: 'delivered',
                        total: 149.99,
                        items: [
                            {
                                id: '1',
                                title: 'Premium T-Shirt',
                                price: 29.99,
                                quantity: 2,
                                collection: 'Summer Collection',
                                variation: 'Größe M, Farbe Blau',
                                imageSrc: '/images/tshirt.jpg'
                            },
                            {
                                id: '2',
                                title: 'Jeans Classic',
                                price: 89.99,
                                quantity: 1,
                                collection: 'Basics',
                                variation: 'Größe 32, Farbe Schwarz',
                                imageSrc: '/images/jeans.jpg'
                            }
                        ]
                    },
                    {
                        id: '2',
                        orderNumber: 'ORD-2024-002',
                        createdAt: '2024-02-20T14:15:00Z',
                        status: 'shipped',
                        total: 79.99,
                        items: [
                            {
                                id: '3',
                                title: 'Sneakers Sport',
                                price: 79.99,
                                quantity: 1,
                                collection: 'Sport Collection',
                                variation: 'Größe 42, Farbe Weiß',
                                imageSrc: '/images/sneakers.jpg'
                            }
                        ]
                    }
                ];

                setOrders(mockOrders);
            } catch (err) {
                setError('Fehler beim Laden der Bestellhistorie');
                console.error('Error fetching order history:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    const handleAddAllToCart = (order: Order) => {

        console.log('Adding all items to cart:', order.items);

    };

    // Loading State
    if (isLoading) {
        return (
            <div className="bg-white min-h-screen py-16 px-4 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="ml-2">Lade Bestellhistorie...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="bg-white min-h-screen py-16 px-4 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Error while loading orders
                        </h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-16 px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Orderhistory</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        My Order History
                    </h1>
                    <p className="text-gray-600">
                        Overview of your past orders and their details.
                    </p>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    // Empty State
                    <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No Orders Found
                        </h2>
                        <p className="text-gray-600 mb-4">
                            You have not made any order yet.
                        </p>
                        <Button asChild>
                            <Link href="/products">Shop Now</Link>
                        </Button>
                    </div>
                ) : (
                    // Orders List
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onAddAllToCart={handleAddAllToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
"use client";

import React, { useState } from 'react';
import Image from "next/image";

interface CartItemProps {
    name: string;
    price: number;
    quantity: number;
    imageSrc?: string;
    onQuantityChange?: (newQuantity: number) => void;
}

const CartItem = ({ name, price, quantity, imageSrc, onQuantityChange }: CartItemProps) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleQuantityChange = (newQuantity: number) => {
        setCurrentQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };

    return (
        <div className="border-t border-b border-gray-200 py-6">
            <div className="flex gap-6 items-start">

                {imageSrc && (
                    <div className="relative">
                        <Image
                            src={imageSrc}
                            alt={name}
                            width={128}
                            height={160}
                            className="object-cover rounded bg-bg-primary"
                            style={{ width: '8rem', height: '10rem' }}
                        />
                    </div>
                )}


                <div className="flex flex-col justify-between flex-1 h-40">

                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
                        <p className="text-gray-500 text-sm mb-1">Collection</p>
                        <p className="text-gray-500 text-sm">Variation</p>
                    </div>


                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                        <button className="hover:text-gray-700 transition-colors">Edit</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-700 transition-colors">Remove</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-700 transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            Saved Items
                        </button>
                    </div>
                </div>


                <div className="flex flex-col justify-between h-40 items-end">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select
                                className="text-sm border border-gray-300 rounded px-3 py-2 pr-8 bg-white text-gray-700 focus:ring-2 focus:ring-[#bfa77a] focus:border-[#bfa77a] focus:outline-none appearance-none cursor-pointer min-w-[90px]"
                                value={currentQuantity}
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        QTY: {i + 1}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <span className="font-bold text-xl text-gray-900">${(price * currentQuantity).toFixed(0)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CartItem;
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
interface AbomodellProps {
    title: string;
    price: number;
    features: string[];
    highlight?: boolean;
    billingCycle: string;
}

const Abomodell: React.FC<AbomodellProps> = ({ title, price, features, highlight = false,  billingCycle}) => {
    return (
        <div className={`bg-white rounded-none border p-6 flex flex-col justify-between ${highlight ? 'bg-gray-100' : ''}`}>
            {/* Badge */}
            <div className="mb-4">
                <span className="bg-btn-primary text-white text-xs font-semibold px-2 py-1 rounded-none">{title.toUpperCase()}</span>
            </div>

            {/* Preis */}
            <div className="mb-2">
                <h3 className="text-3xl font-bold">${price}</h3>
                <p className="text-gray-500 text-sm">{billingCycle}</p>
            </div>

            <div className="border-b"></div>

            {/* Features */}
            <ul className="mt-4 space-y-2 text-sm text-gray-700 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-btn-primary mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Button */}
        <Button className="mt-6 w-full bg-btn-primary hover:bg-btn-primary-hover text-white mb-2 rounded-none">
          CONTINUE
        </Button>

        </div>

    );
};

export default Abomodell;


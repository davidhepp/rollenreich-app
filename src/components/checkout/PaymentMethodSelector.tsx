"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { FaPaypal } from "react-icons/fa";

type PaymentMethod = "credit-card" | "paypal" | "klarna";

interface PaymentMethodSelectorProps {
  onPaymentMethodChange?: (method: PaymentMethod) => void;
  total: number;
}

export default function PaymentMethodSelector({
  onPaymentMethodChange,
  total,
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("credit-card");

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onPaymentMethodChange?.(method);
  };

  const KlarnaIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="#000000"
        fill="none"
      >
        <circle
          cx="20"
          cy="18.5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        ></circle>
        <rect
          x="2"
          y="3.5"
          width="4"
          height="17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        ></rect>
        <path
          d="M15 3.5H11.1985C11.1985 9.8463 6 12.5 6 12.5L11.8931 20.5H16.5L11 13C11 13 15 10 15 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        ></path>
      </svg>
    );
  };

  const paymentMethods = [
    {
      id: "credit-card" as PaymentMethod,
      name: "Credit Card",
      icon: CreditCard,
      description: "Pay with your credit or debit card",
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      icon: FaPaypal,
      description: "Pay with your PayPal account",
    },
    {
      id: "klarna" as PaymentMethod,
      name: "Klarna",
      icon: KlarnaIcon,
      description: "Buy now, pay later with Klarna",
    },
  ];

  const renderPaymentForm = (total: number) => {
    switch (selectedMethod) {
      case "credit-card":
        return (
          <Card className="mt-4 border-gray-200 rounded-none">
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiration date</Label>
                  <Input id="expiry" placeholder="MM / YY" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Name on card</Label>
                <Input
                  id="cardName"
                  placeholder="Full name as shown on card"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="billingAddress" className="rounded-none" />
                <Label htmlFor="billingAddress" className="text-sm">
                  Use shipping address as billing address
                </Label>
              </div>
            </CardContent>
          </Card>
        );

      case "paypal":
        return (
          <Card className="mt-4 border-gray-200 rounded-none">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Button className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white mb-2 rounded-none">
                  <FaPaypal className="w-4 h-4 mr-2" />
                  Pay with PayPal
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "klarna":
        return (
          <Card className="mt-4 border-gray-200 rounded-none">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Button className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white mb-2 rounded-none">
                  <KlarnaIcon />
                  Pay with Klarna
                </Button>
                <p className="text-sm text-gray-600 mb-6">
                  Split your payment into 4 interest-free installments.
                </p>
                <div className="bg-pink-50 border border-pink-200 rounded-none p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Today:</span>
                    <span className="font-medium">
                      {(total / 4).toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In 2 weeks:</span>
                    <span className="font-medium">
                      {(total / 4).toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In 4 weeks:</span>
                    <span className="font-medium">
                      {(total / 4).toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In 6 weeks:</span>
                    <span className="font-medium">
                      {(total / 4).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-lg">Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`border rounded-none p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <Icon className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {method.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {renderPaymentForm(total)}
      </CardContent>
    </Card>
  );
}

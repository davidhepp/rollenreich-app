"use client";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CartItem, Product, ProductImage } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { total, cart } = useCart();
  const { createOrder, isCreatingOrder } = useOrders();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Germany",
    phone: "",
    paymentMethod: "credit",
  });

  const subtotal = total;
  const shipping = 9.99;
  const finalTotal = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompleteOrder = async () => {
    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      phone: formData.phone,
    };

    try {
      await createOrder({
        shippingAddress,
        billingAddress: shippingAddress, // Using same address for billing
        paymentMethod: formData.paymentMethod,
      });

      // Redirect to orders page on success
      router.push("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/cart"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to cart
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">No items in cart</h1>
            <p className="text-sm text-gray-600">
              <Link
                href="/shop/viewall"
                className="text-btn-primary hover:underline"
              >
                Add items
              </Link>{" "}
              to your cart to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/cart"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to cart
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="rounded-none bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="updates" className="rounded-none" />
                  <Label htmlFor="updates" className="text-sm">
                    Keep me updated on news and offers
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="mt-1"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="mt-1"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    className="mt-1"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input
                    id="apartment"
                    placeholder="Apartment, suite, etc."
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      className="mt-1"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      className="mt-1"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP code</Label>
                    <Input
                      id="zipCode"
                      placeholder="ZIP code"
                      className="mt-1"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country/Region</Label>
                  <Input
                    id="country"
                    placeholder="Germany"
                    className="mt-1"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="mt-1"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <PaymentMethodSelector total={finalTotal} />
          </div>

          <div className="lg:pl-6">
            <Card className="sticky top-16 rounded-none bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {cart.map(
                    (
                      item: CartItem & {
                        product: Product & { images: ProductImage[] };
                      }
                    ) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative">
                          <Image
                            src={
                              item.product.images[0]?.url || "/placeholder.png"
                            }
                            alt={item.product.name}
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
                            {item.product.name}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {(Number(item.product.price) * item.quantity).toFixed(
                            2
                          )}
                          €
                        </p>
                      </div>
                    )
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping.toFixed(2)}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white mb-2 rounded-none"
                  size="lg"
                  onClick={handleCompleteOrder}
                  disabled={
                    isCreatingOrder ||
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.address
                  }
                >
                  {isCreatingOrder ? "Processing..." : "Complete Order"}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By placing your order, you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

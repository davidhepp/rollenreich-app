interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export const getOrders = async () => {
  const res = await fetch("/api/orders/getorders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const createOrder = async (orderData: {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
}) => {
  const res = await fetch("/api/orders/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch("/api/orders/getorders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const createOrder = async (orderData: {
  shippingAddress: any;
  billingAddress?: any;
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

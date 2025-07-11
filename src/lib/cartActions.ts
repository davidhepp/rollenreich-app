export const getCart = async () => {
  const res = await fetch("/api/cart/getcart");
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export const updateQuantity = async (productId: string, quantity: number) => {
  const res = await fetch("/api/cart/editquantity", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update quantity");
  return res.json();
};

export const removeItem = async (productId: string) => {
  const res = await fetch("/api/cart/removefromcart", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
};

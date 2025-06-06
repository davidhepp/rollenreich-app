export const getCart = async () => {
  const cart = await fetch("/api/cart/getcart").then((res) => res.json());
  return cart;
};

export const editQuantity = async (productId: string, quantity: number) => {
  const response = await fetch("/api/cart/editquantity", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
};

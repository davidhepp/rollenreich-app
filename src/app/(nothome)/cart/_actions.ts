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

export const removeFromCart = async (productId: string) => {
  const response = await fetch("/api/cart/removefromcart", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  return response.json();
};

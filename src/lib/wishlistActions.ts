export const getWishlist = async () => {
  const res = await fetch("/api/wishlist/getwishlist");
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
};

export const addToWishlist = async (productId: string) => {
  const res = await fetch("/api/wishlist/addtowishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to add to wishlist");
  return res.json();
};

export const removeFromWishlist = async (productId: string) => {
  const res = await fetch("/api/wishlist/removefromwishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res.json();
};

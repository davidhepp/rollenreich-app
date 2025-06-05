export const fetchProducts = async () => {
  const data = await fetch(`/api/admin/fetchproducts`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  });
  return data;
};

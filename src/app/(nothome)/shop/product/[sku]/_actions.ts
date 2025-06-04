export const fetchProduct = async (sku: string) => {
  const data = await fetch(`/api/products/getproduct?sku=${sku}`).then((res) =>
    res.json()
  );
  return data;
};

export const fetchCollections = async () => {
  const data = await fetch(`/api/admin/fetchcollections`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    return res.json();
  });
  return data;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const fetchCollection = async (slug: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/collection/getcollection?slug=${slug}`
    );

    if (!response.ok) {
      // Handle 404 and other error responses
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const collection = await response.json();
    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
};

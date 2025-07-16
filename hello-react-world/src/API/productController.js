const DataBase_URL = `http://localhost:3000/api/products`;
// מביא מוצר בודד לפי ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${DataBase_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched single product:", data);
    return data; // מחזיר את האובייקט של המוצר ולא את data.data
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    // שליחת בקשה לשרת עם ה-id של הקטגוריה
    const response = await fetch(`${DataBase_URL}?categoryId=${categoryId}`);
    console.log(
      "Fetching products by category, URL:",
      `${DataBase_URL}?categoryId=${categoryId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await fetch(DataBase_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
      );
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const updateProduct = async (id, updatedFields) => {
  try {
    console.log("Updated fields sent to server:", updatedFields);

    const response = await fetch(`${DataBase_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

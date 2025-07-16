const DB_url = `http://localhost:3000/api/categories`;
//יצירת פונקציה אסינכורנית לשליפת הוסף הקטגוריות
export const getCategories = async () => {
  //שליחת בקשה לשרת
  try {
   
    const response = await fetch(DB_url);
    //בדיקת סטטוס התגובה
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //המרת התגובה לJSON
    const result = await response.json();
    //הדפסת הקטגוריות שהתקבלו
    console.log("Fetched categories:", result);

    return result.data; // החזרת המידע מתוך האובייקט
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const addCategory = async (categoryData) => {
  try {
    const response = await fetch(DB_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Category added:", result);
    return result.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

const API_URL = "http://localhost:3000/api/shoppingCart";

export const fetchCart = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("שגיאה בקבלת הנתונים");
  }

  const data = await response.json();
  return data;
};

export const addItemToCart = async ({ product, quantity, token }) => {
  if (!product?._id || !token || !quantity) {
    throw new Error("חסר מידע חשוב לביצוע הבקשה");
  }

  const formattedItem = {
    products: [
      {
        productId: product._id.toString(),
        quantity: quantity,
      },
    ],
  };

  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formattedItem),
  });

  const responseText = await response.text();
  console.log("📨 תגובת השרת:", responseText);

  if (!response.ok) {
    throw new Error(" שגיאה בהוספת מוצר לעגלה: " + responseText);
  }

  return JSON.parse(responseText);
};

export const removeItemFromCart = async (itemId) => {
  const response = await fetch(`${API_URL}/${itemId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("שגיאה בהסרת פריט");
  }
  return response.json();
};

export const updateItemQuantity = async (cartId, productId, quantity) => {
  const response = await fetch(
    `http://localhost:3000/api/shoppingCart/${cartId}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!response.ok) {
    throw new Error("שגיאה בעדכון הכמות");
  }

  return await response.json();
};

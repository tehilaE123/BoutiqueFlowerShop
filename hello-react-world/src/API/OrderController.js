const DB_URL = "http://localhost:3000/api/orders";

//שליפת כל ההזמנות
export const getAllOrders = async () => {
  const response = await fetch(DB_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const result = await response.json();
  return result.data;
};

//שליפת הזמנה לפי מזהה
export const getOrderById = async (id) => {
  const response = await fetch(`${DB_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order with id");
  }
  const result = await response.json();
  return result;
};

//הוספת הזמנה חדשה
export const addNewOrder = async (order) => {
  const response = await fetch(DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to add order");
  }

  const result = await response.json();
  return result.data;
};

//עדכון הזמנה
export const updateOrder = async (id, order) => {
  const response = await fetch(`${DB_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Failed to update order");
  }
  const result = await response.json();
  return result.data;
};

//מחיקת הזמנה
export const deleteOrder = async (id) => {
  const response = await fetch(`${DB_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete order");
  }
  const result = await response.json();
  return result.data;
};

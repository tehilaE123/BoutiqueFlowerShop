import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrder,
} from "../../API/OrderController";

//שליפת כל ההזמנות
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await getAllOrders();
  return response;
});

//שליפת הזמנה לפי מזהה
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const response = await getOrderById(id);
    return response;
  }
);

//הוספת הזמנה
export const addOrder = createAsyncThunk("order/addOrder", async (order) => {
  const response = await addNewOrder(order);
  return response;
});

//עדכון הזמנה
export const updateOrderId = createAsyncThunk(
  "order/updateOrderId",
  async ({ id, order }) => {
    const response = await updateOrder(id, order);
    return response;
  }
);

//מחיקת הזמנה
export const deleteOrderById = createAsyncThunk(
  "order/deleteOrder",
  async (id) => {
    await deleteOrder(id);
    return id;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderId.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});
export default orderSlice.reducer;

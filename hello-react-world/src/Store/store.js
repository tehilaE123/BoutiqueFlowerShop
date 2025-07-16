import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
import categoryReducer from "./Slice/categorySlice";
import userSlice from "./Slice/userSlice";
import cartSlice from "./Slice/cartSlice";
import orderSlice from "./Slice/orderSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    user: userSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
export default store;

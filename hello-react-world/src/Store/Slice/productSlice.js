import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  updateProduct,
  getProductsByCategory,
  getProductById,
} from "../../API/productController";

//מוצר בודד
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const product = await getProductById(id);
      return product.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//טעינת כל המוצרים
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) throw new Error("Failed to fetch all products");
    return await res.json();
  }
);
// יצירת סלאייס עבור המוצרים לפי הקטגוריה
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId) => {
    const response = await getProductsByCategory(categoryId);

    return response;
  }
);
export const updateProductById = createAsyncThunk(
  "products/updateProductById",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const update = await updateProduct(id, updateData);
      return update;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const newProduct = await addProduct(productData);
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    allProducts: [],
    loading: false,
    error: null,
    selectedProduct: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default productSlice.reducer;

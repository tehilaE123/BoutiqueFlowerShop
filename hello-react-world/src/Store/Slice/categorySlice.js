import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, addCategory } from "../../API/categoryController";

// יצירת סלאייס עבור הקטגוריות
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    // קריאה לפונקציה שמביאה את הקטגוריות מהשרת
    const response = await getCategories();
    return response;
  }
);
export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async (newCategory) => {
    const response = await addCategory(newCategory);
    return response;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // עדכון הקטגוריות שהתקבלו מהשרת
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // שמירת הודעת השגיאה
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});
export default categorySlice.reducer;

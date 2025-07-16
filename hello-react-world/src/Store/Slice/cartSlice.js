// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   addItemToCart,
//   updateItemQuantity,
//   fetchCart,
// } from "../../API/shoppingCartController";

// // ----- Thunks -----

// // שליפת עגלה
// export const fetchCart1 = createAsyncThunk(
//   "cart/fetchCart1",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return { cartId: null, products: [] };

//       const response = await fetchCart();
//       if (response?.data) {
//         return {
//           cartId: response.data._id,
//           products: response.data.products || [],
//         };
//       }

//       return { cartId: null, products: [] };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // הוספת מוצר
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ product, quantity, token }, { rejectWithValue }) => {
//     try {
//       const response = await addItemToCart({ product, quantity, token });
//       if (response?.data) {
//         return {
//           cartId: response.data._id,
//           products: response.data.products || [],
//         };
//       }
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // הסרת מוצר
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ cartId, productId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3000/api/shoppingCart/${cartId}/products/${productId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return {
//         cartId: data.data._id,
//         products: data.data.products || [],
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // עדכון כמות
// export const updateQuantity = createAsyncThunk(
//   "cart/updateQuantity",
//   async ({ cartId, productId, quantity }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3000/api/shoppingCart/${cartId}/products/${productId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ quantity }),
//         }
//       );

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return {
//         cartId: data.data._id,
//         products: data.data.products || [],
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ניקוי סל מהשרת
// export const clearCartServer = createAsyncThunk(
//   "cart/clearCartServer",
//   async (cartId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3000/api/shoppingCart/${cartId}/clear`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       return { cartId: null, products: [] };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//     cartId: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCartState: (state) => {
//       state.cartItems = [];
//       state.cartId = null;
//     },
//     loadCart: (state, action) => {
//       state.cartItems = action.payload.items;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart1.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart1.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload.products || [];
//         state.cartId = action.payload.cartId || null;
//       })
//       .addCase(fetchCart1.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload.products || [];
//         state.cartId = action.payload.cartId;
//       })

//       .addCase(updateQuantity.fulfilled, (state, action) => {
//         state.cartItems = action.payload.products || [];
//         state.cartId = action.payload.cartId;
//       })

//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload.products || [];
//         state.cartId = action.payload.cartId;
//       })

//       .addCase(clearCartServer.fulfilled, (state) => {
//         state.cartItems = [];
//         state.cartId = null;
//       })

//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export const { clearCartState, loadCart, clearError } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCart,
  updateItemQuantity,
  fetchCart,
} from "../../API/shoppingCartController";

// ----- Thunks -----

// שליפת עגלה
export const fetchCart1 = createAsyncThunk(
  "cart/fetchCart1",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { cartId: null, products: [] };

      const response = await fetchCart();
      if (response?.data) {
        return {
          cartId: response.data._id,
          products: response.data.products || [],
        };
      }

      return { cartId: null, products: [] };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// הוספת מוצר
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity, token }, { rejectWithValue }) => {
    try {
      const response = await addItemToCart({ product, quantity, token });
      if (response?.data) {
        return {
          cartId: response.data._id,
          products: response.data.products || [],
        };
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// הסרת מוצר
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/shoppingCart/${cartId}/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        cartId: data.data._id,
        products: data.data.products || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// עדכון כמות
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/shoppingCart/${cartId}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        cartId: data.data._id,
        products: data.data.products || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ניקוי סל מהשרת
export const clearCartServer = createAsyncThunk(
  "cart/clearCartServer",
  async (cartId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/shoppingCart/${cartId}/clear`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return { cartId: null, products: [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartId: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.cartItems = [];
      state.cartId = null;
    },
    loadCart: (state, action) => {
      state.cartItems = action.payload.items;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart1.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.products || [];
        state.cartId = action.payload.cartId || null;
      })
      .addCase(fetchCart1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.products || [];
        state.cartId = action.payload.cartId;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.products || [];
        state.cartId = action.payload.cartId;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.products || [];
        state.cartId = action.payload.cartId;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(clearCartServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartServer.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.cartId = null;
      })
      .addCase(clearCartServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState, loadCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;

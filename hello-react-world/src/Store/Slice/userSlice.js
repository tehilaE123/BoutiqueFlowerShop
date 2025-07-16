import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData, loginUser, signUpUser } from "../../API/userController";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { isRejectedWithValue }) => {
    try {
      const data = await fetchUserData();
      return data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user; // מחזיר את המשתמש המחובר
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUserThunk = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await signUpUser(userData);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  allUsers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.allUsers = [];
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUserThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signUpUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

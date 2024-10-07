import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/api";

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart", { productId, quantity });
      return res.data;
    } catch (error) {
      // Handle the error properly
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const loadCartItems = createAsyncThunk(
  "cart/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart items"
      );
    }
  }
);

export const removeItems = createAsyncThunk(
  "/cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/cart/RemoveItem`, { productId });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.ressponse.data.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "/cart/quantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/cart/`, { productId, quantity });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    products: [],
    totalPrice: 0,
    isPending: false,
    error: null, // Add error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isPending = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(loadCartItems.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(loadCartItems.fulfilled, (state, action) => {
        state.isPending = false;
        state.cart = action.payload;
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
    builder
      .addCase(removeItems.pending, (state) => {
        state.isPending = true;
        state.error = false;
      })
      .addCase(removeItems.fulfilled, (state, action) => {
        state.isPending = false;
        state.cart = action.payload;
      })
      .addCase(removeItems.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateQuantity.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isPending = true;
        state.cart = action.payload;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isPending = true;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

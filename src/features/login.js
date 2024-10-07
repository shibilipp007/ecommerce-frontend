import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.delete("/auth/logout");
      return res.data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || "Somthing went wrong");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    changeLoginStatus: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.loggedIn = false;
      state.user = null;
    });
  },
});

export const { changeLoginStatus } = loginSlice.actions;

export default loginSlice.reducer;

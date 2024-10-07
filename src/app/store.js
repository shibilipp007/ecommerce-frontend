import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart";
import loginSlice from "../features/login";

export default configureStore({
  reducer: {
    cart: cartSlice,
    login: loginSlice,
  },
});

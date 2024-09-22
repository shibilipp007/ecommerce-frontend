import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});

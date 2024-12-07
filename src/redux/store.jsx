import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import Cartslice from "./CartSlice";
import wishListSlice from "./wishListSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: Cartslice,
    wishList: wishListSlice,
  },
});

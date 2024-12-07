import { createSlice } from "@reduxjs/toolkit";

// Initial state for the wishlist
const initialState = {
  product: [], // Array to hold wishlist products
};

// Wishlist slice to manage adding/removing items
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishList(state, action) {
      const newItem = action.payload;
      // Check if the item is already in the wishlist
      const existingItem = state.product.find((item) => item.id === newItem.id);
      if (!existingItem) {
        // Only add the item if it's not already in the wishlist
        state.product.push(newItem);
      }
    },
    // Remove item from wishlist
    removeFromWishList(state, action) {
      const id = action.payload;
      state.product = state.product.filter((item) => item.id !== id);
    },
    // Clear entire wishlist
    clearWishList(state) {
      state.product = [];
    },
  },
});

// Export the actions to be used in components
export const { addToWishList, removeFromWishList, clearWishList } =
  wishListSlice.actions;

// Export the reducer to be used in the store
export default wishListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if it exists, otherwise use default state
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return {
    product: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const itemIndex = state.product.find((item) => item._id === newItem._id);
      if (itemIndex) {
        itemIndex.quantity++;
        itemIndex.totalPrice += newItem.price;
      } else {
        state.product.push({
          id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.images,
          color: newItem.selectedColor,
          size: newItem.selectedSize,
        });
      }
      state.totalPrice += newItem.price;
      state.totalQuantity++;

      // Update localStorage whenever the cart state changes
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      const _id = action.payload;
      const findItem = state.product.find((item) => item._id === _id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.product = state.product.filter((item) => item._id !== _id);
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity(state, action) {
      const _id = action.payload;
      const findItem = state.product.find((item) => item._id === _id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalQuantity++;
        state.totalPrice += findItem.price;
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity(state, action) {
      const _id = action.payload;
      const findItem = state.product.find((item) => item._id === _id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
      }

      // Handle the case where quantity reaches 0 and remove item
      if (findItem && findItem.quantity === 1) {
        state.totalPrice -= findItem.price;
        state.product = state.product.filter((item) => item._id !== _id);
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart(state) {
      state.product = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Clear localStorage when cart is cleared
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

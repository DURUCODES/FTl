export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const ADD_TO_WISH_LIST = "ADD_TO_WISH_LIST";
export const REMOVE_FROM_WISH_LIST = "REMOVE_FROM_WISH_LIST";
export const CLEAR_WISH_LIST = "CLEAR_WISH_LIST";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const clearCart = () => ({
  type: "CLEAR_CART",
});

// Add an item to the wish list
export const addToWishList = (product) => ({
  type: ADD_TO_WISH_LIST,
  payload: product,
});

// Remove an item from the wish list
export const removeFromWishList = (productId) => ({
  type: REMOVE_FROM_WISH_LIST,
  payload: productId,
});

// Clear the entire wish list
export const clearWishList = () => ({
  type: CLEAR_WISH_LIST,
});

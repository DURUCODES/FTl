import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
  searchTerm: "",
  filteredData: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filteredData = state.product.filter((product) =>
        product.name
          .toLowerCase()
          .includes(state.searchTerm.toLocaleLowerCase())
      );
    },
  },
});
export const { setProduct, setSearchTerm } = ProductSlice.actions;
export default ProductSlice.reducer;

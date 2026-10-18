import { createSlice } from "@reduxjs/toolkit";
const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    cartCount: 0,
  },

  reducers: {
    increment: (state) => {
      state.cartCount += 1;
    },
    decrement: (state) => {
      state.cartCount -= 1;
    },
    reset: (state) => {
      state.cartCount = 0;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { increment, decrement, setCartCount, reset } = cartCountSlice.actions;

export default cartCountSlice.reducer;

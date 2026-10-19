import { createSlice } from "@reduxjs/toolkit";

const userCartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: [],
    total: 0,
  },

  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setUserCart, setTotal } = userCartSlice.actions;

export default userCartSlice.reducer;

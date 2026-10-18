import { createSlice } from "@reduxjs/toolkit";

const userCartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: [
      {
        
      }
    ],
  },

  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
  },
});

export const { setUserCart } = userCartSlice.actions;

export default userCartSlice.reducer;

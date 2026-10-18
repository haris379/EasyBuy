import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userCartReducer from "./userCart";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    cartCount: cartSlice,
    userCart: userCartReducer,
    loadingSlice: loadingReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userCartReducer from "./userCart";
import loadingReducer from "./loadingSlice";
import userSlice from "./user";

export const store = configureStore({
  reducer: {
    cartCount: cartSlice,
    userCart: userCartReducer,
    loadingSlice: loadingReducer,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

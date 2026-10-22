import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userCartReducer from "./userCartSlice";
import loadingReducer from "./loadingSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    cartCount: cartReducer,
    userCart: userCartReducer,
    loadingSlice: loadingReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

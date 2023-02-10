import { configureStore } from "@reduxjs/toolkit";
import logoutMiddleware from "./features/middleware/logoutMiddleware";
import bookReducer from "./features/slices/bookSlice";
import cartReducer from "./features/slices/cartSlice";
import userReducer from "./features/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(logoutMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

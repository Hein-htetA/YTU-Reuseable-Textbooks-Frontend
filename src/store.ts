import { configureStore } from "@reduxjs/toolkit";
import cartMiddleware from "./features/middleware/cartMiddleware";
import cartUnmarkMiddleware from "./features/middleware/cartUnmarkMiddleware";
import logoutMiddleware from "./features/middleware/logoutMiddleware";
import bookReducer from "./features/slices/bookSlice";
import cartReducer from "./features/slices/cartSlice";
import orderReducer from "./features/slices/orderSlice";
import userReducer from "./features/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      logoutMiddleware.middleware,
      cartMiddleware.middleware,
      cartUnmarkMiddleware.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

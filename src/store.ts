import { configureStore } from "@reduxjs/toolkit";
import logoutMiddleware from "./features/middleware/logoutMiddleware";
import bookSlice from "./features/slices/bookSlice";
import userSlice from "./features/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    book: bookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(logoutMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

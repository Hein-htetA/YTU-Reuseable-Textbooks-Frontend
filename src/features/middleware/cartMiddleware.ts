import {
  createListenerMiddleware,
  addListener,
  isAnyOf,
} from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import {
  addToCart,
  calculateTotal,
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../slices/cartSlice";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

startAppListening({
  matcher: isAnyOf(addToCart, increaseCount, decreaseCount, removeFromCart),
  effect: (action, listenerApi) => {
    listenerApi.dispatch(calculateTotal());
    sessionStorage.setItem(
      "items",
      JSON.stringify(listenerApi.getState().cart.items)
    );
  },
});

export default listenerMiddleware;

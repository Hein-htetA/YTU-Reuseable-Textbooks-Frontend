import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { removeFromCart } from "../slices/cartSlice";
import { unmarkBookAsInCart } from "../slices/bookSlice";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

startAppListening({
  actionCreator: removeFromCart,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(unmarkBookAsInCart(action.payload));
  },
});

export default listenerMiddleware;

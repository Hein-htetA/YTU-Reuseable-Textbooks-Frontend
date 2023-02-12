import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Book } from "./bookSlice";

export interface BookInCart extends Book {
  count: number;
}

const initializeFun = () => {
  const items: BookInCart[] =
    sessionStorage.getItem("items") !== null
      ? JSON.parse(sessionStorage.getItem("items")!)
      : [];
  const { amount, count } = items.reduce(
    (accumulator, currentValue) => {
      const amount =
        accumulator.amount + currentValue.price * currentValue.count;
      const count = accumulator.count + currentValue.count;
      return { amount, count };
    },
    { amount: 0, count: 0 }
  );

  return {
    items,
    cartModalOpen: false,
    cartModal: {} as Book,
    totalCount: count,
    totalAmount: amount,
    checkoutModalOpen: false,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initializeFun,
  reducers: {
    openCartModal: (state) => {
      state.cartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.cartModalOpen = false;
    },
    closeCheckoutModal: (state) => {
      state.checkoutModalOpen = false;
    },
    openCheckoutModal: (state) => {
      state.checkoutModalOpen = true;
    },
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index === -1) {
        state.items.push({ ...action.payload, count: 1, status: "cart" });
      } else {
        state.items[index].count += 1;
      }
      state.cartModal = action.payload;
      state.cartModalOpen = true;
    },
    increaseCount: (state, action) => {
      const index = state.items.findIndex(
        (book) => book._id === action.payload
      );
      if (index !== -1) {
        state.items[index].count += 1;
      }
    },
    decreaseCount: (state, action) => {
      const index = state.items.findIndex(
        (book) => book._id === action.payload
      );
      if (index !== -1) {
        state.items[index].count -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((book) => book._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    calculateTotal: (state) => {
      const { amount, count } = state.items.reduce(
        (accumulator, currentValue) => {
          const amount =
            accumulator.amount + currentValue.price * currentValue.count;
          const count = accumulator.count + currentValue.count;
          return { amount, count };
        },
        { amount: 0, count: 0 }
      );
      state.totalAmount = amount;
      state.totalCount = count;
    },
  },
});

const SelectCartModalOpen = (state: RootState) => state.cart.cartModalOpen;
const SelectCartModal = (state: RootState) => state.cart.cartModal;
const SelectTotalAmount = (state: RootState) => state.cart.totalAmount;
const SelectTotalCount = (state: RootState) => state.cart.totalCount;
const SelectItems = (state: RootState) => state.cart.items;
const SelectCheckoutModalOpen = (state: RootState) =>
  state.cart.checkoutModalOpen;

export {
  SelectCartModalOpen,
  SelectCartModal,
  SelectTotalAmount,
  SelectTotalCount,
  SelectItems,
  SelectCheckoutModalOpen,
};

export const {
  openCartModal,
  openCheckoutModal,
  closeCartModal,
  closeCheckoutModal,
  addToCart,
  calculateTotal,
  increaseCount,
  decreaseCount,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

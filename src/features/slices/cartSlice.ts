import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Book } from "./bookSlice";

interface InitialState {
  cartModalOpen: boolean;
  items: Book[];
  cartModal: Book;
  totalCount: 0;
  totalAmount: 0;
}

const initialState: InitialState = {
  cartModalOpen: false,
  items: [],
  cartModal: {} as Book,
  totalCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCartModal: (state) => {
      state.cartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.cartModalOpen = false;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.cartModal = action.payload;
      state.cartModalOpen = true;
    },
  },
});

const SelectCartModalOpen = (state: RootState) => state.cart.cartModalOpen;
const SelectCartModal = (state: RootState) => state.cart.cartModal;
const SelectTotalAmount = (state: RootState) => state.cart.totalAmount;
const SelectTotalCount = (state: RootState) => state.cart.totalCount;

export {
  SelectCartModalOpen,
  SelectCartModal,
  SelectTotalAmount,
  SelectTotalCount,
};

export const { openCartModal, closeCartModal, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

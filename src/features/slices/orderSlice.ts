import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { baseUrl } from "../../url";
import { resetToInitailState } from "./bookSlice";
import { clearCart } from "./cartSlice";

interface InitialState {
  orderHistoryStatus: "idle" | "loading" | "succeeded" | "failed";
  orderHistory: any;
  addNewOrderStatus: "idle" | "loading" | "succeeded" | "failed";
  errorMessage: string;
  checkoutModalOpen: boolean;
}

interface Contacts {
  phone: string;
  telegram: string;
  facebook: string;
  viber: string;
}

const initialState: InitialState = {
  orderHistoryStatus: "idle",
  orderHistory: [],
  addNewOrderStatus: "idle",
  errorMessage: "",
  checkoutModalOpen: false,
};

const addNewOrder = createAsyncThunk<
  any,
  Contacts,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  "cart/addNewOrder",
  async (formValues, { getState, rejectWithValue, dispatch }) => {
    const books = getState().cart.items.map((book) => ({
      _id: book._id,
      count: book.count,
    }));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.token}`,
      },
      body: JSON.stringify({
        ...formValues,
        customerId: getState().user.userData._id,
        customerName: getState().user.userData.name,
        books,
        totalAmount: getState().cart.totalAmount,
      }),
    };
    try {
      const response = await fetch(`${baseUrl}/order`, requestOptions);
      if (!response.ok) {
        if (response.status === 400) {
          const { msg } = await response.json();
          throw new Error(msg);
        }
        throw new Error("");
      }
      const { order } = await response.json();
      dispatch(clearCart());
      dispatch(resetToInitailState());
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchOrderHistory = createAsyncThunk<
  any,
  any,
  { state: RootState; rejectValue: string }
>("order/fetchOrderHistory", async (_, { getState, rejectWithValue }) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
  };
  try {
    const response: any = await fetch(
      `${baseUrl}/order/${getState().user.userData._id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error();
    }
    const { orders } = await response.json();

    return orders;
  } catch (error) {
    return rejectWithValue("");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeCheckoutModal: (state) => {
      state.checkoutModalOpen = false;
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.orderHistoryStatus = "loading";
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.orderHistoryStatus = "succeeded";
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state) => {
        state.orderHistoryStatus = "failed";
      })

      .addCase(addNewOrder.pending, (state) => {
        state.addNewOrderStatus = "loading";
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.addNewOrderStatus = "succeeded";
        state.orderHistory.unshift(action.payload);
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.errorMessage = action.payload!;
        state.checkoutModalOpen = true;
        state.addNewOrderStatus = "failed";
      });
  },
});

const SelectOrderHistoryStatus = (state: RootState) =>
  state.order.orderHistoryStatus;
const SelectOrderHistory = (state: RootState) => state.order.orderHistory;
const SelectAddNewOrderStatus = (state: RootState) =>
  state.order.addNewOrderStatus;
const SelectCheckoutModalOpen = (state: RootState) =>
  state.order.checkoutModalOpen;
const SelectErrorMessage = (state: RootState) => state.order.errorMessage;

export {
  SelectOrderHistory,
  SelectOrderHistoryStatus,
  SelectAddNewOrderStatus,
  SelectCheckoutModalOpen,
  SelectErrorMessage,
};

export { fetchOrderHistory, addNewOrder };

export const { closeCheckoutModal } = orderSlice.actions;

export default orderSlice.reducer;

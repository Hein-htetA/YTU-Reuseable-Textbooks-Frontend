import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface user {
  name: string;
  email: string;
  picture: string;
  rollNo: string;
}

interface userInitial {
  isLoggedIn: boolean;
  userData: user;
  authenticationModalOpen: boolean;
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: userInitial = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    picture: "",
    rollNo: "",
  },
  authenticationModalOpen: false,
  loginStatus: "idle",
  registerStatus: "idle",
  updateStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export { selectIsLoggedIn };

export const { toggleLogin } = userSlice.actions;

export default userSlice.reducer;

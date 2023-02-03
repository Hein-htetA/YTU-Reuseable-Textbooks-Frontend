import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { baseUrl } from "../../url";

interface user {
  name: string;
  email: string;
  picture: string;
  rollNo: string;
}

interface loginFormValues {
  email: string;
  password: string;
}

interface userInitial {
  isLoggedIn: boolean;
  userData: user;
  authenticationModalOpen: boolean;
  token: string;
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
  token: "",
  authenticationModalOpen: false,
  loginStatus: "idle",
  registerStatus: "idle",
  updateStatus: "idle",
};

const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formValues: loginFormValues, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(`${baseUrl}/auth/login`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { user, token } = await response.json();
      return { user, token };
    } catch (error) {
      throw rejectWithValue("");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    openAuthenticationModal: (state) => {
      state.authenticationModalOpen = true;
    },
    closeAuthenticationModal: (state) => {
      state.authenticationModalOpen = false;
    },
    resetLoginState: (state) => {
      if (state.loginStatus !== "idle") {
        state.loginStatus = "idle";
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authenticationModalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
      });
  },
});

const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
const selectLoginStatus = (state: RootState) => state.user.loginStatus;

export { selectIsLoggedIn, selectLoginStatus };

export { loginUser };

export const {
  toggleLogin,
  openAuthenticationModal,
  closeAuthenticationModal,
  resetLoginState,
} = userSlice.actions;

export default userSlice.reducer;

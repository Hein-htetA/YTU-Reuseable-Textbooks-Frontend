import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { baseUrl } from "../../url";

interface User {
  name?: string;
  email?: string;
  picture?: string;
  rollNo?: string;
}

interface loginFormValues {
  email: string;
  password: string;
}

interface registerFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  rollNo: string;
}

interface UpdateUser {
  rollNo?: string;
}

const initializeFun = () => {
  const userData: User =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")!)
      : {};

  let isLoggedIn = false;
  const token = localStorage.getItem("token") || "";

  if (token) {
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    isLoggedIn = true;

    if (new Date().getTime() > jwtPayload.exp * 1000) {
      //token is expire
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      isLoggedIn = false;
    }
  }

  return {
    userData,
    token,
    isLoggedIn,
    authenticationModalOpen: false,
    loginStatus: "idle",
    registerStatus: "idle",
    updateStatus: "idle",
    socialSignInStatus: "idle",
    serverErrorMsg: "",
  };
};

const registerUser = createAsyncThunk<
  { token: string; user: User },
  registerFormValues,
  { rejectValue: string }
>("user/registerUser", async (formValues, { rejectWithValue }) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  };

  try {
    const response: any = await fetch(
      `${baseUrl}/auth/register`,
      requestOptions
    );
    if (!response.ok) {
      if (response.status === 400) {
        const { msg } = await response.json();
        throw new Error(msg);
      }

      throw new Error("");
    }
    const { token, user } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

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
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      throw rejectWithValue("");
    }
  }
);

const socialSignIn = createAsyncThunk(
  "user/socialSignIn",
  async (socialToken: string, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socialToken }),
    };

    try {
      const response = await fetch(
        `${baseUrl}/auth/socialSignIn`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { user, token } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      throw rejectWithValue("");
    }
  }
);

const updateUser = createAsyncThunk<
  { user: User },
  UpdateUser,
  { rejectValue: string; state: RootState }
>("user/updateUser", async (formValues, { rejectWithValue, getState }) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
    body: JSON.stringify(formValues),
  };

  try {
    const response = await fetch(`${baseUrl}/user`, requestOptions);
    if (!response.ok) {
      throw new Error();
    }
    const { user } = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return { user };
  } catch (error) {
    throw rejectWithValue("");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initializeFun,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      state.token = "";
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
    resetUpdateState: (state) => {
      if (state.updateStatus !== "idle") {
        state.updateStatus = "idle";
      }
    },
    resetRegisterState: (state) => {
      if (state.registerStatus !== "idle") {
        state.registerStatus = "idle";
      }
      if (state.serverErrorMsg) {
        state.serverErrorMsg = "";
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.registerStatus = "loading";
        state.serverErrorMsg = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoggedIn = true;
        state.authenticationModalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.serverErrorMsg = action.payload!;
      })

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
      })

      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
      })

      .addCase(socialSignIn.pending, (state, action) => {
        state.socialSignInStatus = "loading";
      })
      .addCase(socialSignIn.fulfilled, (state, action) => {
        state.socialSignInStatus = "succeeded";
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authenticationModalOpen = false;
      })
      .addCase(socialSignIn.rejected, (state, action) => {
        state.socialSignInStatus = "failed";
      });
  },
});

const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
const selectLoginStatus = (state: RootState) => state.user.loginStatus;
const selectRegisterStatus = (state: RootState) => state.user.registerStatus;
const selectUpdateStatus = (state: RootState) => state.user.updateStatus;
const selectSocialSignInStatus = (state: RootState) =>
  state.user.socialSignInStatus;
const selectUserData = (state: RootState) => state.user.userData;

export {
  selectIsLoggedIn,
  selectLoginStatus,
  selectRegisterStatus,
  selectUpdateStatus,
  selectSocialSignInStatus,
};

export { loginUser, registerUser, socialSignIn, updateUser, selectUserData };

export const {
  logoutUser,
  openAuthenticationModal,
  closeAuthenticationModal,
  resetLoginState,
  resetRegisterState,
  resetUpdateState,
} = userSlice.actions;

export default userSlice.reducer;

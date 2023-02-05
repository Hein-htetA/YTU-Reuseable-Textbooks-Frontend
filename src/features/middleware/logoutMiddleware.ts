import { createListenerMiddleware } from "@reduxjs/toolkit";
import { logoutUser } from "../slices/userSlice";

const logoutMiddleware = createListenerMiddleware();

logoutMiddleware.startListening({
  actionCreator: logoutUser,
  effect: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});

export default logoutMiddleware;

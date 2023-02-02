import React from "react";
import { useDispatch } from "react-redux";
import { openAuthenticationModal } from "../slices/userSlice";

const LoginRegisterBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="text-sm py-1 px-2 border-2 border-slate-600 rounded-lg w-full"
      onClick={() => dispatch(openAuthenticationModal())}
    >
      <div>Login</div>
    </button>
  );
};

export default LoginRegisterBtn;

import React from "react";
import { MdOutlineRotateRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectLoginStatus } from "../../slices/userSlice";

interface Props {
  handleLogin: () => void;
}

const LoginBtn = ({ handleLogin }: Props) => {
  const loginStatus = useSelector(selectLoginStatus);
  return (
    <button
      className="w-24 py-[6px] bg-slate-500 text-white text-sm rounded-lg my-3 flex justify-center gap-1 items-center ml-auto disabled:bg-slate-400"
      disabled={loginStatus === "loading"}
      onClick={handleLogin}
    >
      {loginStatus === "loading" && (
        <span className="text-xl animate-spin">
          <MdOutlineRotateRight />
        </span>
      )}
      <div>{loginStatus === "failed" ? "Try Again" : "Login"}</div>
    </button>
  );
};

export default LoginBtn;

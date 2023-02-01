import React from "react";
import { MdOutlineRotateRight } from "react-icons/md";

const LoginBtn = () => {
  return (
    <button className="w-32 p-2 bg-slate-500 text-white text-sm rounded-lg my-3 flex justify-center gap-1 items-center ml-auto">
      <span className="text-xl">
        <MdOutlineRotateRight />
      </span>
      <div>Log In</div>
    </button>
  );
};

export default LoginBtn;

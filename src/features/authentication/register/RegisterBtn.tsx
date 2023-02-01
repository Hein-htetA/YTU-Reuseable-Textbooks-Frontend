import React from "react";
import { GrRotateRight } from "react-icons/gr";
import { MdOutlineRotateRight } from "react-icons/md";

const RegisterBtn = () => {
  return (
    <button className="w-32 p-2 bg-slate-500 text-white text-sm rounded-lg my-3 flex justify-center gap-1 items-center ml-auto">
      <span className="text-xl">
        <MdOutlineRotateRight />
      </span>
      <div>Register</div>
    </button>
  );
};

export default RegisterBtn;

import React from "react";
import { MdOutlineRotateRight } from "react-icons/md";

interface Props {
  handleRegister: () => void;
}

const RegisterBtn = ({ handleRegister }: Props) => {
  return (
    <button
      className="w-32 px-2 py-[6px] bg-slate-500 text-white text-sm rounded-lg my-3 flex justify-center gap-1 items-center ml-auto"
      onClick={handleRegister}
    >
      <span className="text-xl">
        <MdOutlineRotateRight />
      </span>
      <div>Register</div>
    </button>
  );
};

export default RegisterBtn;

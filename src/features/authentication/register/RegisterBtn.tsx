import React from "react";
import { MdOutlineRotateRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectRegisterStatus } from "../../slices/userSlice";

interface Props {
  handleRegister: () => void;
}

const RegisterBtn = ({ handleRegister }: Props) => {
  const registerStatus = useSelector(selectRegisterStatus);

  return (
    <button
      className="w-32 px-2 py-[6px] bg-slate-500 text-white text-sm rounded-lg my-3 flex justify-center gap-1 items-center ml-auto disabled:bg-slate-400"
      onClick={handleRegister}
      disabled={registerStatus === "loading"}
    >
      {registerStatus === "loading" && (
        <span className="text-xl animate-spin">
          <MdOutlineRotateRight />
        </span>
      )}
      <div>Register</div>
    </button>
  );
};

export default RegisterBtn;

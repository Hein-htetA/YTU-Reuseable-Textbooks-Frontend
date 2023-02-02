import React from "react";
import { CgCloseR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { closeAuthenticationModal } from "../slices/userSlice";

const CloseAuthenticationModalBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="text-xl text-red-500 ml-2"
      onClick={() => dispatch(closeAuthenticationModal())}
    >
      <CgCloseR />
    </button>
  );
};

export default CloseAuthenticationModalBtn;

import React from "react";
import { CgCloseR } from "react-icons/cg";

const CloseAuthenticationModalBtn = () => {
  return (
    <button className="ml-3 text-xl text-red-500 absolute right-0 bg-white pl-2">
      <CgCloseR />
    </button>
  );
};

export default CloseAuthenticationModalBtn;

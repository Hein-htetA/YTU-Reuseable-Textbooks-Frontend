import React from "react";
import CloseAuthenticationModalBtn from "../CloseAuthenticationModalBtn";

const RegisterTitle = () => {
  return (
    <div className="flex items-center text-xl relative mb-3">
      <div className="h-px bg-slate-500 grow"></div>
      <div className="mx-3">Register</div>
      <div className="h-px bg-slate-500 grow"></div>
      <CloseAuthenticationModalBtn />
    </div>
  );
};

export default RegisterTitle;

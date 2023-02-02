import React from "react";

type auth = "login" | "register";

interface Props {
  setLoginOrRegister: React.Dispatch<React.SetStateAction<auth>>;
}

const LinkToRegister = ({ setLoginOrRegister }: Props) => {
  return (
    <div className="flex text-sm items-center justify-center">
      <div>Don't have an account yet?</div>
      <button
        className="ml-2 text-slate-500 underline"
        onClick={() => setLoginOrRegister("register")}
      >
        Create One
      </button>
    </div>
  );
};

export default LinkToRegister;

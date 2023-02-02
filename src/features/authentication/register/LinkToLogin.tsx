import React from "react";

type auth = "login" | "register";

interface Props {
  setLoginOrRegister: React.Dispatch<React.SetStateAction<auth>>;
}

const LinkToLogin = ({ setLoginOrRegister }: Props) => {
  return (
    <>
      {/* <hr className="border-b border-dashed border-slate-500 mx-auto my-4 w-4/6" /> */}
      <div className="flex text-sm items-center justify-center">
        <div>Already have an account?</div>
        <button
          className="ml-2 underline text-slate-500"
          onClick={() => setLoginOrRegister("login")}
        >
          Login Here
        </button>
      </div>
    </>
  );
};

export default LinkToLogin;

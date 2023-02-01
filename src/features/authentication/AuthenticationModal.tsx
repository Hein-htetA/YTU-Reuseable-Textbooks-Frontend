import React, { useEffect, useState } from "react";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";

type auth = "login" | "register";

const AuthenticationModal = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<auth>("register");
  return (
    <div className="fixed h-screen bg-[#07070766] left-0 right-0 top-0 z-10">
      <div className="fixed bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl">
        {loginOrRegister === "login" ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default AuthenticationModal;

import React, { useState, useEffect } from "react";
import BrandName from "./BrandName";
import CartAndAccount from "./CartAndAccount";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthenticationModalBackground from "../authentication/AuthenticationModal";
import LoginForm from "../authentication/login/LoginForm";
import RegisterForm from "../authentication/register/RegisterForm";

type auth = "login" | "register";

const Navbar = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<auth>("login");

  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );

  // useEffect(() => {
  //   setLoginOrRegister("login");
  // }, [authenticationModalOpen]);

  return (
    <nav className="py-4 px-5 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex justify-between items-cente">
      <BrandName />
      <CartAndAccount />

      {authenticationModalOpen && <AuthenticationModalBackground />}
      <LoginForm
        loginOrRegister={loginOrRegister}
        setLoginOrRegister={setLoginOrRegister}
      />
      <RegisterForm
        loginOrRegister={loginOrRegister}
        setLoginOrRegister={setLoginOrRegister}
      />
    </nav>
  );
};

export default Navbar;

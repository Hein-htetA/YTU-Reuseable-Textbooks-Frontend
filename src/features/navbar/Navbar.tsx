import React, { useState, useRef, useEffect, useCallback } from "react";
import BrandName from "./BrandName";
import CartAndAccount from "./CartAndAccount";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import AuthenticationModalBackground from "../authentication/AuthenticationModal";
import LoginForm from "../authentication/login/LoginForm";
import RegisterForm from "../authentication/register/RegisterForm";
import { closeAuthenticationModal, logoutUser } from "../slices/userSlice";
import Profile from "./Profile";

type auth = "login" | "register";

const Navbar = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<auth>("login");
  const [profileShow, setProfileShow] = useState(false);

  const authenticationModalOpen: boolean = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );

  const dispatch = useDispatch<AppDispatch>();

  const loginFormRef = useRef<HTMLDivElement>(null);
  const registerFormRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(
    (e: MouseEvent) => {
      if (
        !loginFormRef.current!.contains(e.target as Node) &&
        !registerFormRef.current!.contains(e.target as Node)
      ) {
        dispatch(closeAuthenticationModal());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (authenticationModalOpen) {
      document.addEventListener("mousedown", closeModal);
    } else {
      document.removeEventListener("mousedown", closeModal);
    }
  }, [authenticationModalOpen, closeModal]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileShow(false);
  };

  return (
    <nav className="py-4 px-5 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex justify-between items-center sticky top-0 z-40 bg-white">
      <BrandName />
      <CartAndAccount
        setProfileShow={setProfileShow}
        profileShow={profileShow}
      />
      <Profile
        profileShow={profileShow}
        setProfileShow={setProfileShow}
        handleLogout={handleLogout}
      />

      {authenticationModalOpen && <AuthenticationModalBackground />}
      <LoginForm
        loginOrRegister={loginOrRegister}
        setLoginOrRegister={setLoginOrRegister}
        ref={loginFormRef}
      />
      <RegisterForm
        loginOrRegister={loginOrRegister}
        setLoginOrRegister={setLoginOrRegister}
        ref={registerFormRef}
      />
    </nav>
  );
};

export default Navbar;

import React, { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../features/footer/Footer";
import ScrollToTop from "./ScrollToTop";
import SearchBox from "../features/main/Search/SearchBox";
import AddToCartModel from "../features/main/Cart/AddToCartModel";
import { useDispatch, useSelector } from "react-redux";
import { SelectCartModalOpen } from "../features/slices/cartSlice";
import { AppDispatch, RootState } from "../store";
import {
  closeAuthenticationModal,
  selectIsLoggedIn,
} from "../features/slices/userSlice";
import AuthenticationModalBackground from "../features/authentication/AuthenticationModal";
import LoginForm from "../features/authentication/login/LoginForm";
import RegisterForm from "../features/authentication/register/RegisterForm";
import CheckoutFormModal from "../features/main/Cart/CheckoutFormModal";
import { fetchOrderHistory } from "../features/slices/orderSlice";

type auth = "login" | "register";

const MainSharedLayout = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<auth>("login");
  const path = useLocation();
  const authenticationModalOpen: boolean = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const loginFormRef = useRef<HTMLDivElement>(null);
  const registerFormRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchOrderHistory(""));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />

      {!new RegExp("/cart").test(path.pathname) && <SearchBox />}
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
      <AddToCartModel />
      <CheckoutFormModal />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainSharedLayout;

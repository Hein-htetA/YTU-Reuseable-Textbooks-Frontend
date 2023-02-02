import React from "react";
import EmailInput from "../EmailInput";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import PasswordInput from "../PasswordInput";
import LinkToRegister from "./LinkToRegister";
import LoginBtn from "./LoginBtn";
import LoginTitle from "./LoginTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const loginFormBottom =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-y-full transition-transform duration-500";

const loginFormBottomNoTransition =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-y-full";

const loginFormShow =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-0 transition-transform duration-500 delay-100";

const loginFormLeft =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl -translate-x-full transition-transform duration-500";

type auth = "login" | "register";

interface Props {
  loginOrRegister: "login" | "register";
  setLoginOrRegister: React.Dispatch<React.SetStateAction<auth>>;
}

// open - login ----> show
// open - register ----> left
// close - login ----> bottom
// close - reg ----> bottom no transi
const loginFormClass = (modalOpen: boolean, loginOrRegister: string) => {
  if (modalOpen && loginOrRegister === "login") {
    return loginFormShow;
  } else if (modalOpen && loginOrRegister === "register") {
    return loginFormLeft;
  } else if (!modalOpen && loginOrRegister === "login") {
    return loginFormBottom;
  } else {
    return loginFormBottomNoTransition;
  }
};
const LoginForm = ({ loginOrRegister, setLoginOrRegister }: Props) => {
  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );
  const style = loginFormClass(authenticationModalOpen, loginOrRegister);
  return (
    <div className={style}>
      <LoginTitle />
      <FormContainer>
        <EmailInput />
        <PasswordInput />
      </FormContainer>
      <LoginBtn />
      <LinkToRegister setLoginOrRegister={setLoginOrRegister} />
      <GoogleSignInBtn />
    </div>
  );
};

export default LoginForm;

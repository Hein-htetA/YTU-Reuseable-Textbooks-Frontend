import React from "react";
import EmailInput from "../EmailInput";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import PasswordInput from "../PasswordInput";
import RoleNumberInput from "../RoleNumberInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import LinkToLogin from "./LinkToLogin";
import RegisterBtn from "./RegisterBtn";
import RegisterTitle from "./RegisterTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { BiRightArrow } from "react-icons/bi";

interface Props {
  loginOrRegister: "login" | "register";
}

const registerFormRight =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-x-full transition-transform duration-500";

const registerFormRightNoTransition =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-x-full";

const registerFormShow =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-0 transition-transform duration-500 delay-100";

const registerFormBottom =
  "fixed p-4 bottom-0 bg-white left-0 right-0 z-20 rounded-t-xl translate-y-full transition-transform duration-500";

type auth = "login" | "register";

interface Props {
  loginOrRegister: "login" | "register";
  setLoginOrRegister: React.Dispatch<React.SetStateAction<auth>>;
}

// open - login ----> right
// open - register ----> show
// close - login ----> right no transi
// close - reg ----> bottom

const registerFormClass = (modalOpen: boolean, loginOrRegister: string) => {
  if (modalOpen && loginOrRegister === "login") {
    return registerFormRight;
  } else if (modalOpen && loginOrRegister === "register") {
    return registerFormShow;
  } else if (!modalOpen && loginOrRegister === "login") {
    return registerFormRightNoTransition;
  } else {
    return registerFormBottom;
  }
};
const RegisterForm = ({ loginOrRegister, setLoginOrRegister }: Props) => {
  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );

  const style = registerFormClass(authenticationModalOpen, loginOrRegister);

  const handleTransitionEnd = () => {
    if (!authenticationModalOpen && loginOrRegister === "register") {
      setLoginOrRegister("login");
    }
    console.log("ended");
  };

  return (
    <div className={style} onTransitionEnd={handleTransitionEnd}>
      <RegisterTitle />
      <FormContainer>
        <EmailInput />
        <PasswordInput />
        <ConfirmPasswordInput />
        <RoleNumberInput />
      </FormContainer>
      <RegisterBtn />
      <LinkToLogin setLoginOrRegister={setLoginOrRegister} />
      <GoogleSignInBtn />
    </div>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import LinkToRegister from "./LinkToRegister";
import LoginBtn from "./LoginBtn";
import LoginTitle from "./LoginTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import LoginErrorMsg from "./LoginErrorMsg";
import { loginUser, selectLoginStatus } from "../../slices/userSlice";
import LoginPasswordInput from "./LoginPasswordInput";
import LoginEmailInput from "./LoginEmailInput";

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

interface FormValues {
  email: string;
  password: string;
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
const LoginForm = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const { loginOrRegister, setLoginOrRegister } = props;

  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );
  const loginStatus = useSelector(selectLoginStatus);

  const dispatch = useDispatch<AppDispatch>();

  const style = loginFormClass(authenticationModalOpen, loginOrRegister);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    //dispatch(resetLoginState());
  };

  const handleLogin = () => {
    dispatch(loginUser(formValues));
  };

  return (
    <div className={style} ref={ref}>
      <LoginTitle />
      {loginStatus === "failed" && <LoginErrorMsg />}
      <FormContainer>
        <LoginEmailInput
          email={formValues.email}
          onChangeInput={onChangeInput}
          disabled={loginStatus === "loading"}
        />
        <LoginPasswordInput
          password={formValues.password}
          onChangeInput={onChangeInput}
          disabled={loginStatus === "loading"}
        />
      </FormContainer>
      <LoginBtn handleLogin={handleLogin} />
      <LinkToRegister setLoginOrRegister={setLoginOrRegister} />
      <GoogleSignInBtn />
    </div>
  );
});

export default LoginForm;

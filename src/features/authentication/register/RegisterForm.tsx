import React, { useState } from "react";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import RoleNumberInput from "./RoleNumberInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import LinkToLogin from "./LinkToLogin";
import RegisterBtn from "./RegisterBtn";
import RegisterTitle from "./RegisterTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import NameInput from "./NameInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
import RegisterEmailInput from "./RegisterEmailInput";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRegisterForm,
} from "./ValidateRegisterForm";

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

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  rollNo: string;
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
const RegisterForm = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );

  const { loginOrRegister, setLoginOrRegister } = props;

  const style = registerFormClass(authenticationModalOpen, loginOrRegister);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleTransitionEnd = () => {
    if (!authenticationModalOpen && loginOrRegister === "register") {
      setLoginOrRegister("login");
    }
  };

  const handleRegister = () => {
    const errors = validateRegisterForm(formValues);
    if (Object.keys(errors).length !== 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    console.log("registering...");
  };

  const handleEmailBlur = () => {
    const emailError = validateEmail(formValues.email);
    if (emailError) {
      setFormErrors({ ...formErrors, emailError });
    } else {
      setFormErrors({ ...formErrors, emailError: "" });
    }
  };

  const handlePasswordBlur = () => {
    const passwordError = validatePassword(formValues.password);
    if (passwordError) {
      setFormErrors({ ...formErrors, passwordError });
    } else {
      setFormErrors({ ...formErrors, passwordError: "" });
    }
  };

  const handleConfirmPasswordBlur = () => {
    const { passwordError, confirmPasswordError } = validateConfirmPassword(
      formValues.password,
      formValues.confirmPassword
    );

    if (passwordError && confirmPasswordError) {
      setFormErrors({ ...formErrors, passwordError, confirmPasswordError });
    } else {
      setFormErrors({
        ...formErrors,
        passwordError: "",
        confirmPasswordError: "",
      });
    }
  };

  return (
    <div className={style} onTransitionEnd={handleTransitionEnd} ref={ref}>
      <RegisterTitle />
      <FormContainer>
        <RegisterEmailInput
          email={formValues.email}
          onChangeInput={onChangeInput}
          emailError={formErrors.emailError}
          handleEmailBlur={handleEmailBlur}
        />
        <RegisterPasswordInput
          password={formValues.password}
          onChangeInput={onChangeInput}
          passwordError={formErrors.passwordError}
          handlePasswordBlur={handlePasswordBlur}
        />
        <ConfirmPasswordInput
          confirmPassword={formValues.confirmPassword}
          onChangeInput={onChangeInput}
          confirmPasswordError={formErrors.confirmPasswordError}
          handleConfirmPasswordBlur={handleConfirmPasswordBlur}
        />
        <NameInput name={formValues.name} onChangeInput={onChangeInput} />
        <RoleNumberInput
          rollNo={formValues.rollNo}
          onChangeInput={onChangeInput}
        />
      </FormContainer>
      <RegisterBtn handleRegister={handleRegister} />
      <LinkToLogin setLoginOrRegister={setLoginOrRegister} />
      <GoogleSignInBtn />
    </div>
  );
});

export default RegisterForm;

import React, { useState } from "react";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import RoleNumberInput from "./RoleNumberInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import LinkToLogin from "./LinkToLogin";
import RegisterBtn from "./RegisterBtn";
import RegisterTitle from "./RegisterTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import NameInput from "./NameInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
import RegisterEmailInput from "./RegisterEmailInput";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRegisterForm,
  validateName,
} from "./ValidateRegisterForm";
import RegisterErrorMsg from "./RegisterErrorMsg";
import {
  registerUser,
  resetRegisterState,
  selectRegisterStatus,
} from "../../slices/userSlice";

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
    nameError: "",
  });

  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );
  const registerStatus = useSelector(selectRegisterStatus);
  const serverErrorMsg = useSelector(
    (state: RootState) => state.user.serverErrorMsg
  );

  const dispatch = useDispatch();
  const { loginOrRegister, setLoginOrRegister } = props;

  const style = registerFormClass(authenticationModalOpen, loginOrRegister);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      nameError: "",
    });
    dispatch(resetRegisterState());
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
    dispatch<any>(registerUser(formValues));
  };

  const handleEmailBlur = () => {
    const emailError = validateEmail(formValues.email);

    setFormErrors({ ...formErrors, emailError });
  };

  const handlePasswordBlur = () => {
    const passwordError = validatePassword(
      formValues.password,
      formErrors.passwordError
    );

    setFormErrors({ ...formErrors, passwordError });
  };

  const handleConfirmPasswordBlur = () => {
    let { passwordError, confirmPasswordError } = validateConfirmPassword(
      formValues.password,
      formValues.confirmPassword,
      formErrors.passwordError
    );

    setFormErrors({ ...formErrors, passwordError, confirmPasswordError });
  };

  const handleNameBlur = () => {
    const nameError = validateName(formValues.name);

    setFormErrors({ ...formErrors, nameError });
  };

  return (
    <div className={style} onTransitionEnd={handleTransitionEnd} ref={ref}>
      <RegisterTitle />
      {registerStatus === "failed" && !serverErrorMsg && <RegisterErrorMsg />}
      <FormContainer>
        <RegisterEmailInput
          email={formValues.email}
          onChangeInput={onChangeInput}
          emailError={formErrors.emailError}
          handleEmailBlur={handleEmailBlur}
          disabled={registerStatus === "loading"}
        />
        <RegisterPasswordInput
          password={formValues.password}
          onChangeInput={onChangeInput}
          passwordError={formErrors.passwordError}
          handlePasswordBlur={handlePasswordBlur}
          disabled={registerStatus === "loading"}
        />
        <ConfirmPasswordInput
          confirmPassword={formValues.confirmPassword}
          onChangeInput={onChangeInput}
          confirmPasswordError={formErrors.confirmPasswordError}
          handleConfirmPasswordBlur={handleConfirmPasswordBlur}
          disabled={registerStatus === "loading"}
        />
        <NameInput
          name={formValues.name}
          onChangeInput={onChangeInput}
          disabled={registerStatus === "loading"}
          handleNameBlur={handleNameBlur}
          nameError={formErrors.nameError}
        />
        <RoleNumberInput
          rollNo={formValues.rollNo}
          onChangeInput={onChangeInput}
          disabled={registerStatus === "loading"}
        />
      </FormContainer>
      <RegisterBtn handleRegister={handleRegister} />
      <LinkToLogin setLoginOrRegister={setLoginOrRegister} />
      <GoogleSignInBtn />
    </div>
  );
});

export default RegisterForm;

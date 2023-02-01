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

const RegisterForm = () => {
  return (
    <div className="p-4">
      <RegisterTitle />
      <FormContainer>
        <EmailInput />
        <PasswordInput />
        <ConfirmPasswordInput />
        <RoleNumberInput />
      </FormContainer>
      <RegisterBtn />
      <LinkToLogin />
      <GoogleSignInBtn />
    </div>
  );
};

export default RegisterForm;

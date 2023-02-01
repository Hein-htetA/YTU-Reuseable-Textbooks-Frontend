import React from "react";
import EmailInput from "../EmailInput";
import FormContainer from "../FormContainer";
import GoogleSignInBtn from "../GoogleSignInBtn";
import PasswordInput from "../PasswordInput";
import LinkToRegister from "./LinkToRegister";
import LoginBtn from "./LoginBtn";
import LoginTitle from "./LoginTitle";

const LoginForm = () => {
  return (
    <div className="p-4">
      <LoginTitle />
      <FormContainer>
        <EmailInput />
        <PasswordInput />
      </FormContainer>
      <LoginBtn />
      <LinkToRegister />
      <GoogleSignInBtn />
    </div>
  );
};

export default LoginForm;

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  rollNo: string;
}

interface FormErrors {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateRegisterForm = (formValues: FormValues) => {
  const formErrors: FormErrors = {};

  if (!emailRegex.test(formValues.email)) {
    formErrors.emailError = "Please provide a valid email address";
  }
  if (formValues.email.trim().length === 0) {
    formErrors.emailError = "Email must be provided";
  }

  if (formValues.password.trim().length < 3) {
    formErrors.passwordError = "Password must be 3 or more characters";
  }
  if (formValues.password.trim().length === 0) {
    formErrors.passwordError = "Password must be provided";
  }

  if (formValues.confirmPassword.trim().length === 0) {
    formErrors.confirmPasswordError = "Please confirm password";
  }

  if (!formErrors.passwordError) {
    if (formValues.password !== formValues.confirmPassword) {
      formErrors.passwordError = "Passwords doesn't match";
      formErrors.confirmPasswordError = "Passwords doesn't match";
    }
  }
  return formErrors;
};

export const validateEmail = (email: string) => {
  let emailError = "";
  if (!emailRegex.test(email)) {
    emailError = "Please provide a valid email address";
  }
  if (email.trim().length === 0) {
    emailError = "Email must be provided";
  }

  return emailError;
};

export const validatePassword = (password: string) => {
  let passwordError = "";
  if (password.trim().length < 3) {
    passwordError = "Password must be 3 or more characters";
  }
  if (password.trim().length === 0) {
    passwordError = "Password must be provided";
  }
  return passwordError;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  let passwordError = "";
  let confirmPasswordError = "";
  if (password !== confirmPassword) {
    passwordError = "Passwords doesn't match";
    confirmPasswordError = "Passwords doesn't match";
  }
  return { passwordError, confirmPasswordError };
};

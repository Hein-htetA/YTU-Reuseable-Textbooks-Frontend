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
  nameError?: string;
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

  if (formValues.name.trim().length === 0) {
    formErrors.nameError = "Name must be provided";
  }
  return formErrors;
};

export const validateEmail = (email: string) => {
  let emailError = "";
  if (email.trim().length === 0) {
    return "Email must be provided";
  }
  if (!emailRegex.test(email)) {
    return "Please provide a valid email address";
  }

  return emailError;
};

export const validatePassword = (password: string, passwordError: string) => {
  if (password.trim().length === 0) {
    return "Password must be provided";
  }
  if (password.trim().length < 3) {
    return "Password must be 3 or more characters";
  }

  if (passwordError === "Passwords doesn't match") {
    return passwordError;
  }

  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
  passwordError: string
) => {
  let confirmPasswordError = "";
  if (passwordError === "Passwords doesn't match" || !passwordError) {
    if (password !== confirmPassword) {
      passwordError = "Passwords doesn't match";
      confirmPasswordError = "Passwords doesn't match";
    } else {
      passwordError = "";
      confirmPassword = "";
    }
  } else {
    confirmPasswordError = "";
  }
  return { passwordError, confirmPasswordError };
};

export const validateName = (name: string) => {
  let nameError = "";
  if (name.trim().length === 0) {
    return "Name must be provided";
  }
  return nameError;
};

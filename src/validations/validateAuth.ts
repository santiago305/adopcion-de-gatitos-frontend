import { isRequired, isEmail, minLength } from "./validations";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export function validateLogin({ email, password }: LoginCredentials): LoginValidationErrors {
  const errors: LoginValidationErrors = {};

  const emailRequired = isRequired(email, "correo");
  if (emailRequired) errors.email = emailRequired;
  else {
    const emailFormat = isEmail(email);
    if (emailFormat) errors.email = emailFormat;
  }

  const passwordRequired = isRequired(password, "contraseña");
  if (passwordRequired) errors.password = passwordRequired;
  else {
    const passwordMin = minLength(password, 6, "contraseña");
    if (passwordMin) errors.password = passwordMin;
  }

  return errors;
}

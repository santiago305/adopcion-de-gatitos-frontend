import { isRequired, isEmail, minLength } from "./validations";
import { RegisterCredentials, RegisterValidationErrors } from "./validationstype";



export function validateRegister({ email, password, name }: RegisterCredentials): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};

  const nameRequired = isRequired(name, "nombre");
  if (nameRequired) errors.name = nameRequired;
  else {
    const nameMin = minLength(name, 5, 'nombre');
    if (nameMin) errors.name = nameMin;
  }

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

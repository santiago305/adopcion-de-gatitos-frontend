export function isRequired(value: string, fieldName: string): string | null {
    return !value.trim() ? `El campo ${fieldName} es obligatorio.` : null;
  }
  
export function isEmail(value: string): string | null {
const emailRegex = /^\S+@\S+\.\S+$/;
return !emailRegex.test(value) ? "Correo inválido." : null;
}

export function minLength(value: string, min: number, fieldName: string): string | null {
return value.length < min
    ? `El campo ${fieldName} debe tener al menos ${min} caracteres.`
    : null;
}
  
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface RegisterValidationErrors extends LoginValidationErrors{
  name?: string;
}
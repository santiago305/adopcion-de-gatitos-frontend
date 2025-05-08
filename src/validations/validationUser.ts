export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  roleId?: string;
}

export interface UpdateUserDto extends CreateUserDto{
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}
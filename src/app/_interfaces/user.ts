
interface ErrorResponse {
  field: string;
  message: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserLoginResponse {
  token?: string;
  errors?: ErrorResponse[];
  success: boolean;
  user_info?: User;
}

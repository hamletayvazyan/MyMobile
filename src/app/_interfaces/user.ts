export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  password?: string;
}

export interface UserLoginResponse {
  token?: string;
  error?: string;
  success: boolean;
  user_info?: User;
}

export interface HttpIResponse {
  users: User[]
}
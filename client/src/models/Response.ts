import { User } from "./User";

export type AuthInfo = {
  user: User
  sessionToken: string
}
export type BaseResponse<T> = {
  status: number;
  message: string;
  result: T
}

export type ErrorResponse = Omit<BaseResponse<unknown>, "result">

export type AuthResponse = BaseResponse<AuthInfo>

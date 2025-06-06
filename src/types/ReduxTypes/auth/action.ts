// Auth action types
import type { IUser } from "../user";

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginResponseData {
  user?: IUser;
}

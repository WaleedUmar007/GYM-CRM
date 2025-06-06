import type { IUser } from "../user";

export interface AuthState {
  isAuthenticated?: boolean;
  loading?: boolean;
  user?: IUser | null;
}

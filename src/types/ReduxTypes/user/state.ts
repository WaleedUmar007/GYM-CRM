import type { IUser } from "./reducer";

export interface UserState {
  users?: IUser[] | null;
  userLoading?: boolean;
  totalDocumentsUser: number | null;
}

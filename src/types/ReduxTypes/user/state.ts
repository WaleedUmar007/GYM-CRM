import type { IUser } from "./reducer";

export interface UserState {
  users?: IUser[] | null;
  userLoading?: boolean;
  admins: IUser[] | null;
  adminsLoading?: boolean;
  totalDocumentsUser: number | null;
}

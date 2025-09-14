import type { IUser } from "./reducer";

export interface IUserAddEditFormData {
  data: FormData | IUser;
  mode: "members" | "admins";
}

export interface IUserDeleteData {
  userIds: Array<string>;
  mode: "members" | "admins" | "memberships";
}

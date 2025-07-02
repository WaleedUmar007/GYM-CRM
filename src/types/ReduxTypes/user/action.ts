export interface IUserAddEditFormData {
  data: FormData;
  mode: "members" | "admins";
}

export interface IUserDeleteData {
  userIds: Array<string>;
  mode: "members" | "admins";
}

import { UserRoles } from "types";

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  organization: string;
  role: UserRoles;
  verified: boolean;
  createdBy?: string;
}

export interface IGetAllUser {
  data: Array<IUser>;
  totalDocuments: Array<{
    total: number;
  }>;
}

export interface IUserUpdateData extends IUser {}

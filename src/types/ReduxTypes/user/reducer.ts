import { UserRoles } from "types";
import type { Membership } from "../membership";

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
  createdAt: string;
  membership?: Membership;
}

export interface IGetAllUser {
  data: Array<IUser>;
  totalDocuments: Array<{
    total: number;
  }>;
}

export interface IUserUpdateData extends IUser {}

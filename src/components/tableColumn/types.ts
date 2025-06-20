import type { Membership } from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";

export interface IMembershipColumnType extends Membership {
  updateMembershipHandler: () => void;
  viewMembershipHistoryHandler: () => void;
  updateUser: () => void;
}

export interface IPackagesColumnType extends IPackage {
  updatePackage: () => void;
}

export interface IUsersColumnType extends IUser {
  updateUser?: () => void;
}

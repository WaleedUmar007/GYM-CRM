import type { Membership } from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";

export interface IMembershipColumnType extends Membership {
  updateMembershipHandler: () => void;
  viewMembershipHistoryHandler: () => void;
}

export interface IPackagesColumnType extends IPackage {
  updatePackage: () => void;
}

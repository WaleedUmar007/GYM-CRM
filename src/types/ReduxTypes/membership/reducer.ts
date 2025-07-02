import type { IPackage } from "../package";
import type { IUser } from "../user";

export type MemberStatus = "active" | "inactive" | "cancelled";

export type PaymentType = "cleared" | "pending";

export interface ICommonMembershipAttr {
  startDate: Date;
  endDate: Date;
  status: MemberStatus;
  package: string | IPackage;
  paymentStatus: PaymentType;
  registration_status: PaymentType;
}

export type Membership = {
  // _id is mongo object Id
  _id: string;
  client_id: string | IUser;
  membership_id: string;
  history: Array<ICommonMembershipAttr>;
  createdBy: string;
} & ICommonMembershipAttr;

export interface IGetAllMemberships {
  data: Array<Membership>;
  totalDocuments: Array<{
    total: number;
  }>;
}

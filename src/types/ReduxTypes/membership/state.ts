import type { Membership } from "./reducer";

export interface MembershipState {
  memberships?: Membership[] | null;
  membershipLoading?: boolean;
  totalDocumentsMemberships: number | null;
}

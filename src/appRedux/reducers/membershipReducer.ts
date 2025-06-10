import type {
  IGetAllMemberships,
  Membership,
  MembershipState,
} from "@/types/ReduxTypes/membership";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: MembershipState = {
  memberships: null,
  membershipLoading: true,
  totalDocumentsMemberships: null,
};

const zero = 0;

const membershipSlice = createSlice({
  name: "membership",
  initialState: initialState,
  reducers: {
    getMembershipsSuccess: (
      state,
      { payload }: PayloadAction<IGetAllMemberships>
    ) => {
      state.memberships = payload.data;
      state.totalDocumentsMemberships = payload?.totalDocuments?.[zero]?.total;
      state.membershipLoading = false;
    },
    getMembershipsFailure: (state) => {
      state.membershipLoading = false;
    },
    addEditMembershipSuccess: (
      state,
      { payload }: PayloadAction<Membership>
    ) => {
      if (state.memberships) {
        const membershipExists = state.memberships.findIndex((membership) => {
          return membership._id === payload._id;
        });
        if (membershipExists !== -1) {
          state.memberships[membershipExists] = payload;
        } else {
          state.memberships.push(payload);
        }
      } else {
        state.memberships = [payload];
      }
    },
    addEditMembershipFailure: (state) => {
      return state;
    },
    membershipReset: () => {
      return initialState;
    },
  },
});

export const {
  getMembershipsSuccess,
  getMembershipsFailure,
  addEditMembershipSuccess,
  addEditMembershipFailure,
  membershipReset,
} = membershipSlice.actions;

export default membershipSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<MembershipState>} state - The state of memberships
 * @param {MembershipState} state.membership - The state of memberships state
 * @returns {MembershipState} returns memberships state object
 */
export const MembershipSelector = (state: {
  membership: MembershipState;
}): MembershipState => {
  return state.membership;
};

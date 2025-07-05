import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Membership } from "../../types/ReduxTypes/membership/reducer";
import type {
  UserState,
  IUser,
  IGetAllUser,
  IUserDeleteData,
  IUserAddEditFormData,
} from "types/ReduxTypes/user";

const initialState: UserState = {
  users: null,
  userLoading: true,
  admins: null,
  adminsLoading: true,
  totalDocumentsUser: null,
};

const zero = 0;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUsersSuccess: (state, { payload }: PayloadAction<IGetAllUser>) => {
      state.users = payload.data;
      state.totalDocumentsUser = payload?.totalDocuments?.[zero]?.total;
      state.userLoading = false;
    },
    getUsersFailure: (state) => {
      state.userLoading = false;
    },
    getAdminsSuccess: (state, { payload }: PayloadAction<IGetAllUser>) => {
      state.admins = payload.data;
      state.adminsLoading = false;
    },
    getAdminsFailure: (state) => {
      state.adminsLoading = false;
    },
    deleteUserSuccess: (state, { payload }: PayloadAction<IUserDeleteData>) => {
      if (payload.mode === "admins") {
        state.admins =
          state.admins?.filter((x) => {
            return !payload.userIds.includes(x._id);
          }) || null;
      } else {
        state.users =
          state.users?.filter((x) => {
            return !payload.userIds.includes(x._id);
          }) || null;
      }
    },
    deleteUserFailure: (state) => {
      return state;
    },
    addEditUserSuccess: (
      state,
      { payload }: PayloadAction<IUserAddEditFormData>
    ) => {
      const { data, mode } = payload;
      const userToInsert = data as IUser;
      console.log(data, mode);
      if (mode === "members") {
        if (state.users) {
          const userExists = state.users.findIndex((user) => {
            return user._id === userToInsert._id;
          });
          if (userExists !== -1) {
            state.users[userExists] = userToInsert;
          } else {
            state.users.push(userToInsert);
          }
        } else {
          state.users = [userToInsert];
        }
      } else {
        if (state.admins) {
          const userExists = state.admins.findIndex((user) => {
            return user._id === userToInsert._id;
          });
          console.log(userExists);
          if (userExists !== -1) {
            state.admins[userExists] = userToInsert;
          } else {
            state.admins.push(userToInsert);
          }
        } else {
          state.admins = [userToInsert];
        }
      }
    },
    addUpdateMembershipSuccess: (
      state,
      { payload }: PayloadAction<Membership>
    ) => {
      const membershipExists = state?.users?.findIndex((user) => {
        if (user.membership && user.membership._id === payload._id) {
          return true;
        }
      });

      if (
        membershipExists !== undefined &&
        membershipExists !== -1 &&
        state.users
      ) {
        state.users[membershipExists] = {
          ...state.users[membershipExists],
          membership: payload,
        };
      }
    },
    addEditUserFailure: (state) => {
      return state;
    },
    userReset: () => {
      return initialState;
    },
  },
});

export const {
  getUsersSuccess,
  getUsersFailure,
  getAdminsSuccess,
  getAdminsFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addEditUserSuccess,
  addEditUserFailure,
  addUpdateMembershipSuccess,
  userReset,
} = userSlice.actions;

export default userSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<UserState>} state - The state of user
 * @param {UserState} state.user - The state of user state
 * @returns {UserState} returns user state object
 */
export const UserSelector = (state: { user: UserState }): UserState => {
  return state.user;
};

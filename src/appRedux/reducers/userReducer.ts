import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
      if (mode === "members") {
        if (state.users) {
          const userExists = state.users.findIndex((user) => {
            return user._id === data._id;
          });
          if (userExists !== -1) {
            state.users[userExists] = payload.data;
          } else {
            state.users.push(data);
          }
        } else {
          state.users = [data];
        }
      } else {
        if (state.admins) {
          const userExists = state.admins.findIndex((user) => {
            return user._id === data._id;
          });
          if (userExists !== -1) {
            state.admins[userExists] = payload.data;
          } else {
            state.admins.push(data);
          }
        } else {
          state.admins = [data];
        }
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

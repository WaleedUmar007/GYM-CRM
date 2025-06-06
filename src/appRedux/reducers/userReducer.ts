import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState, IUser, IGetAllUser } from "types/ReduxTypes/user";

const initialState: UserState = {
  users: null,
  userLoading: true,
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
    deleteUserSuccess: (state, { payload }: PayloadAction<string[]>) => {
      state.users = state.users?.filter((x) => {
        return !payload.includes(x._id);
      });
    },
    deleteUserFailure: (state) => {
      return state;
    },
    addEditUserSuccess: (state, { payload }: PayloadAction<IUser>) => {
      if (state.users) {
        const userExists = state.users.findIndex((user) => {
          return user._id === payload._id;
        });
        if (userExists !== -1) {
          state.users[userExists] = payload;
        } else {
          state.users.push(payload);
        }
      } else {
        state.users = [payload];
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

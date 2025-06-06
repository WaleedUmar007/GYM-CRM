// Application Type Definitions

export type UserRoles = "super-admin" | "admin" | "member";
export const UserRoles = {
  SuperAdmin: "super-admin" as UserRoles,
  Admin: "admin" as UserRoles,
  Member: "member" as UserRoles,
};

export type Environment = "production" | "development" | "testing";
export const Environment = {
  Production: "production" as Environment,
  Development: "development" as Environment,
  Testing: "testing" as Environment,
};

export const AuthErrors = {
  LogOut: "Session Expired, Loging Out!",
  LoginNeeded: "Previous Session Expired, Please login Again!",
} as const;
export type AuthErrors = typeof AuthErrors[keyof typeof AuthErrors];

export interface ISearchParams {
  page: number;
  pageSize: number;
  searchString?: string;
}

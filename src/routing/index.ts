import { UserRoles } from "@/types";
import type { IRoute } from "./types";

// admin routes
import DashboardPage from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";

// super admin routes
import SuperAdminDashboardPage from "@/pages/SuperAdminDashboardPage";
import SuperAdminMembersPage from "@/pages/SuperAdminMembersPage";
import SuperAdminSettingsPage from "@/pages/SuperAdminSettingsPage";
import SuperAdminReportsPage from "@/pages/SuperAdminReportsPage";

export const adminRoutes: Array<IRoute> = [
  {
    index: true,
    path: "dashboard",
    component: DashboardPage,
    label: "Dashboard",
    id: "dashboard",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
  {
    path: "users",
    component: AdminPage,
    label: "Users",
    id: "users",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
];

export const superAdminRoutes: Array<IRoute> = [
  {
    index: true,
    path: "dashboard",
    component: SuperAdminDashboardPage,
    label: "Dashboard",
    id: "dashboard",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
  {
    path: "members",
    component: SuperAdminMembersPage,
    label: "Members",
    id: "members",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
  {
    path: "settings",
    component: SuperAdminSettingsPage,
    label: "Settings",
    id: "settings",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
  {
    path: "reports",
    component: SuperAdminReportsPage,
    label: "Reports",
    id: "reports",
    authenticatedUsers: [UserRoles.SuperAdmin],
  },
];

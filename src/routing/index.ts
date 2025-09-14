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

// inventory admin routes
import InventoryAdminDashboard from "@/pages/InventoryAdminDashboard";
import InventoryItems from "@/pages/InventoryItems";
import InventoryStock from "@/pages/InventoryStock";
import InventoryOrders from "@/pages/InventoryOrders";
import InventorySuppliers from "@/pages/InventorySuppliers";
import InventoryReports from "@/pages/InventoryReports";
import InventoryAddInventory from "@/pages/InventoryAddInventory";
import InventoryPoS from "@/pages/InventoryPoS";

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
    path: "customers",
    component: AdminPage,
    label: "Customers",
    id: "customers",
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

export const inventoryAdminRoutes: Array<IRoute> = [
  {
    index: true,
    component: InventoryAdminDashboard,
    label: "Dashboard",
    id: "dashboard",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "add-inventory",
    component: InventoryAddInventory,
    label: "Add Inventory",
    id: "add-inventory",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "pos",
    component: InventoryPoS,
    label: "Point of Sale",
    id: "pos",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "items",
    component: InventoryItems,
    label: "Items", 
    id: "items",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "stock",
    component: InventoryStock,
    label: "Stock Management",
    id: "stock",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "orders",
    component: InventoryOrders,
    label: "Orders",
    id: "orders",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "suppliers",
    component: InventorySuppliers,
    label: "Suppliers",
    id: "suppliers",
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    path: "reports",
    component: InventoryReports,
    label: "Reports",
    id: "reports",
    authenticatedUsers: [UserRoles.Admin],
  },
];

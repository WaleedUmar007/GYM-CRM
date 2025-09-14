import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import { Provider } from "react-redux";
import store from "@/appRedux/store";
import AdminLayout from "@/layouts/AdminLayout";
import RequireAuth from "@/routing/RequireAuth";
import type { IRoute } from "@/routing/types";
import { adminRoutes, superAdminRoutes, inventoryAdminRoutes } from "@/routing";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import InventoryAdminLayout from "@/layouts/InventoryAdminLayout";
import InventoryAdminDashboard from "@/pages/InventoryAdminDashboard";
import Alert from "@/components/alert";

function App() {
  /**
   * Set assessment modal visibility to true
   *
   * @param {Array<SiderRoutes>} routes to be iterated
   * @returns {React.ReactNode} subRoutes
   */
  const developRecursiveRoutes = (routes: Array<IRoute>): React.ReactNode => {
    return routes.map((route, key) => {
      /**
       * Node 18 was giving error that is why
       * condition is separated
       */
      return route.index ? (
        <Route index={route.index} element={<route.component />} key={key} />
      ) : route.children ? (
        <Route path={route.path} index={route.index} key={key}>
          {route.subRoutes ? developRecursiveRoutes(route.subRoutes) : ""}
        </Route>
      ) : (
        <Route
          path={route.path}
          index={route.index}
          element={<route.component />}
          key={key}
        >
          {route.subRoutes ? developRecursiveRoutes(route.subRoutes) : ""}
        </Route>
      );
    });
  };

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            {developRecursiveRoutes(adminRoutes)}
          </Route>

          <Route
            path="superadmin"
            element={
              <RequireAuth>
                <SuperAdminLayout />
              </RequireAuth>
            }
          >
            {developRecursiveRoutes(superAdminRoutes)}
          </Route>

          <Route
            path="inventory-admin"
            element={
              <RequireAuth>
                <InventoryAdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<InventoryAdminDashboard />} />
            {developRecursiveRoutes(inventoryAdminRoutes)}
          </Route>

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

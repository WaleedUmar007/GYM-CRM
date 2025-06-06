import type { UserRoles } from "types";

interface ISiderChildRoutes {
  id: string;
  label: string;
  path: string;
  component: React.FC;
  authenticatedUsers?: Array<UserRoles>;
}

export interface IRoute {
  path: string;
  component: React.FC;
  label: string;
  id: string;
  index?: boolean;
  subRoutes?: Array<IRoute>;
  authenticatedUsers?: Array<UserRoles>;
  children?: Array<ISiderChildRoutes>;
}

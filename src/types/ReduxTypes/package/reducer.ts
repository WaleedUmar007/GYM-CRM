import type { IPackage } from "./state";

export interface IAddUpdatePackageSuccessProp {
  action: "update" | "create";
  data: IPackage;
}

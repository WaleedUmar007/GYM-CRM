import type { IUser } from "../user";

export interface IPackage {
  _id: string;
  name: string;
  description: string;
  duration: number;
  access: Array<string>;
  price: number;
  registration_price: number;
  assigned_to: Array<IUser | string>;
  id?: string;
}

export interface IPackageState {
  packages?: Array<IPackage> | null;
  packageLoading: boolean;
}

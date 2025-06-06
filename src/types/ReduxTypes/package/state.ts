export interface IPackageAccess {
  gymAccess: boolean;
  poolAccess: boolean;
  saunaAccess: boolean;
  classesIncluded: string[];
  personalTrainerSessions: number;
}

export interface IPackage {
  _id: string;
  name: string;
  description: string;
  duration: number;
  access: IPackageAccess;
  price: number;
  id?: string;
}

export interface IPackageState {
  packages?: Array<IPackage> | null;
  packageLoading: boolean;
}

import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";

export interface IPackageModalProps {
  dataSet?: IPackage;
  edit?: boolean;
  modalVisibility: boolean;
  setDataSet: (value?: IPackage) => void;
  setModalVisibility: (value: boolean) => void;
  users: Array<IUser>;
}

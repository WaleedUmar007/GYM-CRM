import type { Membership } from "@/types/ReduxTypes/membership";

export interface IMembershipModalProps {
  dataSet?: Membership;
  edit?: boolean;
  modalVisibility: boolean;
  setDataSet: (value?: Membership) => void;
  setModalVisibility: (value: boolean) => void;
}

export interface IMembershipHistoryModalProps {
  dataSet?: Membership["history"];
  modalVisibility: boolean;
  setDataSet: (value?: Membership["history"]) => void;
  setModalVisibility: (value: boolean) => void;
}

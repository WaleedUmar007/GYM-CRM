import type { ModalProps } from "antd";

export interface IModalProps extends ModalProps {
  setModalVisibility(value: boolean): void;
  open: boolean;
}

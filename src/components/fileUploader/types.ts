import type { ReactNode } from "react";
import type { UploadProps } from "antd";
export interface IUploadProps extends UploadProps {
  title?: string;
  icon?: ReactNode;
  dragger?: boolean;
  draggerText?: string;
  btnColor: "primary" | "dashed" | "link" | "text" | "default" | undefined;
  preview?: boolean;
  defaultStyle?: boolean; // button
  previewImage?: string;
}

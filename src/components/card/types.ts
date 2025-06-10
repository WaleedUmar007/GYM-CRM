import type { CardProps } from "antd";
import React, { type ReactNode } from "react";

export interface ICardProps extends CardProps {
  kind?: "small" | "admin" | "status" | "other";
  color?: string;
  value?: string | React.ReactNode;
  transparent?: boolean;
  theme?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "lightred"
    | "pink"
    | "purple"
    | "primaryPurple"
    | "purpleGradient";
  titlealign?: "center";
  icon?: ReactNode;
  footer?: string | ReactNode;
  footerIcon?: string | ReactNode;
  limitwidth?: boolean;
  iconName?: React.ReactNode;
  colorproperty?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "lightred"
    | "pink"
    | "purple"
    | "primaryPurple"
    | "purpleGradient";
}

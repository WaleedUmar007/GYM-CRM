import React from "react";
import type { ColProps } from "antd";
import type { Variant } from "antd/es/config-provider";

export interface ITableToolBarProps {
  add?: boolean;
  search?: boolean;
  edit?: boolean;
  refresh?: boolean;
  deleteAll?: boolean;
  wildCardOperator?: React.ReactNode;
  deleteBtnDisabled?: boolean;
  deleteMessage?: React.ReactNode;
  children?: React.ReactNode;
  forceRerender?: number;
  searchFieldHandler?: (field: React.ChangeEvent<HTMLInputElement>) => void;
  wildCardFieldHandler?: React.MouseEventHandler<HTMLElement>;
  addEventListener?: React.MouseEventHandler<HTMLElement>;
  drawerEventListener?: React.MouseEventHandler<HTMLElement>;
  searchEventListener?: React.MouseEventHandler<HTMLElement>;
  editEventListener?: React.MouseEventHandler<HTMLElement>;
  refreshEventListener?: React.MouseEventHandler<HTMLElement>;
  deleteEventListener?: (field?: string) => void;
  searchPlaceHolder?: string;
  searchBoxColProps?: ColProps;
  childrenBoxColProps?: ColProps;
  justifyParent?:
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | "center";
  gutter?: number;
  SearchNode?: React.ReactNode;
  utilityBtnsColProps?: ColProps;
  reportDelete?: boolean;
  variant?: Variant;
}

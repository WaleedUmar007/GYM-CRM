/* eslint-disable no-magic-numbers */
import React from "react";
import { Row, Col, Grid, Popconfirm, Input, Button } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ITableToolBarProps } from "./types";
import type { Variant } from "antd/es/config-provider";

const { useBreakpoint } = Grid;
/**
 * This is table header component
 *
 * @param {ITableToolBarProps} props - Input
 * @returns {React.FC} TableHeader component
 */
const TableToolBar: React.FC<ITableToolBarProps> = (
  props: ITableToolBarProps
) => {
  const {
    search,
    searchFieldHandler,
    searchPlaceHolder,
    childrenBoxColProps,
    searchBoxColProps,
    refresh,
    deleteAll,
    deleteMessage,
    wildCardOperator,
    wildCardFieldHandler,
    edit,
    children,
    add,
    justifyParent,
    gutter,
    utilityBtnsColProps,
    reportDelete,
    forceRerender,
    variant,
  } = props;
  const {} = useBreakpoint();
  /*
   As edit || refresh || add || deleteAll use 4 flex
   so if all of them are not available, we have 4 ramaining
   flex. If one of them is present we set it to 24 to go to next line
   */
  return (
    <Row
      justify={justifyParent}
      key={forceRerender}
      align="middle"
      style={{ marginBottom: 10 }}
      gutter={gutter}
    >
      {search && (
        <Col {...searchBoxColProps}>
          <Row justify="space-evenly">
            {props.SearchNode ? (
              <>{props.SearchNode}</>
            ) : (
              <Input
                onChange={(e) => {
                  if (searchFieldHandler) {
                    return searchFieldHandler(e);
                  }
                  return undefined;
                }}
                variant={variant as Variant}
                placeholder={searchPlaceHolder}
                suffix={<SearchOutlined />}
                maxLength={300}
              />
            )}
          </Row>
        </Col>
      )}

      {(edit || refresh || add || deleteAll) && (
        <Col {...(utilityBtnsColProps || { xs: 24, sm: 16 })}>
          <Row justify="space-around">
            {edit && (
              <Button
                onClick={
                  props.editEventListener ? props.editEventListener : () => {}
                }
                type="primary"
                shape="circle"
                icon={<EditFilled />}
              />
            )}
            {refresh && (
              <Button
                shape="circle"
                onClick={
                  props.refreshEventListener
                    ? props.refreshEventListener
                    : () => {}
                }
                icon={<RedoOutlined />}
              />
            )}
            {add && (
              <Button
                onClick={
                  props.addEventListener ? props.addEventListener : () => {}
                }
                shape="circle"
                icon={<PlusCircleOutlined />}
              />
            )}
            {wildCardOperator && wildCardFieldHandler && (
              <Button
                onClick={
                  props.wildCardFieldHandler
                    ? props.wildCardFieldHandler
                    : () => {}
                }
                type="link"
              >
                {wildCardOperator}
              </Button>
            )}
            {deleteAll &&
              (reportDelete ? (
                <Popconfirm
                  title={
                    deleteMessage || "Delete Report(s) with all of its history?"
                  }
                  placement="left"
                  onConfirm={() => {
                    return props.deleteEventListener
                      ? props.deleteEventListener?.("all")
                      : () => {};
                  }}
                  onCancel={() => {
                    return props.deleteEventListener
                      ? props.deleteEventListener?.("single")
                      : () => {};
                  }}
                  // onCancel={() => {}}
                  okText="All"
                  cancelText="Single"
                >
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    disabled={props.deleteBtnDisabled || false}
                    danger
                  />
                </Popconfirm>
              ) : (
                <Popconfirm
                  title={
                    deleteMessage || (
                      <>
                        Please confirm delete <br />
                        (This is irreversible)
                      </>
                    )
                  }
                  onConfirm={() => {
                    return props.deleteEventListener
                      ? props.deleteEventListener?.()
                      : () => {};
                  }}
                  placement="left"
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    shape="circle"
                    icon={<DeleteFilled />}
                    disabled={props.deleteBtnDisabled || false}
                    danger
                  />
                </Popconfirm>
              ))}
          </Row>
        </Col>
      )}
      {children && <Col {...childrenBoxColProps}>{children}</Col>}
    </Row>
  );
};

TableToolBar.defaultProps = {
  gutter: 0,
  justifyParent: "start",
  searchPlaceHolder: "Search",
  searchBoxColProps: {
    xs: 24,
    sm: 8,
  },
  childrenBoxColProps: {
    xs: 24,
    sm: 8,
  },
  SearchNode: undefined,
};

export default TableToolBar;

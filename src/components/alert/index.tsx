import { Button, notification } from "antd";
import React from "react";
import { AuthErrors } from "@/types";
import type { IAlertProps } from "./types";
import { getAlertStyle } from "@/colors";

// redux
import { useSelector } from "react-redux";
import { AlertSelector, removeAlert } from "@/appRedux/reducers/alertReducer";
import type { IAlert } from "@/types/ReduxTypes/alert";
import {
  CheckSquareOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const ignoreAlerts = [AuthErrors.LoginNeeded] as Array<string>;
/**
 * antd notification
 *
 * @param {IAlertProps} props - Properties of the notification
 * @returns {React.FC} notification component
 */
const Alert: React.FC<IAlertProps> = (props: IAlertProps) => {
  const AlertState = useSelector(AlertSelector);
  const { placement, duration } = props;
  const zero = 0;
  const one = 1;
  const three = 3;

  notification.config({
    placement: placement || "top",
    duration: duration || three,
    rtl: false,
  });

  const icons: { [key: string]: any } = {
    success: <CheckSquareOutlined height={30} width={30} />,
    info: <InfoCircleOutlined height={30} width={30} />,
    warning: <WarningOutlined height={30} width={30} />,
    danger: <WarningOutlined height={30} width={30} />,
  };

  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        return notification.destroy(key);
      }}
    >
      View Details
    </Button>
  );

  return (
    <>
      {AlertState !== null &&
        AlertState.length > zero &&
        AlertState.filter((alert: IAlert) => {
          return ignoreAlerts.indexOf(alert.message as string) === -one;
        }).forEach((alert: IAlert, idx) => {
          notification.open({
            message: alert.type && icons[alert.type],
            description: alert.message,
            btn: alert.url ? btn : undefined,
            key: `${key}-${idx}`,
            style: getAlertStyle(alert.type as string),
            onClose: () => {
              return removeAlert(alert.id as IAlert);
            },
          });
        })}
    </>
  );
};

export default Alert;

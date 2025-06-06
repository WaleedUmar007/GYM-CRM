import type { CSSProperties } from "react";

interface IAlertTypes {
  [key: string]: CSSProperties;
}

const getAlertColors: IAlertTypes = {
  success: {
    color: "rgba(0, 0, 0, 0.65)",
    border: "1px solid #b7eb8f",
    backgroundColor: "#f6ffed",
  },
  warning: {
    color: "rgba(0, 0, 0, 0.65)",
    border: "1px solid #ffe58f",
    backgroundColor: "#fffbe6",
  },
  error: {
    color: "rgba(0, 0, 0, 0.65)",
    border: "1px solid #ffa39e",
    backgroundColor: "#fff1f0",
  },
  info: {
    color: "rgba(0, 0, 0, 0.65)",
    border: "1px solid #91d5ff",
    backgroundColor: "#e6f7ff",
  },
};

/**
 * Color used in alert here
 *
 * @param {string} type - color type
 * @returns {CSSProperties} color - color value
 */
export const getAlertStyle = (type: string): CSSProperties => {
  if (type === "danger") {
    return getAlertColors.error;
  }
  return getAlertColors[type];
};

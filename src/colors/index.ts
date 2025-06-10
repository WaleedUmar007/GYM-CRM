import type { CSSProperties } from "react";

interface IColor {
  [color: string]: string;
}

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

/* Theme COlors */

const color: IColor = {
  /**
   * general
   */
  info: "#9D1D96",
  primary: "#111C4E",
  white: "#ffff",
  /**
   * Severity
   */
  critical: "rgba(204, 51, 98, 1)",
  high: "rgba(255, 89, 90, 1)",
  medium: "rgba(255, 193, 7, 0.7)",
  low: "#E50695",

  /**
   * Verification
   */
  false: "#CC3362",
  true: "#45BF55",
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

/**
 * Color used in tags and other components are defined here
 *
 * @param {string} type - color type
 * @returns {string} color - color value
 */
export const getColor = (type: string): string => {
  return color[type.toLowerCase()];
};

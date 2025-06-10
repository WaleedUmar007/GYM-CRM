import React from "react";
import { Card, Row, Col, Typography, Grid, Space, Statistic } from "antd";
import CountUp from "react-countup";
import type { FormatConfig, valueType } from "antd/lib/statistic/utils";
import type { ICardProps } from "./types";

const { useBreakpoint } = Grid;

/**
 * Custom antd card with theme classes
 *
 * @param {ICardProps} props - properties for card
 * @returns {React.FC} Card Component
 *
 * recommended breakpoints for card parent containers are
 * xs={24} sm={24} md={12} lg={8} xxl={4}
 */
const ScalableCard: React.FC<ICardProps> = (props: ICardProps) => {
  const { Text, Title } = Typography;
  const { xl } = useBreakpoint();
  const {
    icon,
    className,
    title,
    value,
    kind,
    colorproperty,
    theme,
    limitwidth,
    titlealign,
    children,
    footer,
    transparent,
    iconName,
    footerIcon,
    ...rest
  } = props;

  /**
   * Count up formatter
   *
   * @param {valueType} counter - number value to count to
   * @param {FormatConfig} config - config for countup element
   * @returns {React.React.ReactNode} returns react countup element
   */
  const formatter = (
    counter: valueType,
    config: FormatConfig | undefined
  ): React.ReactNode => {
    return (
      <CountUp
        className={`color-${colorproperty}`}
        end={counter as number}
        separator=","
      />
    );
  };

  return (
    <React.Fragment>
      {kind === "small" ? (
        <Card title={undefined} hoverable {...rest}>
          <Row>
            <Col span={24}>
              <div>
                {iconName}
                <Text>{title}</Text>
              </div>
              <div>{children}</div>
            </Col>
            <Col span={24}>
              {typeof value == "string" ? (
                <Text>
                  <Statistic value={value} formatter={formatter} />
                </Text>
              ) : (
                <>{value}</>
              )}
            </Col>
          </Row>
          {footer && (
            <Row align="bottom" justify={"start"}>
              <Col span={21}>
                <div>{footer}</div>
              </Col>
              <Col span={2}>
                <div>{footerIcon}</div>
              </Col>
            </Row>
          )}
        </Card>
      ) : kind === "status" ? (
        <Card title={undefined} {...rest}>
          {children}

          {footer && (
            <Row align="bottom" justify={"start"}>
              <Col span={21}>
                <div>{footer}</div>
              </Col>
              <Col span={2}>
                <div>{footerIcon}</div>
              </Col>
            </Row>
          )}
        </Card>
      ) : kind === "admin" ? (
        <Card {...rest}>
          <Space direction="vertical">
            <Text>{icon}</Text>
            <Title level={4}>{title}</Title>
            <Text>{value}</Text>
          </Space>
        </Card>
      ) : (
        <Card title={title} bordered={false}>
          {children}
        </Card>
      )}
    </React.Fragment>
  );
};

ScalableCard.defaultProps = {
  kind: undefined,
  color: "#0000000",
  value: "0",
  theme: "primary",
  limitwidth: true,
  transparent: false,
};
export default ScalableCard;

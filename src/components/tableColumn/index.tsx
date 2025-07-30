import type {
  ICommonMembershipAttr,
  Membership,
  MemberStatus,
  PaymentType,
} from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";
import {
  EditOutlined,
  FileProtectOutlined,
  HistoryOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Tooltip as AntdTooltip } from "antd/lib";
import type {
  IMembershipColumnType,
  IPackagesColumnType,
  IUsersColumnType,
} from "./types";
import { PaymentMode, UserRoles } from "@/types";
import { Image } from "antd";

export const IUsersColumns: ColumnsType<IUsersColumnType> = [
  {
    title: "Profile",
    dataIndex: "avatar",
    render: (avatar: string) => {
      if (!avatar) {
        return <Avatar shape="square" size={64} icon={<UserOutlined />} />;
      }
      return <Image width={80} src={avatar} />;
    },
  },
  {
    title: "First Name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (email: string) => {
      return email || "N/A";
    },
  },
  {
    title: "Gym",
    dataIndex: "organization",
    render: (organization: string) => {
      return (
        <Tag icon={<FileProtectOutlined />} color={"purple"}>
          <strong>{organization || "N/A"}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Membership Status",
    render: (user: IUser) => {
      const status = user?.membership && user?.membership?.status;
      return (
        <Tag
          color={
            status === "active"
              ? "green"
              : status === "inactive"
              ? "orange"
              : "red"
          }
        >
          <strong>{status || "N/A"}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Payment",
    render: (user: IUser) => {
      const status = user?.membership && user?.membership?.paymentStatus;
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status || "N/A"}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Custom Discounts",
    render: (user: IUser) => {
      const regDiscount =
        user?.membership && user?.membership?.registration_discount;
      const membershipDiscount =
        user?.membership && user?.membership?.membership_discount;

      return (
        <>
          <Tag color={"purple"}>
            <strong>Reg. Discount: {regDiscount || 0}%</strong>
          </Tag>
          <br />
          <Tag color={"purple"}>
            <strong>Membership Discount: {membershipDiscount || 0}%</strong>
          </Tag>
        </>
      );
    },
  },
  {
    title: "Joined On",
    dataIndex: "createdAt",
    render: (createdAt: string) => {
      return new Date(createdAt).toLocaleString();
    },
  },
  {
    title: "Actions",
    render: (user: IUsersColumnType) => {
      return (
        <>
          {user?.role === UserRoles.Member && (
            <>
              <AntdTooltip title={"Membership History"}>
                <HistoryOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (user.viewMembershipHistoryHandler) {
                      user.viewMembershipHistoryHandler();
                    }
                  }}
                />
              </AntdTooltip>
              &nbsp;&nbsp;
            </>
          )}
          <AntdTooltip title={"Update User/Membership"}>
            <Popconfirm
              title={"Update user or membership?"}
              placement="left"
              onConfirm={() => {
                if (user.updateUser) {
                  user.updateUser();
                }
              }}
              onCancel={() => {
                if (user.updateMembershipHandler) {
                  user.updateMembershipHandler();
                }
              }}
              okText="User"
              cancelText="Membership"
              cancelButtonProps={{ disabled: user.role === UserRoles.Admin }}
            >
              <Button icon={<SaveOutlined style={{ cursor: "pointer" }} />} />
            </Popconfirm>
          </AntdTooltip>
        </>
      );
    },
  },
];

export const IMembershipColumns: ColumnsType<IMembershipColumnType> = [
  {
    title: "Profile",
    dataIndex: "client_id",
    render: (client_id: IUser) => {
      if (!client_id.avatar) {
        return <Avatar shape="square" size={64} icon={<UserOutlined />} />;
      }
      return <Image width={80} src={client_id.avatar} />;
    },
  },
  {
    title: "Name",
    render: (membership: Membership) => {
      return (membership.client_id as IUser).first_name ? (
        <>
          {(membership.client_id as IUser).first_name}{" "}
          {(membership.client_id as IUser).last_name}
        </>
      ) : (
        "N/A"
      );
    },
  },
  {
    title: "Email",
    render: (membership: Membership) => {
      return (membership.client_id as IUser).email || "N/A";
    },
  },
  {
    title: "Membership ID",
    dataIndex: "membership_id",
    render: (id: string) => {
      return (
        <Tag icon={<FileProtectOutlined />} color={"purple"}>
          <strong>{id || "N/A"}</strong>
        </Tag>
      );
    },
  },
  {
    title: "User Package",
    render: (membership: Membership) => {
      return (membership?.package as IPackage)?.name ? (
        <>
          {(membership?.package as IPackage)?.name}&nbsp;
          <Tag color="purple">
            Monthly Fee's: Rs {(membership?.package as IPackage)?.price}
          </Tag>
          <Tag color="cyan">
            Registration Fee's:{" "}
            {(membership?.package as IPackage)?.registration_price}
          </Tag>
        </>
      ) : (
        "N/A"
      );
    },
  },
  {
    title: "Gym",
    render: (membership: Membership) => {
      return (
        <strong>{(membership.client_id as IUser).organization || "N/A"}</strong>
      );
    },
  },
  {
    title: "Membership Status",
    dataIndex: "status",
    render: (status: MemberStatus) => {
      return (
        <Tag
          color={
            status === "active"
              ? "green"
              : status === "inactive"
              ? "orange"
              : "red"
          }
        >
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Registration Status",
    dataIndex: "registration_status",
    render: (status: PaymentType) => {
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Monthly Status",
    dataIndex: "paymentStatus",
    render: (status: PaymentType) => {
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Joined On",
    dataIndex: "createdAt",
    render: (createdAt: string) => {
      return new Date(createdAt).toLocaleString();
    },
  },
  {
    title: "Actions",
    render: (membership: IMembershipColumnType) => {
      return (
        <>
          <AntdTooltip title={"Membership History"}>
            <HistoryOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                membership.viewMembershipHistoryHandler();
              }}
            />
          </AntdTooltip>
          &nbsp;&nbsp;&nbsp;
          <AntdTooltip title={"Update User/Membership"}>
            <Popconfirm
              title={"Update user or membership?"}
              placement="left"
              onConfirm={() => {
                if (membership.updateUser) {
                  membership.updateUser();
                }
              }}
              onCancel={() => {
                if (membership.updateMembershipHandler) {
                  membership.updateMembershipHandler();
                }
              }}
              // onCancel={() => {}}
              okText="User"
              cancelText="Membership"
            >
              <Button
                icon={<SaveOutlined style={{ cursor: "pointer" }} />}
                disabled={
                  (membership.client_id as IUser)?.role !== UserRoles.Member
                }
              />
            </Popconfirm>
          </AntdTooltip>
        </>
      );
    },
  },
];

export const IMembershipHistoryColumn: ColumnsType<ICommonMembershipAttr[]> = [
  {
    title: "Start Date",
    dataIndex: "startDate",
    render: (startDate: string) => {
      return new Date(startDate).toLocaleString();
    },
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    render: (endDate: string) => {
      return new Date(endDate).toLocaleString();
    },
  },
  {
    title: "Membership Status",
    dataIndex: "status",
    render: (status: MemberStatus) => {
      return (
        <Tag
          color={
            status === "active"
              ? "green"
              : status === "inactive"
              ? "orange"
              : "red"
          }
        >
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Registration Status",
    dataIndex: "registration_status",
    render: (status: PaymentType) => {
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Month Status",
    dataIndex: "paymentStatus",
    render: (status: PaymentType) => {
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Payment Mode",
    dataIndex: "payment_mode",
    render: (mode: PaymentMode) => {
      return mode;
    },
  },
  {
    title: "Custom Discounts",
    render: (discounts: ICommonMembershipAttr) => {
      const regDiscount = discounts?.registration_discount || 0;
      const membershipDiscount = discounts?.membership_discount || 0;

      return (
        <>
          <Tag color={"purple"}>
            <strong>Reg. Discount: {regDiscount}%</strong>
          </Tag>
          <br />
          <Tag color={"purple"}>
            <strong>Membership Discount: {membershipDiscount}%</strong>
          </Tag>
        </>
      );
    },
  },
];

export const IPackagesColumns: ColumnsType<IPackagesColumnType[]> = [
  {
    title: "Package Name",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Package Fee",
    dataIndex: "price",
    render: (price: number) => {
      return <Tag color={"purple"}>PKR {price}</Tag>;
    },
  },
  {
    title: "Registration Fee",
    dataIndex: "registration_price",
    render: (price: number) => {
      return <Tag color={"purple"}>PKR {price}</Tag>;
    },
  },
  {
    title: "Salon Discount",
    dataIndex: "salon_discount",
    render: (discount: number) => {
      return <Tag color={"purple"}>{discount}%</Tag>;
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    render: (duration: number) => {
      return <Tag color={"blue"}>{duration} Days</Tag>;
    },
  },
  {
    title: "Package Access",
    dataIndex: "access",
    render: (access: Array<string>) => {
      return access.length === 0 ? (
        <Tag color={"blue"}>Package has no access</Tag>
      ) : (
        access.map((lvl) => {
          return (
            <>
              ● {lvl}
              <br />
            </>
          );
        })
      );
    },
  },
  {
    title: "Assigned To",
    dataIndex: "assigned_to",
    render: (assignedTo: Array<string | IUser>) => {
      return assignedTo.length === 0 ? (
        <Tag color={"blue"}>Package assigned to all admins</Tag>
      ) : (
        assignedTo.map((user) => {
          if (typeof user !== "string") {
            return (
              <>
                ● {(user as IUser).first_name} {(user as IUser).last_name}
                <br />
              </>
            );
          }
        })
      );
    },
  },
  {
    title: "Actions",
    render: (packages: IPackagesColumnType) => {
      return (
        <>
          <AntdTooltip title={"Update Package"}>
            <EditOutlined
              style={{ fontSize: 16, cursor: "pointer" }}
              onClick={() => {
                if (packages.updatePackage) {
                  packages.updatePackage();
                }
              }}
            />
          </AntdTooltip>
        </>
      );
    },
  },
];

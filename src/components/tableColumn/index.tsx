import type {
  ICommonMembershipAttr,
  Membership,
  MemberStatus,
  PaymentType,
} from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";
import {
  DeleteOutlined,
  EditOutlined,
  FileProtectOutlined,
  HistoryOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Tooltip as AntdTooltip } from "antd/lib";
import type { IMembershipColumnType, IPackagesColumnType } from "./types";

export const IUsersColumns: ColumnsType<IUser> = [
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
    title: "Gym Admin",
    dataIndex: "createdBy",
    render: (createdBy: IUser) => {
      return createdBy?.first_name
        ? `${createdBy?.first_name} ${createdBy.last_name}`
        : "N/A";
    },
  },
  {
    title: "Account Status",
    dataIndex: "verified",
    render: (verified: boolean) => {
      return (
        <Tag color={verified ? "green" : "red"}>
          <strong>{verified ? "Active" : "Not Active"}</strong>
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
];

export const IMembershipColumns: ColumnsType<IMembershipColumnType> = [
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
    dataIndex: "_id",
    render: (organization: string) => {
      return (
        <Tag icon={<FileProtectOutlined />} color={"purple"}>
          <strong>{organization || "N/A"}</strong>
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
          <Tag color={"purple"}>
            PKR {(membership?.package as IPackage)?.price}
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
    title: "Payment",
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
          <AntdTooltip title={"Update Membership"}>
            <SaveOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                membership.updateMembershipHandler();
              }}
            />
          </AntdTooltip>
          &nbsp;&nbsp;&nbsp;
          <AntdTooltip title={"Membership History"}>
            <HistoryOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                membership.viewMembershipHistoryHandler();
              }}
            />
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
    title: "Payment",
    dataIndex: "paymentStatus",
    render: (status: PaymentType) => {
      return (
        <Tag color={status === "cleared" ? "green" : "red"}>
          <strong>{status}</strong>
        </Tag>
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
    title: "Price",
    dataIndex: "price",
    render: (price: number) => {
      return <Tag color={"purple"}>PKR {price}</Tag>;
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

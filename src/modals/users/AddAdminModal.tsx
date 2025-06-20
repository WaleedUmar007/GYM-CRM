import React, { useState } from "react";
import { Col, Form, Grid, Row, Switch, Tag } from "antd";

import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
import ScalableInput from "@/components/input";
import ScalableButton from "@/components/button";
// redux
import { useSelector } from "react-redux";
import type { IUserModalProps } from "./types";
import { useAppDispatch } from "@/appRedux/store";
import { AuthSelector, PackageSelector } from "@/appRedux/reducers";
import type { IUser } from "@/types/ReduxTypes/user";
import { addEditUser } from "@/appRedux/actions/userAction";
import { UserRoles } from "@/types";
import CustomDropdown from "@/components/dropdown";
import { getAllMemberships } from "@/appRedux/actions/membershipAction";
import { initFormFields } from "@/utils";
import { useEffect } from "react";

/**
 * user add modal dialog
 *
 *
 * @param {IUserModalProps} props - props of modal
 * @returns {React.FC} user modal dialog
 */
const UserAddEditModal: React.FC<IUserModalProps> = (
  props: IUserModalProps
) => {
  const { useBreakpoint } = Grid;

  const { dataSet, setDataSet, mode } = props;

  const [form] = Form.useForm();
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const IAuthState = useSelector(AuthSelector);
  const { user } = IAuthState;
  const { packages } = useSelector(PackageSelector);

  useEffect(() => {
    /**
     * Init form.
     */
    if (dataSet) {
      if (dataSet._id) {
        initFormFields(
          {
            ...dataSet,
            firstName: dataSet.first_name,
            lastName: dataSet.last_name,
          },
          form
        );
      }

      if (dataSet.membership && dataSet.membership.package) {
        form.setFieldValue("userPackage", dataSet.membership.package as string);
      }
    }
  }, [dataSet]);

  const fields = [
    {
      type: "text",
      name: "firstName",
      id: "firstName",
      disabled: false,
      placeHolder: "First Name",
      label: "First Name",
      required: true,
      hidden: false,
    },
    {
      type: "text",
      name: "lastName",
      id: "lastName",
      disabled: false,
      placeHolder: "Last Name",
      label: "Last Name",
      required: true,
      hidden: false,
    },
    {
      type: "email",
      name: "email",
      id: "email",
      disabled: dataSet?._id !== undefined,
      placeHolder: `gym@${window.env.REACT_APP_BRAND_DOMAIN.toLowerCase()}.com`,
      label: "Email",
      required: true,
      hidden: false,
    },
    {
      type: "text",
      name: "organization",
      id: "organization",
      disabled: user?.role === UserRoles.Admin,
      placeHolder: "Lahore...",
      initialValue: user?.organization,
      label: "Gym",
      hidden: false,
      required: true,
    },
  ];

  if (user?.role === UserRoles.SuperAdmin) {
    fields.push({
      type: "password",
      name: "password",
      id: "password",
      disabled: false,
      placeHolder: "Gym@123",
      label: "Password",
      hidden: false,
      required: dataSet?._id === undefined,
    });
  }

  /**
   * form clear handler onclose
   *
   * @returns {void} handler close
   */
  const handleClose: any = () => {
    props.setModalVisibility(false);
    form.resetFields();
    form.setFieldValue("id", undefined);
    setDataSet(undefined);
  };

  /**
   * submit handler
   *
   * @param {IUser} values data on submission
   * @returns {void} submit handler
   */
  const handleSubmit = async (values: IUser) => {
    setLoading(true);
    if (
      await dispatch(
        addEditUser({
          data: values,
          mode: mode,
        })
      ).unwrap()
    ) {
      if (user?.role === UserRoles.Admin) {
        dispatch(
          getAllMemberships({
            page: 1,
            pageSize: 10,
            searchString: "",
            admins: false,
          })
        );
      }
      handleClose();
    }
    setLoading(false);
  };

  return (
    <>
      <CustomModal
        centered
        closable={true}
        destroyOnClose={true}
        onCancel={handleClose}
        open={props.modalVisibility}
        setModalVisibility={props.setModalVisibility}
        width={!sm ? "100%" : "50%"}
        footer={null}
      >
        <ScalableCard
          bordered={false}
          title={`${props.edit ? "Edit" : "Add"} User`}
          titlealign="center"
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Form.Item
              id={"id"}
              name={"id"}
              hidden
              initialValue={dataSet?._id}
            />
            <Form.Item
              id={"role"}
              name={"role"}
              hidden
              initialValue={
                user?.role === UserRoles.SuperAdmin
                  ? UserRoles.Admin
                  : UserRoles.Member
              }
            />
            <Row gutter={10} justify={"center"}>
              {fields
                .filter((field) => {
                  return !field.hidden;
                })
                .map((field, index) => {
                  return (
                    <Col key={index} xs={24} sm={24} md={12}>
                      <Form.Item
                        id={field.name}
                        name={field.name}
                        label={field.label}
                        initialValue={
                          user?.role === UserRoles.Admin
                            ? field.initialValue
                            : undefined
                        }
                        rules={[
                          {
                            message: `${field.label} is required!`,
                            required: field.required,
                          },
                        ]}
                      >
                        <ScalableInput
                          id={field.id}
                          size="middle"
                          variant="filled"
                          type={field.type}
                          name={field.name}
                          disabled={field.disabled}
                          placeholder={field.placeHolder}
                          maxLength={50}
                        />
                      </Form.Item>
                    </Col>
                  );
                })}
              <Col xs={24} sm={24} md={12}>
                <center>
                  <Form.Item
                    label={"Account Verified"}
                    id={"verified"}
                    name={"verified"}
                    initialValue={false}
                    rules={[{ message: `Status is required!`, required: true }]}
                  >
                    <Switch size="small" />
                  </Form.Item>
                </center>
              </Col>
              {user?.role === UserRoles.Admin && (
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label={"User Package"}
                    id={"userPackage"}
                    name={"userPackage"}
                    rules={[
                      { message: `User package is required!`, required: true },
                    ]}
                  >
                    <CustomDropdown
                      variant="filled"
                      placeholder={"Select package..."}
                      options={packages?.map((userPackage) => {
                        return {
                          label: (
                            <>
                              {userPackage.name}&nbsp;
                              <Tag color="purple">Rs {userPackage.price}</Tag>
                            </>
                          ),
                          value: userPackage._id,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row justify="center">
              <Col>
                <ScalableButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  {props.edit ? "Update" : "Submit"}
                </ScalableButton>
              </Col>
            </Row>
          </Form>
        </ScalableCard>
      </CustomModal>
    </>
  );
};

export default UserAddEditModal;

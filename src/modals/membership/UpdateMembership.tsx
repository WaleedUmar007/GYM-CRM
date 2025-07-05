import React, { useEffect, useState } from "react";
import { Col, Form, Grid, Row, Tag } from "antd";

import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
import ScalableInput from "@/components/input";
import ScalableButton from "@/components/button";
// redux
import { useSelector } from "react-redux";
import type { IMembershipModalProps } from "./types";
import { useAppDispatch } from "@/appRedux/store";
import { PackageSelector } from "@/appRedux/reducers";
import CustomDropdown from "@/components/dropdown";
import { initFormFields } from "@/utils";
import { addEditMemberships } from "@/appRedux/actions/membershipAction";
import type { IMembershipAddEditFormData } from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";

/**
 * user add modal dialog
 *
 *
 * @param {IUserModalProps} props - props of modal
 * @returns {React.FC} user modal dialog
 */
const MembershipEditModal: React.FC<IMembershipModalProps> = (
  props: IMembershipModalProps
) => {
  const { useBreakpoint } = Grid;

  const { dataSet, setDataSet } = props;
  const [form] = Form.useForm();
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { packages } = useSelector(PackageSelector);
  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    /**
     * Init form.
     */
    if (dataSet) {
      if (dataSet._id) {
        initFormFields(
          {
            ...dataSet,
          },
          form
        );
        form.setFieldValue("registrationStatus", dataSet.registration_status);
        form.setFieldValue(
          "userPackage",
          (dataSet.package as IPackage)?._id || dataSet.package
        );
        form.setFieldValue("clientId", dataSet.client_id);
        form.setFieldValue("paymentType", dataSet.paymentStatus);
        setForceRerender(forceRerender + 1);
      }
    }
  }, [dataSet]);

  const fields = [
    {
      type: "text",
      name: "clientId",
      id: "clientId",
      disabled: true,
      placeHolder: "GYM ID",
      initialValue: (dataSet?.client_id as IUser)?._id,
      label: "GYM ID",
      required: true,
      hidden: false,
    },
    {
      type: "text",
      name: "membership_id",
      id: "membership_id",
      disabled: true,
      placeHolder: "Membership ID",
      initialValue: dataSet?.membership_id || "N/A",
      label: "Membership ID",
      required: false,
      hidden: false,
    },
    {
      type: "text",
      name: "startDate",
      id: "startDate",
      disabled: true,
      initialValue: dataSet?.startDate,
      placeHolder: "Start Date",
      label: "Start Date",
      required: true,
      hidden: false,
    },
    {
      type: "text",
      name: "endDate",
      id: "endDate",
      disabled: true,
      initialValue: dataSet?.endDate,
      placeHolder: "End Date",
      label: "End Date",
      required: true,
      hidden: false,
    },
  ];

  const dropdownFields = [
    {
      name: "registrationStatus",
      id: "registrationStatus",
      disabled: false,
      placeHolder: "Cleared...",
      label: "Registration Status",
      required: true,
      initialValue: dataSet?.registration_status,
      variant: "filled",
      options: [
        {
          label: "Cleared",
          value: "cleared",
        },
        {
          label: "Pending",
          value: "pending",
        },
      ],
    },
    {
      name: "paymentType",
      id: "paymentType",
      disabled: false,
      placeHolder: "Payment Type",
      label: "Payment Status",
      required: true,
      initialValue: dataSet?.paymentStatus,
      variant: "filled",
      options: [
        {
          label: "Cleared",
          value: "cleared",
        },
        {
          label: "Pending",
          value: "pending",
        },
      ],
    },
    {
      name: "status",
      id: "status",
      disabled: false,
      placeholder: "Membership Status",
      label: "Membership Status",
      required: true,
      initialValue: dataSet?.status,
      variant: "filled",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
      ],
    },
    {
      name: "userPackage",
      id: "userPackage",
      disabled: false,
      placeholder: "User Package",
      label: "User Package",
      required: true,
      initialValue: (dataSet?.package as IPackage)?._id,
      variant: "filled",
      options: packages?.map((userPackage) => {
        return {
          label: (
            <>
              {userPackage.name}&nbsp;
              <Tag color="purple">Monthly Fee's: Rs {userPackage.price}</Tag>
              <Tag color="cyan">
                Registration Fee's: {userPackage.registration_price}
              </Tag>
            </>
          ),
          value: userPackage._id,
        };
      }),
    },
  ];

  /**
   * form clear handler onclose
   *
   * @returns {void} handler close
   */
  const handleClose: any = () => {
    props.setModalVisibility(false);
    form.resetFields();
    form.setFieldsValue({
      clientId: undefined,
      membershipId: undefined,
      startDate: undefined,
      endDate: undefined,
      paymentType: undefined,
      status: undefined,
      userPackage: undefined,
    });
    setDataSet(undefined);
  };

  /**
   * submit handler
   *
   * @param {IMembershipAddEditFormData} values data on submission
   * @returns {void} submit handler
   */
  const handleSubmit = async (values: IMembershipAddEditFormData) => {
    setLoading(true);
    if (await dispatch(addEditMemberships(values)).unwrap()) {
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
          title={`Edit Membership`}
          titlealign="center"
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
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
                        initialValue={field.initialValue}
                        rules={[
                          {
                            message: `${field.placeHolder} is required!`,
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
              {dropdownFields.map((field, index) => {
                return (
                  <Col key={`dropdown-${index}`} xs={24} sm={24} md={12}>
                    <Form.Item
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      initialValue={field.initialValue}
                      rules={[
                        {
                          message: `${field.placeHolder} is required!`,
                          required: field.required,
                        },
                      ]}
                    >
                      <CustomDropdown
                        variant={field.variant as any}
                        placeholder={field.placeHolder}
                        options={field.options}
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
            <Row justify="center">
              <Col>
                <ScalableButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Update
                </ScalableButton>
              </Col>
            </Row>
          </Form>
        </ScalableCard>
      </CustomModal>
    </>
  );
};

export default MembershipEditModal;

import React, { useEffect, useState } from "react";
import { Col, Form, Grid, InputNumber, Row, Tooltip } from "antd";

import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
import ScalableInput from "@/components/input";
import ScalableButton from "@/components/button";
// redux
import { useAppDispatch } from "@/appRedux/store";
import CustomDropdown from "@/components/dropdown";
import type { IPackageModalProps } from "./types";
import { initFormFields } from "@/utils";
import { InfoCircleOutlined } from "@ant-design/icons";
import { addEditPackage } from "@/appRedux/actions/packageAction";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";

/**
 * user add modal dialog
 *
 *
 * @param {IPackageModalProps} props - props of modal
 * @returns {React.FC} user modal dialog
 */
const PackageAddEditModal: React.FC<IPackageModalProps> = (
  props: IPackageModalProps
) => {
  const { useBreakpoint } = Grid;
  const accessList = [
    {
      label: "Family Access (2+ members)",
      value: "Family Access (2+ members)",
    },
    {
      label: "Swimming Pool Access",
      value: "Swimming Pool Access",
    },
    {
      label: "Sauna/Steam Room Access",
      value: "Sauna/Steam Room Access",
    },
    {
      label: "Yoga/Zumba/CrossFit Room Access",
      value: "Yoga/Zumba/CrossFit Room Access",
    },
    {
      label: "Daytime Access (6 AM – 6 PM)",
      value: "Daytime Access (6 AM – 6 PM)",
    },
    {
      label: "Evening Access (6 PM – 11 PM)",
      value: "Evening Access (6 PM – 11 PM)",
    },
  ];

  const { dataSet, setDataSet, users } = props;

  const [form] = Form.useForm();
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

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
        form.setFieldValue(
          "assignedTo",
          dataSet.assigned_to.map((user) => {
            if ((user as IUser)?._id) {
              return (user as IUser)?._id;
            }
          })
        );
      }
    }
  }, [dataSet]);

  const fields = [
    {
      type: "text",
      name: "name",
      id: "name",
      disabled: false,
      placeHolder: "Name",
      label: "Name",
      required: true,
      hidden: false,
    },
    {
      type: "text",
      name: "description",
      id: "description",
      disabled: false,
      placeHolder: "Description",
      label: "Description",
      required: true,
      hidden: false,
    },
    {
      type: "number",
      name: "duration",
      id: "duration",
      disabled: false,
      placeHolder: "Duration",
      label: "Duration",
      required: true,
      hidden: false,
    },
    {
      type: "number",
      name: "price",
      id: "price",
      disabled: false,
      placeHolder: "Price",
      label: "Price",
      hidden: false,
      required: true,
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
    form.setFieldValue("id", undefined);
    setDataSet(undefined);
  };

  /**
   * submit handler
   *
   * @param {IPackage} values data on submission
   * @returns {void} submit handler
   */
  const handleSubmit = async (values: IPackage) => {
    setLoading(true);
    if (await dispatch(addEditPackage(values)).unwrap()) {
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
          title={`${props.edit ? "Edit" : "Add"} Package`}
          titlealign="center"
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Row gutter={10} justify={"center"}>
              <Form.Item
                id={"id"}
                name={"id"}
                hidden
                initialValue={dataSet?._id}
              />
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
                        rules={[
                          {
                            message: `${field.placeHolder} is required!`,
                            required: field.required,
                          },
                        ]}
                      >
                        {field.type === "number" ? (
                          <InputNumber
                            style={{ width: "100%" }}
                            id={field.id}
                            size="middle"
                            variant="filled"
                            name={field.name}
                            disabled={field.disabled}
                            placeholder={field.placeHolder}
                            maxLength={5}
                          />
                        ) : (
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
                        )}
                      </Form.Item>
                    </Col>
                  );
                })}
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label={
                    <Tooltip title={"Leave empty if you want to assign to all"}>
                      Assigned to&nbsp;&nbsp;
                      <InfoCircleOutlined style={{ fontSize: 16 }} />
                    </Tooltip>
                  }
                  id={"assignedTo"}
                  name={"assignedTo"}
                  initialValue={[]}
                >
                  <CustomDropdown
                    variant="filled"
                    mode="multiple"
                    placeholder={"Created package for..."}
                    options={users?.map((user) => {
                      return {
                        label: `${user.first_name} ${user.last_name} - ${user.organization}`,
                        value: user._id,
                      };
                    })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label={
                    <Tooltip
                      title={
                        "Start typing to create custom access points for this package"
                      }
                    >
                      Package Access&nbsp;&nbsp;
                      <InfoCircleOutlined style={{ fontSize: 16 }} />
                    </Tooltip>
                  }
                  id={"access"}
                  name={"access"}
                  initialValue={[]}
                >
                  <CustomDropdown
                    variant="filled"
                    placeholder={"Add your own..."}
                    options={accessList}
                    mode="tags"
                  />
                </Form.Item>
              </Col>
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

export default PackageAddEditModal;

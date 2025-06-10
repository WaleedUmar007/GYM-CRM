import React from "react";
import { Grid } from "antd";

import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
// redux
import type { IMembershipHistoryModalProps } from "./types";
import CustomTable from "@/components/table";
import { IMembershipHistoryColumn } from "@/components/tableColumn";

/**
 * user add modal dialog
 *
 *
 * @param {IUserModalProps} props - props of modal
 * @returns {React.FC} user modal dialog
 */
const MembershipHistoryModal: React.FC<IMembershipHistoryModalProps> = (
  props: IMembershipHistoryModalProps
) => {
  const { useBreakpoint } = Grid;

  const { dataSet, setDataSet } = props;
  const { sm } = useBreakpoint();

  /**
   * form clear handler onclose
   *
   * @returns {void} handler close
   */
  const handleClose: any = () => {
    props.setModalVisibility(false);
    setDataSet(undefined);
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
          title={`Membership History`}
          titlealign="center"
        >
          <CustomTable
            dataSource={dataSet || []}
            columns={IMembershipHistoryColumn}
          />
        </ScalableCard>
      </CustomModal>
    </>
  );
};

export default MembershipHistoryModal;

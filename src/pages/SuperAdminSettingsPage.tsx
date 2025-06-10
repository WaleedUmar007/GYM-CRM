import { deletePackage, getPackages } from "@/appRedux/actions/packageAction";
import { getAllAdmins } from "@/appRedux/actions/userAction";
import { PackageSelector, UserSelector } from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import CustomTable from "@/components/table";
import { IPackagesColumns } from "@/components/tableColumn";
import TableToolBar from "@/components/tableToolbar";
import PackageAddEditModal from "@/modals/package/PackageAddUpdate";
import type { IPackage } from "@/types/ReduxTypes/package";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SuperAdminSettingsPage() {
  const { packages, packageLoading } = useSelector(PackageSelector);
  const { admins, adminsLoading } = useSelector(UserSelector);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);

  const [dataSet, setDataSet] = useState<IPackage>();
  const [userEditModal, setUserEditModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (packages === null || packageLoading) {
      dispatch(getPackages());
    }

    if (admins === null || adminsLoading) {
      dispatch(getAllAdmins());
    }
  }, []);

  return (
    <>
      <PackageAddEditModal
        dataSet={dataSet}
        edit={userEditModal}
        setDataSet={setDataSet}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        users={admins || []}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gym Packages Settings
          </h1>
          <button
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            onClick={() => {
              setUserEditModal(false);
              setModalVisibility(true);
              setDataSet(undefined);
            }}
          >
            <span className="text-lg">+</span> Add New Package
          </button>
        </div>

        {/* Packages List */}
        <div className="bg-white rounded-lg shadow p-6 w-full overflow-x-auto">
          <TableToolBar
            add={false}
            search={true}
            refresh={true}
            deleteAll={true}
            variant="filled"
            deleteBtnDisabled={deleteBtnDisabled}
            refreshEventListener={async () => {
              setLoading(true);
              form.resetFields();
              await dispatch(getPackages());
              setLoading(false);
            }}
            deleteEventListener={async () => {
              await dispatch(deletePackage(form.getFieldValue("packages")));
              form.resetFields();
              setDeleteBtnDisabled(true);
            }}
            searchFieldHandler={(e) => {
              setSearch(e.target.value);
            }}
            addEventListener={() => {
              // show modal for add user
            }}
          />
          <Form
            onChange={() => {
              setDeleteBtnDisabled(
                !(
                  Array.isArray(form.getFieldValue("packages")) &&
                  form.getFieldValue("packages").length > 0
                )
              );
            }}
            layout="vertical"
            form={form}
          >
            <Form.Item name="packages" hidden initialValue={[]} />
            <CustomTable
              form={{
                formData: form,
                key: "packages",
              }}
              dataSource={
                packages?.map((userPackage) => {
                  return {
                    key: userPackage._id,
                    updatePackage: () => {
                      setUserEditModal(true);
                      setModalVisibility(true);
                      setDataSet(userPackage);
                    },
                    ...userPackage,
                  };
                }) || []
              }
              search={search}
              loading={loading || packageLoading}
              columns={IPackagesColumns}
              hasSelectedTitle={"Users"}
              setDeleteBtnDisabled={setDeleteBtnDisabled}
            />
          </Form>
        </div>
      </div>
    </>
  );
}

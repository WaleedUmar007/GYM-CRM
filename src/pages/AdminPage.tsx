import { getDashboardStatistics } from "@/appRedux/actions/dashboardAction";
import { getAllMemberships } from "@/appRedux/actions/membershipAction";
import { getPackages } from "@/appRedux/actions/packageAction";
import {
  DashboardSelector,
  MembershipSelector,
  PackageSelector,
} from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import CustomTable from "@/components/table";
import { IMembershipColumns } from "@/components/tableColumn";
import TableToolBar from "@/components/tableToolbar";
import MembershipHistoryModal from "@/modals/membership/MembershipHistory";
import MembershipEditModal from "@/modals/membership/UpdateMembership";
import UserAddEditModal from "@/modals/users/AddAdminModal";
import type { Membership } from "@/types/ReduxTypes/membership";
import type { IPackage } from "@/types/ReduxTypes/package";
import type { IUser } from "@/types/ReduxTypes/user";
import { Form } from "antd";
import pDebounce from "p-debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(Array<string>);

  const dispatch = useAppDispatch();
  const { packages, packageLoading } = useSelector(PackageSelector);
  const { memberships, membershipLoading, totalDocumentsMemberships } =
    useSelector(MembershipSelector);

  const [dataSet, setDataSet] = useState<Record<string, any>>();
  const [userEditModal, setUserEditModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const [dataSetMembership, setDataSetMembership] = useState<Membership>();
  const [membershipEditModal, setMembershipEditModal] =
    useState<boolean>(false);
  const [membershipModalVisibility, setMembershipModalVisibility] =
    useState<boolean>(false);

  const [historyDataSet, setHistoryDataSet] = useState<Membership["history"]>();
  const [historyModalVisibility, setHistoryModalVisibility] =
    useState<boolean>(false);

  const { dashboardTopCardStatistics, dashboardTopCardStatisticsLoading } =
    useSelector(DashboardSelector);

  useEffect(() => {
    if (
      dashboardTopCardStatistics === null ||
      dashboardTopCardStatisticsLoading
    ) {
      dispatch(getDashboardStatistics());
    }
  }, []);

  useEffect(() => {
    if (packages === null || packageLoading) {
      dispatch(getPackages());
    }

    if (memberships === null || membershipLoading) {
      dispatch(
        getAllMemberships({
          page: 1,
          pageSize: 10,
          searchString: searchRef.current,
          admins: false,
        })
      );
    }
  }, []);

  /**
   * Handle pagination change
   *
   * @param {number} page - Current page number
   * @param {number} currentPageSize - Page size
   */
  const handlePaginationChange = async (
    page: number,
    currentPageSize: number
  ) => {
    setCurrentPage(page);
    setPageSize(currentPageSize);
    const currentSelectedUser = form.getFieldValue("memberships") || [];
    const newSelectedUsers = [...selectedUsers, ...currentSelectedUser];
    const updatedSelectedUsers: string[] = newSelectedUsers.filter(
      (payload, index, self) => {
        return self.indexOf(payload) === index;
      }
    );
    setSelectedUsers(updatedSelectedUsers);
    setLoading(true);
    await dispatch(
      getAllMemberships({
        page: page,
        pageSize: currentPageSize,
        admins: false,
      })
    );
    setLoading(false);
    form.setFieldsValue({ payloads: updatedSelectedUsers });
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (search.length === 0) {
      setLoading(false);
      handlePaginationChange(1, 10);
    } else {
      setLoading(true);
      debouncedSearch(1, 10);
    }
  }, [search]);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(
          getAllMemberships({
            page: curPage,
            pageSize: currentPageSize,
            searchString: searchRef.current,
            admins: false,
          })
        );
      }
      setLoading(false);
    }, 3),
    []
  );

  return (
    <>
      <UserAddEditModal
        dataSet={dataSet as IUser}
        edit={userEditModal}
        setDataSet={setDataSet}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        mode={"members"}
      />
      <MembershipEditModal
        dataSet={dataSetMembership}
        edit={membershipEditModal}
        setDataSet={setDataSetMembership}
        modalVisibility={membershipModalVisibility}
        setModalVisibility={setMembershipModalVisibility}
      />
      <MembershipHistoryModal
        dataSet={historyDataSet}
        setDataSet={setHistoryDataSet}
        modalVisibility={historyModalVisibility}
        setModalVisibility={setHistoryModalVisibility}
      />
      <div className="flex justify-between items-center mb-6 w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Management
          </h1>
          <div className="text-gray-500 text-sm">
            Add and manage gym members
          </div>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm"
          onClick={() => {
            setUserEditModal(false);
            setModalVisibility(true);
          }}
        >
          Add Customer
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Total Amount</div>
          <div className="text-2xl font-bold text-gray-900">
            PKR{" "}
            {(dashboardTopCardStatistics?.totalAmountPending || 0) +
              (dashboardTopCardStatistics?.totalAmountEarned || 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Pending Amount</div>
          <div className="text-2xl font-bold text-red-500">
            PKR {dashboardTopCardStatistics?.totalAmountPending || "0"}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Cleared Amount</div>
          <div className="text-2xl font-bold text-green-500">
            PKR {dashboardTopCardStatistics?.totalAmountEarned || "0"}
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow p-6 w-full overflow-x-auto">
        <TableToolBar
          add={false}
          search={true}
          refresh={true}
          deleteAll={false}
          variant="filled"
          refreshEventListener={async () => {
            setLoading(true);
            form.resetFields();
            setSearch("");
            await dispatch(
              getAllMemberships({
                page: currentPage,
                pageSize: pageSize,
                searchString: search,
                admins: false,
              })
            );
            setCurrentPage(1);
            setPageSize(10);
            setLoading(false);
          }}
          searchFieldHandler={(e) => {
            setSearch(e.target.value);
          }}
          addEventListener={() => {
            // show modal for add user
          }}
        />
        <Form layout="vertical" form={form}>
          <Form.Item name="memberships" hidden initialValue={[]} />
          <CustomTable
            form={{
              formData: form,
              key: "memberships",
            }}
            dataSource={
              memberships?.map((membership) => {
                return {
                  key: membership._id,
                  updateMembershipHandler: () => {
                    setMembershipEditModal(true);
                    setMembershipModalVisibility(true);
                    setDataSetMembership(membership);
                  },
                  viewMembershipHistoryHandler: () => {
                    setHistoryDataSet(membership.history);
                    setHistoryModalVisibility(true);
                  },
                  updateUser: () => {
                    setDataSet({
                      ...(membership.client_id as IUser),
                      userPackage: (membership.package as IPackage)._id,
                    });
                    setUserEditModal(true);
                    setModalVisibility(true);
                  },
                  clientId: (membership.client_id as IUser)?._id,
                  membershipId: membership._id,
                  userPackage: (membership.package as IPackage)?._id,
                  ...membership,
                };
              }) || []
            }
            search={search}
            loading={loading || membershipLoading}
            columns={IMembershipColumns}
            hasSelectedTitle={"Membership"}
            onChange={(pagination) => {
              handlePaginationChange(
                pagination.current as number,
                pagination.pageSize as number
              );
            }}
            pagination={{
              pageSize: pageSize,
              current: currentPage,
              showSizeChanger: true,
              position: ["bottomCenter"],
              total: totalDocumentsMemberships || 0,
              defaultPageSize: 10,
              pageSizeOptions: [5, 10, 20, 50],
            }}
          />
        </Form>
      </div>
    </>
  );
}

import { deleteUser, getAllUsers } from "@/appRedux/actions/userAction";
import {
  AuthSelector,
  PackageSelector,
  UserSelector,
} from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import CustomTable from "@/components/table";
import { IUsersColumns } from "@/components/tableColumn";
import TableToolBar from "@/components/tableToolbar";
import { Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pDebounce from "p-debounce";
import { UserRoles } from "@/types";
import UserAddEditModal from "@/modals/users/AddAdminModal";
import type { IUser } from "@/types/ReduxTypes/user";
import { getPackages } from "@/appRedux/actions/packageAction";
import MembershipHistoryModal from "@/modals/membership/MembershipHistory";
import type {
  ICommonMembershipAttr,
  Membership,
} from "@/types/ReduxTypes/membership";
import MembershipEditModal from "@/modals/membership/UpdateMembership";

export default function SuperAdminMembersPage() {
  const [membersFilter, setMembersFilter] = useState<"members" | "admins">(
    "members"
  );

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(Array<string>);
  const dispatch = useAppDispatch();
  const { users, userLoading, admins, totalDocumentsUser } =
    useSelector(UserSelector);
  const { packages, packageLoading } = useSelector(PackageSelector);

  const [historyDataSet, setHistoryDataSet] = useState<Membership["history"]>();
  const [historyModalVisibility, setHistoryModalVisibility] =
    useState<boolean>(false);

  const [dataSetMembership, setDataSetMembership] = useState<Membership>();
  const [membershipEditModal, setMembershipEditModal] =
    useState<boolean>(false);
  const [membershipModalVisibility, setMembershipModalVisibility] =
    useState<boolean>(false);

  const [dataSet, setDataSet] = useState<IUser>();
  const [userEditModal, setUserEditModal] = useState<boolean>(false);
  const [userModalMode, setUserModalMode] = useState<"members" | "admins">(
    "members"
  );
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [adminTypeModalVisibility, setAdminTypeModalVisibility] = useState<boolean>(false);
  const [selectedAdminType, setSelectedAdminType] = useState<"gym" | "inventory" | "salon">("gym");
  const { user } = useSelector(AuthSelector);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(
          getAllUsers({
            page: curPage,
            pageSize: currentPageSize,
            searchString: searchRef.current,
            admins: membersFilter === "admins",
          })
        );
      }
      setLoading(false);
    }, 3),
    []
  );

  useEffect(() => {
    if (packages === null || packageLoading) {
      dispatch(getPackages());
    }
  }, []);

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

  useEffect(() => {
    dispatch(
      getAllUsers({
        page: 1,
        pageSize: 10,
        searchString: searchRef.current,
        admins: false,
      })
    );

    dispatch(
      getAllUsers({
        page: 1,
        pageSize: 10,
        searchString: searchRef.current,
        admins: true,
      })
    );
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
    const currentSelectedUser = form.getFieldValue("users") || [];
    const newSelectedUsers = [...selectedUsers, ...currentSelectedUser];
    const updatedSelectedUsers: string[] = newSelectedUsers.filter(
      (payload, index, self) => {
        return self.indexOf(payload) === index;
      }
    );
    setSelectedUsers(updatedSelectedUsers);
    setLoading(true);
    await dispatch(
      getAllUsers({
        page: page,
        pageSize: currentPageSize,
        admins: membersFilter === "admins",
      })
    );
    setLoading(false);
    form.setFieldsValue({ payloads: updatedSelectedUsers });
  };

  return (
    <>
      <UserAddEditModal
        dataSet={dataSet}
        edit={userEditModal}
        setDataSet={setDataSet}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        user={user}
        mode={userModalMode}
        adminType={selectedAdminType}
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
      <div className="p-8 bg-[#f6faff] min-h-screen w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div className="text-3xl text-blue-600">👤</div>
            <div>
              <div className="text-gray-500 text-sm mb-1">
                Total Gym Members
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {
                  users?.filter((user) => {
                    return user.role === UserRoles.Member;
                  }).length
                }
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div className="text-3xl text-purple-600">🛡️</div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Number of Admins</div>
              <div className="text-2xl font-bold text-gray-900">
                {
                  admins?.filter((user) => {
                    return user.role === UserRoles.Admin;
                  }).length
                }
              </div>
            </div>
          </div>
        </div>
        {/* Filter and Add Admin Button */}
        <div className="flex gap-4 mb-4 items-center justify-between w-full">
          <div>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                membersFilter === "members"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
              onClick={() => setMembersFilter("members")}
            >
              Show Members
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                membersFilter === "admins"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
              onClick={() => setMembersFilter("admins")}
            >
              Show Admins
            </button>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-base shadow-sm"
              onClick={() => {
                setUserModalMode("members");
                setUserEditModal(false);
                setModalVisibility(true);
              }}
            >
              + Add Member
            </button>
            &nbsp;&nbsp;
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-base shadow-sm"
              onClick={() => {
                setAdminTypeModalVisibility(true);
              }}
            >
              + Add Admin
            </button>
          </div>
        </div>
        {/* Table */}
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
              setSearch("");
              await dispatch(
                getAllUsers({
                  page: currentPage,
                  pageSize: pageSize,
                  searchString: search,
                  admins: membersFilter === "admins",
                })
              );
              setCurrentPage(1);
              setPageSize(10);
              setLoading(false);
            }}
            deleteEventListener={async () => {
              await dispatch(
                deleteUser({
                  userIds: form.getFieldValue("users"),
                  mode: membersFilter,
                })
              );
              form.resetFields();
              setPageSize(10);
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
                  Array.isArray(form.getFieldValue("users")) &&
                  form.getFieldValue("users").length > 0
                )
              );
            }}
            layout="vertical"
            form={form}
          >
            <Form.Item name="users" hidden initialValue={[]} />
            <CustomTable
              form={{
                formData: form,
                key: "users",
              }}
              dataSource={
                users
                  ? membersFilter === "members"
                    ? users.map((user) => {
                        return {
                          key: user._id,
                          viewMembershipHistoryHandler: () => {
                            setHistoryDataSet(
                              user.membership?.history ||
                                ([] as Array<ICommonMembershipAttr>)
                            );
                            setHistoryModalVisibility(true);
                          },
                          updateMembershipHandler: () => {
                            setMembershipEditModal(true);
                            setMembershipModalVisibility(true);
                            setDataSetMembership(user.membership);
                          },
                          updateUser: () => {
                            setUserModalMode(membersFilter);
                            setDataSet(user);
                            setUserEditModal(true);
                            setModalVisibility(true);
                          },
                          ...user,
                        };
                      })
                    : admins?.map((user) => {
                        return {
                          key: user._id,
                          updateUser: () => {
                            setUserModalMode(membersFilter);
                            setDataSet(user);
                            setUserEditModal(true);
                            setModalVisibility(true);
                          },
                          ...user,
                        };
                      })
                  : []
              }
              search={search}
              loading={loading || userLoading}
              columns={IUsersColumns}
              hasSelectedTitle={"Users"}
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
                total: totalDocumentsUser || 0,
                defaultPageSize: 10,
                pageSizeOptions: [5, 10, 20, 50],
              }}
              setDeleteBtnDisabled={setDeleteBtnDisabled}
            />
          </Form>
        </div>
      </div>

      {/* Admin Type Selection Modal */}
      {adminTypeModalVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Select Admin Type</h3>
              <button
                onClick={() => setAdminTypeModalVisibility(false)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Choose the type of admin you want to add:</p>
              
              <button
                onClick={() => {
                  setSelectedAdminType("gym");
                  setUserModalMode("admins");
                  setUserEditModal(false);
                  setAdminTypeModalVisibility(false);
                  setModalVisibility(true);
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-sm"
              >
                <div className="text-2xl">🏋️</div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Gym Admin</div>
                  <div className="text-sm text-gray-700">Manage gym members and operations</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedAdminType("inventory");
                  setUserModalMode("admins");
                  setUserEditModal(false);
                  setAdminTypeModalVisibility(false);
                  setModalVisibility(true);
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors shadow-sm"
              >
                <div className="text-2xl">📦</div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Inventory Admin</div>
                  <div className="text-sm text-gray-700">Manage inventory and stock</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedAdminType("salon");
                  setUserModalMode("admins");
                  setUserEditModal(false);
                  setAdminTypeModalVisibility(false);
                  setModalVisibility(true);
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-colors shadow-sm"
              >
                <div className="text-2xl">💇</div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Salon Admin</div>
                  <div className="text-sm text-gray-700">Manage salon services and clients</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

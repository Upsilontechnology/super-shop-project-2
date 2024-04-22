import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Pagination from "../../../components/pagination/Pagination";
import AllEmployeeModal from "./AllEmployeeModal";
import AllEmployeeRow from "./AllEmployeeRow";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllEmployee = () => {
  const axiosPublic = useAxiosPublic();
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["usersData", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/users?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  });

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/user/${userId}`);
        if (res.data.message === "success") {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "user has been deleted.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (users && users?.totalCount) {
      setLength(users?.totalCount);
      refetch();
    } else {
      setLength(0);
      refetch();
    }
  }, [users]);
  return (
    <div className="lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg ">
      <div className=" mx-3 lg:mx-0 mt-10">
        {/* tabs */}
        <div className="lg:ml-3 xl:ml-0 h-full">
          <Tabs>
            {/* tab lists */}
            <TabList className="font-bold flex justify-center lg:gap-3 gap-2 mt-2 mb-4">
              <Tab
                className="border-none outline-none lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
                selectedClassName="selected-tab outline-none border-none bg-mainBG text-white lg:py-5 lg:px-14 py-3 px-10"
                onClick={() => handleStatus("pending")}
              >
                Pending
              </Tab>
              <Tab
                className="border-none outline-none lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
                selectedClassName="selected-tab outline-none border-none bg-mainBG text-white lg:py-5 lg:px-14 py-3 px-10"
                onClick={() => handleStatus("completed")}
              >
                Approved
              </Tab>
            </TabList>
            <div className="bg-white lg:py-5 py-2 rounded-md">
              {/* tab panel */}
              <div className="my-5 rounded-lg">
                <TabPanel>
                  <div className="flex flex-col px-5 gap-4">
                    <div className="overflow-x-auto">
                      <table className="table">
                        {/* head */}
                        <thead className="">
                          <tr className="text-black text-center border-b-[1.2px] border-black">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {/* row 1 */}
                          {users?.items?.map((user, index) => (
                            <AllEmployeeRow
                              key={users._id}
                              users={user}
                              index={index}
                              onEdit={handleEditModal}
                              onDelete={handleDelete}
                              refetch={refetch}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-col px-5 gap-4">
                    this is approved page
                  </div>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
      {openModal && (
        <AllEmployeeModal
          user={selectedUser}
          onClose={handleCloseModal}
          refetchCategories={refetch}
        />
      )}
    </div>
  );
};

export default AllEmployee;

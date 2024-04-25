import React, { useState } from "react";

import { IoBagOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FaSortAmountDown } from "react-icons/fa";
import DashboardTitle from "../../../components/deshboardTitle/DashboardTitle";

const selectCategory = {
  category: {
    name: "Select Category",
    options: [
      {
        id: 1,
        label: "Option 1",
      },
      {
        id: 2,
        label: "Option 2",
      },
      {
        id: 3,
        label: "Option 3",
      },
    ],
  },
};

const AdminHome = () => {
  const [filter, setFilter] = useState(null);
  const [selectedData, setSelectedData] = useState();
  const handleCategory = async (category, index) => {
    // setDefaultTab(index);
    setFilter(category);
    const categoryName = category.toLowerCase();
    console.log(categoryName);

    // await axiosPublic.get(`/soldItems/${categoryName}`)
    //     .then((res) => {
    //         setSelectedData(res.data);
    //     });
  };
  console.log(selectCategory);
  const handleFilter = async (category, filterName) => {
    const categoryName = category.toLowerCase();
    // const res = await axiosPublic.get(
    //   `/soldItems/1/filter?categoryName=${categoryName}&filterName=${filterName}`
    // );
    setSelectedData(res.data);
  };
  const handleOrderFilter = async (filterName) => {
    // const res = await axiosPublic.get(
    //   `/orderProduct/1/filter?filterName=${filterName}`
    // );
    setOrderProducts(res.data);
  };
  return (
    <div className="lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg bg-white">
      <div className="2xl:h-[80vh] lg:h-[85vh] md:h-[82vh] h-[80vh]">
        <DashboardTitle
          title="Welcome to professional dashboard"
          descrition="Insights, management tools and ad creation - all in one place"
        />
        <div>
          <div>
            <h1 className="font-bold py-3 text-lg">Total Summary</h1>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-2 text-white">
              <div className="rounded-md bg-mainBG">
                <div className="p-5">
                  <h1>Total Product</h1>
                  <h1 className="text-3xl">1500</h1>
                </div>
              </div>
              <div className="rounded-md bg-[#4A518E]">
                <div className="p-5">
                  <h1>Total Amount (BDT)</h1>
                  <h1 className="text-3xl">1500</h1>
                </div>
              </div>
              <div className="rounded-md bg-mainBG">
                <div className="p-5">
                  <h1>Total Category</h1>
                  <h1 className="text-3xl">1500</h1>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col mt-2 2xl:h-[44vh] xl:h-[55vh] lg:h-96 md:h-[70vh] bg-white rounded-lg">
                <div className="font-bold pb-3 flex   justify-between items-center">
                  <div>
                    <select
                      className="bg-white px-4 py-2 rounded-md border-2"
                      onChange={(e) => handleCategory(e.target.value)}
                      value={filter}
                    >
                      {selectCategory?.category?.options?.map(
                        (category, index) => (
                          <option value={category?.category} key={category._id}>
                            {category?.category}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="dropdown dropdown-hover mr-5">
                      <div tabIndex={0} role="button" className=" m-1">
                        <FaSortAmountDown className="text-2xl" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 -ml-16"
                      >
                        <li>
                          <button
                            onClick={() => handleFilter(filter, "all")}
                            className=""
                          >
                            All
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter(filter, "daily")}
                            className=""
                          >
                            Today
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter(filter, "weekly")}
                            className=""
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter(filter, "monthly")}
                            className=""
                          >
                            Monthly
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter(filter, "yearly")}
                            className=""
                          >
                            Yearly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center lg:w-4/6 w-5/6 4xl:my-10 3xl:my-5 md:my-0 my-5 mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 px-1 md:px-0 gap-2 md:gap-5 w-full content-center">
                    <div className="w-full shadow-md rounded-md flex flex-col gap-2 md:px-4 md:py-5 px-4 py-5 bg-white">
                      <div className="rounded-lg flex items-center gap-1">
                        <div className="rounded-lg text-black text-base ">
                          <IoBagOutline className="font-semibold" />
                        </div>
                        <h3 className="text-base font-semibold ">
                          Total Sales
                        </h3>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold ">
                          1000 BDT
                        </h2>
                      </div>
                    </div>
                    <div className="w-full shadow-md rounded-md flex flex-col gap-2  md:p-5 px-4 py-5 bg-white">
                      <div className="rounded-lg flex items-center gap-1">
                        <div className="rounded-lg text-black text-base ">
                          <BsCart3 className="font-semibold" />
                        </div>
                        <h3 className="text-sm md:text-base font-semibold ">
                          Total Orders
                        </h3>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold ">1000</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

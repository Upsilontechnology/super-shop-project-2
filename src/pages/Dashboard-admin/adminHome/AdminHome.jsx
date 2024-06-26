import React, { useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import DashboardTitle from "../../../components/deshboardTitle/DashboardTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRoleAndBranch from "../../../hooks/useRoleAndBranch";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useBranch } from "../../../components/BranchContext/BranchContext";

const status = "approved";

const AdminHome = () => {
  const [filter, setFilter] = useState(null);
  const [defaultTab, setDefaultTab] = useState(0);
  const { selectedBranch, updateBranch } = useBranch();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [fetchedData, setFetchedData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [role, branch] = useRoleAndBranch();
  // console.log(selectedBranch);

  // useEffect(() => {
  //   if (role === "Admin") {
  //     console.log("Admin home");
  //     updateBranch(branch);
  //   }
  // }, [role, branch, updateBranch]);

  const { data: categories = [], refetch: refetchCategory } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/category");
        return res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    enabled: !!selectedBranch,
  });

  const {
    data: productState = [],
    refetch: refetchProductState,
    isLoading: isLoadingProductState,
  } = useQuery({
    queryKey: ["productState", role, branch],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/products/1/state?role=${role}&branch=${selectedBranch}&email=${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching Product Statistics:", error);
        throw error;
      }
    },
    enabled: !!selectedBranch,
  });

  const {
    data: soldProductState = [],
    refetch: refetchSoldProductState,
    isLoading: isLoadingSoldProductState,
  } = useQuery({
    queryKey: ["soldProductState", role, branch],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/sellProducts?role=${role}&branch=${selectedBranch}&email=${user?.email}&status=${status}`
        );
        setFetchedData(res.data?.items);
        return res.data;
      } catch (error) {
        console.error("Error fetching Sold Product Statistics:", error);
        throw error;
      }
    },
    enabled: !!selectedBranch,
  });

  useEffect(() => {
    if (selectedBranch) {
      refetchCategory();
      refetchSoldProductState();
      refetchProductState();
    }
  }, [selectedBranch, refetchCategory, refetchSoldProductState, refetchProductState, branch, updateBranch]);

  useEffect(() => {
    if (categories?.items?.length > 0) {
      handleCategory(categories?.items[defaultTab]?.category, defaultTab);
    }
  }, [categories?.items, branch,selectedBranch, updateBranch]);

  // useEffect(() => {
  //   try {
  //     const res = axiosPublic.get(
  //       `/sellProducts/category?role=${role}&branch=${branch}&email=${user?.email}&category=${filter}&status=${status}`
  //     );
  //     setSelectedData(res.data);
  //     console.log('clicked from outside', res.data);
  //   } catch (error) {
  //     console.error("Error fetching products by category:", error);
  //   }
  // }, [role, selectedBranch, user?.email, filter, status, branch, updateBranch])
  
  console.log(branch, selectedBranch)

  const handleCategory = async (categoryName, index) => {
    setDefaultTab(index);
    setFilter(categoryName);
    const category = categoryName?.toLowerCase();
    // console.log(category)
    try {
      const res = await axiosPublic.get(
        `/sellProducts/category?role=${role}&branch=${branch}&email=${user?.email}&category=${category}&status=${status}`
      );
      setSelectedData(res.data);
      console.log('clicked', res.data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };
  // console.log(selectedData);
  const handleFilter = async (filterName, category) => {
    const categoryName = category.toLowerCase();
    console.log(filterName, category)
    try {
      const res = await axiosPublic.get(
        `/sellProducts/filter?role=${role}&branch=${selectedBranch}&email=${user?.email}&filterName=${filterName}&status=${status}&category=${categoryName}`
      );
      setSelectedData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const totalSoldProductAmount = soldProductState?.items?.reduce(
    (total, product) => total + product?.price * product?.quantity,
    0
  );

  const totalSoldProductItem = soldProductState?.items?.reduce(
    (total, product) => product?.quantity + total,
    0
  );

  const totalSellByCategory = selectedData?.reduce(
    (total, product) => total + (product?.price * product?.quantity),
    0
  ) || 0;

  const totalProductByCategory = selectedData?.reduce(
    (total, product) => product?.quantity + total,
    0
  ) || 0;

  return (
    <div className="overflow-auto lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0  rounded-lg ">
      <div className="2xl:h-[80vh] lg:h-[83vh] md:h-[82vh] h-[80vh]">
        <DashboardTitle
          title="Welcome to professional dashboard"
          descrition="Insights, management tools and ad creation - all in one place"
        />
        <div>
          <div>
            <h1 className="font-bold py-3 text-lg">Total Summary</h1>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 text-white">
              <div className="rounded-md bg-mainBG">
                <div className="p-5">
                  <h1>Total Product</h1>
                  <h1 className="text-3xl">{productState?.totalProducts}</h1>
                </div>
              </div>
              <div className="rounded-md bg-[#4A518E]">
                <div className="p-5">
                  <h1>Total Sell (BDT)</h1>
                  <h1 className="text-3xl">{totalSoldProductAmount}</h1>
                </div>
              </div>
              <div className="rounded-md bg-[#4A518E]">
                <div className="p-5">
                  <h1>Total Purchase (BDT)</h1>
                  <h1 className="text-3xl">
                    {productState?.totalPurchaseAmount}
                  </h1>
                </div>
              </div>
              <div className="rounded-md bg-mainBG">
                <div className="p-5">
                  <h1>Total Category</h1>
                  <h1 className="text-3xl">{categories?.totalCount}</h1>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className=" mt-4 4xl:h-[44vh] 3xl:h-[39vh] 2xl:h-[36.5vh] xl:h-[55vh] lg:h-96 md:h-[70vh] bg-white rounded-lg ">
                <div className="font-bold flex flex-row  justify-between items-center lg:mx-7 mx-3 py-4">
                  <div>
                    <select
                      className="bg-[#ebedfe] px-4 py-2 rounded"
                      onChange={(e) => handleCategory(e.target.value)}
                      value={filter}
                    >
                      {categories?.items?.map((category, index) => (
                        <option value={category?.category} key={category._id}>
                          {category?.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="dropdown dropdown-hover mr-5">
                      <div tabIndex={0} role="button" className=" m-1">
                        <FaSortAmountDown className="text-2xl" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 -ml-10"
                      >
                        <li>
                          <button
                            onClick={() => handleFilter("all", filter)}
                            className=""
                          >
                            All
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter("daily", filter)}
                            className=""
                          >
                            Today
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter("weekly", filter)}
                            className=""
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter("monthly", filter)}
                            className=""
                          >
                            Monthly
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleFilter("yearly", filter)}
                            className=""
                          >
                            Yearly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mx-auto lg:w-4/6 w-[95%] 4xl:my-20 3xl:my-12 2xl:my-10 xl:my-14 md:my-20 my-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 px-1 md:px-0 gap-2 md:gap-5 w-full content-center">
                    <div className="w-full shadow-md rounded-md text-white flex flex-col gap-2 md:px-8 md:py-5 px-4 py-5 bg-[#4A518E]">
                      <div className="rounded-lg flex items-center gap-1">
                        <h3 className="text-base  ">
                          Total Sales Amount (BDT)
                        </h3>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold ">
                          {totalSellByCategory}
                        </h2>
                      </div>
                    </div>
                    <div className="w-full shadow-md rounded-md flex flex-col gap-2  md:p-5 px-4 py-5 bg-[#4A518E] text-white">
                      <div className="rounded-lg flex items-center gap-1">
                        <h3 className="text-sm md:text-base">
                          Total Sales Item
                        </h3>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold ">
                          {totalProductByCategory}
                        </h2>
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

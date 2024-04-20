import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AllEmployee = () => {
    return (
        <div className=" mx-3 lg:mx-0 mt-10">
            {/* tabs */}
            <div className="lg:ml-3 xl:ml-0 h-full">
                <Tabs>
                    {/* tab lists */}
                    <TabList className="font-bold flex justify-center lg:gap-3 gap-2 mt-2 mb-4">
                        <Tab
                            className="border-none bg-white lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
                            selectedClassName="selected-tab bg-[#757EC9] text-white lg:py-5 lg:px-14 py-3 px-10"
                            onClick={() => handleStatus("pending")}
                        >
                            Pending
                        </Tab>
                        <Tab
                            className="border-none bg-white lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
                            selectedClassName="selected-tab bg-[#757EC9] text-white lg:py-5 lg:px-14 py-3 px-10"
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
                                    this is pending page
                                    {/* <OrderedProductDetails
                                        products={orderBySearch}
                                        filteredUser={userInfo}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPages={totalPages}
                                        refetch={refetch}
                                    /> */}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="flex flex-col px-5 gap-4">
                                    this is approved page
                                    {/* <OrderedProductDetails
                                        products={orderBySearch}
                                        filteredUser={userInfo}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPages={totalPages}
                                        refetch={refetch}
                                    /> */}
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default AllEmployee;
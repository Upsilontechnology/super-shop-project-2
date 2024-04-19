import React from "react";
import timg from "../../assets/Group94.png";
const DashboardTitle = ({ title, descrition }) => {
  return (
    <>
      <div className="flex lg:flex-row flex-col lg:justify-start justify-center items-center gap-5 bg-white rounded-md px-12 pt-6">
        <div>
          <img
            src={timg}
            className="lg:w-60 w-32 h-auto pt-2 lg:pl-7 pl-3"
            alt=""
          />
        </div>
        <div className="flex lg:justify-start justify-center items-center text-center lg:text-start">
          <div>
            <h1 className="lg:text-xl text-base font-bold">{title}</h1>
            <h1 className="lg:text-base font-medium text-sm">{descrition}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTitle;

import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumber = [...Array(totalPages).keys()];
  // console.log(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pb-3">
      <button
        onClick={() => {
          currentPage - 1 < totalPages && setCurrentPage(currentPage - 1);
        }}
        className={`flex items-center px-3 py-2 bg-slate-200 cursor-pointer rounded-md flexcode-banner-bg ${
          currentPage !== 0
            ? "bg-stone-800 text-white"
            : "border-slate-500 btn-disabled"
        }`}
      >
        <FaArrowLeft className="text-base" />
        {/* <span className="font-medium">Previous</span> */}
      </button>
      <div className="hidden md:flex items-center gap-2">
        {pageNumber.map((num) => (
          <span
            onClick={() => setCurrentPage(num)}
            key={num}
            className={`flex text-base items-center px-4 py-1 bg-slate-200 cursor-pointer rounded-md flexcode-banner-bg  ${
              num === currentPage
                ? "bg-stone-800 text-white"
                : "border-slate-500 "
            }`}
          >
            {num + 1}
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          currentPage + 1 < totalPages && setCurrentPage(currentPage + 1);
        }}
        className={`flex items-center  px-4 py-2 bg-slate-200 cursor-pointer rounded-md flexcode-banner-bg ${
          currentPage + 1 < totalPages
            ? "hover:border-[#0fcda156]"
            : "text-slate-500 btn-disabled"
        }`}
      >
        {/* <span className="font-medium">Next</span> */}
        <FaArrowRight className="text-base" />
      </button>
    </div>
  );
};
export default Pagination;

import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const ProductList = () => {
  return (
    <div className="lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg bg-white">
      <div className="bg-white p-2 md:p-5 rounded-md space-y-5">
        <div className="flex flex-row gap-5">
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search product with code"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search with Category"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className="text-black text-center border-b-[1.2px] border-black">
                <th>Sl</th>
                <th>Code</th>
                <th>Category</th>
                <th>Name</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Sales Rate</th>
                <th>Purchase Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              <tr className=" border-b-[1.2px] border-black text-center ">
                <th>01</th>
                <td>
                  <div>Hart Hagerty</div>
                </td>
                <td>Zemlak</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <FiEdit />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <CiCirclePlus />
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";


const ProductSellModal = ({ onClose, refetchProducts, products }) => {
    const handleAddToSellList = () => {

    }

    return (
        <div className="fixed z-[100] flex items-center justify-center inset-0 bg-black/10 duration-100">
            <div className="w-[30%] rounded-xl bg-white px-4 py-3 scale-1 opacity-1 duration-200">
                <div className="rounded-lg w-full">
                    <button
                        onClick={onClose}
                        className="text-[#1D2A3B] float-end text-lg"
                    >
                        <GiCancel className="text-2xl" />
                    </button>
                    <form
                        onSubmit={handleAddToSellList}
                        className="flex flex-col gap-2 rounded-lg space-y-3 px-14 py-24 "
                    >
                        <div className="flex flex-col gap-2">
                            <div className="form-control w-full my-1">
                                <input
                                    type="number"
                                    placeholder="Put Price"
                                    className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                                />
                            </div>
                            <div className="form-control w-full my-1">
                                <input
                                    type="number"
                                    placeholder="Put Quantity"
                                    className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <button
                                className="focus:border-transparent w-full hover:bg-[#959ff0] bg-[#757ec9] text-white font-semibold py-4 rounded-md">
                                Add To Sell List
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductSellModal;
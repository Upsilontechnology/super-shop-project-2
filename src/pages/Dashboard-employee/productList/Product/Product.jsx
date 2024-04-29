import React, { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const Product = ({ product, index }) => {

    // const [openModal, setOpenModal] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [sell, setSell] = useState("");
    console.log(sell);

    const handleEdit = async (id) => {
        try {
            const response = await axiosPublic.get(`/products/${id}`);
            setSell(response?.data);
            // setOpenModal(true);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };


    return (
        < tr className=" border-b-[1.2px] border-black" >
            <th>{index + 1}</th>
            <td>
                <div>{product?.productCode}</div>
            </td>
            <td>{product?.category}</td>
            <td>{product?.productName}</td>
            <td>{product?.supplierName}</td>
            <td>{product?.quantity}</td>
            <td>{product?.unit}</td>
            <td>{product?.sellprice}</td>
            <td>{product?.purchaseprice}</td>
            <th className='flex justify-between gap-4'>
                <button onClick={() => handleEdit(product?._id)}>
                    <FiEdit className="text-lg" />
                </button>
                <button>
                    <RiDeleteBin6Line className="text-lg" />
                </button>
                <button>
                    <CiCirclePlus className="text-lg" />
                </button>
            </th>
        </tr >
    );
};

export default Product;
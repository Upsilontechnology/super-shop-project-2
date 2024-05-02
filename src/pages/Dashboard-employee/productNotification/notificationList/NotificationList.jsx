import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const NotificationList = ({ product, refetchProducts, index }) => {
  const axiosPublic = useAxiosPublic();
  return (
    <tr className=" border-b-[1.2px] border-black">
      <td>{index + 1}</td>
      <td>{product?.productName}</td>
      <td>{product?.productCode}</td>
      <td className="float-end">{product?.quantity}</td>
      {/* <td>{product?.price * product?.quantity}</td> */}
    </tr>
  );
};

export default NotificationList;

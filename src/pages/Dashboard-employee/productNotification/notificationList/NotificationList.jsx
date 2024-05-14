import React from "react";

const NotificationList = ({ product, refetchProducts, index }) => {
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

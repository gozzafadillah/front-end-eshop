import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Proses Orderan Anda.</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">Orderan anda sedang diproses.</h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px]">Order anda sedang dalam perjalanan.</h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">Orderan anda sudah di kota tujuan.</h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">Kurir sedang mengambil orderan anda.</h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">
            Orderan anda sedang dikirim oleh kurir!
          </h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Proses refund anda sedang diproses!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Refund anda sukses!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;

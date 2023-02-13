import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
import SingleOrder from "./SingleOrder";
import OrderHistoryLoading from "./OrderHistoryLoading";
import FailedFetchingBooksInYear from "../SingleYearPage/FailedFetchingBooksInYear";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderHistory,
  SelectOrderHistory,
  SelectOrderHistoryStatus,
} from "../../slices/orderSlice";
import { AppDispatch } from "../../../store";

const OrderHistory = () => {
  const orderHistoryStatus = useSelector(SelectOrderHistoryStatus);
  const orderHistory = useSelector(SelectOrderHistory);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-5 min-h-screen ">
      <div className="mb-4 flex-col flex gap-5">
        <h3 className="text-center text-xl relative font-bold px-2 pb-2 border-b-2 border-slate-500 w-fit mx-auto">
          Order History
        </h3>
        <Link
          to={"/cart"}
          className="text-sm flex items-center gap-1 text-pink-500 font-bold"
        >
          <RxDoubleArrowLeft className="text-lg" />
          <div>Back To Cart</div>
        </Link>
        {orderHistoryStatus === "loading" ? (
          <OrderHistoryLoading />
        ) : orderHistoryStatus === "failed" ? (
          <FailedFetchingBooksInYear />
        ) : (
          orderHistory.map((order: any) => (
            <SingleOrder
              key={order._id}
              orderId={order._id}
              status={order.status}
              date={order.createdAt}
              books={order.books}
              totalAmount={order.totalAmount}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

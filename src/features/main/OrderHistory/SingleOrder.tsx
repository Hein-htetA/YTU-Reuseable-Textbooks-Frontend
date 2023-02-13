import React from "react";
import SingleBookInOrderHistory from "./SingleBookInOrderHistory";

interface Props {
  books: any;
  orderId: string;
  status: string;
  date: string;
  totalAmount: number;
}

const SingleOrder = ({ books, orderId, status, date, totalAmount }: Props) => {
  return (
    <div className="max-w-3xl w-full mx-auto border-2 border-slate-500 px-4 py-3 rounded-xl text-sm">
      <div className="mx-auto w-fit">OrderId: {orderId}</div>
      <div className="flex justify-between items-center mb-2">
        <div>
          Status:
          {status === "pending" ? (
            <span className="text-pink-500  font-bold capitalize ml-1">
              {status}
            </span>
          ) : status === "completed" ? (
            <span className="text-green-600 font-bold capitalize ml-1">
              {status}
            </span>
          ) : (
            <span className="text-red-600 font-bold capitalize ml-1">
              {status}
            </span>
          )}
        </div>
        <div>
          Date:
          <span className="ml-1">
            {new Date(date).toLocaleString("en-GB").split(",")[0]}
          </span>
        </div>
      </div>
      <SingleBookInOrderHistory books={books} />
      <div className="h-[1px] bg-slate-500 mb-2"></div>
      <div className="w-fit ml-auto">
        Total:
        <span className="font-bold text-slate-700 ml-1">{totalAmount}</span>
        Kyats
      </div>
    </div>
  );
};

export default SingleOrder;

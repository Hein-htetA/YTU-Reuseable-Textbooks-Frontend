import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import {
  BookInCart,
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { Link } from "react-router-dom";

interface Props {
  bookInfo: BookInCart;
}

const SingleCartItem = ({ bookInfo }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <Link to={"cart-book-detail"} state={{ book: bookInfo }}>
        <div className="text-base capitalize">
          {bookInfo.title}{" "}
          <span className="text-sm text-pink-500">
            {"(" + bookInfo.edition + ")"}
          </span>
        </div>
      </Link>

      <div className="flex items-center justify-around border-2 border-slate-500 rounded-lg">
        <button
          className="text-xs font-bold disabled:text-slate-400"
          onClick={() => dispatch(decreaseCount(bookInfo._id))}
          disabled={bookInfo.count === 1}
        >
          <FaMinus />
        </button>
        <div>{bookInfo.count}</div>
        <button
          className="text-xs font-bold disabled:text-slate-400"
          onClick={() => dispatch(increaseCount(bookInfo._id))}
          disabled={bookInfo.count === 10}
        >
          <BsPlusLg />
        </button>
      </div>
      <div className="mx-auto">
        {bookInfo.price * bookInfo.count}{" "}
        <span className="hidden sm:inline">Kyats</span>
      </div>

      <button
        className="text-xl text-red-500"
        onClick={() => dispatch(removeFromCart(bookInfo._id))}
      >
        <RiDeleteBin6Line />
      </button>
    </>
  );
};

export default SingleCartItem;
